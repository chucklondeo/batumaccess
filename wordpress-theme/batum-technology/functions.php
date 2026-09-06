<?php
if (!defined('ABSPATH')) exit;

require get_template_directory() . '/inc/theme-setup.php';

/**
 * The batum-core plugin owns all content types (Products, Solutions,
 * Projects, Downloads) and their fields. Warn in wp-admin if it's missing
 * or inactive instead of fataling on an undefined function somewhere in a
 * template.
 */
function batum_require_core_plugin_notice() {
    if (!function_exists('batum_get_specs_rows')) {
        echo '<div class="notice notice-error"><p>' . esc_html__('The batum-core plugin is not active. Activate it under Plugins — the theme depends on it for Products, Solutions, Projects and Downloads.', 'batum') . '</p></div>';
    }
}
add_action('admin_notices', 'batum_require_core_plugin_notice');
