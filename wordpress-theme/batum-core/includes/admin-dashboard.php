<?php
/**
 * A single "BATUM Dashboard" widget with the counts and quick-add links
 * the brief asked for, without a full role-management build-out (deferred
 * per docs/wordpress-migration/phase-2-architecture.md until real staff
 * accounts exist).
 */

if (!defined('ABSPATH')) exit;

function batum_add_dashboard_widget() {
    wp_add_dashboard_widget('batum_dashboard', __('BATUM Dashboard', 'batum-core'), 'batum_render_dashboard_widget');
}
add_action('wp_dashboard_setup', 'batum_add_dashboard_widget');

function batum_render_dashboard_widget() {
    $counts = [
        'batum_product' => __('Products', 'batum-core'),
        'batum_solution' => __('Solutions', 'batum-core'),
        'batum_project' => __('Projects', 'batum-core'),
        'batum_download' => __('Downloads', 'batum-core'),
        'post' => __('Blog Posts', 'batum-core')
    ];
    echo '<ul style="margin:0;">';
    foreach ($counts as $type => $label) {
        $count = wp_count_posts($type);
        $published = $count->publish ?? 0;
        $drafts = $count->draft ?? 0;
        printf(
            '<li>%s: <strong>%d</strong> published, %d draft</li>',
            esc_html($label),
            (int) $published,
            (int) $drafts
        );
    }
    echo '</ul>';
    echo '<p style="margin-top:12px;display:flex;flex-wrap:wrap;gap:8px;">';
    $quick_links = [
        'post-new.php?post_type=batum_product' => __('+ Add Product', 'batum-core'),
        'post-new.php?post_type=batum_project' => __('+ Add Project', 'batum-core'),
        'post-new.php?post_type=batum_download' => __('+ Add Download', 'batum-core'),
        'post-new.php' => __('+ Add Blog Article', 'batum-core')
    ];
    foreach ($quick_links as $path => $label) {
        printf('<a class="button" href="%s">%s</a>', esc_url(admin_url($path)), esc_html($label));
    }
    echo '</p>';
}
