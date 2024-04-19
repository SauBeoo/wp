<?php
/**
 * @ khai bao hang gia tri
 * @Them
 */
define( 'THEME_URL', get_stylesheet_directory() );
define('CORE', THEME_URL. "/core");
define('INC', THEME_URL. "/inc");

/**
 *nhungs file /core
 */
require_once( CORE. "/init.php");
require_once( INC. "/cart.php");
require_once( INC. "/wishlist.php");
require_once( INC. "/search.php");

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
        /* Them menu */
        register_nav_menu('primary-menu', __('Primary Menu', 'store'));
        
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
            wp_enqueue_script( 'my-data', get_template_directory_uri() . '/assets/js/get-data.js', array( 'jquery' ), '1.0.0', true );
            wp_enqueue_script( 'my-jquery', get_template_directory_uri() . '/assets/js/jquery.min.js', array( 'jquery' ), '1.0.0', true );
            wp_enqueue_script( 'my-theme-script-f1', get_template_directory_uri() . '/assets/js/f1-js-plugin.js', array( 'jquery' ), '1.0.0', true );
            wp_enqueue_script( 'my-theme-script', get_template_directory_uri() . '/assets/js/main.js', array( 'jquery' ), '1.0.0', true );
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

////Function login page
//    function redirect_login_page() {
//        $login_page = home_url( '/login/' );
//        $page_viewed = basename($_SERVER['REQUEST_URI']);
//
//        if( $page_viewed == "wp-login.php" && $_SERVER['REQUEST_METHOD'] == 'GET') {
//            wp_redirect($login_page);
//            exit;
//        }
//    }
//    add_action('init','redirect_login_page');
////Login Failed
//    function login_failed() {
//        $login_page = home_url( '/login/' );
//        wp_redirect( $login_page . '?login=failed' );
//        exit;
//    }
//    add_action( 'wp_login_failed', 'login_failed' );
////Login failed pass or user
//    function verify_username_password( $user, $username, $password ) {
//        $login_page = home_url( '/login/' );
//        if( $username == "" || $password == "" ) {
//            wp_redirect( $login_page . "?login=empty" );
//            exit;
//        }
//    }
//    add_filter( 'authenticate', 'verify_username_password', 1, 3);
////Log Out
//    function logout_page() {
//        $login_page = home_url( '/login/' );
//        wp_redirect( $login_page . "?login=false" );
//        exit;
//    }
//    add_action('wp_logout','logout_page');

}
