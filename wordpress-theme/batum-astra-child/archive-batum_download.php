<?php if (!defined('ABSPATH')) exit; get_header();

$current_term = get_query_var('download_category');
$terms = get_terms(['taxonomy' => 'download_category', 'hide_empty' => false]);
?>

<section class="section">
  <div class="wrap">
    <p class="kicker"><?php echo esc_html(batum_str('Downloads')); ?></p>
    <h1 class="page-title"><?php _e('Download Center', 'batum'); ?></h1>

    <form method="get" action="<?php echo esc_url(get_post_type_archive_link('batum_download')); ?>" style="margin-bottom:32px;max-width:420px;">
      <input class="field" style="text-transform:none;" type="search" name="s" placeholder="<?php esc_attr_e('Search downloads…', 'batum'); ?>" value="<?php echo esc_attr(get_search_query()); ?>">
      <input type="hidden" name="post_type" value="batum_download">
    </form>

    <?php if ($terms && !is_wp_error($terms)): ?>
      <div style="display:flex;flex-wrap:wrap;gap:10px;margin-bottom:36px;">
        <a class="badge" href="<?php echo esc_url(get_post_type_archive_link('batum_download')); ?>"><?php _e('All', 'batum'); ?></a>
        <?php foreach ($terms as $term): ?>
          <a class="badge" href="<?php echo esc_url(get_term_link($term)); ?>"><?php echo esc_html($term->name); ?></a>
        <?php endforeach; ?>
      </div>
    <?php endif; ?>

    <div class="card-grid">
      <?php while (have_posts()): the_post();
        $file_id = get_post_meta(get_the_ID(), '_batum_download_file_id', true);
        $file_url = $file_id ? wp_get_attachment_url($file_id) : '';
      ?>
        <a class="glass-card" href="<?php echo esc_url($file_url ?: get_permalink()); ?>" <?php echo $file_url ? 'download' : ''; ?>>
          <h3><?php the_title(); ?></h3>
          <p><?php echo esc_html(get_the_excerpt()); ?></p>
        </a>
      <?php endwhile; ?>
    </div>
  </div>
</section>

<?php get_footer(); ?>
