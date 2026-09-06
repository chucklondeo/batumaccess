<?php
/* Template Name: Contact */
if (!defined('ABSPATH')) exit; get_header();
?>

<section class="section light-section">
  <div class="wrap" style="display:grid;gap:32px;grid-template-columns:1fr;max-width:900px;">
    <div>
      <?php while (have_posts()): the_post(); ?>
        <h1 class="page-title"><?php the_title(); ?></h1>
        <div class="section-body"><?php the_content(); ?></div>
      <?php endwhile; ?>
      <p><a href="mailto:<?php echo esc_attr(BATUM_INQUIRY_EMAIL); ?>"><?php echo esc_html(BATUM_INQUIRY_EMAIL); ?></a></p>
    </div>

    <form action="https://formsubmit.co/<?php echo esc_attr(BATUM_INQUIRY_EMAIL); ?>" method="POST" class="glass-card">
      <input type="hidden" name="_subject" value="Batum Technology website inquiry">
      <input type="hidden" name="_template" value="table">
      <input type="hidden" name="_captcha" value="false">
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
      <label class="field"><?php echo esc_html(batum_str('Interested product')); ?>
        <input type="text" name="interested_product">
      </label>
      <label class="field"><?php echo esc_html(batum_str('Project requirements')); ?>
        <textarea name="project_requirements" required></textarea>
      </label>
      <button type="submit" class="btn btn-primary"><?php echo esc_html(batum_str('Submit Inquiry')); ?></button>
    </form>
  </div>
</section>

<?php get_footer(); ?>
