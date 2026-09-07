<?php if (!defined('ABSPATH')) exit; get_header(); ?>

<section class="section">
  <div class="wrap">
    <p class="kicker"><?php echo esc_html(batum_str('Solutions')); ?></p>
    <h1 class="page-title"><?php _e('Engineered systems for vehicle, pedestrian and rail transit access', 'batum'); ?></h1>
    <div class="card-grid">
      <?php while (have_posts()): the_post(); ?>
        <a class="glass-card" href="<?php the_permalink(); ?>">
          <h3><?php the_title(); ?></h3>
          <p><?php echo esc_html(get_the_excerpt()); ?></p>
        </a>
      <?php endwhile; ?>
    </div>
  </div>
</section>

<?php get_footer(); ?>
