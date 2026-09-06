<?php
/**
 * Product schema JSON-LD. Rank Math already covers Organization, WebSite,
 * Article and Breadcrumb schema — this only fills the one gap Rank Math's
 * free tier doesn't handle per post type out of the box: Product schema on
 * single product pages. No price/offer fields are output — this is a B2B
 * inquiry site, not e-commerce, so an Offer block would be inaccurate.
 */

if (!defined('ABSPATH')) exit;

function batum_output_product_schema() {
    if (!is_singular('batum_product')) return;
    $post_id = get_the_ID();
    $categories = get_the_terms($post_id, 'product_category');
    $category_name = ($categories && !is_wp_error($categories)) ? $categories[0]->name : '';

    $schema = [
        '@context' => 'https://schema.org',
        '@type' => 'Product',
        'name' => get_the_title($post_id),
        'description' => get_the_excerpt($post_id) ?: wp_strip_all_tags(get_the_content(null, false, $post_id)),
        'url' => get_permalink($post_id),
        'category' => $category_name,
        'manufacturer' => [
            '@type' => 'Organization',
            'name' => get_bloginfo('name'),
            'url' => home_url('/')
        ]
    ];

    $image_id = get_post_thumbnail_id($post_id);
    if ($image_id) $schema['image'] = wp_get_attachment_url($image_id);

    $model = get_post_meta($post_id, '_batum_model', true);
    if ($model) $schema['model'] = $model;

    echo '<script type="application/ld+json">' . wp_json_encode($schema) . '</script>' . "\n";
}
add_action('wp_head', 'batum_output_product_schema');

/**
 * FAQ schema shortcode: [batum_faq q="Question" a="Answer text"] — wrap a
 * group in [batum_faq_group]...[/batum_faq_group] to emit one FAQPage block
 * covering every question inside it.
 */
function batum_faq_group_shortcode($atts, $content = null) {
    global $batum_faq_items;
    $batum_faq_items = [];
    $rendered = do_shortcode($content);
    if ($batum_faq_items) {
        $schema = [
            '@context' => 'https://schema.org',
            '@type' => 'FAQPage',
            'mainEntity' => array_map(function ($item) {
                return [
                    '@type' => 'Question',
                    'name' => $item['q'],
                    'acceptedAnswer' => ['@type' => 'Answer', 'text' => $item['a']]
                ];
            }, $batum_faq_items)
        ];
        $rendered .= '<script type="application/ld+json">' . wp_json_encode($schema) . '</script>';
    }
    $batum_faq_items = [];
    return $rendered;
}
add_shortcode('batum_faq_group', 'batum_faq_group_shortcode');

function batum_faq_item_shortcode($atts) {
    global $batum_faq_items;
    $atts = shortcode_atts(['q' => '', 'a' => ''], $atts);
    if (is_array($batum_faq_items)) $batum_faq_items[] = $atts;
    return '<div class="glass-card batum-faq-item"><h3>' . esc_html($atts['q']) . '</h3><p>' . esc_html($atts['a']) . '</p></div>';
}
add_shortcode('batum_faq', 'batum_faq_item_shortcode');
