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
require THEME_URL . '/templates/menu/walker-menu.php';

// Enhance the theme by hooking into WordPress.
require THEME_URL . '/inc/template-functions.php';

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
        add_theme_support('woocommerce');
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

    function webkul_add_woocommerce_support() {
        //Add WoocCommerce theme support to our theme
        add_theme_support( 'woocommerce');
        // To enable gallery features add WooCommerce Product zoom effect, lightbox and slider support to our theme
        add_theme_support( 'wc-product-gallery-zoom' );
        add_theme_support( 'wc-product-gallery-lightbox' );
        add_theme_support( 'wc-product-gallery-slider' );
    }
    add_action( 'after_setup_theme', 'webkul_add_woocommerce_support' );
}