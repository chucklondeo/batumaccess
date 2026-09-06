<?php if (!defined('ABSPATH')) exit; get_header(); ?>

<section class="section light-section">
  <div class="wrap">
    <p class="kicker"><?php echo esc_html(batum_str('Products')); ?></p>
    <h1 class="page-title"><?php _e('Servo barrier, door operator, radar and accessory categories', 'batum'); ?></h1>
    <div class="card-grid">
      <?php while (have_posts()): the_post();
        $categories = get_the_terms(get_the_ID(), 'product_category');
        $category_label = $categories && !is_wp_error($categories) ? $categories[0]->name : '';
      ?>
        <a class="glass-card" href="<?php the_permalink(); ?>">
          <?php if ($category_label): ?><span class="badge"><?php echo esc_html($category_label); ?></span><?php endif; ?>
          <h3><?php the_title(); ?></h3>
          <p><?php echo esc_html(get_the_excerpt()); ?></p>
        </a>
      <?php endwhile; ?>
    </div>
  </div>
</section>

<?php get_footer(); ?>
