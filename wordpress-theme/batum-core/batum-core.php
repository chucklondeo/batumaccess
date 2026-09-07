<?php
/**
 * Plugin Name: BATUM Core
 * Description: Business logic for BATUM Technology — Products, Solutions, Projects, Downloads, taxonomies, custom fields and REST/Schema support. No page builder or ACF dependency, so content survives a theme change.
 * Version: 1.1.0
 * Author: Batum Technology
 * Text Domain: batum-core
 */

if (!defined('ABSPATH')) exit;

define('BATUM_CORE_PATH', plugin_dir_path(__FILE__));
define('BATUM_CORE_URL', plugin_dir_url(__FILE__));
define('BATUM_CORE_VERSION', '1.1.0');
define('BATUM_INQUIRY_EMAIL', 'sales@batumaccess.com');

require BATUM_CORE_PATH . 'includes/field-helpers.php';
require BATUM_CORE_PATH . 'includes/cta.php';
require BATUM_CORE_PATH . 'includes/taxonomies.php';
require BATUM_CORE_PATH . 'includes/cpt-product.php';
require BATUM_CORE_PATH . 'includes/cpt-solution.php';
require BATUM_CORE_PATH . 'includes/cpt-project.php';
require BATUM_CORE_PATH . 'includes/cpt-download.php';
require BATUM_CORE_PATH . 'includes/cpt-faq.php';
require BATUM_CORE_PATH . 'includes/blog-seo.php';
require BATUM_CORE_PATH . 'includes/schema.php';
require BATUM_CORE_PATH . 'includes/polylang.php';
require BATUM_CORE_PATH . 'includes/admin-menu.php';
require BATUM_CORE_PATH . 'includes/admin-dashboard.php';
require BATUM_CORE_PATH . 'includes/global-settings.php';
require BATUM_CORE_PATH . 'includes/seo-center.php';
require BATUM_CORE_PATH . 'includes/automation.php';
require BATUM_CORE_PATH . 'includes/user-roles.php';
require BATUM_CORE_PATH . 'includes/security.php';
require BATUM_CORE_PATH . 'includes/rest-api.php';
require BATUM_CORE_PATH . 'includes/site-content.php';
require BATUM_CORE_PATH . 'includes/seed-content.php';

function batum_core_flush_rewrite() {
    // registers run on 'init' via the required files above; flush once more on activation
    // so /products/, /solutions/, /projects/, /downloads/, /faq/ archives resolve immediately.
    flush_rewrite_rules();
}
register_activation_hook(__FILE__, 'batum_core_flush_rewrite');
register_deactivation_hook(__FILE__, 'flush_rewrite_rules');

/**
 * Re-uploading the plugin's files (instead of deactivate/delete/reinstall)
 * never fires register_activation_hook, so new post types/taxonomies added
 * in an update (e.g. FAQ, Industries) would 404 until someone manually
 * visits Settings -> Permalinks and clicks Save. This flushes automatically,
 * once, the first time an updated version is detected.
 */
function batum_core_maybe_flush_on_update() {
    if (get_option('batum_core_version') !== BATUM_CORE_VERSION) {
        flush_rewrite_rules();
        update_option('batum_core_version', BATUM_CORE_VERSION);
    }
}
add_action('init', 'batum_core_maybe_flush_on_update', 999);

function batum_core_enqueue_admin_assets($hook) {
    $screen = get_current_screen();
    if (!$screen || strpos($screen->post_type, 'batum_') !== 0) return;
    wp_enqueue_style('batum-core-admin', BATUM_CORE_URL . 'assets/css/admin.css', [], BATUM_CORE_VERSION);
    wp_enqueue_script('batum-core-repeater', BATUM_CORE_URL . 'assets/js/repeater.js', ['jquery'], BATUM_CORE_VERSION, true);
}
add_action('admin_enqueue_scripts', 'batum_core_enqueue_admin_assets');
