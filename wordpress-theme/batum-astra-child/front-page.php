<?php if (!defined('ABSPATH')) exit; get_header(); ?>
<div class="batum-page">

<!-- 01 Hero -->
<section class="hero">
  <div class="wrap hero-grid">
    <div>
      <p class="kicker"><?php bloginfo('name'); ?></p>
      <h1><?php _e('Engineering Motion. Powering Access.', 'batum'); ?></h1>
      <p class="lede"><?php _e('Low-voltage servo motion control systems engineered for high-speed barrier gates, pedestrian access and rail transit applications.', 'batum'); ?></p>
      <div class="hero-actions">
        <a class="btn btn-primary" href="<?php echo esc_url(get_post_type_archive_link('batum_product')); ?>"><?php echo esc_html(batum_str('Explore Products')); ?></a>
        <a class="btn btn-secondary" href="<?php echo esc_url(home_url('/technology/')); ?>"><?php echo esc_html(batum_str('Discover Technology')); ?></a>
      </div>
    </div>
    <?php $featured = new WP_Query(['post_type' => 'batum_product', 'posts_per_page' => 4]); ?>
    <?php if ($featured->have_posts()): ?>
      <div class="glass-card hero-card-preview">
        <div class="card-grid" style="grid-template-columns:repeat(auto-fit,minmax(120px,1fr));align-content:start;">
          <?php while ($featured->have_posts()): $featured->the_post(); ?>
            <a class="glass-card" style="padding:18px;" href="<?php the_permalink(); ?>">
              <h3 style="font-size:15px;"><?php the_title(); ?></h3>
            </a>
          <?php endwhile; wp_reset_postdata(); ?>
        </div>
      </div>
    <?php endif; ?>
  </div>
</section>

<!-- 02 Core Technology -->
<section class="section dark-section">
  <div class="wrap">
    <p class="kicker"><?php _e('Core Technology', 'batum'); ?></p>
    <h2 class="section-title"><?php _e('24V Low-Voltage Servo Motion Control', 'batum'); ?></h2>
    <p class="section-body"><?php _e('BATUM develops its own servo controllers and motion control algorithms — the foundation for smooth, low-noise, high-reliability access hardware across every product line.', 'batum'); ?></p>
    <div class="stat-grid">
      <div><div class="stat-value">0.3–0.6s</div><div class="stat-label"><?php _e('High-speed barrier opening', 'batum'); ?></div></div>
      <div><div class="stat-value">10M</div><div class="stat-label"><?php _e('Cycles rated', 'batum'); ?></div></div>
      <div><div class="stat-value">24V</div><div class="stat-label"><?php _e('Low-voltage servo control', 'batum'); ?></div></div>
      <div><div class="stat-value">100%</div><div class="stat-label"><?php _e('In-house motion control R&D', 'batum'); ?></div></div>
    </div>
  </div>
</section>

<!-- 03 Main Product Families -->
<section class="section">
  <div class="wrap">
    <p class="kicker"><?php echo esc_html(batum_str('Products')); ?></p>
    <h2 class="section-title"><?php _e('Product Families', 'batum'); ?></h2>
    <div class="card-grid cols-3">
      <?php
      $categories = get_terms(['taxonomy' => 'product_category', 'hide_empty' => true, 'number' => 6]);
      if ($categories && !is_wp_error($categories)):
        foreach ($categories as $cat):
      ?>
        <a class="glass-card" href="<?php echo esc_url(get_term_link($cat)); ?>">
          <h3><?php echo esc_html($cat->name); ?></h3>
          <p><?php echo esc_html($cat->count); ?> <?php _e('products', 'batum'); ?></p>
        </a>
      <?php endforeach; else: ?>
        <p class="section-body"><?php _e('Product categories will appear here once products are published.', 'batum'); ?></p>
      <?php endif; ?>
    </div>
  </div>
</section>

