<?php if (!defined('ABSPATH')) exit; get_header(); ?>

<section class="hero">
  <div class="wrap hero-grid">
    <div>
      <p class="kicker"><?php bloginfo('name'); ?></p>
      <h1><?php echo esc_html(get_bloginfo('description') ?: __('Global Smart Parking & Access Control Technology', 'batum')); ?></h1>
      <p class="lede"><?php _e('Low-voltage servo hardware, safety radar accessories and parking software for international parking, gate and transit projects.', 'batum'); ?></p>
      <div class="hero-actions">
        <a class="btn btn-primary" href="<?php echo esc_url(get_permalink(get_page_by_path('contact'))); ?>"><?php echo esc_html(batum_str('Submit Inquiry')); ?></a>
        <a class="btn btn-secondary" href="<?php echo esc_url(get_post_type_archive_link('batum_product')); ?>"><?php echo esc_html(batum_str('View Products')); ?></a>
      </div>
    </div>
    <div class="glass-card">
      <div class="card-grid">
        <?php
        $products = new WP_Query(['post_type' => 'batum_product', 'posts_per_page' => 4]);
        while ($products->have_posts()): $products->the_post();
        ?>
          <a class="glass-card" style="padding:18px;" href="<?php the_permalink(); ?>">
            <h3 style="font-size:16px;"><?php the_title(); ?></h3>
            <p><?php echo esc_html(wp_trim_words(get_the_excerpt(), 16)); ?></p>
          </a>
        <?php endwhile; wp_reset_postdata(); ?>
      </div>
    </div>
  </div>
</section>

<section class="section">
  <div class="wrap">
    <p class="kicker"><?php echo esc_html(batum_str('Solutions')); ?></p>
    <div class="card-grid">
      <?php
      $solutions = new WP_Query(['post_type' => 'batum_solution', 'posts_per_page' => 4, 'orderby' => 'menu_order', 'order' => 'ASC']);
      while ($solutions->have_posts()): $solutions->the_post();
        $icon = get_post_meta(get_the_ID(), '_batum_icon', true);
      ?>
        <article class="glass-card">
          <span class="dashicons <?php echo esc_attr(batum_icon_dashicon($icon)); ?>" style="font-size:28px;width:28px;height:28px;color:var(--gold);"></span>
          <h3><?php the_title(); ?></h3>
          <p><?php the_content(); ?></p>
        </article>
      <?php endwhile; wp_reset_postdata(); ?>
    </div>
  </div>
</section>

<?php get_footer(); ?>
