<?php
/**
 * Reusable meta box field renderers so each CPT file doesn't reimplement
 * the same media-picker / repeater / relation-picker markup.
 */

if (!defined('ABSPATH')) exit;

/** Ensure wp.media is loaded on our CPT edit screens (needed for file/gallery pickers below). */
function batum_enqueue_media_library($hook, $post_types) {
    if (!in_array($hook, ['post.php', 'post-new.php'], true)) return;
    $screen = get_current_screen();
    if ($screen && in_array($screen->post_type, $post_types, true)) {
        wp_enqueue_media();
    }
}

/** Single-file picker (PDF datasheets, manuals, CAD files). Stores an attachment ID. */
function batum_render_file_field($field_id, $label, $post_id) {
    $attachment_id = get_post_meta($post_id, $field_id, true);
    $url = $attachment_id ? wp_get_attachment_url($attachment_id) : '';
    ?>
    <p>
        <label><strong><?php echo esc_html($label); ?></strong></label><br>
        <input type="hidden" class="batum-file-id" id="<?php echo esc_attr($field_id); ?>" name="<?php echo esc_attr($field_id); ?>" value="<?php echo esc_attr($attachment_id); ?>">
        <button type="button" class="button batum-file-select" data-target="#<?php echo esc_attr($field_id); ?>"><?php _e('Select or upload file', 'batum-core'); ?></button>
        <button type="button" class="button batum-file-clear" data-target="#<?php echo esc_attr($field_id); ?>" <?php echo $attachment_id ? '' : 'style="display:none;"'; ?>><?php _e('Remove', 'batum-core'); ?></button>
        <span class="batum-file-preview" data-target="#<?php echo esc_attr($field_id); ?>">
            <?php if ($url): ?><a href="<?php echo esc_url($url); ?>" target="_blank"><?php echo esc_html(basename($url)); ?></a><?php endif; ?>
        </span>
    </p>
    <?php
}

/** Gallery picker: multiple images, stored as a comma-separated list of attachment IDs. */
function batum_render_gallery_field($field_id, $label, $post_id) {
    $raw = get_post_meta($post_id, $field_id, true);
    $ids = $raw ? array_filter(array_map('trim', explode(',', $raw))) : [];
    ?>
    <p>
        <label><strong><?php echo esc_html($label); ?></strong></label><br>
        <input type="hidden" class="batum-gallery-ids" id="<?php echo esc_attr($field_id); ?>" name="<?php echo esc_attr($field_id); ?>" value="<?php echo esc_attr($raw); ?>">
        <button type="button" class="button batum-gallery-select" data-target="#<?php echo esc_attr($field_id); ?>"><?php _e('Select images', 'batum-core'); ?></button>
        <div class="batum-gallery-preview" data-target="#<?php echo esc_attr($field_id); ?>" style="display:flex;flex-wrap:wrap;gap:8px;margin-top:8px;">
            <?php foreach ($ids as $id): $thumb = wp_get_attachment_image_url($id, 'thumbnail'); if ($thumb): ?>
                <img src="<?php echo esc_url($thumb); ?>" style="width:64px;height:64px;object-fit:cover;border-radius:4px;">
            <?php endif; endforeach; ?>
        </div>
    </p>
    <?php
}

/**
 * Repeater field: rows of {parameter, value, unit}. Stored as JSON in post meta.
 * This is the free replacement for ACF Pro's repeater field, per the "no paid
 * plugins" decision.
 */
function batum_render_specs_repeater($field_id, $label, $post_id) {
    $raw = get_post_meta($post_id, $field_id, true);
    $rows = $raw ? json_decode($raw, true) : [];
    if (!is_array($rows)) $rows = [];
    ?>
    <p><strong><?php echo esc_html($label); ?></strong></p>
    <table class="batum-repeater widefat" data-field="<?php echo esc_attr($field_id); ?>">
        <thead>
            <tr>
                <th><?php _e('Parameter', 'batum-core'); ?></th>
                <th><?php _e('Value', 'batum-core'); ?></th>
                <th><?php _e('Unit', 'batum-core'); ?></th>
                <th></th>
            </tr>
        </thead>
        <tbody class="batum-repeater-rows">
            <?php if ($rows): foreach ($rows as $row): ?>
                <tr>
                    <td><input type="text" class="widefat" data-key="parameter" value="<?php echo esc_attr($row['parameter'] ?? ''); ?>"></td>
                    <td><input type="text" class="widefat" data-key="value" value="<?php echo esc_attr($row['value'] ?? ''); ?>"></td>
                    <td><input type="text" class="widefat" data-key="unit" value="<?php echo esc_attr($row['unit'] ?? ''); ?>"></td>
                    <td><button type="button" class="button batum-repeater-remove">&times;</button></td>
                </tr>
            <?php endforeach; endif; ?>
        </tbody>
    </table>
    <p><button type="button" class="button batum-repeater-add" data-field="<?php echo esc_attr($field_id); ?>"><?php _e('+ Add Row', 'batum-core'); ?></button></p>
    <input type="hidden" name="<?php echo esc_attr($field_id); ?>_json" id="<?php echo esc_attr($field_id); ?>_json" value="<?php echo esc_attr($raw); ?>">
    <?php
}

/** Serialize repeater rows from $_POST (built by assets/js/repeater.js) back to JSON before save. */
function batum_save_specs_repeater($post_id, $field_id) {
    if (!isset($_POST[$field_id . '_json'])) return;
    $decoded = json_decode(stripslashes($_POST[$field_id . '_json']), true);
    if (!is_array($decoded)) $decoded = [];
    $clean = [];
    foreach ($decoded as $row) {
        $clean[] = [
            'parameter' => sanitize_text_field($row['parameter'] ?? ''),
            'value' => sanitize_text_field($row['value'] ?? ''),
            'unit' => sanitize_text_field($row['unit'] ?? '')
        ];
    }
    update_post_meta($post_id, $field_id, wp_json_encode($clean));
}

/** Get specs rows for templates. */
function batum_get_specs_rows($post_id, $field_id = '_batum_specs') {
    $raw = get_post_meta($post_id, $field_id, true);
    $rows = $raw ? json_decode($raw, true) : [];
    return is_array($rows) ? $rows : [];
}

/** Multi-select relation picker (e.g. Related Products). Stores an array of post IDs. */
function batum_render_relation_field($field_id, $label, $post_id, $related_post_type, $exclude_id) {
    $selected = get_post_meta($post_id, $field_id, true);
    $selected = is_array($selected) ? $selected : [];
    $options = get_posts(['post_type' => $related_post_type, 'posts_per_page' => -1, 'exclude' => [$exclude_id], 'orderby' => 'title', 'order' => 'ASC']);
    ?>
    <p>
        <label><strong><?php echo esc_html($label); ?></strong></label><br>
        <select name="<?php echo esc_attr($field_id); ?>[]" multiple size="6" style="width:100%;">
            <?php foreach ($options as $option): ?>
                <option value="<?php echo esc_attr($option->ID); ?>" <?php selected(in_array($option->ID, $selected)); ?>>
                    <?php echo esc_html($option->post_title); ?>
                </option>
            <?php endforeach; ?>
        </select>
    </p>
    <?php
}

function batum_save_relation_field($post_id, $field_id) {
    $value = isset($_POST[$field_id]) ? array_map('absint', (array) $_POST[$field_id]) : [];
    update_post_meta($post_id, $field_id, $value);
}
