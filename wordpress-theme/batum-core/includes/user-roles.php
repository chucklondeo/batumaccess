<?php
/**
 * Four roles cloned from Editor's capability set (so none of them can
 * install/activate plugins, switch themes, or reach Settings — those all
 * require manage_options/install_plugins/edit_theme_options, which Editor
 * doesn't have and these roles don't add). This is a coarser separation
 * than the brief's "Product Manager can only touch Products" — WordPress
 * only supports that level of precision by giving each CPT its own
 * capability_type (edit_batum_products, etc.) and explicitly granting those
 * capabilities to every role, including Administrator. That's a real
 * change to how permissions are checked across the whole plugin, so it's
 * deliberately deferred until it can be tested against the live site
 * (an incorrect grant there risks locking the admin account out of content
 * it already owns). For now, all four roles can edit every BATUM content
 * type but cannot touch plugins/themes/settings/users — see the CMS
 * development report for how to tighten this further later. Roles are left
 * in place on plugin deactivation/removal (harmless if unused) rather than
 * removed automatically, so a temporary deactivation never silently changes
 * what an already-assigned user can do.
 */

if (!defined('ABSPATH')) exit;

function batum_core_role_definitions() {
    return [
        'batum_product_manager' => __('Product Manager', 'batum-core'),
        'batum_seo_manager' => __('SEO Manager', 'batum-core'),
        'batum_content_editor' => __('Content Editor', 'batum-core'),
        'batum_sales' => __('Sales', 'batum-core')
    ];
}

function batum_core_sync_roles() {
    $editor = get_role('editor');
    $base_caps = $editor ? $editor->capabilities : ['read' => true, 'edit_posts' => true, 'edit_published_posts' => true, 'publish_posts' => true, 'upload_files' => true, 'delete_posts' => true];

    foreach (batum_core_role_definitions() as $role_key => $label) {
        remove_role($role_key);
        $caps = $base_caps;

        if ($role_key === 'batum_sales') {
            // Sales can view/read everything and edit their own drafts, but not publish or delete others' content.
            $caps = ['read' => true, 'edit_posts' => true, 'edit_published_posts' => false, 'upload_files' => true, 'delete_posts' => false];
        }

        add_role($role_key, $label, $caps);
    }
}
add_action('admin_init', 'batum_core_sync_roles');
