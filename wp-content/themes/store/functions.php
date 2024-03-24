<?php
/**
 * @ khai bao hang gia tri
 * @Them
 */
define( 'THEME_URL', get_stylesheet_directory() );
define('CORE', THEME_URL. "/core");

/**
 *nhungs file /core
 */
require_once( CORE. "/init.php");

/**
 * @ thiet lap chieu rong noi dung
 */
if(!isset($content_width)){
 $content_width = 620;
}
/**
 * custom menu
 */
include_once( THEME_URL . '/templates/menu/walker-menu.php' );

/**
 *Khai bao chuc nang cua theme
 */
if( !function_exists('store_theme_setup')){
    function store_theme_setup() {
        /* thiet lap textdomain */
        $language_folder = THEME_URL . 'languages';
        load_theme_textdomain('store', $language_folder);

        /* tu dong them link Rss len head  */
        add_theme_support('automatic-feed-links');

        /* them post format */

        add_theme_support('post-formats',
        array(
            'image',
            'video',
            'gallery',
            'quote',
            'link'
            ));
         /* Them title-tag */
        add_theme_support('title-tag');

        /* Them custom background */
        $default_background = array(
            'default-color' => '#e8e8e8'
        );
        add_theme_support('custom-background', $default_background);

        /* Them menu */
        register_nav_menu('primary-menu', __('Primary Menu', 'store'));

        /* Tao sidebar */
        $sidebar = array(
            'name' => __('Main Sidebar', 'store'),
            'id' => 'main-sidebar',
            'description' => __('Default sidebar'),
            'class' => 'main-sidebar',
            'before_title' => '<h3 class="widgettitle">',
            'after_title' => '</h3>'
        );

        register_sidebar($sidebar);


        function my_theme_enqueue_scripts() {
            // Enqueue style.css
            wp_enqueue_style(
                'wc-shop-font-awesome',
                get_template_directory_uri() . '/assets/css/f1-css-plugin.css',
                [],
                wp_get_theme()->get( 'Version' )
            );
            wp_enqueue_style(
                'wc-style-custom-awesome',
                get_template_directory_uri() . '/assets/css/style-custom.css',
                [],
                wp_get_theme()->get( 'Version' )
            );
            wp_enqueue_style(
                'custom-theme-style',
                get_stylesheet_uri(),
                [],
                wp_get_theme()->get( 'Version' )
            );
            // Enqueue custom.js
//    wp_enqueue_script( 'my-theme-script', get_template_directory_uri() . '/js/custom.js', array( 'jquery' ), '1.0.0', true );
        }
        add_action( 'wp_enqueue_scripts', 'my_theme_enqueue_scripts' );
    }
    add_action('init', 'store_theme_setup');

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

    /**
     *hien thi data post
     */
    if ( ! function_exists( 'twenty_twenty_one_entry_meta_footer' ) ) {
        /**
         * Prints HTML with meta information for the categories, tags and comments.
         * Footer entry meta is displayed differently in archives and single posts.
         *
         * @since Twenty Twenty-One 1.0
         *
         * @return void
         */
        function twenty_twenty_one_entry_meta_footer() {

            // Early exit if not a post.
            if ( 'post' !== get_post_type() ) {
                return;
            }

            // Hide meta information on pages.
            if ( ! is_single() ) {

                if ( is_sticky() ) {
                    echo '<p>' . esc_html_x( 'Featured post', 'Label for sticky posts', 'store' ) . '</p>';
                }

                $post_format = get_post_format();
                if ( 'aside' === $post_format || 'status' === $post_format ) {
                    echo '<p><a href="' . esc_url( get_permalink() ) . '">' . twenty_twenty_one_continue_reading_text() . '</a></p>'; // phpcs:ignore WordPress.Security.EscapeOutput
                }

                // Posted on.
                twenty_twenty_one_posted_on();

                // Edit post link.
                edit_post_link(
                    sprintf(
                    /* translators: %s: Post title. Only visible to screen readers. */
                        esc_html__( 'Edit %s', 'store' ),
                        '<span class="screen-reader-text">' . get_the_title() . '</span>'
                    ),
                    '<span class="edit-link">',
                    '</span><br>'
                );

                if ( has_category() || has_tag() ) {

                    echo '<div class="post-taxonomies">';

                    $categories_list = get_the_category_list( wp_get_list_item_separator() );
                    if ( $categories_list ) {
                        printf(
                        /* translators: %s: List of categories. */
                            '<span class="cat-links">' . esc_html__( 'Categorized as %s', 'store' ) . ' </span>',
                            $categories_list // phpcs:ignore WordPress.Security.EscapeOutput
                        );
                    }

                    $tags_list = get_the_tag_list( '', wp_get_list_item_separator() );
                    if ( $tags_list ) {
                        printf(
                        /* translators: %s: List of tags. */
                            '<span class="tags-links">' . esc_html__( 'Tagged %s', 'store' ) . '</span>',
                            $tags_list // phpcs:ignore WordPress.Security.EscapeOutput
                        );
                    }
                    echo '</div>';
                }
            } else {

                echo '<div class="posted-by">';
                // Posted on.
                twenty_twenty_one_posted_on();
                // Posted by.
                twenty_twenty_one_posted_by();
                // Edit post link.
                edit_post_link(
                    sprintf(
                    /* translators: %s: Post title. Only visible to screen readers. */
                        esc_html__( 'Edit %s', 'store' ),
                        '<span class="screen-reader-text">' . get_the_title() . '</span>'
                    ),
                    '<span class="edit-link">',
                    '</span>'
                );
                echo '</div>';

                if ( has_category() || has_tag() ) {

                    echo '<div class="post-taxonomies">';

                    $categories_list = get_the_category_list( wp_get_list_item_separator() );
                    if ( $categories_list ) {
                        printf(
                        /* translators: %s: List of categories. */
                            '<span class="cat-links">' . esc_html__( 'Categorized as %s', 'store' ) . ' </span>',
                            $categories_list // phpcs:ignore WordPress.Security.EscapeOutput
                        );
                    }

                    $tags_list = get_the_tag_list( '', wp_get_list_item_separator() );
                    if ( $tags_list ) {
                        printf(
                        /* translators: %s: List of tags. */
                            '<span class="tags-links">' . esc_html__( 'Tagged %s', 'store' ) . '</span>',
                            $tags_list // phpcs:ignore WordPress.Security.EscapeOutput
                        );
                    }
                    echo '</div>';
                }
            }
        }
    }
    if ( ! function_exists( 'twenty_twenty_one_posted_on' ) ) {
        /**
         * Prints HTML with meta information for the current post-date/time.
         *
         * @since Twenty Twenty-One 1.0
         *
         * @return void
         */
        function twenty_twenty_one_posted_on() {
            $time_string = '<time class="entry-date published updated" datetime="%1$s">%2$s</time>';

            $time_string = sprintf(
                $time_string,
                esc_attr( get_the_date( DATE_W3C ) ),
                esc_html( get_the_date() )
            );
            echo '<span class="posted-on">';
            printf(
            /* translators: %s: Publish date. */
                esc_html__( 'Published %s', 'store' ),
                $time_string // phpcs:ignore WordPress.Security.EscapeOutput
            );
            echo '</span>';
        }
    }

    if ( ! function_exists( 'twenty_twenty_one_posted_by' ) ) {
        /**
         * Prints HTML with meta information about theme author.
         *
         * @since Twenty Twenty-One 1.0
         *
         * @return void
         */
        function twenty_twenty_one_posted_by() {
            if ( ! get_the_author_meta( 'description' ) && post_type_supports( get_post_type(), 'author' ) ) {
                echo '<span class="byline">';
                printf(
                /* translators: %s: Author name. */
                    esc_html__( 'By %s', 'store' ),
                    '<a href="' . esc_url( get_author_posts_url( get_the_author_meta( 'ID' ) ) ) . '" rel="author">' . esc_html( get_the_author() ) . '</a>'
                );
                echo '</span>';
            }
        }
    }
}