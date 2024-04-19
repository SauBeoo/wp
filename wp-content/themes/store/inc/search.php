<?php

add_action('wp_ajax_wp_search_product', 'wp_search_product');
add_action('wp_ajax_nopriv_wp_search_product', 'wp_search_product');

function wp_search_product()
{
    $results = ywcas()->search->api_search( $_REQUEST );
    if($results){
        foreach ( $results['results'] as $item ) {
            $productID = $item['post_id'];
            $price = custom_display_price_in_search_results($productID);
            $response[] = array(
//                'variation_name' => wc_get_formatted_variation( $product, true, false, false ),
                'title' => $item['name'],
                'product_id' => $item['post_id'] ?? 0,
                'thumbnail' => $item['thumbnail']['small'],
                'price' => $price,
                'url' => esc_url( $item['url'])
            );
        }
        wp_send_json($response);
        var_dump($response);die;
    }

}


function custom_display_price_in_search_results($productID) {
    // Kiểm tra xem WooCommerce đã được kích hoạt chưa
    if ( class_exists( 'WooCommerce' ) ) {
//            global $product;

        // Lấy thông tin sản phẩm hiện tại
        $product = wc_get_product( $productID );
        // Kiểm tra nếu sản phẩm tồn tại
        if ( is_a( $product, 'WC_Product' ) ) {
            // Lấy giá của sản phẩm
           return $product->get_price_html();
        }
        return NULL;
    }
}