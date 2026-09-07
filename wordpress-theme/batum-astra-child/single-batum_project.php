<?php if (!defined('ABSPATH')) exit; get_header(); ?>
<div class="batum-page">

<section class="section section-off-white">
  <div class="wrap">
    <?php while (have_posts()): the_post();
      $id = get_the_ID();
      $meta = [
          __('Country', 'batum') => get_post_meta($id, '_batum_country', true),
          __('City', 'batum') => get_post_meta($id, '_batum_city', true),
          __('Customer Type', 'batum') => get_post_meta($id, '_batum_customer_type', true),
          __('Industry', 'batum') => get_post_meta($id, '_batum_industry', true),
          __('Quantity', 'batum') => get_post_meta($id, '_batum_quantity', true),
          __('Date', 'batum') => get_post_meta($id, '_batum_project_date', true)
      ];
      $problem = get_post_meta($id, '_batum_problem', true);
      $solution = get_post_meta($id, '_batum_solution_text', true);
      $result = get_post_meta($id, '_batum_result', true);
      $gallery = batum_get_gallery_ids($id);
    ?>
      <p class="breadcrumb"><a href="<?php echo esc_url(get_post_type_archive_link('batum_project')); ?>"><?php echo esc_html(batum_str('Projects')); ?></a> / <?php the_title(); ?></p>
      <h1 class="page-title"><?php the_title(); ?></h1>

      <table class="spec-table" style="max-width:480px;">
        <?php foreach ($meta as $label => $value): if (!$value) continue; ?>
          <tr><th><?php echo esc_html($label); ?></th><td><?php echo esc_html($value); ?></td></tr>
        <?php endforeach; ?>
      </table>

      <?php if ($problem): ?><h2 class="section-title" style="font-size:22px;margin-top:32px;"><?php _e('Problem', 'batum'); ?></h2><p class="section-body"><?php echo nl2br(esc_html($problem)); ?></p><?php endif; ?>
      <?php if ($solution): ?><h2 class="section-title" style="font-size:22px;"><?php _e('Solution', 'batum'); ?></h2><p class="section-body"><?php echo nl2br(esc_html($solution)); ?></p><?php endif; ?>
      <?php if ($result): ?><h2 class="section-title" style="font-size:22px;"><?php _e('Result', 'batum'); ?></h2><p class="section-body"><?php echo nl2br(esc_html($result)); ?></p><?php endif; ?>

      <?php if ($gallery): ?>
        <div class="gallery-grid">
          <?php foreach ($gallery as $img_id): $url = wp_get_attachment_image_url($img_id, 'medium'); if ($url): ?>
            <img src="<?php echo esc_url($url); ?>" alt="">
          <?php endif; endforeach; ?>
        </div>
      <?php endif; ?>
    <?php endwhile; ?>
  </div>
</section>

</div>
<?php get_footer(); ?>
