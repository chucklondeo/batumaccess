<?php
/**
 * A small set of reusable Call To Action presets (Get Quote, Download
 * Datasheet, etc.) managed in one place, then picked from a dropdown on
 * each Product/Solution — so wording/links can be updated globally instead
 * of hunting through every product.
 */

if (!defined('ABSPATH')) exit;

function batum_get_global_ctas() {
    $ctas = get_option('batum_global_ctas', []);
    return is_array($ctas) ? $ctas : [];
}

function batum_get_cta($key) {
    foreach (batum_get_global_ctas() as $cta) {
        if (($cta['key'] ?? '') === $key) return $cta;
    }
    return null;
}

/** Dropdown of configured CTAs, used on Product/Solution edit screens. */
function batum_render_cta_select($field_id, $post_id) {
    $selected = get_post_meta($post_id, $field_id, true);
    $ctas = batum_get_global_ctas();
    ?>
    <p>
        <select name="<?php echo esc_attr($field_id); ?>" class="widefat">
            <option value=""><?php _e('— None —', 'batum-core'); ?></option>
            <?php foreach ($ctas as $cta): ?>
                <option value="<?php echo esc_attr($cta['key']); ?>" <?php selected($selected, $cta['key']); ?>>
                    <?php echo esc_html($cta['label']); ?>
                </option>
            <?php endforeach; ?>
        </select>
        <?php if (!$ctas): ?>
            <span class="description"><?php printf(
                /* translators: %s: link to the CTA settings page */
                esc_html__('No CTAs configured yet — add some under %s.', 'batum-core'),
                '<a href="' . esc_url(admin_url('admin.php?page=batum-cta')) . '">' . esc_html__('BATUM CMS → CTA', 'batum-core') . '</a>'
            ); ?></span>
        <?php endif; ?>
    </p>
    <?php
}

function batum_cta_menu() {
    add_submenu_page('batum-cms', __('CTA', 'batum-core'), __('CTA', 'batum-core'), 'edit_others_posts', 'batum-cta', 'batum_render_cta_page');
}
add_action('admin_menu', 'batum_cta_menu', 20);

function batum_render_cta_page() {
    if (!current_user_can('edit_others_posts')) return;

    if (isset($_POST['batum_cta_save']) && check_admin_referer('batum_cta_save')) {
        $decoded = isset($_POST['batum_ctas_json']) ? json_decode(stripslashes($_POST['batum_ctas_json']), true) : [];
        if (!is_array($decoded)) $decoded = [];
        $clean = [];
        foreach ($decoded as $row) {
            $label = sanitize_text_field($row['label'] ?? '');
            if (!$label) continue;
            $clean[] = [
                'key' => sanitize_key($row['key'] ?: sanitize_title($label)),
                'label' => $label,
                'type' => in_array(($row['type'] ?? 'url'), ['url', 'email', 'phone'], true) ? $row['type'] : 'url',
                'target' => sanitize_text_field($row['target'] ?? '')
            ];
        }
        update_option('batum_global_ctas', $clean);
        echo '<div class="notice notice-success"><p>' . esc_html__('CTAs saved.', 'batum-core') . '</p></div>';
    }

    $ctas = batum_get_global_ctas();
    ?>
    <div class="wrap">
        <h1><?php _e('BATUM CTA', 'batum-core'); ?></h1>
        <p><?php _e('Define reusable Calls To Action here (Get Quote, Contact Us, Download Datasheet, Request Technical Support, Become Distributor, OEM/ODM Inquiry…). Each Product and Solution can then pick one from a dropdown. Type controls how "Target" is used: url = link, email = mailto:, phone = tel:.', 'batum-core'); ?></p>
        <form method="post">
            <?php wp_nonce_field('batum_cta_save'); ?>
            <table class="batum-repeater widefat" data-field="batum_ctas" data-columns="key,label,type,target">
                <thead>
                    <tr>
                        <th><?php _e('Key (auto if blank)', 'batum-core'); ?></th>
                        <th><?php _e('Label', 'batum-core'); ?></th>
                        <th><?php _e('Type (url / email / phone)', 'batum-core'); ?></th>
                        <th><?php _e('Target (URL, email address, or phone number)', 'batum-core'); ?></th>
                        <th></th>
                    </tr>
                </thead>
                <tbody class="batum-repeater-rows">
                    <?php foreach ($ctas as $cta): ?>
                        <tr>
                            <td><input type="text" class="widefat" data-key="key" value="<?php echo esc_attr($cta['key']); ?>"></td>
                            <td><input type="text" class="widefat" data-key="label" value="<?php echo esc_attr($cta['label']); ?>"></td>
                            <td><input type="text" class="widefat" data-key="type" value="<?php echo esc_attr($cta['type']); ?>"></td>
                            <td><input type="text" class="widefat" data-key="target" value="<?php echo esc_attr($cta['target']); ?>"></td>
                            <td><button type="button" class="button batum-repeater-remove">&times;</button></td>
                        </tr>
                    <?php endforeach; ?>
                </tbody>
            </table>
            <p><button type="button" class="button batum-repeater-add" data-field="batum_ctas"><?php _e('+ Add CTA', 'batum-core'); ?></button></p>
            <input type="hidden" name="batum_ctas_json" id="batum_ctas_json" value="<?php echo esc_attr(wp_json_encode($ctas)); ?>">
            <p><button type="submit" name="batum_cta_save" class="button button-primary"><?php _e('Save CTAs', 'batum-core'); ?></button></p>
        </form>
    </div>
    <?php
}

function batum_cta_admin_assets($hook) {
    if ($hook !== 'batum-cms_page_batum-cta') return;
    wp_enqueue_style('batum-core-admin', BATUM_CORE_URL . 'assets/css/admin.css', [], BATUM_CORE_VERSION);
    wp_enqueue_script('batum-core-repeater', BATUM_CORE_URL . 'assets/js/repeater.js', ['jquery'], BATUM_CORE_VERSION, true);
}
add_action('admin_enqueue_scripts', 'batum_cta_admin_assets');
