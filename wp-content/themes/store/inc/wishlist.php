<?php

add_action('wp_ajax_add_item_to_wishlist', 'add_item_to_wishlist');
add_action('wp_ajax_nopriv_add_item_to_wishlist', 'add_item_to_wishlist');
    function add_item_to_wishlist() {
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

if ( defined( 'YITH_WCWL' ) && ! function_exists( 'yith_wcwl_ajax_show_wishlist' ) ) {
    function yith_wcwl_ajax_show_wishlist() {
        $wishlist = YITH_WCWL_Wishlist_Factory::get_current_wishlist();
        if($wishlist){
            $wishlist_items = $wishlist->get_items();
            foreach ( $wishlist_items as $item ) {
                $product = $item->get_product();
                $response[] = array(
                    'variation_name' => wc_get_formatted_variation( $product, true, false, false ),
                    'product_name' => $product->get_title(),
                    'product_id' => $item['product_id'] ?? 0,
                    'product_img' => wp_get_attachment_image_url ( $product->get_image_id(), 'medium' ),
                    'price' => $product->get_price_html(),
                    'stock_quantity' => $product->get_stock_quantity(),
                );
            }
        }
        foreach ($response as $res){
            get_template_part('template-parts/modal/sidebar-show-wishlist', null,array(
                'response'          => $res
            ));
        }
        wp_die();
    }

    add_action( 'wp_ajax_yith_wcwl_ajax_show_wishlist', 'yith_wcwl_ajax_show_wishlist' );
    add_action( 'wp_ajax_nopriv_yith_wcwl_ajax_show_wishlist', 'yith_wcwl_ajax_show_wishlist' );
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
