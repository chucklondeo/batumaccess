<?php
/**
 * Baseline hardening: XML-RPC is off (this site publishes through
 * wp-admin/REST, not the XML-RPC API), and repeated failed logins are
 * throttled. REST write-permission hardening for BATUM's own custom meta
 * lives in rest-api.php (auth_callback per field) — this file only covers
 * things that apply site-wide.
 */

if (!defined('ABSPATH')) exit;

add_filter('xmlrpc_enabled', '__return_false');

define('BATUM_LOGIN_MAX_ATTEMPTS', 5);
define('BATUM_LOGIN_LOCKOUT_SECONDS', 900); // 15 minutes

function batum_login_lockout_key($identifier) {
    return 'batum_login_attempts_' . md5($identifier);
}

function batum_check_login_lockout($user, $username, $password) {
    if (empty($username)) return $user;
    $ip = isset($_SERVER['REMOTE_ADDR']) ? sanitize_text_field($_SERVER['REMOTE_ADDR']) : 'unknown';
    $key = batum_login_lockout_key($ip . '|' . $username);
    $attempts = (int) get_transient($key);
    if ($attempts >= BATUM_LOGIN_MAX_ATTEMPTS) {
        return new WP_Error('batum_locked_out', __('<strong>Error:</strong> too many failed login attempts. Please try again in 15 minutes.', 'batum-core'));
    }
    return $user;
}
add_filter('authenticate', 'batum_check_login_lockout', 30, 3);

function batum_record_failed_login($username) {
    $ip = isset($_SERVER['REMOTE_ADDR']) ? sanitize_text_field($_SERVER['REMOTE_ADDR']) : 'unknown';
    $key = batum_login_lockout_key($ip . '|' . $username);
    $attempts = (int) get_transient($key);
    set_transient($key, $attempts + 1, BATUM_LOGIN_LOCKOUT_SECONDS);
}
add_action('wp_login_failed', 'batum_record_failed_login');

function batum_clear_login_lockout($username) {
    $ip = isset($_SERVER['REMOTE_ADDR']) ? sanitize_text_field($_SERVER['REMOTE_ADDR']) : 'unknown';
    delete_transient(batum_login_lockout_key($ip . '|' . $username));
}
add_action('wp_login', 'batum_clear_login_lockout');
