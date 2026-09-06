<?php if (!defined('ABSPATH')) exit; get_header(); ?>

<section class="section light-section">
  <div class="wrap">
    <?php while (have_posts()): the_post(); ?>
      <h1 class="page-title"><?php the_title(); ?></h1>
      <div class="section-body" style="max-width:820px;"><?php the_content(); ?></div>
    <?php endwhile; ?>
  </div>
</section>

<?php get_footer(); ?>
