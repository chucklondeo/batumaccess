<?php if (!defined('ABSPATH')) exit; get_header(); ?>

<section class="section light-section">
  <div class="wrap">
    <?php while (have_posts()): the_post();
      $categories = get_the_terms(get_the_ID(), 'product_category');
      $category_label = $categories && !is_wp_error($categories) ? $categories[0]->name : '';
      $specs = batum_get_specs(get_the_ID());
      $datasheet_id = get_post_meta(get_the_ID(), '_batum_datasheet_id', true);
      $datasheet_url = $datasheet_id ? wp_get_attachment_url($datasheet_id) : '';
    ?>
      <?php if ($category_label): ?><span class="badge"><?php echo esc_html($category_label); ?></span><?php endif; ?>
      <h1 class="page-title"><?php the_title(); ?></h1>
      <?php if (has_post_thumbnail()): ?>
        <div style="margin-bottom:24px;max-width:480px;"><?php the_post_thumbnail('large'); ?></div>
      <?php endif; ?>
      <div class="section-body"><?php the_content(); ?></div>

      <?php if ($specs): ?>
        <ul class="spec-list">
          <?php foreach ($specs as $spec): ?><li><?php echo esc_html($spec); ?></li><?php endforeach; ?>
        </ul>
      <?php endif; ?>

      <?php if ($datasheet_url): ?>
        <p style="margin-top:28px;">
          <a class="btn btn-secondary" href="<?php echo esc_url($datasheet_url); ?>" download>
            <?php echo esc_html(batum_str('Download datasheet')); ?>
          </a>
        </p>
      <?php endif; ?>
    <?php endwhile; ?>
  </div>
</section>

<?php get_footer(); ?>
