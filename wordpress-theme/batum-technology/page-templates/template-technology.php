<?php
/* Template Name: Technology */
if (!defined('ABSPATH')) exit; get_header();
?>

<section class="section">
  <div class="wrap">
    <?php while (have_posts()): the_post(); ?>
      <p class="kicker"><?php echo esc_html(batum_str('Technology')); ?></p>
      <h1 class="page-title"><?php the_title(); ?></h1>
      <div class="section-body" style="max-width:820px;"><?php the_content(); ?></div>
    <?php endwhile; ?>
  </div>
</section>

<section class="section dark-section">
  <div class="wrap">
    <p class="kicker"><?php _e('Why BATUM', 'batum'); ?></p>
    <div class="stat-grid">
      <div><div class="stat-value">0.3–0.6s</div><div class="stat-label"><?php _e('High-speed barrier opening', 'batum'); ?></div></div>
      <div><div class="stat-value">10M</div><div class="stat-label"><?php _e('Cycles rated', 'batum'); ?></div></div>
      <div><div class="stat-value">24V</div><div class="stat-label"><?php _e('Low-voltage servo control', 'batum'); ?></div></div>
      <div><div class="stat-value">100%</div><div class="stat-label"><?php _e('In-house motion control R&D', 'batum'); ?></div></div>
    </div>
  </div>
</section>

<?php get_footer(); ?>
