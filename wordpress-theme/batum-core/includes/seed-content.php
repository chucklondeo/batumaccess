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
    if (isset($_POST['batum_pages_run']) && check_admin_referer('batum_pages_content')) {
        $result = batum_run_page_content_seed();
        echo '<div class="notice notice-success"><p>' . sprintf(esc_html__('Updated %1$d page(s), created %2$d new page(s).', 'batum-core'), $result['updated'], $result['created']) . '</p></div>';
    }
    if (isset($_POST['batum_translations_run']) && check_admin_referer('batum_translations_content')) {
        if (!function_exists('pll_set_post_language')) {
            echo '<div class="notice notice-error"><p>' . esc_html__('Polylang is not active — activate it and add languages first.', 'batum-core') . '</p></div>';
        } else {
            $result = batum_run_translation_seed();
            echo '<div class="notice notice-success"><p>' . sprintf(esc_html__('Created %1$d translated page(s) across %2$d configured language(s). Languages with no matching content in this tool were skipped.', 'batum-core'), $result['created'], $result['languages']) . '</p></div>';
        }
    }
    ?>
    <div class="wrap">
        <h1><?php _e('BATUM Seed Content', 'batum-core'); ?></h1>

        <h2><?php _e('1. Placeholder products', 'batum-core'); ?></h2>
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

        <hr style="margin:32px 0;">

        <h2><?php _e('2. Real page content (English)', 'batum-core'); ?></h2>
        <p><?php _e('Writes real copy into the About, Technology and Contact pages (creates them with the correct template if they don\'t exist yet, otherwise updates their content). Safe to run more than once.', 'batum-core'); ?></p>
        <form method="post">
            <?php wp_nonce_field('batum_pages_content'); ?>
            <p><button type="submit" name="batum_pages_run" class="button button-primary"><?php _e('Create / update About, Technology, Contact', 'batum-core'); ?></button></p>
        </form>

        <hr style="margin:32px 0;">

        <h2><?php _e('3. Translations (requires Polylang)', 'batum-core'); ?></h2>
        <p><?php _e('Creates the translated version of the About, Technology and Contact pages for each language you\'ve added in Polylang (Languages -> Languages), using the site\'s existing translations for Traditional Chinese, Spanish, Vietnamese, Malay, Thai, Japanese and Korean. When adding a language in Polylang, set its language code to exactly one of: zh-hant, es, vi, ms, th, ja, ko — that\'s what this tool matches against. Run step 2 first so the English originals exist to link translations to. Safe to run more than once — it skips a language/page pair that\'s already translated.', 'batum-core'); ?></p>
        <form method="post">
            <?php wp_nonce_field('batum_translations_content'); ?>
            <p><button type="submit" name="batum_translations_run" class="button button-primary"><?php _e('Create translated pages', 'batum-core'); ?></button></p>
        </form>
    </div>
    <?php
}

/** Step 2: create/update the About, Technology, Contact pages with real English copy. */
function batum_run_page_content_seed() {
    $created = 0;
    $updated = 0;
    foreach (batum_site_pages_en() as $slug => $page) {
        $existing = get_page_by_path($slug);
        if ($existing) {
            wp_update_post(['ID' => $existing->ID, 'post_content' => $page['content']]);
            if ($page['template'] !== 'default') update_post_meta($existing->ID, '_wp_page_template', $page['template']);
            $updated++;
            continue;
        }

        $post_id = wp_insert_post([
            'post_type' => 'page',
            'post_title' => $page['title'],
            'post_name' => $slug,
            'post_status' => 'publish',
            'post_content' => $page['content']
        ]);
        if (is_wp_error($post_id) || !$post_id) continue;
        if ($page['template'] !== 'default') update_post_meta($post_id, '_wp_page_template', $page['template']);
        $created++;
    }
    return ['created' => $created, 'updated' => $updated];
}

/** Step 3: create Polylang translations of those same pages for whichever languages are configured. */
function batum_run_translation_seed() {
    $created = 0;
    $configured_languages = function_exists('pll_languages_list') ? pll_languages_list() : [];
    $translations_by_locale = batum_site_pages_translations();
    $matched_languages = 0;

    foreach ($configured_languages as $lang_slug) {
        if (!isset($translations_by_locale[$lang_slug])) continue;
        $matched_languages++;

        foreach ($translations_by_locale[$lang_slug] as $slug => $page) {
            $english_page = get_page_by_path($slug);
            if (!$english_page) continue;

            $existing_translation_id = function_exists('pll_get_post') ? pll_get_post($english_page->ID, $lang_slug) : 0;
            if ($existing_translation_id) continue;

            $en_meta = get_post_meta($english_page->ID, '_wp_page_template', true);

            $post_id = wp_insert_post([
                'post_type' => 'page',
                'post_title' => $page['title'],
                'post_status' => 'publish',
                'post_content' => $page['content']
            ]);
            if (is_wp_error($post_id) || !$post_id) continue;

            if ($en_meta) update_post_meta($post_id, '_wp_page_template', $en_meta);
            pll_set_post_language($post_id, $lang_slug);
            $translations = pll_get_post_translations($english_page->ID);
            $translations[$lang_slug] = $post_id;
            pll_save_post_translations($translations);
            $created++;
        }
    }

    return ['created' => $created, 'languages' => $matched_languages];
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