<!-- 05 Applications -->
<section class="section section-off-white">
  <div class="wrap">
    <p class="kicker"><?php echo esc_html(batum_str('Applications')); ?></p>
    <h2 class="section-title"><?php _e('Where BATUM Systems Operate', 'batum'); ?></h2>
    <div class="card-grid cols-3">
      <?php
      $applications = get_terms(['taxonomy' => 'applications', 'hide_empty' => false, 'number' => 6]);
      if ($applications && !is_wp_error($applications)):
        foreach ($applications as $app):
      ?>
        <a class="glass-card" href="<?php echo esc_url(get_term_link($app)); ?>">
          <h3><?php echo esc_html($app->name); ?></h3>
        </a>
      <?php endforeach; endif; ?>
    </div>
  </div>
</section>

<!-- 06 Featured Products -->
<section class="section">
  <div class="wrap">
    <p class="kicker"><?php echo esc_html(batum_str('Products')); ?></p>
    <h2 class="section-title"><?php _e('Featured Products', 'batum'); ?></h2>
    <div class="card-grid cols-3">
      <?php
      $featured2 = new WP_Query(['post_type' => 'batum_product', 'posts_per_page' => 6]);
      while ($featured2->have_posts()): $featured2->the_post();
      ?>
        <a class="glass-card" href="<?php the_permalink(); ?>">
          <?php if (has_post_thumbnail()): ?><div style="margin-bottom:14px;border-radius:10px;overflow:hidden;"><?php the_post_thumbnail('medium'); ?></div><?php endif; ?>
          <h3><?php the_title(); ?></h3>
          <p><?php echo esc_html(get_the_excerpt()); ?></p>
        </a>
      <?php endwhile; wp_reset_postdata(); ?>
    </div>
  </div>
</section>

<!-- 08 Projects -->
<section class="section dark-section">
  <div class="wrap">
    <p class="kicker"><?php echo esc_html(batum_str('Projects')); ?></p>
    <h2 class="section-title"><?php _e('Deployed Worldwide', 'batum'); ?></h2>
    <div class="card-grid cols-3">
      <?php
      $projects = new WP_Query(['post_type' => 'batum_project', 'posts_per_page' => 3]);
      if ($projects->have_posts()): while ($projects->have_posts()): $projects->the_post();
        $country = get_post_meta(get_the_ID(), '_batum_country', true);
      ?>
        <a class="glass-card" href="<?php the_permalink(); ?>">
          <?php if ($country): ?><span class="badge"><?php echo esc_html($country); ?></span><?php endif; ?>
          <h3><?php the_title(); ?></h3>
        </a>
      <?php endwhile; wp_reset_postdata(); else: ?>
        <p class="section-body"><?php _e('Case studies will appear here once projects are published.', 'batum'); ?></p>
      <?php endif; ?>
    </div>
  </div>
</section>

<!-- 09 Technology Insights (blog) -->
<section class="section">
  <div class="wrap">
    <p class="kicker"><?php echo esc_html(batum_str('Blog')); ?></p>
    <h2 class="section-title"><?php _e('Technology Insights', 'batum'); ?></h2>
    <div class="card-grid cols-3">
      <?php
      $articles = new WP_Query(['post_type' => 'post', 'posts_per_page' => 3]);
      if ($articles->have_posts()): while ($articles->have_posts()): $articles->the_post();
      ?>
        <a class="glass-card" href="<?php the_permalink(); ?>">
          <h3><?php the_title(); ?></h3>
          <p><?php echo esc_html(get_the_excerpt()); ?></p>
        </a>
      <?php endwhile; wp_reset_postdata(); else: ?>
        <p class="section-body"><?php _e('Technical articles will appear here once published.', 'batum'); ?></p>
      <?php endif; ?>
    </div>
  </div>
</section>

<!-- 11 CTA -->
<section class="section section-off-white section-tight">
  <div class="wrap" style="text-align:center;">
    <h2 class="section-title"><?php _e('Ready to specify a system?', 'batum'); ?></h2>
    <p class="section-body" style="margin-left:auto;margin-right:auto;"><?php _e('Send your project requirements and our engineering team will recommend a configuration.', 'batum'); ?></p>
    <a class="btn btn-primary" href="<?php echo esc_url(get_permalink(get_page_by_path('contact'))); ?>"><?php echo esc_html(batum_str('Request Quote')); ?></a>
  </div>
</section>

</div>
<?php get_footer(); ?>
