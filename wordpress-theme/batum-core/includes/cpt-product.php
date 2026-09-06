<?php
if (!defined('ABSPATH')) exit;

function batum_register_product_cpt() {
    register_post_type('batum_product', [
        'labels' => [
            'name' => __('Products', 'batum-core'),
            'singular_name' => __('Product', 'batum-core'),
            'add_new_item' => __('Add New Product', 'batum-core'),
            'edit_item' => __('Edit Product', 'batum-core'),
            'all_items' => __('All Products', 'batum-core')
        ],
        'public' => true,
        'has_archive' => 'products',
        'rewrite' => ['slug' => 'products'],
        'menu_icon' => 'dashicons-shield',
        'menu_position' => 5,
        'supports' => ['title', 'editor', 'excerpt', 'thumbnail', 'revisions'],
        'show_in_rest' => true
    ]);
}
add_action('init', 'batum_register_product_cpt');

add_action('admin_enqueue_scripts', function ($hook) {
    batum_enqueue_media_library($hook, ['batum_product', 'batum_solution', 'batum_project', 'batum_download']);
});

function batum_product_meta_boxes() {
    add_meta_box('batum_product_identity', __('Model & Highlights', 'batum-core'), 'batum_render_product_identity_box', 'batum_product', 'normal', 'high');
    add_meta_box('batum_product_media', __('Gallery, Video & Downloads', 'batum-core'), 'batum_render_product_media_box', 'batum_product', 'normal', 'high');
    add_meta_box('batum_product_specs', __('Technical Specifications', 'batum-core'), 'batum_render_product_specs_box', 'batum_product', 'normal', 'high');
    add_meta_box('batum_product_related', __('Related Products & Solutions', 'batum-core'), 'batum_render_product_related_box', 'batum_product', 'side', 'default');
}
add_action('add_meta_boxes', 'batum_product_meta_boxes');

function batum_render_product_identity_box($post) {
    wp_nonce_field('batum_product_save', 'batum_product_nonce');
    $model = get_post_meta($post->ID, '_batum_model', true);
    $highlights = get_post_meta($post->ID, '_batum_highlights', true);
    $certifications = get_post_meta($post->ID, '_batum_certifications', true);
    ?>
    <p>
        <label for="batum_model"><strong><?php _e('Model', 'batum-core'); ?></strong></label><br>
        <input type="text" id="batum_model" name="batum_model" class="widefat" value="<?php echo esc_attr($model); ?>">
    </p>
    <p>
        <label for="batum_highlights"><strong><?php _e('Highlights (one per line)', 'batum-core'); ?></strong></label><br>
        <textarea id="batum_highlights" name="batum_highlights" rows="4" class="widefat"><?php echo esc_textarea($highlights); ?></textarea>
    </p>
    <p>
        <label for="batum_certifications"><strong><?php _e('Certifications (one per line)', 'batum-core'); ?></strong></label><br>
        <textarea id="batum_certifications" name="batum_certifications" rows="3" class="widefat"><?php echo esc_textarea($certifications); ?></textarea>
    </p>
    <p class="description"><?php _e('Excerpt = short description. Main editor below = full product description. SEO title/description are managed by your SEO plugin (Rank Math), not here.', 'batum-core'); ?></p>
    <?php
}

function batum_render_product_media_box($post) {
    batum_render_gallery_field('_batum_gallery', __('Product Gallery', 'batum-core'), $post->ID);
    $video = get_post_meta($post->ID, '_batum_video_url', true);
    ?>
    <p>
        <label for="batum_video_url"><strong><?php _e('YouTube Video URL', 'batum-core'); ?></strong></label><br>
        <input type="url" id="batum_video_url" name="batum_video_url" class="widefat" value="<?php echo esc_attr($video); ?>" placeholder="https://youtube.com/watch?v=...">
    </p>
    <hr>
    <?php
    batum_render_file_field('_batum_datasheet_id', __('Datasheet PDF', 'batum-core'), $post->ID);
    batum_render_file_field('_batum_manual_id', __('Installation Manual PDF', 'batum-core'), $post->ID);
    batum_render_file_field('_batum_cad_id', __('CAD Drawing', 'batum-core'), $post->ID);
}

function batum_render_product_specs_box($post) {
    batum_render_specs_repeater('_batum_specs', __('Parameter / Value / Unit', 'batum-core'), $post->ID);
}

function batum_render_product_related_box($post) {
    batum_render_relation_field('_batum_related_products', __('Related Products', 'batum-core'), $post->ID, 'batum_product', $post->ID);
    batum_render_relation_field('_batum_related_solutions', __('Related Solutions', 'batum-core'), $post->ID, 'batum_solution', $post->ID);
}

function batum_save_product_meta($post_id) {
    if (!isset($_POST['batum_product_nonce']) || !wp_verify_nonce($_POST['batum_product_nonce'], 'batum_product_save')) return;
    if (defined('DOING_AUTOSAVE') && DOING_AUTOSAVE) return;
    if (!current_user_can('edit_post', $post_id)) return;

    $text_fields = ['batum_model' => '_batum_model', 'batum_video_url' => '_batum_video_url'];
    foreach ($text_fields as $post_key => $meta_key) {
        if (isset($_POST[$post_key])) update_post_meta($post_id, $meta_key, sanitize_text_field($_POST[$post_key]));
    }

    $textarea_fields = ['batum_highlights' => '_batum_highlights', 'batum_certifications' => '_batum_certifications'];
    foreach ($textarea_fields as $post_key => $meta_key) {
        if (isset($_POST[$post_key])) update_post_meta($post_id, $meta_key, sanitize_textarea_field($_POST[$post_key]));
    }

    if (isset($_POST['_batum_gallery'])) update_post_meta($post_id, '_batum_gallery', sanitize_text_field($_POST['_batum_gallery']));
    if (isset($_POST['_batum_datasheet_id'])) update_post_meta($post_id, '_batum_datasheet_id', absint($_POST['_batum_datasheet_id']));
    if (isset($_POST['_batum_manual_id'])) update_post_meta($post_id, '_batum_manual_id', absint($_POST['_batum_manual_id']));
    if (isset($_POST['_batum_cad_id'])) update_post_meta($post_id, '_batum_cad_id', absint($_POST['_batum_cad_id']));

    batum_save_specs_repeater($post_id, '_batum_specs');
    batum_save_relation_field($post_id, '_batum_related_products');
    batum_save_relation_field($post_id, '_batum_related_solutions');
}
add_action('save_post_batum_product', 'batum_save_product_meta');

/** Helpers for templates. */
function batum_get_gallery_ids($post_id) {
    $raw = get_post_meta($post_id, '_batum_gallery', true);
    return $raw ? array_filter(array_map('trim', explode(',', $raw))) : [];
}

function batum_get_lines($post_id, $meta_key) {
    $raw = get_post_meta($post_id, $meta_key, true);
    return $raw ? array_filter(array_map('trim', explode("\n", $raw))) : [];
}
