<?php
/* Template Name: FAQ */
if (!defined('ABSPATH')) exit; get_header();
?>

<section class="section">
  <div class="wrap">
    <?php while (have_posts()): the_post(); ?>
      <h1 class="page-title"><?php the_title(); ?></h1>
      <div class="section-body"><?php the_content(); ?></div>
    <?php endwhile; ?>

    <div class="card-grid">
      <?php
      $items = new WP_Query(['post_type' => 'batum_faq', 'posts_per_page' => -1, 'orderby' => 'menu_order', 'order' => 'ASC']);
      while ($items->have_posts()): $items->the_post();
      ?>
        <article class="glass-card">
          <h3><?php the_title(); ?></h3>
          <p><?php the_content(); ?></p>
        </article>
      <?php endwhile; wp_reset_postdata(); ?>
    </div>
  </div>
</section>

<?php get_footer(); ?>
