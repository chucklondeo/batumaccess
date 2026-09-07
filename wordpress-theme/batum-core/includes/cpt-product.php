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
        'show_in_menu' => 'batum-cms',
        'supports' => ['title', 'editor', 'excerpt', 'thumbnail', 'revisions'],
        'show_in_rest' => true
    ]);
}
add_action('init', 'batum_register_product_cpt');

add_action('admin_enqueue_scripts', function ($hook) {
    batum_enqueue_media_library($hook, ['batum_product', 'batum_solution', 'batum_project', 'batum_download', 'batum_faq']);
});

function batum_product_meta_boxes() {
    // Ordered to match the "5-10 minute product upload" flow: identity -> images -> features -> specs -> relations -> CTA.
    add_meta_box('batum_product_identity', __('1. Basic Information', 'batum-core'), 'batum_render_product_identity_box', 'batum_product', 'normal', 'high');
    add_meta_box('batum_product_media', __('2. Product Images, Video & Downloads', 'batum-core'), 'batum_render_product_media_box', 'batum_product', 'normal', 'high');
    add_meta_box('batum_product_features', __('3. Key Features', 'batum-core'), 'batum_render_product_features_box', 'batum_product', 'normal', 'high');
    add_meta_box('batum_product_specs', __('4. Technical Specifications', 'batum-core'), 'batum_render_product_specs_box', 'batum_product', 'normal', 'high');
    add_meta_box('batum_product_related', __('5. Related Products, Solutions & Downloads', 'batum-core'), 'batum_render_product_related_box', 'batum_product', 'side', 'default');
    add_meta_box('batum_product_faq', __('6. FAQ', 'batum-core'), 'batum_render_product_faq_box', 'batum_product', 'side', 'default');
    add_meta_box('batum_product_cta', __('7. Call To Action', 'batum-core'), 'batum_render_product_cta_box', 'batum_product', 'side', 'low');
}
add_action('add_meta_boxes', 'batum_product_meta_boxes');

function batum_render_product_identity_box($post) {
    wp_nonce_field('batum_product_save', 'batum_product_nonce');
    $short_name = get_post_meta($post->ID, '_batum_short_name', true);
    $model = get_post_meta($post->ID, '_batum_model', true);
    $highlights = get_post_meta($post->ID, '_batum_highlights', true);
    $certifications = get_post_meta($post->ID, '_batum_certifications', true);
    $featured = get_post_meta($post->ID, '_batum_featured', true);
    $new_product = get_post_meta($post->ID, '_batum_new_product', true);
    $hot_product = get_post_meta($post->ID, '_batum_hot_product', true);
    ?>
    <p>
        <label for="batum_short_name"><strong><?php _e('Short Product Name (for menus/cards)', 'batum-core'); ?></strong></label><br>
        <input type="text" id="batum_short_name" name="batum_short_name" class="widefat" value="<?php echo esc_attr($short_name); ?>">
    </p>
    <p>
        <label for="batum_model"><strong><?php _e('Model Number', 'batum-core'); ?></strong></label><br>
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
    <p>
        <label><input type="checkbox" name="batum_featured" value="1" <?php checked($featured, '1'); ?>> <?php _e('Featured Product', 'batum-core'); ?></label>
        &nbsp;&nbsp;
        <label><input type="checkbox" name="batum_new_product" value="1" <?php checked($new_product, '1'); ?>> <?php _e('New Product', 'batum-core'); ?></label>
        &nbsp;&nbsp;
        <label><input type="checkbox" name="batum_hot_product" value="1" <?php checked($hot_product, '1'); ?>> <?php _e('Hot Product', 'batum-core'); ?></label>
    </p>
    <p class="description"><?php _e('Product Category / Series are set in the boxes on the right. Excerpt = short description. Main editor below = full product description. Product Status = the normal Publish/Draft control. SEO title/description are managed by your SEO plugin (Rank Math), not here.', 'batum-core'); ?></p>
    <?php
}

