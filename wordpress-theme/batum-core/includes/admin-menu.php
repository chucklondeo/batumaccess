<?php
/**
 * One top-level "BATUM CMS" menu instead of a dozen scattered top-level
 * items, so someone with no WordPress background can find everything in
 * one place. Products/Solutions/Projects/Downloads/FAQ are nested here via
 * 'show_in_menu' => 'batum-cms' on their own register_post_type() calls;
 * this file adds the parent menu + Dashboard page, nests native Posts in
 * here too (relabelled "Blog / SEO Content"), and registers the submenu
 * order. Media Library is deliberately left in its default top-level
 * location — moving it risks confusing other plugins/workflows that expect
 * it there, and it isn't BATUM-specific content.
 */

if (!defined('ABSPATH')) exit;

function batum_register_cms_menu() {
    add_menu_page(
        __('BATUM CMS', 'batum-core'),
        __('BATUM CMS', 'batum-core'),
        'edit_posts',
        'batum-cms',
        'batum_render_cms_dashboard',
        'dashicons-admin-multisite',
        3
    );
    // Overwrite the auto-generated first submenu item so it reads "Dashboard" instead of repeating "BATUM CMS".
    add_submenu_page('batum-cms', __('Dashboard', 'batum-core'), __('Dashboard', 'batum-core'), 'edit_posts', 'batum-cms', 'batum_render_cms_dashboard');
}
add_action('admin_menu', 'batum_register_cms_menu', 5);

/**
 * Nest the native Posts screen under BATUM CMS and relabel it to "Blog /
 * SEO Content". WordPress core builds the top-level Posts/Pages menu
 * separately from the generic post-type loop that honors a CPT's
 * 'show_in_menu' argument, so that argument has no effect on 'post' — the
 * reliable way to relocate it is to hide the default top-level entry and
 * add a new submenu item pointing at the same edit.php screen.
 */
function batum_relocate_posts_menu() {
    remove_menu_page('edit.php');
    add_submenu_page('batum-cms', __('Blog / SEO Content', 'batum-core'), __('Blog / SEO Content', 'batum-core'), 'edit_posts', 'edit.php');
}
add_action('admin_menu', 'batum_relocate_posts_menu', 15);

function batum_render_cms_dashboard() {
    if (!current_user_can('edit_posts')) return;

    $counts = [
        __('Products', 'batum-core') => wp_count_posts('batum_product')->publish ?? 0,
        __('Solutions', 'batum-core') => wp_count_posts('batum_solution')->publish ?? 0,
        __('Projects / Cases', 'batum-core') => wp_count_posts('batum_project')->publish ?? 0,
        __('SEO Articles', 'batum-core') => wp_count_posts('post')->publish ?? 0,
        __('Draft Articles', 'batum-core') => wp_count_posts('post')->draft ?? 0
    ];

    $recent_products = get_posts(['post_type' => 'batum_product', 'posts_per_page' => 5, 'orderby' => 'modified', 'order' => 'DESC']);
    $recent_articles = get_posts(['post_type' => 'post', 'posts_per_page' => 5, 'orderby' => 'modified', 'order' => 'DESC']);
    ?>
    <div class="wrap">
        <h1><?php _e('BATUM CMS Dashboard', 'batum-core'); ?></h1>

        <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(180px,1fr));gap:16px;margin:20px 0;">
            <?php foreach ($counts as $label => $value): ?>
                <div style="background:#fff;border:1px solid #ccd0d4;border-radius:6px;padding:16px;">
                    <div style="font-size:28px;font-weight:700;"><?php echo (int) $value; ?></div>
                    <div style="color:#646970;"><?php echo esc_html($label); ?></div>
                </div>
            <?php endforeach; ?>
        </div>

        <p style="display:flex;flex-wrap:wrap;gap:8px;margin-bottom:32px;">
            <a class="button button-primary" href="<?php echo esc_url(admin_url('post-new.php?post_type=batum_product')); ?>"><?php _e('+ Add Product', 'batum-core'); ?></a>
            <a class="button" href="<?php echo esc_url(admin_url('post-new.php?post_type=batum_solution')); ?>"><?php _e('+ Add Solution', 'batum-core'); ?></a>
            <a class="button" href="<?php echo esc_url(admin_url('post-new.php?post_type=batum_project')); ?>"><?php _e('+ Add Case', 'batum-core'); ?></a>
            <a class="button" href="<?php echo esc_url(admin_url('post-new.php')); ?>"><?php _e('+ Write SEO Article', 'batum-core'); ?></a>
            <a class="button" href="<?php echo esc_url(admin_url('post-new.php?post_type=batum_download')); ?>"><?php _e('+ Upload Download', 'batum-core'); ?></a>
            <a class="button" href="<?php echo esc_url(admin_url('admin.php?page=batum-seo-center')); ?>"><?php _e('View SEO Issues', 'batum-core'); ?></a>
        </p>

        <div style="display:grid;grid-template-columns:1fr 1fr;gap:32px;">
            <div>
                <h2><?php _e('Recently Updated Products', 'batum-core'); ?></h2>
                <ul>
                    <?php foreach ($recent_products as $product): ?>
                        <li><a href="<?php echo esc_url(get_edit_post_link($product->ID)); ?>"><?php echo esc_html(get_the_title($product)); ?></a> — <?php echo esc_html(get_the_modified_date('', $product)); ?></li>
                    <?php endforeach; ?>
                    <?php if (!$recent_products): ?><li><em><?php _e('No products yet.', 'batum-core'); ?></em></li><?php endif; ?>
                </ul>
            </div>
            <div>
                <h2><?php _e('Recent Articles', 'batum-core'); ?></h2>
                <ul>
                    <?php foreach ($recent_articles as $article): ?>
                        <li><a href="<?php echo esc_url(get_edit_post_link($article->ID)); ?>"><?php echo esc_html(get_the_title($article)); ?></a> — <?php echo esc_html(get_the_modified_date('', $article)); ?></li>
                    <?php endforeach; ?>
                    <?php if (!$recent_articles): ?><li><em><?php _e('No articles yet.', 'batum-core'); ?></em></li><?php endif; ?>
                </ul>
            </div>
        </div>

        <p style="margin-top:24px;"><a href="<?php echo esc_url(admin_url('admin.php?page=batum-seo-center')); ?>"><?php _e('Full SEO Center report →', 'batum-core'); ?></a></p>
    </div>
    <?php
}
