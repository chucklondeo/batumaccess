<?php if (!defined('ABSPATH')) exit; get_header(); ?>

<section class="section">
  <div class="wrap">
    <?php while (have_posts()): the_post();
      $challenge = get_post_meta(get_the_ID(), '_batum_challenge', true);
      $approach = get_post_meta(get_the_ID(), '_batum_approach', true);
      $architecture = get_post_meta(get_the_ID(), '_batum_architecture', true);
      $advantages = get_post_meta(get_the_ID(), '_batum_advantages', true);
      $related = get_post_meta(get_the_ID(), '_batum_related_products', true) ?: [];
    ?>
      <p class="breadcrumb"><a href="<?php echo esc_url(get_post_type_archive_link('batum_solution')); ?>"><?php echo esc_html(batum_str('Solutions')); ?></a> / <?php the_title(); ?></p>
      <h1 class="page-title"><?php the_title(); ?></h1>
      <div class="section-body"><?php the_content(); ?></div>

      <?php if ($challenge): ?><h2 class="section-title" style="font-size:22px;"><?php _e('The Challenge', 'batum'); ?></h2><p class="section-body"><?php echo nl2br(esc_html($challenge)); ?></p><?php endif; ?>
      <?php if ($approach): ?><h2 class="section-title" style="font-size:22px;"><?php _e('The BATUM Solution', 'batum'); ?></h2><p class="section-body"><?php echo nl2br(esc_html($approach)); ?></p><?php endif; ?>
      <?php if ($architecture): ?><h2 class="section-title" style="font-size:22px;"><?php _e('System Architecture', 'batum'); ?></h2><p class="section-body"><?php echo nl2br(esc_html($architecture)); ?></p><?php endif; ?>

      <?php if ($advantages): ?>
        <h2 class="section-title" style="font-size:22px;"><?php _e('Advantages', 'batum'); ?></h2>
        <ul class="highlight-list">
          <?php foreach (array_filter(array_map('trim', explode("\n", $advantages))) as $line): ?>
            <li><?php echo esc_html($line); ?></li>
          <?php endforeach; ?>
        </ul>
      <?php endif; ?>

      <?php if ($related): ?>
        <h2 class="section-title" style="font-size:22px;margin-top:40px;"><?php _e('Recommended Products', 'batum'); ?></h2>
        <div class="card-grid">
          <?php foreach ($related as $pid): $p = get_post($pid); if (!$p) continue; ?>
            <a class="glass-card" href="<?php echo esc_url(get_permalink($p)); ?>">
              <h3><?php echo esc_html($p->post_title); ?></h3>
              <p><?php echo esc_html(get_the_excerpt($p)); ?></p>
            </a>
          <?php endforeach; ?>
        </div>
      <?php endif; ?>

      <p style="margin-top:40px;">
        <a class="btn btn-primary" href="<?php echo esc_url(get_permalink(get_page_by_path('contact'))); ?>"><?php echo esc_html(batum_str('Contact Engineer')); ?></a>
      </p>
    <?php endwhile; ?>
  </div>
</section>

<?php get_footer(); ?>
