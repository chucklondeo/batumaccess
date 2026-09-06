<?php
/**
 * Product custom post type: the main content editors add/remove from wp-admin.
 * Name = post title, summary = post excerpt, full description = post content,
 * featured image = product photo, category = product_category taxonomy term.
 */

if (!defined('ABSPATH')) exit;

function batum_register_product_cpt() {
    register_post_type('batum_product', [
        'labels' => [
            'name' => __('Products', 'batum'),
            'singular_name' => __('Product', 'batum'),
            'add_new_item' => __('Add New Product', 'batum'),
            'edit_item' => __('Edit Product', 'batum'),
            'all_items' => __('All Products', 'batum')
        ],
        'public' => true,
        'has_archive' => true,
        'rewrite' => ['slug' => 'products'],
        'menu_icon' => 'dashicons-shield',
        'supports' => ['title', 'editor', 'excerpt', 'thumbnail'],
        'show_in_rest' => true
    ]);

    register_taxonomy('product_category', 'batum_product', [
        'labels' => [
            'name' => __('Product Categories', 'batum'),
            'singular_name' => __('Product Category', 'batum')
        ],
        'public' => true,
        'hierarchical' => true,
        'rewrite' => ['slug' => 'product-category'],
        'show_in_rest' => true
    ]);
}
add_action('init', 'batum_register_product_cpt');

/**
 * Pre-create the four product categories used across the site so staff
 * pick from a dropdown instead of typing free text (matches the site's
 * fixed servo-barrier / door-operator / radar / accessory categories).
 */
function batum_seed_product_categories() {
    $terms = [
        'servo-barrier' => __('Servo Barrier', 'batum'),
        'door-operator' => __('Door Operator', 'batum'),
        'radar' => __('Radar', 'batum'),
        'accessory' => __('Accessories', 'batum')
    ];
    foreach ($terms as $slug => $label) {
        if (!term_exists($slug, 'product_category')) {
            wp_insert_term($label, 'product_category', ['slug' => $slug]);
        }
    }
}
add_action('init', 'batum_seed_product_categories', 20);

/** Ensure the media library JS is available for the datasheet picker below. */
function batum_enqueue_media_for_product($hook) {
    if (!in_array($hook, ['post.php', 'post-new.php'], true)) return;
    $screen = get_current_screen();
    if ($screen && $screen->post_type === 'batum_product') {
        wp_enqueue_media();
    }
}
add_action('admin_enqueue_scripts', 'batum_enqueue_media_for_product');

/** Meta box: specs (one per line), keywords, and the datasheet file. */
function batum_product_meta_box() {
    add_meta_box(
        'batum_product_details',
        __('Product Details', 'batum'),
        'batum_render_product_meta_box',
        'batum_product',
        'normal',
        'high'
    );
}
add_action('add_meta_boxes', 'batum_product_meta_box');

function batum_render_product_meta_box($post) {
    wp_nonce_field('batum_product_details_save', 'batum_product_details_nonce');
    $specs = get_post_meta($post->ID, '_batum_specs', true);
    $keywords = get_post_meta($post->ID, '_batum_keywords', true);
    $datasheet_id = get_post_meta($post->ID, '_batum_datasheet_id', true);
    $datasheet_url = $datasheet_id ? wp_get_attachment_url($datasheet_id) : '';
    ?>
    <p>
        <label for="batum_specs"><strong><?php _e('Specs (one per line, shown as a checklist)', 'batum'); ?></strong></label><br>
        <textarea id="batum_specs" name="batum_specs" rows="5" style="width:100%;"><?php echo esc_textarea($specs); ?></textarea>
    </p>
    <p>
        <label for="batum_keywords"><strong><?php _e('SEO keywords (comma separated)', 'batum'); ?></strong></label><br>
        <input type="text" id="batum_keywords" name="batum_keywords" value="<?php echo esc_attr($keywords); ?>" style="width:100%;">
    </p>
    <p>
        <label><strong><?php _e('Datasheet document', 'batum'); ?></strong></label><br>
        <input type="hidden" id="batum_datasheet_id" name="batum_datasheet_id" value="<?php echo esc_attr($datasheet_id); ?>">
        <button type="button" class="button" id="batum_datasheet_button"><?php _e('Select or upload file', 'batum'); ?></button>
        <button type="button" class="button" id="batum_datasheet_clear" <?php echo $datasheet_id ? '' : 'style="display:none;"'; ?>><?php _e('Remove', 'batum'); ?></button>
        <div id="batum_datasheet_preview" style="margin-top:8px;">
            <?php if ($datasheet_url): ?>
                <a href="<?php echo esc_url($datasheet_url); ?>" target="_blank"><?php echo esc_html(basename($datasheet_url)); ?></a>
            <?php endif; ?>
        </div>
    </p>
    <script>
    jQuery(function ($) {
        var frame;
        $('#batum_datasheet_button').on('click', function (e) {
            e.preventDefault();
            if (frame) { frame.open(); return; }
            frame = wp.media({ title: '<?php echo esc_js(__('Select datasheet', 'batum')); ?>', multiple: false });
            frame.on('select', function () {
                var att = frame.state().get('selection').first().toJSON();
                $('#batum_datasheet_id').val(att.id);
                $('#batum_datasheet_preview').html('<a href="' + att.url + '" target="_blank">' + att.filename + '</a>');
                $('#batum_datasheet_clear').show();
            });
            frame.open();
        });
        $('#batum_datasheet_clear').on('click', function (e) {
            e.preventDefault();
            $('#batum_datasheet_id').val('');
            $('#batum_datasheet_preview').html('');
            $(this).hide();
        });
    });
    </script>
    <?php
}

function batum_save_product_meta($post_id) {
    if (!isset($_POST['batum_product_details_nonce']) || !wp_verify_nonce($_POST['batum_product_details_nonce'], 'batum_product_details_save')) return;
    if (defined('DOING_AUTOSAVE') && DOING_AUTOSAVE) return;
    if (!current_user_can('edit_post', $post_id)) return;

    if (isset($_POST['batum_specs'])) {
        update_post_meta($post_id, '_batum_specs', sanitize_textarea_field($_POST['batum_specs']));
    }
    if (isset($_POST['batum_keywords'])) {
        update_post_meta($post_id, '_batum_keywords', sanitize_text_field($_POST['batum_keywords']));
    }
    if (isset($_POST['batum_datasheet_id'])) {
        update_post_meta($post_id, '_batum_datasheet_id', absint($_POST['batum_datasheet_id']));
    }
}
add_action('save_post_batum_product', 'batum_save_product_meta');

/** Helper: specs meta as an array, for templates. */
function batum_get_specs($post_id) {
    $raw = get_post_meta($post_id, '_batum_specs', true);
    if (!$raw) return [];
    return array_filter(array_map('trim', explode("\n", $raw)));
}
