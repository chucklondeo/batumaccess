<?php
/* Template Name: Contact */
if (!defined('ABSPATH')) exit; get_header();
$requested_product = isset($_GET['product']) ? sanitize_text_field($_GET['product']) : '';
?>
<div class="batum-page">
<section class="section section-off-white">
  <div class="wrap" style="display:grid;gap:32px;grid-template-columns:1fr;max-width:900px;">
    <div>
      <?php while (have_posts()): the_post(); ?>
        <h1 class="page-title"><?php the_title(); ?></h1>
        <div class="section-body"><?php the_content(); ?></div>
      <?php endwhile; ?>
      <p><a href="mailto:<?php echo esc_attr(BATUM_INQUIRY_EMAIL); ?>"><?php echo esc_html(BATUM_INQUIRY_EMAIL); ?></a></p>
    </div>

    <form action="https://formsubmit.co/<?php echo esc_attr(BATUM_INQUIRY_EMAIL); ?>" method="POST" class="glass-card">
      <input type="hidden" name="_subject" value="BATUM Technology website inquiry">
      <input type="hidden" name="_template" value="table">
      <input type="hidden" name="_captcha" value="false">
      <input type="hidden" name="source_url" value="<?php echo esc_url((isset($_SERVER['HTTP_REFERER']) ? $_SERVER['HTTP_REFERER'] : '')); ?>">
      <input type="hidden" name="submitted_at" value="<?php echo esc_attr(current_time('mysql')); ?>">

      <label class="field"><?php echo esc_html(batum_str('Name')); ?>
        <input type="text" name="name" required>
      </label>
      <label class="field"><?php echo esc_html(batum_str('Company')); ?>
        <input type="text" name="company">
      </label>
      <label class="field"><?php echo esc_html(batum_str('Email')); ?>
        <input type="email" name="email" required>
      </label>
      <label class="field"><?php echo esc_html(batum_str('WhatsApp')); ?>
        <input type="text" name="whatsapp">
      </label>
      <label class="field"><?php echo esc_html(batum_str('Country')); ?>
        <input type="text" name="country">
      </label>
      <label class="field"><?php echo esc_html(batum_str('Product')); ?>
        <input type="text" name="product" value="<?php echo esc_attr($requested_product); ?>">
      </label>
      <label class="field"><?php echo esc_html(batum_str('Quantity')); ?>
        <input type="text" name="quantity">
      </label>
      <label class="field"><?php echo esc_html(batum_str('Project Type')); ?>
        <input type="text" name="project_type" placeholder="Highway ETC, Smart Parking, Metro AFC…">
      </label>
      <label class="field"><?php echo esc_html(batum_str('Message')); ?>
        <textarea name="message" required></textarea>
      </label>
      <button type="submit" class="btn btn-primary"><?php echo esc_html(batum_str('Request Quote')); ?></button>
    </form>
  </div>
</section>

</div>
<?php get_footer(); ?>
