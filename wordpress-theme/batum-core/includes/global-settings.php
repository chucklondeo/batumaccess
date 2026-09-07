<?php
/**
 * One place for company/contact/SEO-default/analytics info, instead of it
 * being hardcoded across theme templates. batum_get_setting() is the read
 * API templates should call going forward (BATUM_INQUIRY_EMAIL in the theme
 * still works as a fallback until templates are migrated to call this).
 */

if (!defined('ABSPATH')) exit;

function batum_global_settings_fields() {
    return [
        'company_name' => ['label' => __('Company Name', 'batum-core'), 'type' => 'text'],
        'company_description' => ['label' => __('Company Description', 'batum-core'), 'type' => 'textarea'],
        'address' => ['label' => __('Address', 'batum-core'), 'type' => 'text'],
        'factory_address' => ['label' => __('Factory Address', 'batum-core'), 'type' => 'text'],
        'phone' => ['label' => __('Phone', 'batum-core'), 'type' => 'text'],
        'email' => ['label' => __('Email', 'batum-core'), 'type' => 'email'],
        'whatsapp' => ['label' => __('WhatsApp', 'batum-core'), 'type' => 'text'],
        'linkedin' => ['label' => __('LinkedIn URL', 'batum-core'), 'type' => 'url'],
        'youtube' => ['label' => __('YouTube URL', 'batum-core'), 'type' => 'url'],
        'facebook' => ['label' => __('Facebook URL', 'batum-core'), 'type' => 'url'],
        'seo_default_title' => ['label' => __('SEO Default Title', 'batum-core'), 'type' => 'text'],
        'seo_default_description' => ['label' => __('SEO Default Description', 'batum-core'), 'type' => 'textarea'],
        'ga_id' => ['label' => __('Google Analytics ID (e.g. G-XXXXXXX)', 'batum-core'), 'type' => 'text'],
        'gtm_id' => ['label' => __('Google Tag Manager ID (e.g. GTM-XXXXXXX)', 'batum-core'), 'type' => 'text'],
        'gsc_verification' => ['label' => __('Google Search Console Verification (content value only)', 'batum-core'), 'type' => 'text'],
        'bing_verification' => ['label' => __('Bing Webmaster Verification (content value only)', 'batum-core'), 'type' => 'text']
    ];
}

function batum_get_setting($key, $default = '') {
    $settings = get_option('batum_global_settings', []);
    return is_array($settings) && isset($settings[$key]) && $settings[$key] !== '' ? $settings[$key] : $default;
}

function batum_global_settings_menu() {
    add_submenu_page('batum-cms', __('Global Settings', 'batum-core'), __('Global Settings', 'batum-core'), 'manage_options', 'batum-global-settings', 'batum_render_global_settings_page');
}
add_action('admin_menu', 'batum_global_settings_menu', 20);

