<?php
if (!defined('ABSPATH')) exit;

function batum_core_polylang_post_types($post_types) {
    foreach (['batum_product', 'batum_solution', 'batum_project', 'batum_download'] as $type) {
        $post_types[$type] = $type;
    }
    return $post_types;
}
add_filter('pll_get_post_types', 'batum_core_polylang_post_types');

function batum_core_polylang_taxonomies($taxonomies) {
    foreach (['product_category', 'product_series', 'applications', 'download_category'] as $tax) {
        $taxonomies[$tax] = $tax;
    }
    return $taxonomies;
}
add_filter('pll_get_taxonomies', 'batum_core_polylang_taxonomies');
