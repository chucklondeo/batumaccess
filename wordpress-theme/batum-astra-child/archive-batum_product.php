<?php if (!defined('ABSPATH')) exit; get_header(); ?>
<div class="batum-page">

<section class="section section-off-white">
  <div class="wrap">
    <p class="kicker"><?php echo esc_html(batum_str('Products')); ?></p>
    <h1 class="page-title"><?php _e('Servo motion control systems for vehicle, pedestrian and rail transit access', 'batum'); ?></h1>
    <div class="card-grid">
      <?php while (have_posts()): the_post();
        $categories = get_the_terms(get_the_ID(), 'product_category');
        $category_label = $categories && !is_wp_error($categories) ? $categories[0]->name : '';
        $model = get_post_meta(get_the_ID(), '_batum_model', true);
      ?>
        <a class="glass-card" href="<?php the_permalink(); ?>">
          <?php if ($category_label): ?><span class="badge"><?php echo esc_html($category_label); ?></span><?php endif; ?>
          <?php if (has_post_thumbnail()): ?><div style="margin-bottom:16px;border-radius:10px;overflow:hidden;"><?php the_post_thumbnail('medium'); ?></div><?php endif; ?>
          <h3><?php the_title(); ?></h3>
          <?php if ($model): ?><p style="font-size:12px;color:var(--metal);margin-bottom:8px;"><?php echo esc_html($model); ?></p><?php endif; ?>
          <p><?php echo esc_html(get_the_excerpt()); ?></p>
        </a>
      <?php endwhile; ?>
    </div>
  </div>
</section>

</div>
<?php get_footer(); ?>
