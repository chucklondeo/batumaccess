<?php if (!defined('ABSPATH')) exit; get_header(); ?>

<section class="section">
  <div class="wrap">
    <?php while (have_posts()): the_post();
      $id = get_the_ID();
      $categories = get_the_terms($id, 'product_category');
      $category = ($categories && !is_wp_error($categories)) ? $categories[0] : null;
      $model = get_post_meta($id, '_batum_model', true);
      $highlights = batum_get_lines($id, '_batum_highlights');
      $certifications = batum_get_lines($id, '_batum_certifications');
      $specs = batum_get_specs_rows($id, '_batum_specs');
      $gallery = batum_get_gallery_ids($id);
      $video = get_post_meta($id, '_batum_video_url', true);
      $datasheet = get_post_meta($id, '_batum_datasheet_id', true);
      $manual = get_post_meta($id, '_batum_manual_id', true);
      $cad = get_post_meta($id, '_batum_cad_id', true);
      $related_products = get_post_meta($id, '_batum_related_products', true) ?: [];
      $related_solutions = get_post_meta($id, '_batum_related_solutions', true) ?: [];
    ?>
      <p class="breadcrumb">
        <a href="<?php echo esc_url(home_url('/')); ?>"><?php echo esc_html(batum_str('Home')); ?></a> /
        <a href="<?php echo esc_url(get_post_type_archive_link('batum_product')); ?>"><?php echo esc_html(batum_str('Products')); ?></a> /
        <?php the_title(); ?>
      </p>

      <div style="display:grid;gap:48px;grid-template-columns:1fr;">
        <div>
          <?php if ($category): ?><span class="badge"><?php echo esc_html($category->name); ?></span><?php endif; ?>
          <h1 class="page-title" style="margin-bottom:6px;"><?php the_title(); ?></h1>
          <?php if ($model): ?><p style="color:var(--metal);font-weight:600;margin:0 0 20px;"><?php _e('Model', 'batum'); ?>: <?php echo esc_html($model); ?></p><?php endif; ?>
          <p class="section-body"><?php echo esc_html(get_the_excerpt()); ?></p>

          <div class="hero-actions" style="margin-bottom:32px;">
            <?php if ($datasheet): ?><a class="btn btn-primary" href="<?php echo esc_url(wp_get_attachment_url($datasheet)); ?>" download><?php echo esc_html(batum_str('Download Datasheet')); ?></a><?php endif; ?>
            <a class="btn btn-secondary" href="<?php echo esc_url(add_query_arg('product', urlencode(get_the_title()), get_permalink(get_page_by_path('contact')))); ?>"><?php echo esc_html(batum_str('Request Quote')); ?></a>
          </div>

          <?php if (has_post_thumbnail() || $gallery): ?>
            <div class="gallery-grid" style="margin-bottom:8px;">
              <?php if (has_post_thumbnail()): ?><?php the_post_thumbnail('large'); ?><?php endif; ?>
              <?php foreach ($gallery as $img_id): $url = wp_get_attachment_image_url($img_id, 'medium'); if ($url): ?>
                <img src="<?php echo esc_url($url); ?>" alt="">
              <?php endif; endforeach; ?>
            </div>
          <?php endif; ?>

          <?php if ($video): ?>
            <div style="margin:24px 0;aspect-ratio:16/9;max-width:720px;">
              <iframe style="width:100%;height:100%;border:0;border-radius:12px;" src="<?php echo esc_url(str_replace('watch?v=', 'embed/', $video)); ?>" allowfullscreen></iframe>
            </div>
          <?php endif; ?>

          <?php if ($highlights): ?>
            <h2 class="section-title" style="font-size:22px;margin-top:36px;"><?php _e('Key Advantages', 'batum'); ?></h2>
            <ul class="highlight-list"><?php foreach ($highlights as $line): ?><li><?php echo esc_html($line); ?></li><?php endforeach; ?></ul>
          <?php endif; ?>

          <div class="section-body" style="margin-top:32px;max-width:100%;"><?php the_content(); ?></div>

          <?php if ($specs): ?>
            <h2 class="section-title" style="font-size:22px;margin-top:36px;"><?php _e('Technical Specifications', 'batum'); ?></h2>
            <table class="spec-table">
              <thead><tr><th><?php _e('Parameter', 'batum'); ?></th><th><?php _e('Value', 'batum'); ?></th><th><?php _e('Unit', 'batum'); ?></th></tr></thead>
              <tbody>
                <?php foreach ($specs as $row): if (empty($row['parameter']) && empty($row['value'])) continue; ?>
                  <tr><td><?php echo esc_html($row['parameter']); ?></td><td><?php echo esc_html($row['value']); ?></td><td><?php echo esc_html($row['unit']); ?></td></tr>
                <?php endforeach; ?>
              </tbody>
            </table>
          <?php endif; ?>

          <?php if ($certifications): ?>
            <h2 class="section-title" style="font-size:22px;margin-top:36px;"><?php _e('Certifications', 'batum'); ?></h2>
            <ul class="highlight-list"><?php foreach ($certifications as $line): ?><li><?php echo esc_html($line); ?></li><?php endforeach; ?></ul>
          <?php endif; ?>

          <div style="margin-top:32px;display:flex;flex-wrap:wrap;gap:12px;">
            <?php if ($manual): ?><a class="btn btn-secondary" href="<?php echo esc_url(wp_get_attachment_url($manual)); ?>" download><?php echo esc_html(batum_str('Download Manual')); ?></a><?php endif; ?>
            <?php if ($cad): ?><a class="btn btn-secondary" href="<?php echo esc_url(wp_get_attachment_url($cad)); ?>" download><?php echo esc_html(batum_str('Download CAD')); ?></a><?php endif; ?>
          </div>

          <?php if ($related_products): ?>
            <h2 class="section-title" style="font-size:22px;margin-top:48px;"><?php _e('Related Products', 'batum'); ?></h2>
            <div class="card-grid">
              <?php foreach ($related_products as $pid): $p = get_post($pid); if (!$p) continue; ?>
                <a class="glass-card" href="<?php echo esc_url(get_permalink($p)); ?>">
                  <h3><?php echo esc_html($p->post_title); ?></h3>
                  <p><?php echo esc_html(get_the_excerpt($p)); ?></p>
                </a>
              <?php endforeach; ?>
            </div>
          <?php endif; ?>

          <?php if ($related_solutions): ?>
            <h2 class="section-title" style="font-size:22px;margin-top:48px;"><?php _e('Related Solutions', 'batum'); ?></h2>
            <div class="card-grid">
              <?php foreach ($related_solutions as $sid): $s = get_post($sid); if (!$s) continue; ?>
                <a class="glass-card" href="<?php echo esc_url(get_permalink($s)); ?>">
                  <h3><?php echo esc_html($s->post_title); ?></h3>
                  <p><?php echo esc_html(get_the_excerpt($s)); ?></p>
                </a>
              <?php endforeach; ?>
            </div>
          <?php endif; ?>

          <div class="glass-card" style="margin-top:48px;text-align:center;">
            <h3><?php _e('Talk to an Engineer', 'batum'); ?></h3>
            <p style="margin-bottom:20px;"><?php _e('Send your project requirements and lane/door count — our engineering team will respond with a configuration recommendation.', 'batum'); ?></p>
            <a class="btn btn-primary" href="<?php echo esc_url(add_query_arg('product', urlencode(get_the_title()), get_permalink(get_page_by_path('contact')))); ?>"><?php echo esc_html(batum_str('Contact Engineer')); ?></a>
          </div>
        </div>
      </div>
    <?php endwhile; ?>
  </div>
</section>

<?php get_footer(); ?>
