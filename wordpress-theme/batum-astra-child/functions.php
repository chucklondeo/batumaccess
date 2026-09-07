<?php
if (!defined('ABSPATH')) exit;

/**
 * Astra (parent theme) provides the header, footer, nav menu rendering and
 * general theme chrome — install and activate Astra first. This child theme
 * only overrides templates for the batum-core plugin's custom post types
 * (Products/Solutions/Projects/Downloads) and layers on the brand palette.
 */
function batum_child_enqueue_styles() {
    wp_enqueue_style('astra-theme-css', get_template_directory_uri() . '/style.css');
    wp_enqueue_style('batum-child-style', get_stylesheet_uri(), ['astra-theme-css'], '1.0.0');
}
add_action('wp_enqueue_scripts', 'batum_child_enqueue_styles');

/**
 * batum-core owns all content types and fields. Warn in wp-admin if it's
 * missing instead of fataling on an undefined function in a template.
 */
function batum_require_core_plugin_notice() {
    if (!function_exists('batum_get_specs_rows')) {
        echo '<div class="notice notice-error"><p>' . esc_html__('The batum-core plugin is not active. Activate it under Plugins — this theme depends on it for Products, Solutions, Projects and Downloads.', 'batum') . '</p></div>';
    }
}
add_action('admin_notices', 'batum_require_core_plugin_notice');

if (!defined('BATUM_INQUIRY_EMAIL')) {
    define('BATUM_INQUIRY_EMAIL', 'sales@batumaccess.com');
}

/**
 * Register theme UI strings with Polylang so editors can translate them
 * from Languages -> Translations in wp-admin.
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
