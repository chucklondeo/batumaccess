<?php
/**
 * One-click placeholder content: Tools -> BATUM Seed Content. Creates the
 * 14 named products from the brief as draft posts with placeholder specs,
 * so the site architecture and templates can be reviewed end-to-end before
 * the site owner replaces the placeholder text/specs/images per product.
 * Skips any product whose title already exists, so it's safe to click more
 * than once.
 */

if (!defined('ABSPATH')) exit;

function batum_seed_menu() {
    add_management_page(__('BATUM Seed Content', 'batum-core'), __('BATUM Seed Content', 'batum-core'), 'manage_options', 'batum-seed-content', 'batum_render_seed_page');
}
add_action('admin_menu', 'batum_seed_menu');

function batum_placeholder_products() {
    return [
        ['title' => '24V Low Voltage Servo Controller', 'category' => 'servo-motor-controllers'],
        ['title' => 'Fast Speed Barrier Gate', 'category' => 'barrier-gate-systems'],
        ['title' => 'ETC Highway Barrier Gate', 'category' => 'barrier-gate-systems'],
        ['title' => 'Parking Barrier Gate', 'category' => 'barrier-gate-systems'],
        ['title' => 'Servo Barrier Gate Mechanism', 'category' => 'barrier-gate-mechanisms'],
        ['title' => 'Automatic Door Servo Controller', 'category' => 'automatic-door-controllers'],
        ['title' => 'Pedestrian Speed Gate', 'category' => 'pedestrian-gate-systems'],
        ['title' => 'Swing Barrier / Flap Barrier', 'category' => 'pedestrian-gate-systems'],
        ['title' => 'AFC Gate Mechanism', 'category' => 'afc-gate-systems'],
        ['title' => 'Direct Drive Servo Gate Mechanism', 'category' => 'barrier-gate-mechanisms'],
        ['title' => 'Platform Screen Door / PSD Drive System', 'category' => 'platform-screen-door-systems'],
        ['title' => 'Rail Transit Door Control System', 'category' => 'rail-transit-systems'],
        ['title' => 'LPR / Smart Parking Solutions', 'category' => 'lpr-parking-systems'],
        ['title' => 'Customized Servo Motion Control Solutions', 'category' => 'customized-motion-control']
    ];
}

function batum_render_seed_page() {
    if (!current_user_can('manage_options')) return;

    if (isset($_POST['batum_seed_run']) && check_admin_referer('batum_seed_content')) {
        $created = batum_run_seed();
        echo '<div class="notice notice-success"><p>' . sprintf(esc_html__('Created %d placeholder product(s). Existing products with the same title were left untouched.', 'batum-core'), $created) . '</p></div>';
    }
    ?>
    <div class="wrap">
        <h1><?php _e('BATUM Seed Content', 'batum-core'); ?></h1>
        <p><?php _e('Creates the 14 products named in the site brief as drafts, each with a placeholder description and a couple of placeholder spec rows, so the Products archive/single templates can be reviewed before real content is written. Safe to run more than once — it skips titles that already exist.', 'batum-core'); ?></p>
        <ul style="list-style:disc;margin-left:20px;">
            <?php foreach (batum_placeholder_products() as $p): ?>
                <li><?php echo esc_html($p['title']); ?></li>
            <?php endforeach; ?>
        </ul>
        <form method="post">
            <?php wp_nonce_field('batum_seed_content'); ?>
            <p><button type="submit" name="batum_seed_run" class="button button-primary"><?php _e('Create placeholder products', 'batum-core'); ?></button></p>
        </form>
    </div>
    <?php
}

function batum_run_seed() {
    $created = 0;
    foreach (batum_placeholder_products() as $item) {
        $existing = get_posts([
            'post_type' => 'batum_product',
            'title' => $item['title'],
            'post_status' => 'any',
            'posts_per_page' => 1,
            'fields' => 'ids'
        ]);
        if ($existing) continue;

        $post_id = wp_insert_post([
            'post_type' => 'batum_product',
            'post_title' => $item['title'],
            'post_status' => 'draft',
            'post_excerpt' => sprintf('Placeholder short description for %s — replace with real copy before publishing.', $item['title']),
            'post_content' => sprintf('<p>Placeholder full description for %s. Replace with real product copy, engineering detail and application context before publishing.</p>', $item['title'])
        ]);
        if (is_wp_error($post_id) || !$post_id) continue;

        wp_set_object_terms($post_id, [$item['category']], 'product_category');
        update_post_meta($post_id, '_batum_model', 'TBD');
        update_post_meta($post_id, '_batum_highlights', "Placeholder highlight 1\nPlaceholder highlight 2\nPlaceholder highlight 3");
        update_post_meta($post_id, '_batum_specs', wp_json_encode([
            ['parameter' => 'Rated Voltage', 'value' => '24', 'unit' => 'VDC'],
            ['parameter' => 'Cycle Life', 'value' => 'TBD', 'unit' => 'cycles'],
            ['parameter' => 'Protection Rating', 'value' => 'TBD', 'unit' => '']
        ]));
        $created++;
    }
    return $created;
}
