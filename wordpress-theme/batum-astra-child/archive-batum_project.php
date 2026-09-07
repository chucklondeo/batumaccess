<?php if (!defined('ABSPATH')) exit; get_header(); ?>
<div class="batum-page">

<section class="section section-off-white">
  <div class="wrap">
    <p class="kicker"><?php echo esc_html(batum_str('Projects')); ?></p>
    <h1 class="page-title"><?php _e('Deployments across parking, highway, metro and rail transit', 'batum'); ?></h1>
    <div class="card-grid">
      <?php while (have_posts()): the_post();
        $country = get_post_meta(get_the_ID(), '_batum_country', true);
        $industry = get_post_meta(get_the_ID(), '_batum_industry', true);
      ?>
        <a class="glass-card" href="<?php the_permalink(); ?>">
          <?php if ($country): ?><span class="badge"><?php echo esc_html($country); ?></span><?php endif; ?>
          <h3><?php the_title(); ?></h3>
          <p><?php echo esc_html($industry); ?></p>
        </a>
      <?php endwhile; ?>
    </div>
  </div>
</section>

</div>
<?php get_footer(); ?>
