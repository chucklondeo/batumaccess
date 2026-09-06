<?php
if (!defined('ABSPATH')) exit;

define('BATUM_INQUIRY_EMAIL', 'sales@batumaccess.com');

function batum_theme_setup() {
    add_theme_support('title-tag');
    add_theme_support('post-thumbnails');
    add_theme_support('html5', ['search-form', 'comment-form', 'comment-list', 'gallery', 'caption']);

    register_nav_menus([
        'primary' => __('Primary Menu', 'batum')
    ]);

    load_theme_textdomain('batum', get_template_directory() . '/languages');
}
add_action('after_setup_theme', 'batum_theme_setup');

function batum_enqueue_assets() {
    wp_enqueue_style('dashicons');
    wp_enqueue_style('batum-style', get_stylesheet_uri(), [], '1.0.0');
    wp_enqueue_script('batum-theme', get_template_directory_uri() . '/assets/js/theme.js', [], '1.0.0', true);
}
add_action('wp_enqueue_scripts', 'batum_enqueue_assets');

/**
 * Register theme UI strings with Polylang so editors can translate them
 * from Languages -> Translations in wp-admin, instead of the theme
 * hardcoding every language in PHP. Polylang's per-language content model
 * (a separate translated post/page per language) is the normal workflow —
 * see wordpress-theme/README.md for the setup walkthrough.
 */
function batum_register_polylang_strings() {
    if (!function_exists('pll_register_string')) return;
    $strings = [
        'Submit Inquiry' => __('Submit Inquiry', 'batum'),
        'View Products' => __('View Products', 'batum'),
        'Download datasheet' => __('Download datasheet', 'batum'),
        'Name' => __('Name', 'batum'),
        'Company' => __('Company', 'batum'),
        'Email' => __('Email', 'batum'),
        'WhatsApp' => __('WhatsApp', 'batum'),
        'Country' => __('Country', 'batum'),
        'Interested product' => __('Interested product', 'batum'),
        'Project requirements' => __('Project requirements', 'batum'),
        'Home' => __('Home', 'batum'),
        'Solutions' => __('Solutions', 'batum'),
        'Products' => __('Products', 'batum'),
        'Cases' => __('Cases', 'batum'),
        'Software' => __('Software', 'batum'),
        'About' => __('About', 'batum'),
        'Contact' => __('Contact', 'batum'),
        'FAQ' => __('FAQ', 'batum')
    ];
    foreach ($strings as $name => $value) {
        pll_register_string($name, $value, 'Batum Technology theme');
    }
}
add_action('init', 'batum_register_polylang_strings');

/** pll__() falls back to plain text if Polylang isn't active, so templates can call this unconditionally. */
function batum_str($text) {
    return function_exists('pll__') ? pll__($text) : $text;
}

/**
 * Make the custom post types translatable in Polylang (Languages ->
 * Settings -> Custom post types).
 */
function batum_polylang_post_types($post_types) {
    foreach (['batum_product', 'batum_solution', 'batum_case', 'batum_software_feature', 'batum_faq'] as $type) {
        $post_types[$type] = $type;
    }
    return $post_types;
}
add_filter('pll_get_post_types', 'batum_polylang_post_types');

function batum_polylang_taxonomies($taxonomies) {
    $taxonomies['product_category'] = 'product_category';
    return $taxonomies;
}
add_filter('pll_get_taxonomies', 'batum_polylang_taxonomies');
