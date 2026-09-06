<?php
/**
 * Simple "card" content types staff can freely add/remove from wp-admin:
 * Solutions, Cases, Software Features, FAQ. Each is just title + content
 * (+ an optional icon for the first two) — no code changes needed to add
 * or remove an entry, matching the earlier request for freely editable
 * sections.
 */

if (!defined('ABSPATH')) exit;

function batum_register_content_block_cpts() {
    register_post_type('batum_solution', [
        'labels' => [
            'name' => __('Solutions', 'batum'),
            'singular_name' => __('Solution', 'batum'),
            'add_new_item' => __('Add New Solution', 'batum')
        ],
        'public' => true,
        'has_archive' => false,
        'rewrite' => ['slug' => 'solution'],
        'menu_icon' => 'dashicons-networking',
        'supports' => ['title', 'editor', 'page-attributes'],
        'show_in_rest' => true
    ]);

    register_post_type('batum_case', [
        'labels' => [
            'name' => __('Cases', 'batum'),
            'singular_name' => __('Case', 'batum'),
            'add_new_item' => __('Add New Case', 'batum')
        ],
        'public' => true,
        'has_archive' => false,
        'rewrite' => ['slug' => 'case'],
        'menu_icon' => 'dashicons-building',
        'supports' => ['title', 'editor', 'page-attributes'],
        'show_in_rest' => true
    ]);

    register_post_type('batum_software_feature', [
        'labels' => [
            'name' => __('Software Features', 'batum'),
            'singular_name' => __('Software Feature', 'batum'),
            'add_new_item' => __('Add New Software Feature', 'batum')
        ],
        'public' => true,
        'has_archive' => false,
        'rewrite' => ['slug' => 'software-feature'],
        'menu_icon' => 'dashicons-cloud',
        'supports' => ['title', 'editor', 'page-attributes'],
        'show_in_rest' => true
    ]);

    register_post_type('batum_faq', [
        'labels' => [
            'name' => __('FAQ', 'batum'),
            'singular_name' => __('FAQ Item', 'batum'),
            'add_new_item' => __('Add New FAQ Item', 'batum')
        ],
        'public' => true,
        'has_archive' => false,
        'rewrite' => ['slug' => 'faq-item'],
        'menu_icon' => 'dashicons-editor-help',
        'supports' => ['title', 'editor', 'page-attributes'],
        'show_in_rest' => true
    ]);
}
add_action('init', 'batum_register_content_block_cpts');

/** Icon meta box for Solutions and Cases (matches the icon set the theme ships CSS/dashicon mappings for). */
function batum_icon_meta_box() {
    foreach (['batum_solution', 'batum_case'] as $type) {
        add_meta_box('batum_icon', __('Icon', 'batum'), 'batum_render_icon_meta_box', $type, 'side', 'default');
    }
}
add_action('add_meta_boxes', 'batum_icon_meta_box');

function batum_icon_options() {
    return [
        'parking' => __('Parking', 'batum'),
        'transit' => __('Transit', 'batum'),
        'operator' => __('Door operator', 'batum'),
        'safety' => __('Safety', 'batum'),
        'building' => __('Building', 'batum'),
        'fast' => __('Fast lane', 'batum')
    ];
}

function batum_render_icon_meta_box($post) {
    wp_nonce_field('batum_icon_save', 'batum_icon_nonce');
    $current = get_post_meta($post->ID, '_batum_icon', true) ?: 'parking';
    foreach (batum_icon_options() as $value => $label) {
        printf(
            '<label style="display:block;margin-bottom:6px;"><input type="radio" name="batum_icon" value="%1$s" %2$s> %3$s</label>',
            esc_attr($value),
            checked($current, $value, false),
            esc_html($label)
        );
    }
}

function batum_save_icon_meta($post_id) {
    if (!isset($_POST['batum_icon_nonce']) || !wp_verify_nonce($_POST['batum_icon_nonce'], 'batum_icon_save')) return;
    if (!current_user_can('edit_post', $post_id)) return;
    if (isset($_POST['batum_icon'])) {
        update_post_meta($post_id, '_batum_icon', sanitize_key($_POST['batum_icon']));
    }
}
add_action('save_post_batum_solution', 'batum_save_icon_meta');
add_action('save_post_batum_case', 'batum_save_icon_meta');

function batum_icon_dashicon($icon) {
    $map = [
        'parking' => 'dashicons-car',
        'transit' => 'dashicons-migrate',
        'operator' => 'dashicons-door',
        'safety' => 'dashicons-shield-alt',
        'building' => 'dashicons-building',
        'fast' => 'dashicons-controls-forward'
    ];
    return $map[$icon] ?? 'dashicons-marker';
}
