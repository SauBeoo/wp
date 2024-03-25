<?php

/**
 *phan trang
 */
if( !function_exists('store_pagination')){
    function store_pagination(){
        if ($GLOBALS['wp_query']->max_num_pages < 2){
            return '';
        }?>
        <nav class="pagination" role="navigation">
            <?php if (get_next_posts_link()) :  ?>
                <div class="prev"><?php  next_posts_link( __('Older Posts', 'store'));?> </div>
            <?php  endif; ?>
            <?php if (get_previous_posts_link()) :  ?>
                <div class="next"><?php  previous_posts_link( __('Newest Posts', 'store'));?> </div>
            <?php  endif; ?>
        </nav>
    <?php }
}
/**
 *hien thi thumbnail
 */
if( !function_exists('store_thumbnail')){
    function store_thumbnail($size){
        if ( !is_single() && has_post_thumbnail() && !post_password_required() || has_post_format('image')) : ?>
            <figure class="post-thumbnail">
                <?php  the_post_thumbnail($size); ?>
            </figure>
        <?php  endif; ?>
        <?php
    }
}

/**
 *hien thi tieu de post
 */
if( !function_exists('store_entry_header')){
    function store_entry_header(){
        if ( is_single()) : ?>
            <h1> <a href="<?php the_permalink(); ?>" title="<?php the_title(); ?>" ><?php the_title(); ?></a> </h1>
        <?php  else : ?>
            <h2><a href="<?php the_permalink(); ?>" title="<?php the_title(); ?>"> <?php the_title(); ?> </a></h2>
        <?php  endif; ?>
        <?php
    }
}

