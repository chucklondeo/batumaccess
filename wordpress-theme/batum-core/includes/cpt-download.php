<?php
if (!defined('ABSPATH')) exit;

function batum_register_download_cpt() {
    register_post_type('batum_download', [
        'labels' => [
            'name' => __('Downloads', 'batum-core'),
            'singular_name' => __('Download', 'batum-core'),
            'add_new_item' => __('Add New Download', 'batum-core')
        ],
        'public' => true,
        'has_archive' => 'downloads',
        'rewrite' => ['slug' => 'downloads'],
        'menu_icon' => 'dashicons-media-document',
        'show_in_menu' => 'batum-cms',
        'supports' => ['title', 'editor', 'revisions'],
        'show_in_rest' => true
    ]);
}
add_action('init', 'batum_register_download_cpt');

function batum_download_meta_box() {
    add_meta_box('batum_download_fields', __('File & Related Product', 'batum-core'), 'batum_render_download_box', 'batum_download', 'normal', 'high');
}
add_action('add_meta_boxes', 'batum_download_meta_box');

function batum_render_download_box($post) {
    wp_nonce_field('batum_download_save', 'batum_download_nonce');
    batum_render_file_field('_batum_download_file_id', __('File', 'batum-core'), $post->ID);
    batum_render_relation_field('_batum_related_products', __('Related Product', 'batum-core'), $post->ID, 'batum_product', $post->ID);
}

function batum_save_download_meta($post_id) {
    if (!isset($_POST['batum_download_nonce']) || !wp_verify_nonce($_POST['batum_download_nonce'], 'batum_download_save')) return;
    if (!current_user_can('edit_post', $post_id)) return;
    if (isset($_POST['_batum_download_file_id'])) update_post_meta($post_id, '_batum_download_file_id', absint($_POST['_batum_download_file_id']));
    batum_save_relation_field($post_id, '_batum_related_products');
}
add_action('save_post_batum_download', 'batum_save_download_meta');
