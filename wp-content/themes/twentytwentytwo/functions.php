<?php
/**
 * Twenty Twenty-Two functions and definitions
 *
 * @link https://developer.wordpress.org/themes/basics/theme-functions/
 *
 * @package WordPress
 * @subpackage Twenty_Twenty_Two
 * @since Twenty Twenty-Two 1.0
 */

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


// Add block patterns
//require get_template_directory() . '/inc/block-patterns.php';
