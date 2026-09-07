<?php
if (!defined('ABSPATH')) exit;

/**
 * FAQ is its own CPT (not just the [batum_faq] shortcode from schema.php) so
 * one FAQ entry can be written once and reused across a Product, a Solution
 * and a Blog article, per the brief's "后台可以重复利用 FAQ" requirement.
 */
function batum_register_faq_cpt() {
    register_post_type('batum_faq', [
        'labels' => [
            'name' => __('FAQ', 'batum-core'),
            'singular_name' => __('FAQ', 'batum-core'),
            'add_new_item' => __('Add New FAQ', 'batum-core'),
            'edit_item' => __('Edit FAQ', 'batum-core'),
            'all_items' => __('FAQ', 'batum-core')
        ],
        'public' => true,
        'has_archive' => false,
        'rewrite' => ['slug' => 'faq'],
        'menu_icon' => 'dashicons-editor-help',
        'show_in_menu' => 'batum-cms',
        'supports' => ['title', 'revisions'],
        'show_in_rest' => true
    ]);
}
add_action('init', 'batum_register_faq_cpt');

function batum_register_faq_taxonomy() {
    register_taxonomy('faq_category', ['batum_faq'], [
        'labels' => ['name' => __('FAQ Categories', 'batum-core'), 'singular_name' => __('FAQ Category', 'batum-core')],
        'public' => true,
        'hierarchical' => true,
        'rewrite' => ['slug' => 'faq/category'],
        'show_in_rest' => true
    ]);
}
add_action('init', 'batum_register_faq_taxonomy', 5);

function batum_seed_faq_categories() {
    $categories = ['general' => 'General', 'technical' => 'Technical', 'installation' => 'Installation', 'shipping-warranty' => 'Shipping & Warranty'];
    foreach ($categories as $slug => $name) {
        if (!term_exists($slug, 'faq_category')) wp_insert_term($name, 'faq_category', ['slug' => $slug]);
    }
}
add_action('init', 'batum_seed_faq_categories', 20);

function batum_faq_meta_box() {
    add_meta_box('batum_faq_fields', __('Answer & Relations', 'batum-core'), 'batum_render_faq_box', 'batum_faq', 'normal', 'high');
}
add_action('add_meta_boxes', 'batum_faq_meta_box');

function batum_render_faq_box($post) {
    wp_nonce_field('batum_faq_save', 'batum_faq_nonce');
    $answer = get_post_meta($post->ID, '_batum_faq_answer', true);
    ?>
    <p class="description"><?php _e('The post title is the Question. Write the Answer below.', 'batum-core'); ?></p>
    <p>
        <label for="batum_faq_answer"><strong><?php _e('Answer', 'batum-core'); ?></strong></label><br>
        <textarea id="batum_faq_answer" name="batum_faq_answer" rows="4" class="widefat"><?php echo esc_textarea($answer); ?></textarea>
    </p>
    <p class="description"><?php _e('The relations below are for browsing/filtering the FAQ list only. To make an FAQ actually appear on a Product/Solution/Article page, add it from the "FAQ" box on that page\'s own edit screen instead.', 'batum-core'); ?></p>
    <?php
    batum_render_relation_field('_batum_related_product', __('Related Product (for reference)', 'batum-core'), $post->ID, 'batum_product', $post->ID);
    batum_render_relation_field('_batum_related_solution', __('Related Solution (for reference)', 'batum-core'), $post->ID, 'batum_solution', $post->ID);
    batum_render_relation_field('_batum_related_article', __('Related Article (for reference)', 'batum-core'), $post->ID, 'post', $post->ID);
}

function batum_save_faq_meta($post_id) {
    if (!isset($_POST['batum_faq_nonce']) || !wp_verify_nonce($_POST['batum_faq_nonce'], 'batum_faq_save')) return;
    if (!current_user_can('edit_post', $post_id)) return;
    if (isset($_POST['batum_faq_answer'])) update_post_meta($post_id, '_batum_faq_answer', sanitize_textarea_field($_POST['batum_faq_answer']));
    batum_save_relation_field($post_id, '_batum_related_product');
    batum_save_relation_field($post_id, '_batum_related_solution');
    batum_save_relation_field($post_id, '_batum_related_article');
}
add_action('save_post_batum_faq', 'batum_save_faq_meta');

/**
 * Get the published FAQ posts picked in the "FAQ" box on a Product,
 * Solution or Article's own edit screen (_batum_related_faqs, an array of
 * FAQ post IDs — the same relation field pattern as Related Products).
 * Used for both front-end display and the FAQPage schema in schema.php.
 *
 * The FAQ CPT also has its own _batum_related_product/_batum_related_solution/
 * _batum_related_article fields (set from the FAQ's own edit screen) — those
 * are kept purely as editorial metadata for filtering/browsing the FAQ list
 * and are NOT read here, so there is exactly one source of truth for what
 * appears on a given page: the FAQ box on that page's own edit screen.
 */
function batum_get_related_faqs($post_id) {
    $faq_ids = get_post_meta($post_id, '_batum_related_faqs', true);
    if (!is_array($faq_ids) || !$faq_ids) return [];
    return get_posts([
        'post_type' => 'batum_faq',
        'post_status' => 'publish',
        'posts_per_page' => -1,
        'post__in' => array_map('absint', $faq_ids),
        'orderby' => 'post__in'
    ]);
}
