<article id="post-<?php the_ID(); ?>" <?php  post_class(); ?> >
<div class="entry-thumbnail">
    <?php store_thumbnail('thumbnail') ?>
</div>
    <div class="entry-header">
        <?php store_entry_header();?>
        <?php twenty_twenty_one_entry_meta_footer();?>
    </div>
</article>