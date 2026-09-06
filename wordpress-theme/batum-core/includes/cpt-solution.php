<?php
if (!defined('ABSPATH')) exit;

function batum_register_solution_cpt() {
    register_post_type('batum_solution', [
        'labels' => [
            'name' => __('Solutions', 'batum-core'),
            'singular_name' => __('Solution', 'batum-core'),
            'add_new_item' => __('Add New Solution', 'batum-core')
        ],
        'public' => true,
        'has_archive' => 'solutions',
        'rewrite' => ['slug' => 'solutions'],
        'menu_icon' => 'dashicons-networking',
        'menu_position' => 6,
        'supports' => ['title', 'editor', 'excerpt', 'thumbnail', 'revisions'],
        'show_in_rest' => true
    ]);
}
add_action('init', 'batum_register_solution_cpt');

function batum_solution_meta_boxes() {
    add_meta_box('batum_solution_fields', __('Solution Details', 'batum-core'), 'batum_render_solution_box', 'batum_solution', 'normal', 'high');
    add_meta_box('batum_solution_related', __('Recommended Products', 'batum-core'), 'batum_render_solution_related_box', 'batum_solution', 'side', 'default');
}
add_action('add_meta_boxes', 'batum_solution_meta_boxes');

function batum_render_solution_box($post) {
    wp_nonce_field('batum_solution_save', 'batum_solution_nonce');
    $fields = [
        'batum_challenge' => __('The Challenge', 'batum-core'),
        'batum_approach' => __('The BATUM Solution', 'batum-core'),
        'batum_architecture' => __('System Architecture (describe or paste an image shortcode)', 'batum-core'),
        'batum_advantages' => __('Advantages (one per line)', 'batum-core')
    ];
    foreach ($fields as $key => $label) {
        $value = get_post_meta($post->ID, "_$key", true);
        echo '<p><label for="' . esc_attr($key) . '"><strong>' . esc_html($label) . '</strong></label><br>';
        echo '<textarea id="' . esc_attr($key) . '" name="' . esc_attr($key) . '" rows="3" class="widefat">' . esc_textarea($value) . '</textarea></p>';
    }
    echo '<p class="description">' . esc_html__('The excerpt field above is used for the solution card summary shown on the Solutions listing page.', 'batum-core') . '</p>';
}

function batum_render_solution_related_box($post) {
    batum_render_relation_field('_batum_related_products', __('Recommended Products', 'batum-core'), $post->ID, 'batum_product', $post->ID);
}

function batum_save_solution_meta($post_id) {
    if (!isset($_POST['batum_solution_nonce']) || !wp_verify_nonce($_POST['batum_solution_nonce'], 'batum_solution_save')) return;
    if (!current_user_can('edit_post', $post_id)) return;
    foreach (['batum_challenge', 'batum_approach', 'batum_architecture', 'batum_advantages'] as $key) {
        if (isset($_POST[$key])) update_post_meta($post_id, "_$key", sanitize_textarea_field($_POST[$key]));
    }
    batum_save_relation_field($post_id, '_batum_related_products');
}
add_action('save_post_batum_solution', 'batum_save_solution_meta');
