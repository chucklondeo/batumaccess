<?php
/**
 * Exposes BATUM's custom meta fields through the REST API so future
 * automation (this session's Automation Center, or an external AI-SEO
 * tool) can read and write content the same way wp-admin does — via
 * Application Passwords (built into WordPress core since 5.6: a user
 * generates one under their own Users -> Profile page, no plugin needed),
 * never anonymous access. Every field below requires 'edit_post'
 * capability on that specific post to write; reads follow normal
 * REST visibility (public for published posts on public post types, same
 * as titles/content already work).
 */

if (!defined('ABSPATH')) exit;

function batum_rest_meta_auth_write($allowed, $meta_key, $post_id) {
    return current_user_can('edit_post', $post_id);
}

function batum_register_rest_meta($post_type, $fields) {
    foreach ($fields as $meta_key => $type) {
        register_post_meta($post_type, $meta_key, [
            'type' => $type,
            'single' => true,
            'show_in_rest' => true,
            'auth_callback' => 'batum_rest_meta_auth_write'
        ]);
    }
}

function batum_register_rest_fields() {
    batum_register_rest_meta('batum_product', [
        '_batum_short_name' => 'string', '_batum_model' => 'string', '_batum_highlights' => 'string',
        '_batum_certifications' => 'string', '_batum_featured' => 'string', '_batum_new_product' => 'string',
        '_batum_hot_product' => 'string', '_batum_gallery' => 'string', '_batum_application_images' => 'string',
        '_batum_installation_images' => 'string', '_batum_video_url' => 'string', '_batum_specs' => 'string',
        '_batum_features' => 'string', '_batum_cta' => 'string'
    ]);
    batum_register_rest_meta('batum_solution', [
        '_batum_challenge' => 'string', '_batum_approach' => 'string', '_batum_architecture' => 'string',
        '_batum_advantages' => 'string', '_batum_gallery' => 'string', '_batum_cta' => 'string'
    ]);
    batum_register_rest_meta('batum_project', [
        '_batum_country' => 'string', '_batum_city' => 'string', '_batum_customer_type' => 'string',
        '_batum_industry' => 'string', '_batum_quantity' => 'string', '_batum_project_date' => 'string',
        '_batum_problem' => 'string', '_batum_solution_text' => 'string', '_batum_result' => 'string',
        '_batum_gallery' => 'string', '_batum_video_url' => 'string'
    ]);
    batum_register_rest_meta('batum_faq', [
        '_batum_faq_answer' => 'string'
    ]);
    batum_register_rest_meta('post', [
        '_batum_target_keyword' => 'string', '_batum_secondary_keywords' => 'string', '_batum_search_intent' => 'string'
    ]);

    // Relation fields (arrays of post IDs) — registered separately since they use array type.
    foreach ([
        'batum_product' => ['_batum_related_products', '_batum_related_solutions', '_batum_related_downloads', '_batum_related_faqs'],
        'batum_solution' => ['_batum_related_products', '_batum_related_faqs'],
        'batum_project' => ['_batum_related_products'],
        'batum_download' => ['_batum_related_products'],
        'batum_faq' => ['_batum_related_product', '_batum_related_solution', '_batum_related_article'],
        'post' => ['_batum_related_products', '_batum_related_solutions', '_batum_related_articles', '_batum_related_faqs']
    ] as $post_type => $meta_keys) {
        foreach ($meta_keys as $meta_key) {
            register_post_meta($post_type, $meta_key, [
                'type' => 'array',
                'items' => ['type' => 'integer'],
                'single' => true,
                'show_in_rest' => ['schema' => ['type' => 'array', 'items' => ['type' => 'integer']]],
                'auth_callback' => 'batum_rest_meta_auth_write'
            ]);
        }
    }
}
add_action('init', 'batum_register_rest_fields', 30);
