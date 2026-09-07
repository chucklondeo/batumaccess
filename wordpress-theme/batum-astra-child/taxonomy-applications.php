<?php if (!defined('ABSPATH')) exit; get_header();
$term = get_queried_object();
?>
<div class="batum-page">
<section class="section section-off-white">
  <div class="wrap">
    <p class="kicker"><?php echo esc_html(batum_str('Applications')); ?></p>
    <h1 class="page-title"><?php echo esc_html($term->name); ?></h1>
    <?php if ($term->description): ?><p class="section-body"><?php echo esc_html($term->description); ?></p><?php endif; ?>

    <div class="card-grid">
      <?php while (have_posts()): the_post(); ?>
        <a class="glass-card" href="<?php the_permalink(); ?>">
          <span class="badge"><?php echo esc_html(get_post_type_object(get_post_type())->labels->singular_name); ?></span>
          <h3><?php the_title(); ?></h3>
          <p><?php echo esc_html(get_the_excerpt()); ?></p>
        </a>
      <?php endwhile; ?>
    </div>
  </div>
</section>

</div>
<?php get_footer(); ?>
