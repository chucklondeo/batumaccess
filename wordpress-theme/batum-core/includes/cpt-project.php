<?php
if (!defined('ABSPATH')) exit;

function batum_register_project_cpt() {
    register_post_type('batum_project', [
        'labels' => [
            'name' => __('Projects', 'batum-core'),
            'singular_name' => __('Project', 'batum-core'),
            'add_new_item' => __('Add New Project', 'batum-core')
        ],
        'public' => true,
        'has_archive' => 'projects',
        'rewrite' => ['slug' => 'projects'],
        'menu_icon' => 'dashicons-location-alt',
        'show_in_menu' => 'batum-cms',
        'supports' => ['title', 'editor', 'thumbnail', 'revisions'],
        'show_in_rest' => true
    ]);
}
add_action('init', 'batum_register_project_cpt');

function batum_project_meta_boxes() {
    add_meta_box('batum_project_fields', __('Project Details', 'batum-core'), 'batum_render_project_box', 'batum_project', 'normal', 'high');
    add_meta_box('batum_project_gallery', __('Project Gallery', 'batum-core'), 'batum_render_project_gallery_box', 'batum_project', 'normal', 'default');
    add_meta_box('batum_project_related', __('Products Used', 'batum-core'), 'batum_render_project_related_box', 'batum_project', 'side', 'default');
}
add_action('add_meta_boxes', 'batum_project_meta_boxes');

function batum_render_project_box($post) {
    wp_nonce_field('batum_project_save', 'batum_project_nonce');
    $fields = [
        'batum_country' => ['label' => __('Country', 'batum-core'), 'type' => 'text'],
        'batum_city' => ['label' => __('City (optional — can stay anonymous, e.g. "a province in Zhejiang")', 'batum-core'), 'type' => 'text'],
        'batum_customer_type' => ['label' => __('Customer Type (e.g. "Highway Operator", anonymized if needed)', 'batum-core'), 'type' => 'text'],
        'batum_industry' => ['label' => __('Industry', 'batum-core'), 'type' => 'text'],
        'batum_quantity' => ['label' => __('Quantity', 'batum-core'), 'type' => 'text'],
        'batum_project_date' => ['label' => __('Project Date', 'batum-core'), 'type' => 'date'],
        'batum_problem' => ['label' => __('Problem', 'batum-core'), 'type' => 'textarea'],
        'batum_solution_text' => ['label' => __('Solution', 'batum-core'), 'type' => 'textarea'],
        'batum_result' => ['label' => __('Result', 'batum-core'), 'type' => 'textarea']
    ];
    foreach ($fields as $key => $field) {
        $value = get_post_meta($post->ID, "_$key", true);
        echo '<p><label for="' . esc_attr($key) . '"><strong>' . esc_html($field['label']) . '</strong></label><br>';
        if ($field['type'] === 'textarea') {
            echo '<textarea id="' . esc_attr($key) . '" name="' . esc_attr($key) . '" rows="3" class="widefat">' . esc_textarea($value) . '</textarea>';
        } else {
            echo '<input type="' . esc_attr($field['type']) . '" id="' . esc_attr($key) . '" name="' . esc_attr($key) . '" class="widefat" value="' . esc_attr($value) . '">';
        }
        echo '</p>';
    }
}

function batum_render_project_gallery_box($post) {
    batum_render_gallery_field('_batum_gallery', __('Project Photos', 'batum-core'), $post->ID);
    $video = get_post_meta($post->ID, '_batum_video_url', true);
    echo '<p><label for="batum_video_url"><strong>' . esc_html__('Video URL', 'batum-core') . '</strong></label><br>';
    echo '<input type="url" id="batum_video_url" name="batum_video_url" class="widefat" value="' . esc_attr($video) . '"></p>';
}

function batum_render_project_related_box($post) {
    batum_render_relation_field('_batum_related_products', __('Products Used', 'batum-core'), $post->ID, 'batum_product', $post->ID);
}

function batum_save_project_meta($post_id) {
    if (!isset($_POST['batum_project_nonce']) || !wp_verify_nonce($_POST['batum_project_nonce'], 'batum_project_save')) return;
    if (!current_user_can('edit_post', $post_id)) return;

    $text = ['batum_country', 'batum_city', 'batum_customer_type', 'batum_industry', 'batum_quantity', 'batum_project_date', 'batum_video_url'];
    foreach ($text as $key) {
        if (isset($_POST[$key])) update_post_meta($post_id, "_$key", sanitize_text_field($_POST[$key]));
    }
    $textarea = ['batum_problem', 'batum_solution_text', 'batum_result'];
    foreach ($textarea as $key) {
        if (isset($_POST[$key])) update_post_meta($post_id, "_$key", sanitize_textarea_field($_POST[$key]));
    }
    if (isset($_POST['_batum_gallery'])) update_post_meta($post_id, '_batum_gallery', sanitize_text_field($_POST['_batum_gallery']));
    batum_save_relation_field($post_id, '_batum_related_products');
}
add_action('save_post_batum_project', 'batum_save_project_meta');
