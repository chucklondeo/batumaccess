<?php
/**
 * Presentation-layer setup only. All content types, taxonomies, and custom
 * fields live in the batum-core plugin — see wordpress-theme/batum-core/ —
 * so switching themes later never loses data.
 */

if (!defined('ABSPATH')) exit;

if (!defined('BATUM_INQUIRY_EMAIL')) {
    define('BATUM_INQUIRY_EMAIL', 'sales@batumaccess.com');
}

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
    wp_enqueue_style('batum-style', get_stylesheet_uri(), [], '2.0.0');
    wp_enqueue_script('batum-theme', get_template_directory_uri() . '/assets/js/theme.js', [], '2.0.0', true);
}
add_action('wp_enqueue_scripts', 'batum_enqueue_assets');

/**
 * Shown if no menu has been assigned yet to Appearance -> Menus -> Primary
 * Menu, so the site is navigable immediately after theme activation. Mirrors
 * the requested IA (see docs/wordpress-migration/phase-2-architecture.md);
 * once a real menu is assigned in wp-admin, that menu takes over instead.
 */
function batum_default_menu_fallback() {
    $items = [
        home_url('/') => __('Home', 'batum'),
        get_post_type_archive_link('batum_product') ?: home_url('/products/') => __('Products', 'batum'),
        get_post_type_archive_link('batum_solution') ?: home_url('/solutions/') => __('Solutions', 'batum'),
        home_url('/technology/') => __('Technology', 'batum'),
        get_post_type_archive_link('batum_project') ?: home_url('/projects/') => __('Projects', 'batum'),
        get_post_type_archive_link('batum_download') ?: home_url('/downloads/') => __('Downloads', 'batum'),
        home_url('/blog/') => __('Blog', 'batum'),
        home_url('/about/') => __('About Batum', 'batum'),
        home_url('/contact/') => __('Contact', 'batum')
    ];
    echo '<ul class="main-nav-list">';
    foreach ($items as $url => $label) {
        printf('<li><a href="%s">%s</a></li>', esc_url($url), esc_html($label));
    }
    echo '</ul>';
}

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
        'Explore Products' => __('Explore Products', 'batum'),
        'Discover Technology' => __('Discover Technology', 'batum'),
        'Request Quote' => __('Request Quote', 'batum'),
        'Contact Engineer' => __('Contact Engineer', 'batum'),
        'Download Datasheet' => __('Download Datasheet', 'batum'),
        'Download Manual' => __('Download Manual', 'batum'),
        'Download CAD' => __('Download CAD', 'batum'),
        'Name' => __('Name', 'batum'),
        'Company' => __('Company', 'batum'),
        'Email' => __('Email', 'batum'),
        'WhatsApp' => __('WhatsApp', 'batum'),
        'Country' => __('Country', 'batum'),
        'Product' => __('Product', 'batum'),
        'Quantity' => __('Quantity', 'batum'),
        'Project Type' => __('Project Type', 'batum'),
        'Message' => __('Message', 'batum'),
        'Home' => __('Home', 'batum'),
        'Products' => __('Products', 'batum'),
        'Solutions' => __('Solutions', 'batum'),
        'Technology' => __('Technology', 'batum'),
        'Applications' => __('Applications', 'batum'),
        'Projects' => __('Projects', 'batum'),
        'Downloads' => __('Downloads', 'batum'),
        'Blog' => __('Blog', 'batum'),
        'About Batum' => __('About Batum', 'batum'),
        'Contact' => __('Contact', 'batum')
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
