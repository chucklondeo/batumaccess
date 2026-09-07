<?php
/**
 * Interface-only scaffold, per the brief: "先搭好接口，不要现在直接自动发布
 * 大量 AI 内容". Registers the cron hook NAMES so future automation code
 * (this session or a future AI-SEO integration) has somewhere to attach —
 * but nothing is scheduled (wp_schedule_event is never called here) and
 * every hook currently just logs "not implemented" and exits. Any content
 * a future automation adds must be created as post_status = draft for
 * admin review, never auto-published — enforced by batum_automation_log()
 * being the only thing these stub handlers currently do.
 */

if (!defined('ABSPATH')) exit;

define('BATUM_AUTOMATION_HOOKS', [
    'batum_daily_seo' => 'Check keyword rankings and flag SEO opportunities',
    'batum_content_refresh' => 'Flag articles older than 12 months for review',
    'batum_internal_link_check' => 'Recommend internal links based on Content Cluster/keyword/category',
    'batum_sitemap_check' => 'Verify the XML sitemap is reachable and submit it',
    'batum_broken_link_check' => 'Scan published content for broken internal links'
]);

function batum_automation_log($hook, $message) {
    $log = get_option('batum_automation_log', []);
    array_unshift($log, ['hook' => $hook, 'message' => $message, 'time' => current_time('mysql')]);
    update_option('batum_automation_log', array_slice($log, 0, 50));
}

function batum_automation_register_stub_handlers() {
    foreach (array_keys(BATUM_AUTOMATION_HOOKS) as $hook) {
        add_action($hook, function () use ($hook) {
            batum_automation_log($hook, __('Not implemented yet — this hook fired but has no automation logic attached.', 'batum-core'));
        });
    }
}
add_action('init', 'batum_automation_register_stub_handlers');

function batum_automation_menu() {
    add_submenu_page('batum-cms', __('Automation', 'batum-core'), __('Automation', 'batum-core'), 'manage_options', 'batum-automation', 'batum_render_automation_page');
}
add_action('admin_menu', 'batum_automation_menu', 20);

function batum_render_automation_page() {
    if (!current_user_can('manage_options')) return;

    if (isset($_POST['batum_automation_test_run']) && check_admin_referer('batum_automation_test_run')) {
        $hook = sanitize_key($_POST['batum_automation_test_run']);
        if (array_key_exists($hook, BATUM_AUTOMATION_HOOKS)) {
            do_action($hook);
            echo '<div class="notice notice-success"><p>' . esc_html(sprintf(__('Fired %s (logged below — no content was changed).', 'batum-core'), $hook)) . '</p></div>';
        }
    }

    $log = get_option('batum_automation_log', []);
    ?>
    <div class="wrap">
        <h1><?php _e('BATUM Automation Center', 'batum-core'); ?></h1>
        <p><?php _e('Interface only for now, by design: these hooks exist for future AI SEO automation (keyword checks, content refresh, internal linking, sitemap/broken-link checks) to attach to, but nothing is scheduled and nothing publishes automatically. Any future automation must create drafts for admin review, never publish directly.', 'batum-core'); ?></p>

        <table class="widefat striped">
            <thead><tr><th><?php _e('Hook', 'batum-core'); ?></th><th><?php _e('Purpose (future)', 'batum-core'); ?></th><th><?php _e('Schedule', 'batum-core'); ?></th><th></th></tr></thead>
            <tbody>
                <?php foreach (BATUM_AUTOMATION_HOOKS as $hook => $purpose): ?>
                    <tr>
                        <td><code><?php echo esc_html($hook); ?></code></td>
                        <td><?php echo esc_html($purpose); ?></td>
                        <td><?php echo wp_next_scheduled($hook) ? esc_html__('Scheduled', 'batum-core') : esc_html__('Not scheduled', 'batum-core'); ?></td>
                        <td>
                            <form method="post" style="margin:0;">
                                <?php wp_nonce_field('batum_automation_test_run'); ?>
                                <button type="submit" name="batum_automation_test_run" value="<?php echo esc_attr($hook); ?>" class="button"><?php _e('Fire now (test)', 'batum-core'); ?></button>
                            </form>
                        </td>
                    </tr>
                <?php endforeach; ?>
            </tbody>
        </table>

        <h2><?php _e('Automation Log', 'batum-core'); ?></h2>
        <?php if (!$log): ?>
            <p><em><?php _e('No automation has run yet.', 'batum-core'); ?></em></p>
        <?php else: ?>
            <table class="widefat striped">
                <thead><tr><th><?php _e('Time', 'batum-core'); ?></th><th><?php _e('Hook', 'batum-core'); ?></th><th><?php _e('Message', 'batum-core'); ?></th></tr></thead>
                <tbody>
                    <?php foreach ($log as $entry): ?>
                        <tr>
                            <td><?php echo esc_html($entry['time']); ?></td>
                            <td><code><?php echo esc_html($entry['hook']); ?></code></td>
                            <td><?php echo esc_html($entry['message']); ?></td>
                        </tr>
                    <?php endforeach; ?>
                </tbody>
            </table>
        <?php endif; ?>
    </div>
    <?php
}
