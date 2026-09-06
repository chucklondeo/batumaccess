<?php
/**
 * Plugin Name: BATUM Core
 * Description: Business logic for BATUM Technology — Products, Solutions, Projects, Downloads, taxonomies, custom fields and REST/Schema support. No page builder or ACF dependency, so content survives a theme change.
 * Version: 1.0.0
 * Author: Batum Technology
 * Text Domain: batum-core
 */

if (!defined('ABSPATH')) exit;

define('BATUM_CORE_PATH', plugin_dir_path(__FILE__));
define('BATUM_CORE_URL', plugin_dir_url(__FILE__));
define('BATUM_INQUIRY_EMAIL', 'sales@batumaccess.com');

require BATUM_CORE_PATH . 'includes/field-helpers.php';
require BATUM_CORE_PATH . 'includes/taxonomies.php';
require BATUM_CORE_PATH . 'includes/cpt-product.php';
require BATUM_CORE_PATH . 'includes/cpt-solution.php';
require BATUM_CORE_PATH . 'includes/cpt-project.php';
require BATUM_CORE_PATH . 'includes/cpt-download.php';
require BATUM_CORE_PATH . 'includes/schema.php';
require BATUM_CORE_PATH . 'includes/polylang.php';
require BATUM_CORE_PATH . 'includes/admin-dashboard.php';
require BATUM_CORE_PATH . 'includes/seed-content.php';

function batum_core_flush_rewrite() {
    // registers run on 'init' via the required files above; flush once more on activation
    // so /products/, /solutions/, /projects/, /downloads/ archives resolve immediately.
    flush_rewrite_rules();
}
register_activation_hook(__FILE__, 'batum_core_flush_rewrite');
register_deactivation_hook(__FILE__, 'flush_rewrite_rules');

function batum_core_enqueue_admin_assets($hook) {
    $screen = get_current_screen();
    if (!$screen || strpos($screen->post_type, 'batum_') !== 0) return;
    wp_enqueue_style('batum-core-admin', BATUM_CORE_URL . 'assets/css/admin.css', [], '1.0.0');
    wp_enqueue_script('batum-core-repeater', BATUM_CORE_URL . 'assets/js/repeater.js', ['jquery'], '1.0.0', true);
}
add_action('admin_enqueue_scripts', 'batum_core_enqueue_admin_assets');
