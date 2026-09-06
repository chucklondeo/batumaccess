<?php
if (!defined('ABSPATH')) exit;

function batum_register_taxonomies() {
    register_taxonomy('product_category', ['batum_product'], [
        'labels' => ['name' => __('Product Categories', 'batum-core'), 'singular_name' => __('Product Category', 'batum-core')],
        'public' => true,
        'hierarchical' => true,
        'rewrite' => ['slug' => 'products/category'],
        'show_in_rest' => true
    ]);

    register_taxonomy('product_series', ['batum_product'], [
        'labels' => ['name' => __('Product Series', 'batum-core'), 'singular_name' => __('Product Series', 'batum-core')],
        'public' => true,
        'hierarchical' => false,
        'rewrite' => ['slug' => 'products/series'],
        'show_in_rest' => true
    ]);

    register_taxonomy('applications', ['batum_product', 'batum_solution', 'batum_project'], [
        'labels' => ['name' => __('Applications', 'batum-core'), 'singular_name' => __('Application', 'batum-core')],
        'public' => true,
        'hierarchical' => true,
        'rewrite' => ['slug' => 'applications'],
        'show_in_rest' => true
    ]);

    register_taxonomy('download_category', ['batum_download'], [
        'labels' => ['name' => __('Download Categories', 'batum-core'), 'singular_name' => __('Download Category', 'batum-core')],
        'public' => true,
        'hierarchical' => true,
        'rewrite' => ['slug' => 'downloads/category'],
        'show_in_rest' => true
    ]);
}
add_action('init', 'batum_register_taxonomies', 5);

function batum_seed_taxonomy_terms() {
    $product_categories = [
        'barrier-gate-systems' => 'Barrier Gate Systems',
        'barrier-gate-controllers' => 'Barrier Gate Controllers',
        'barrier-gate-mechanisms' => 'Barrier Gate Mechanisms',
        'servo-motor-controllers' => 'Servo Motor Controllers',
        'pedestrian-gate-systems' => 'Pedestrian Gate Systems',
        'afc-gate-systems' => 'AFC Gate Systems',
        'rail-transit-systems' => 'Rail Transit Systems',
        'platform-screen-door-systems' => 'Platform Screen Door Systems',
        'automatic-door-controllers' => 'Automatic Door Controllers',
        'lpr-parking-systems' => 'LPR & Parking Systems',
        'customized-motion-control' => 'Customized Motion Control'
    ];
    foreach ($product_categories as $slug => $name) {
        if (!term_exists($slug, 'product_category')) wp_insert_term($name, 'product_category', ['slug' => $slug]);
    }

    $applications = [
        'highway-etc' => 'Highway ETC',
        'smart-parking' => 'Smart Parking',
        'commercial-parking' => 'Commercial Parking',
        'metro-afc' => 'Metro AFC',
        'rail-transit' => 'Rail Transit',
        'platform-screen-door' => 'Platform Screen Door',
        'airport-access' => 'Airport Access',
        'industrial-automation' => 'Industrial Automation',
        'commercial-building' => 'Commercial Building',
        'oem-odm' => 'OEM / ODM'
    ];
    foreach ($applications as $slug => $name) {
        if (!term_exists($slug, 'applications')) wp_insert_term($name, 'applications', ['slug' => $slug]);
    }

    $download_categories = [
        'datasheets' => 'Datasheets',
        'manuals' => 'Manuals',
        'catalogues' => 'Catalogues',
        'certificates' => 'Certificates',
        'cad-drawings' => 'CAD Drawings',
        'software' => 'Software',
        'firmware' => 'Firmware',
        'brochures' => 'Brochures'
    ];
    foreach ($download_categories as $slug => $name) {
        if (!term_exists($slug, 'download_category')) wp_insert_term($name, 'download_category', ['slug' => $slug]);
    }
}
add_action('init', 'batum_seed_taxonomy_terms', 20);