function batum_render_product_media_box($post) {
    ?>
    <p><strong><?php _e('Main Product Image', 'batum-core'); ?></strong> — <?php _e('set via the Featured Image box on the right.', 'batum-core'); ?></p>
    <?php
    batum_render_gallery_field('_batum_gallery', __('Product Gallery', 'batum-core'), $post->ID);
    batum_render_gallery_field('_batum_application_images', __('Application Images', 'batum-core'), $post->ID);
    batum_render_gallery_field('_batum_installation_images', __('Installation Images', 'batum-core'), $post->ID);
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
    batum_render_file_field('_batum_cad_id', __('CAD / Dimensions Drawing', 'batum-core'), $post->ID);
    batum_render_file_field('_batum_certificate_id', __('Certificate PDF', 'batum-core'), $post->ID);
}

function batum_render_product_features_box($post) {
    batum_render_features_repeater('_batum_features', __('Title / Description / Icon — e.g. "24V Low Voltage Servo", "0.6 Second Opening"', 'batum-core'), $post->ID);
}

function batum_render_product_specs_box($post) {
    batum_render_specs_repeater('_batum_specs', __('Parameter / Value / Unit', 'batum-core'), $post->ID);
}

function batum_render_product_related_box($post) {
    batum_render_relation_field('_batum_related_products', __('Related Products', 'batum-core'), $post->ID, 'batum_product', $post->ID);
    batum_render_relation_field('_batum_related_solutions', __('Related Solutions', 'batum-core'), $post->ID, 'batum_solution', $post->ID);
    batum_render_relation_field('_batum_related_downloads', __('Related Downloads', 'batum-core'), $post->ID, 'batum_download', $post->ID);
}

function batum_render_product_faq_box($post) {
    batum_render_relation_field('_batum_related_faqs', __('FAQ shown on this product page', 'batum-core'), $post->ID, 'batum_faq', $post->ID);
}

function batum_render_product_cta_box($post) {
    batum_render_cta_select('_batum_cta', $post->ID);
}

function batum_save_product_meta($post_id) {
    if (!isset($_POST['batum_product_nonce']) || !wp_verify_nonce($_POST['batum_product_nonce'], 'batum_product_save')) return;
    if (defined('DOING_AUTOSAVE') && DOING_AUTOSAVE) return;
    if (!current_user_can('edit_post', $post_id)) return;

    $text_fields = ['batum_short_name' => '_batum_short_name', 'batum_model' => '_batum_model', 'batum_video_url' => '_batum_video_url'];
    foreach ($text_fields as $post_key => $meta_key) {
        if (isset($_POST[$post_key])) update_post_meta($post_id, $meta_key, sanitize_text_field($_POST[$post_key]));
    }

    $textarea_fields = ['batum_highlights' => '_batum_highlights', 'batum_certifications' => '_batum_certifications'];
    foreach ($textarea_fields as $post_key => $meta_key) {
        if (isset($_POST[$post_key])) update_post_meta($post_id, $meta_key, sanitize_textarea_field($_POST[$post_key]));
    }

    foreach (['batum_featured' => '_batum_featured', 'batum_new_product' => '_batum_new_product', 'batum_hot_product' => '_batum_hot_product'] as $post_key => $meta_key) {
        update_post_meta($post_id, $meta_key, isset($_POST[$post_key]) ? '1' : '');
    }

    foreach (['_batum_gallery', '_batum_application_images', '_batum_installation_images'] as $gallery_field) {
        if (isset($_POST[$gallery_field])) update_post_meta($post_id, $gallery_field, sanitize_text_field($_POST[$gallery_field]));
    }
    foreach (['_batum_datasheet_id', '_batum_manual_id', '_batum_cad_id', '_batum_certificate_id'] as $file_field) {
        if (isset($_POST[$file_field])) update_post_meta($post_id, $file_field, absint($_POST[$file_field]));
    }
    if (isset($_POST['_batum_cta'])) update_post_meta($post_id, '_batum_cta', sanitize_key($_POST['_batum_cta']));

    batum_save_specs_repeater($post_id, '_batum_specs');
    batum_save_specs_repeater($post_id, '_batum_features');
    batum_save_relation_field($post_id, '_batum_related_products');
    batum_save_relation_field($post_id, '_batum_related_solutions');
    batum_save_relation_field($post_id, '_batum_related_downloads');
    batum_save_relation_field($post_id, '_batum_related_faqs');
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
