<?php if (!defined('ABSPATH')) exit; ?>
<!doctype html>
<html <?php language_attributes(); ?>>
<head>
  <meta charset="<?php bloginfo('charset'); ?>">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <?php wp_head(); ?>
</head>
<body <?php body_class(); ?>>
<?php wp_body_open(); ?>
<header class="site-header">
  <div class="wrap">
    <a class="brand" href="<?php echo esc_url(home_url('/')); ?>">
      <span class="brand-mark">B</span>
      <span class="brand-name"><?php bloginfo('name'); ?></span>
    </a>
    <nav class="main-nav">
      <?php
      wp_nav_menu([
          'theme_location' => 'primary',
          'container' => false,
          'items_wrap' => '<ul class="main-nav-list">%3$s</ul>',
          'fallback_cb' => false
      ]);
      ?>
    </nav>
    <?php if (function_exists('pll_the_languages')): ?>
      <div class="lang-switcher">
        <?php pll_the_languages(['raw' => 0]); ?>
      </div>
    <?php endif; ?>
  </div>
</header>
<main>
