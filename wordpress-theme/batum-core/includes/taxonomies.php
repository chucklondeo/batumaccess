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

    register_taxonomy('industries', ['batum_product', 'batum_solution', 'batum_project'], [
        'labels' => ['name' => __('Industries', 'batum-core'), 'singular_name' => __('Industry', 'batum-core')],
        'public' => true,
        'hierarchical' => true,
        'rewrite' => ['slug' => 'industries'],
        'show_in_rest' => true
    ]);

    register_taxonomy('content_cluster', ['post', 'batum_product', 'batum_solution'], [
        'labels' => ['name' => __('Content Clusters', 'batum-core'), 'singular_name' => __('Content Cluster', 'batum-core')],
        'public' => true,
        'hierarchical' => false,
        'rewrite' => ['slug' => 'topic'],
        'show_in_rest' => true
    ]);
}
add_action('init', 'batum_register_taxonomies', 5);

/** Content Cluster term meta: which page is the pillar page for that cluster, so SEO automation can find it. */
function batum_register_content_cluster_term_meta() {
    register_term_meta('content_cluster', 'pillar_page_id', ['type' => 'integer', 'single' => true, 'show_in_rest' => true]);
}
add_action('init', 'batum_register_content_cluster_term_meta');

function batum_content_cluster_pillar_field($term) {
    $pillar_id = $term instanceof WP_Term ? get_term_meta($term->term_id, 'pillar_page_id', true) : '';
    $pillar_url = $pillar_id ? get_permalink($pillar_id) : '';
    ?>
    <tr class="form-field">
        <th scope="row"><label for="batum_pillar_page_id"><?php _e('Pillar Page ID', 'batum-core'); ?></label></th>
        <td>
            <input type="number" name="batum_pillar_page_id" id="batum_pillar_page_id" value="<?php echo esc_attr($pillar_id); ?>">
            <p class="description">
                <?php _e('Post/Page ID of this cluster\'s pillar page.', 'batum-core'); ?>
                <?php if ($pillar_url): ?><br><a href="<?php echo esc_url($pillar_url); ?>" target="_blank"><?php echo esc_html($pillar_url); ?></a><?php endif; ?>
            </p>
        </td>
    </tr>
    <?php
}
add_action('content_cluster_edit_form_fields', 'batum_content_cluster_pillar_field');
add_action('content_cluster_add_form_fields', function () {
    echo '<div class="form-field"><label for="batum_pillar_page_id">' . esc_html__('Pillar Page ID', 'batum-core') . '</label>';
    echo '<input type="number" name="batum_pillar_page_id" id="batum_pillar_page_id" value=""></div>';
});

function batum_save_content_cluster_pillar($term_id) {
    if (isset($_POST['batum_pillar_page_id'])) {
        update_term_meta($term_id, 'pillar_page_id', absint($_POST['batum_pillar_page_id']));
    }
}
add_action('created_content_cluster', 'batum_save_content_cluster_pillar');
add_action('edited_content_cluster', 'batum_save_content_cluster_pillar');

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

    $industries = [
        'highway' => 'Highway',
        'railway' => 'Railway',
        'metro' => 'Metro',
        'airport' => 'Airport',
        'smart-parking-industry' => 'Smart Parking',
        'commercial-building-industry' => 'Commercial Building',
        'industrial-automation-industry' => 'Industrial Automation',
        'transportation' => 'Transportation'
    ];
    foreach ($industries as $slug => $name) {
        if (!term_exists($slug, 'industries')) wp_insert_term($name, 'industries', ['slug' => $slug]);
    }
}
add_action('init', 'batum_seed_taxonomy_terms', 20);
