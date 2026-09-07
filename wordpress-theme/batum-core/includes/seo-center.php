<?php
/**
 * A read-only audit page. Everything here is computed live from the
 * database on page load — nothing is cached or scheduled, so counts are
 * always current but this page should not be embedded/polled frequently.
 */

if (!defined('ABSPATH')) exit;

function batum_seo_center_menu() {
    add_submenu_page('batum-cms', __('SEO Center', 'batum-core'), __('SEO Center', 'batum-core'), 'edit_others_posts', 'batum-seo-center', 'batum_render_seo_center_page');
}
add_action('admin_menu', 'batum_seo_center_menu', 20);

function batum_seo_center_stats() {
    $stats = [];
    $stats['products'] = wp_count_posts('batum_product')->publish ?? 0;
    $stats['solutions'] = wp_count_posts('batum_solution')->publish ?? 0;
    $stats['projects'] = wp_count_posts('batum_project')->publish ?? 0;
    $stats['articles'] = wp_count_posts('post')->publish ?? 0;
    $stats['draft_articles'] = wp_count_posts('post')->draft ?? 0;

    $articles_missing_title = 0;
    $articles_missing_description = 0;
    $articles = get_posts(['post_type' => 'post', 'post_status' => 'publish', 'posts_per_page' => -1, 'fields' => 'ids']);
    foreach ($articles as $article_id) {
        if (!batum_get_seo_title($article_id)) $articles_missing_title++;
        if (!batum_get_seo_description($article_id)) $articles_missing_description++;
    }
    $stats['articles_missing_title'] = $articles_missing_title;
    $stats['articles_missing_description'] = $articles_missing_description;

    $products_missing_description = 0;
    $products = get_posts(['post_type' => 'batum_product', 'post_status' => 'publish', 'posts_per_page' => -1, 'fields' => 'ids']);
    foreach ($products as $product_id) {
        if (!has_excerpt($product_id) && !batum_get_seo_description($product_id)) $products_missing_description++;
    }
    $stats['products_missing_description'] = $products_missing_description;

    global $wpdb;
    $missing_alt = (int) $wpdb->get_var("
        SELECT COUNT(p.ID) FROM {$wpdb->posts} p
        LEFT JOIN {$wpdb->postmeta} pm ON pm.post_id = p.ID AND pm.meta_key = '_wp_attachment_image_alt'
        WHERE p.post_type = 'attachment' AND p.post_mime_type LIKE 'image/%'
        AND (pm.meta_value IS NULL OR pm.meta_value = '')
    ");
    $stats['missing_alt'] = $missing_alt;

    $stats['recent'] = get_posts(['post_type' => ['post', 'batum_product', 'batum_solution', 'batum_project'], 'posts_per_page' => 8, 'orderby' => 'modified', 'order' => 'DESC']);

    return $stats;
}

function batum_render_seo_center_page() {
    if (!current_user_can('edit_others_posts')) return;
    $stats = batum_seo_center_stats();
    ?>
    <div class="wrap">
        <h1><?php _e('BATUM SEO Center', 'batum-core'); ?></h1>
        <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(200px,1fr));gap:16px;margin:20px 0;">
            <?php
            $cards = [
                __('Products', 'batum-core') => $stats['products'],
                __('Solutions', 'batum-core') => $stats['solutions'],
                __('Projects / Cases', 'batum-core') => $stats['projects'],
                __('SEO Articles', 'batum-core') => $stats['articles'],
                __('Draft Articles', 'batum-core') => $stats['draft_articles']
            ];
            foreach ($cards as $label => $value): ?>
                <div style="background:#fff;border:1px solid #ccd0d4;border-radius:6px;padding:16px;">
                    <div style="font-size:28px;font-weight:700;"><?php echo (int) $value; ?></div>
                    <div style="color:#646970;"><?php echo esc_html($label); ?></div>
                </div>
            <?php endforeach; ?>
        </div>

        <h2><?php _e('SEO Issues', 'batum-core'); ?></h2>
        <table class="widefat striped">
            <tbody>
                <tr><td><?php _e('Articles without SEO Title', 'batum-core'); ?></td><td><strong><?php echo (int) $stats['articles_missing_title']; ?></strong></td></tr>
                <tr><td><?php _e('Articles without Meta Description', 'batum-core'); ?></td><td><strong><?php echo (int) $stats['articles_missing_description']; ?></strong></td></tr>
                <tr><td><?php _e('Products without SEO/short description', 'batum-core'); ?></td><td><strong><?php echo (int) $stats['products_missing_description']; ?></strong></td></tr>
                <tr><td><?php _e('Images missing ALT text', 'batum-core'); ?></td><td><strong><?php echo (int) $stats['missing_alt']; ?></strong></td></tr>
                <tr><td><?php _e('Broken internal links', 'batum-core'); ?></td><td><em><?php _e('Not yet implemented — planned for the Automation phase.', 'batum-core'); ?></em></td></tr>
                <tr><td><?php _e('Orphan pages', 'batum-core'); ?></td><td><em><?php _e('Not yet implemented — planned for the Automation phase.', 'batum-core'); ?></em></td></tr>
            </tbody>
        </table>
        <p class="description"><?php _e('SEO Title / Meta Description are read from Rank Math (or Yoast, if that\'s active instead) when set.', 'batum-core'); ?></p>

        <h2><?php _e('Recently Updated Content', 'batum-core'); ?></h2>
        <table class="widefat striped">
            <thead><tr><th><?php _e('Title', 'batum-core'); ?></th><th><?php _e('Type', 'batum-core'); ?></th><th><?php _e('Last Updated', 'batum-core'); ?></th></tr></thead>
            <tbody>
                <?php foreach ($stats['recent'] as $item): ?>
                    <tr>
                        <td><a href="<?php echo esc_url(get_edit_post_link($item->ID)); ?>"><?php echo esc_html(get_the_title($item)); ?></a></td>
                        <td><?php echo esc_html(get_post_type_object($item->post_type)->labels->singular_name); ?></td>
                        <td><?php echo esc_html(get_the_modified_date('', $item)); ?></td>
                    </tr>
                <?php endforeach; ?>
            </tbody>
        </table>
    </div>
    <?php
}
