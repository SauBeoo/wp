<?php

add_action('wp_ajax_add_item_to_wishlist', 'add_item_to_wishlist');
add_action('wp_ajax_nopriv_add_item_to_wishlist', 'add_item_to_wishlist');
    function add_item_to_wishlist() {
//        $atts = shortcode_atts(
//            array(
//                'per_page'        => 5,
//                'current_page'    => 1,
//                'pagination'      => 'no',
//                'wishlist_id'     => get_query_var( 'wishlist_id', false ),
//                'action_params'   => get_query_var( YITH_WCWL()->wishlist_param, false ),
//                'no_interactions' => 'no',
//                'layout'          => '',
//            ),
//            $atts
//        );
//        $wishlist = YITH_WCWL_Wishlist_Factory::get_current_wishlist( $atts );
//        $wishlist_items = $wishlist->get_items();
//        foreach ( $wishlist_items as $item ) {
////            $product = $item->get_product();
////            $get_title = $product->get_title();
////            var_dump($get_title);die;
//        }
//
//        var_dump(count($wishlist_items));die;
        if ( ! isset( $_REQUEST['nonce'] ) || ! wp_verify_nonce( sanitize_text_field( wp_unslash( $_REQUEST['nonce'] ) ), 'add_to_wishlist' ) ) {
            wp_send_json( array( 'result' => false ) );
        }

        try {
            YITH_WCWL()->add();
            return true;
        } catch ( YITH_WCWL_Exception $e ) {
            $return = $e->getTextualCode();
            $message = apply_filters( 'yith_wcwl_error_adding_to_wishlist_message', $e->getMessage() );
        } catch ( Exception $e ) {
            $return  = 'error';
            $message = apply_filters( 'yith_wcwl_error_adding_to_wishlist_message', $e->getMessage() );
        }
    }


if ( defined( 'YITH_WCWL' ) && ! function_exists( 'yith_wcwl_ajax_update_count' ) ) {
    function yith_wcwl_ajax_update_count() {
        wp_send_json( array(
            'count' => yith_wcwl_count_all_products()
        ) );
    }

    add_action( 'wp_ajax_yith_wcwl_update_wishlist_count', 'yith_wcwl_ajax_update_count' );
    add_action( 'wp_ajax_nopriv_yith_wcwl_update_wishlist_count', 'yith_wcwl_ajax_update_count' );
}

if ( defined( 'YITH_WCWL' ) && ! function_exists( 'yith_wcwl_enqueue_custom_script' ) ) {
    function yith_wcwl_enqueue_custom_script() {
        wp_add_inline_script(
            'jquery-yith-wcwl',
            "
                jQuery( function( $ ) {
                  $( document ).on( 'added_to_wishlist removed_from_wishlist', function() {
                    $.get( yith_wcwl_l10n.ajax_url, {
                      action: 'yith_wcwl_update_wishlist_count'
                    }, function( data ) {
                      $('.sidebarAllMainWishlistCount').html( data.count );
                    } );
                  } );
                } );
              "
        );
    }

    add_action( 'wp_enqueue_scripts', 'yith_wcwl_enqueue_custom_script', 20 );
}
