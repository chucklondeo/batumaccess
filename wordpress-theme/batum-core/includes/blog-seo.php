<?php
/**
 * Adds the SEO/content-strategy fields the brief asks for to native Posts,
 * without duplicating what Rank Math already owns (SEO Title, Meta
 * Description, Canonical URL, focus keyword, sitemap, schema) — this box
 * only adds the fields Rank Math doesn't have: Secondary Keywords, Search
 * Intent, and relations to Products/Solutions/Articles/FAQ for internal
 * linking. Content Cluster is a taxonomy (registered in taxonomies.php) and
 * shows as its own box automatically.
 */

if (!defined('ABSPATH')) exit;

function batum_blog_seo_meta_box() {
    add_meta_box('batum_blog_seo', __('SEO & Internal Linking', 'batum-core'), 'batum_render_blog_seo_box', 'post', 'normal', 'high');
}
add_action('add_meta_boxes', 'batum_blog_seo_meta_box');

function batum_render_blog_seo_box($post) {
    wp_nonce_field('batum_blog_seo_save', 'batum_blog_seo_nonce');
    $target_keyword = get_post_meta($post->ID, '_batum_target_keyword', true);
    $secondary_keywords = get_post_meta($post->ID, '_batum_secondary_keywords', true);
    $search_intent = get_post_meta($post->ID, '_batum_search_intent', true);
    ?>
    <p>
        <label for="batum_target_keyword"><strong><?php _e('Target Keyword', 'batum-core'); ?></strong></label><br>
        <input type="text" id="batum_target_keyword" name="batum_target_keyword" class="widefat" value="<?php echo esc_attr($target_keyword); ?>">
    </p>
    <p>
        <label for="batum_secondary_keywords"><strong><?php _e('Secondary Keywords (comma separated)', 'batum-core'); ?></strong></label><br>
        <input type="text" id="batum_secondary_keywords" name="batum_secondary_keywords" class="widefat" value="<?php echo esc_attr($secondary_keywords); ?>">
    </p>
    <p>
        <label for="batum_search_intent"><strong><?php _e('Search Intent', 'batum-core'); ?></strong></label><br>
        <select id="batum_search_intent" name="batum_search_intent">
            <option value=""><?php _e('— Select —', 'batum-core'); ?></option>
            <?php foreach (['informational' => __('Informational', 'batum-core'), 'commercial' => __('Commercial', 'batum-core'), 'transactional' => __('Transactional', 'batum-core'), 'navigational' => __('Navigational', 'batum-core')] as $value => $label): ?>
                <option value="<?php echo esc_attr($value); ?>" <?php selected($search_intent, $value); ?>><?php echo esc_html($label); ?></option>
            <?php endforeach; ?>
        </select>
    </p>
    <p class="description"><?php _e('SEO Title, Meta Description and Canonical URL are set in the Rank Math box below the editor. Content Cluster is set in the box on the right.', 'batum-core'); ?></p>
    <hr>
    <?php
    batum_render_relation_field('_batum_related_products', __('Related Products', 'batum-core'), $post->ID, 'batum_product', $post->ID);
    batum_render_relation_field('_batum_related_solutions', __('Related Solutions', 'batum-core'), $post->ID, 'batum_solution', $post->ID);
    batum_render_relation_field('_batum_related_articles', __('Related Articles', 'batum-core'), $post->ID, 'post', $post->ID);
    batum_render_relation_field('_batum_related_faqs', __('Related FAQ', 'batum-core'), $post->ID, 'batum_faq', $post->ID);
}

function batum_save_blog_seo_meta($post_id) {
    if (!isset($_POST['batum_blog_seo_nonce']) || !wp_verify_nonce($_POST['batum_blog_seo_nonce'], 'batum_blog_seo_save')) return;
    if (defined('DOING_AUTOSAVE') && DOING_AUTOSAVE) return;
    if (!current_user_can('edit_post', $post_id)) return;

    if (isset($_POST['batum_target_keyword'])) update_post_meta($post_id, '_batum_target_keyword', sanitize_text_field($_POST['batum_target_keyword']));
    if (isset($_POST['batum_secondary_keywords'])) update_post_meta($post_id, '_batum_secondary_keywords', sanitize_text_field($_POST['batum_secondary_keywords']));
    if (isset($_POST['batum_search_intent'])) update_post_meta($post_id, '_batum_search_intent', sanitize_key($_POST['batum_search_intent']));

    batum_save_relation_field($post_id, '_batum_related_products');
    batum_save_relation_field($post_id, '_batum_related_solutions');
    batum_save_relation_field($post_id, '_batum_related_articles');
    batum_save_relation_field($post_id, '_batum_related_faqs');
}
add_action('save_post_post', 'batum_save_blog_seo_meta');

/**
 * SEO title/description read helpers used by the SEO Center audit. Prefer
 * whichever SEO plugin is active (checked by meta key, not by asserting a
 * specific plugin is installed) and fall back to nothing if none is set.
 */
function batum_get_seo_title($post_id) {
    $rank_math = get_post_meta($post_id, 'rank_math_title', true);
    if ($rank_math) return $rank_math;
    $yoast = get_post_meta($post_id, '_yoast_wpseo_title', true);
    return $yoast ?: '';
}

function batum_get_seo_description($post_id) {
    $rank_math = get_post_meta($post_id, 'rank_math_description', true);
    if ($rank_math) return $rank_math;
    $yoast = get_post_meta($post_id, '_yoast_wpseo_metadesc', true);
    return $yoast ?: '';
}
