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
    
    /**
     * Show cart contents / total Ajax
     */
    add_filter( 'woocommerce_add_to_cart_fragments', 'store_theme_woocommerce_header_add_to_cart_fragment');

    function store_theme_woocommerce_header_add_to_cart_fragment( $fragments ) {
        global $woocommerce;

        ob_start();

        ?>
        <span class="sidebarAllMainCartCount"><?php echo $woocommerce->cart->get_cart_contents_count(); ?></span>
        <?php
        $fragments['span.sidebarAllMainCartCount'] = ob_get_clean();
        return $fragments;
    }
    
    add_action('wp_ajax_woocommerce_ajax_add_to_cart', 'woocommerce_ajax_add_to_cart');
    add_action('wp_ajax_nopriv_woocommerce_ajax_add_to_cart', 'woocommerce_ajax_add_to_cart');

    function woocommerce_ajax_add_to_cart() {
        $product_id = apply_filters('woocommerce_add_to_cart_product_id', absint($_POST['product_id']));
        $quantity = empty($_POST['quantity']) ? 1 : wc_stock_amount($_POST['quantity']);
        $variation_id = absint($_POST['variation_id']);
        $passed_validation = apply_filters('woocommerce_add_to_cart_validation', true, $product_id, $quantity);
        $product_status = get_post_status($product_id);

        if ($passed_validation && WC()->cart->add_to_cart($product_id, $quantity, $variation_id) && 'publish' === $product_status) {

            do_action('woocommerce_ajax_added_to_cart', $product_id);

            if ('yes' === get_option('woocommerce_cart_redirect_after_add')) {
                wc_add_to_cart_message(array($product_id => $quantity), true);
            }

            WC_AJAX :: get_refreshed_fragments();
        } else {

            $data = array(
                'error' => true,
                'product_url' => apply_filters('woocommerce_cart_redirect_after_error', get_permalink($product_id), $product_id));

            echo wp_send_json($data);
        }

        wp_die();
    }

    add_action('wp_ajax_fetch_cart_items', 'fetch_cart_items');
    add_action('wp_ajax_nopriv_fetch_cart_items', 'fetch_cart_items');

    function fetch_cart_items() {
        // Retrieve cart items using WooCommerce functions
        $cart_items = WC()->cart->get_cart();

        // Prepare the response
        $response = array();
        foreach ($cart_items as $cart_item_key => $cart_item) {
            $product = $cart_item['data'];
            $response['total'] =  WC()->cart->get_cart_contents_count();
//            $response['total_price'] = number_format(WC()->cart->total, 2, '.', '');
            $response['total_price'] = WC()->cart->get_cart_total();
            // Customize the response as needed
            $response['items'][] = array(
                'product_name' => $product->get_name(),
                'product_id' => $product->id ?? 0,
                'cart_item_key' => $cart_item_key  ?? 0,
                'product_img' => wp_get_attachment_image_url ( $product->get_image_id(), 'medium' ),
                'quantity' => $cart_item['quantity'],
                'subtotal' => WC()->cart->get_product_subtotal($product, $cart_item['quantity']),
                'price' => $product->get_price_html(),
                'stock_quantity' => $product->get_stock_quantity(),
            );
        }

        // Send the response as JSON
        wp_send_json($response);
    }

    add_action('wp_ajax_get_items', 'get_items');
    add_action('wp_ajax_nopriv_get_items', 'get_items');
    function get_items() {

        $product_id = $_REQUEST['product_id'];
        $product = wc_get_product( $product_id );
        $size = get_field('size', $product_id);
        $terms = wp_get_post_terms( $product_id, 'product_cat' );
        $term  = reset($terms);
        $response = array(
            'product_name' => $product->get_name(),
            'product_id' => $product_id ?? 0,
            'product_img' => wp_get_attachment_image_url ( $product->get_image_id(), 'medium' ),
            'price' => $product->get_price_html(),
            'size' => $size,
            'sku' => $product->get_sku(),
            'cate' => $term->name,
        );

        // Send the response as JSON
        wp_send_json($response);
//        wp_die();
    }

    add_action('wp_ajax_update_cart_quantity', 'update_cart_quantity');
    add_action('wp_ajax_nopriv_update_cart_quantity', 'update_cart_quantity');

    function update_cart_quantity() {
        $cart_item_key = $_REQUEST['cart_item_key'];
        $quantity = $_REQUEST['quantity'];
        $value = $_REQUEST['value'];

        WC()->cart->set_quantity($cart_item_key, $quantity + $value);
        $cart = WC()->cart;
        echo json_encode($cart->total);
        wp_die();
    }
}
