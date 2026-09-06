<?php if (!defined('ABSPATH')) exit; get_header(); ?>

<section class="section">
  <div class="wrap">
    <?php if (have_posts()): while (have_posts()): the_post(); ?>
      <article style="margin-bottom:48px;">
        <?php if (is_singular()): ?>
          <h1 class="page-title"><?php the_title(); ?></h1>
          <?php if (has_post_thumbnail()): ?>
            <div style="margin:20px 0;max-width:720px;"><?php the_post_thumbnail('large'); ?></div>
          <?php endif; ?>
          <div class="section-body" style="max-width:720px;"><?php the_content(); ?></div>
        <?php else: ?>
          <h2 class="section-title" style="font-size:26px;"><a href="<?php the_permalink(); ?>"><?php the_title(); ?></a></h2>
          <p class="section-body"><?php echo esc_html(get_the_excerpt()); ?></p>
        <?php endif; ?>
      </article>
    <?php endwhile; else: ?>
      <p><?php _e('Nothing found.', 'batum'); ?></p>
    <?php endif; ?>
  </div>
</section>

<?php get_footer(); ?>