function batum_render_global_settings_page() {
    if (!current_user_can('manage_options')) return;

    if (isset($_POST['batum_settings_save']) && check_admin_referer('batum_settings_save')) {
        $clean = [];
        foreach (batum_global_settings_fields() as $key => $field) {
            $raw = wp_unslash($_POST[$key] ?? '');
            $clean[$key] = $field['type'] === 'textarea' ? sanitize_textarea_field($raw) : ($field['type'] === 'url' ? esc_url_raw($raw) : sanitize_text_field($raw));
        }
        $clean['default_og_image'] = absint($_POST['default_og_image'] ?? 0);
        update_option('batum_global_settings', $clean);
        echo '<div class="notice notice-success"><p>' . esc_html__('Settings saved.', 'batum-core') . '</p></div>';
    }

    $settings = get_option('batum_global_settings', []);
    ?>
    <div class="wrap">
        <h1><?php _e('BATUM Global Settings', 'batum-core'); ?></h1>
        <form method="post">
            <?php wp_nonce_field('batum_settings_save'); ?>
            <table class="form-table">
                <?php foreach (batum_global_settings_fields() as $key => $field): $value = $settings[$key] ?? ''; ?>
                    <tr>
                        <th><label for="<?php echo esc_attr($key); ?>"><?php echo esc_html($field['label']); ?></label></th>
                        <td>
                            <?php if ($field['type'] === 'textarea'): ?>
                                <textarea id="<?php echo esc_attr($key); ?>" name="<?php echo esc_attr($key); ?>" rows="3" class="large-text"><?php echo esc_textarea($value); ?></textarea>
                            <?php else: ?>
                                <input type="<?php echo esc_attr($field['type']); ?>" id="<?php echo esc_attr($key); ?>" name="<?php echo esc_attr($key); ?>" class="regular-text" value="<?php echo esc_attr($value); ?>">
                            <?php endif; ?>
                        </td>
                    </tr>
                <?php endforeach; ?>
                <tr>
                    <th><?php _e('Default OG Image', 'batum-core'); ?></th>
                    <td>
                        <?php $og_image_id = absint($settings['default_og_image'] ?? 0); $og_url = $og_image_id ? wp_get_attachment_url($og_image_id) : ''; ?>
                        <input type="hidden" class="batum-file-id" id="default_og_image" name="default_og_image" value="<?php echo esc_attr($og_image_id); ?>">
                        <button type="button" class="button batum-file-select" data-target="#default_og_image"><?php _e('Select or upload image', 'batum-core'); ?></button>
                        <button type="button" class="button batum-file-clear" data-target="#default_og_image" <?php echo $og_image_id ? '' : 'style="display:none;"'; ?>><?php _e('Remove', 'batum-core'); ?></button>
                        <span class="batum-file-preview" data-target="#default_og_image">
                            <?php if ($og_url): ?><a href="<?php echo esc_url($og_url); ?>" target="_blank"><?php echo esc_html(basename($og_url)); ?></a><?php endif; ?>
                        </span>
                    </td>
                </tr>
            </table>
            <p><button type="submit" name="batum_settings_save" class="button button-primary"><?php _e('Save Settings', 'batum-core'); ?></button></p>
        </form>
    </div>
    <?php
}

function batum_global_settings_admin_assets($hook) {
    if ($hook !== 'batum-cms_page_batum-global-settings') return;
    wp_enqueue_media();
    wp_enqueue_script('batum-core-repeater', BATUM_CORE_URL . 'assets/js/repeater.js', ['jquery'], BATUM_CORE_VERSION, true);
}
add_action('admin_enqueue_scripts', 'batum_global_settings_admin_assets');

/** Organization schema + GA/GTM/verification tags, driven entirely by the settings above — nothing hardcoded in the theme. */
function batum_output_global_head_tags() {
    $ga_id = batum_get_setting('ga_id');
    $gtm_id = batum_get_setting('gtm_id');
    $gsc = batum_get_setting('gsc_verification');
    $bing = batum_get_setting('bing_verification');

    if ($gsc) echo '<meta name="google-site-verification" content="' . esc_attr($gsc) . '">' . "\n";
    if ($bing) echo '<meta name="msvalidate.01" content="' . esc_attr($bing) . '">' . "\n";

    if ($gtm_id) {
        echo "<script>(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);})(window,document,'script','dataLayer','" . esc_js($gtm_id) . "');</script>\n";
    } elseif ($ga_id) {
        echo '<script async src="https://www.googletagmanager.com/gtag/js?id=' . esc_attr($ga_id) . '"></script>' . "\n";
        echo "<script>window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('js',new Date());gtag('config','" . esc_js($ga_id) . "');</script>\n";
    }

    $company_name = batum_get_setting('company_name', get_bloginfo('name'));
    $schema = [
        '@context' => 'https://schema.org',
        '@type' => 'Organization',
        'name' => $company_name,
        'url' => home_url('/')
    ];
    if (batum_get_setting('email')) $schema['email'] = batum_get_setting('email');
    if (batum_get_setting('phone')) $schema['telephone'] = batum_get_setting('phone');
    if (batum_get_setting('address')) $schema['address'] = batum_get_setting('address');
    $same_as = array_filter([batum_get_setting('linkedin'), batum_get_setting('youtube'), batum_get_setting('facebook')]);
    if ($same_as) $schema['sameAs'] = array_values($same_as);
    echo '<script type="application/ld+json">' . wp_json_encode($schema) . '</script>' . "\n";
}
add_action('wp_head', 'batum_output_global_head_tags', 5);
