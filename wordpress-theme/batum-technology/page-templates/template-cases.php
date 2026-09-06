<?php
/* Template Name: Cases */
if (!defined('ABSPATH')) exit; get_header();
?>

<section class="section light-section">
  <div class="wrap">
    <?php while (have_posts()): the_post(); ?>
      <h1 class="page-title"><?php the_title(); ?></h1>
      <div class="section-body"><?php the_content(); ?></div>
    <?php endwhile; ?>

    <div class="card-grid">
      <?php
      $items = new WP_Query(['post_type' => 'batum_case', 'posts_per_page' => -1, 'orderby' => 'menu_order', 'order' => 'ASC']);
      while ($items->have_posts()): $items->the_post();
        $icon = get_post_meta(get_the_ID(), '_batum_icon', true);
      ?>
        <article class="glass-card">
          <span class="dashicons <?php echo esc_attr(batum_icon_dashicon($icon)); ?>" style="font-size:28px;width:28px;height:28px;color:var(--water);"></span>
          <h3><?php the_title(); ?></h3>
          <p><?php the_content(); ?></p>
        </article>
      <?php endwhile; wp_reset_postdata(); ?>
    </div>
  </div>
</section>

<?php get_footer(); ?>
