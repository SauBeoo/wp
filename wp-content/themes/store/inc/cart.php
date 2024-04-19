<?php


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
    $passed_validation = apply_filters('woocommerce_add_to_cart_validation', true, $product_id, $quantity);
    $product_status    = get_post_status($product_id);
    $variation_id      = 0;
    $data_cart = WC()->cart->add_to_cart($product_id, $quantity, $variation_id);

    if ($passed_validation && $data_cart  && 'publish' === $product_status) {
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
        $response['total_price'] = WC()->cart->get_cart_total();
        if($cart_item['variation_id']){
            $link_product = esc_url( get_permalink( $cart_item['variation_id'] ));
        }else{
            $link_product = esc_url( get_permalink( $product->id ));
        }
        // Customize the response as needed
        $response['items'][] = array(
            'product_name' => $product->get_title(),
            'product_id' => $product->id ?? 0,
            'variation_name' => wc_get_formatted_variation( $product, true, false, false ),
            'cart_item_key' => $cart_item_key  ?? 0,
            'product_img' => wp_get_attachment_image_url ( $product->get_image_id(), 'medium' ),
            'quantity' => $cart_item['quantity'],
            'subtotal' => WC()->cart->get_product_subtotal($product, $cart_item['quantity']),
            'price' => $product->get_price_html(),
            'stock_quantity' => $product->get_stock_quantity(),
            'link_product' => $link_product,
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
//        $size = $product->get_attribute( 'pa_size' );
    $terms = wp_get_post_terms( $product_id, 'product_cat' );
    $term  = reset($terms);
    $variation_qty = [];
    if( $product->is_type('variable') ){
        foreach ($product->get_available_variations() as $variation_values) {
            $variation_qty[$variation_values['variation_id']]['max_qty'] = $variation_values['max_qty'];
            $variation = wc_get_product($variation_values['variation_id']);
            $variation_qty[$variation_values['variation_id']]['name'] = wc_get_formatted_variation($variation, true, false, false);
            $variation_qty[$variation_values['variation_id']]['sku'] = $variation_values['sku'];
        }
    }
    $response = array(
        'product_name' => $product->get_name(),
        'product_id' => $product_id ?? 0,
        'product_img' => wp_get_attachment_image_url ( $product->get_image_id(), 'medium_large' ),
        'price' => $product->get_price_html(),
//            'size' => $size,
        'sku' => $product->get_sku(),
        'cate' => $term->name,
        'variation_qty' => $variation_qty,
    );

    get_template_part('template-parts/modal/quick-view-modal-show', null,array(
        'response'          => $response
    ));
    // Send the response as JSON
//        wp_send_json($response);
    wp_die();
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
function setDefaultVariation($product) {
    if( $product->is_type('variable') ){
        $variation_id = 0;
        foreach($product->get_available_variations() as $variation_values ){
            foreach($variation_values['attributes'] as $key => $attribute_value ){
                $attribute_name = str_replace( 'attribute_', '', $key );
                $default_value = $product->get_variation_default_attribute($attribute_name);
                if( $default_value == $attribute_value ){
                    if($variation_values['is_in_stock']){
                        return  $variation_values['variation_id'];
                    }else{
                        $is_default_variation = false;
                    }
                } else {
                    $is_default_variation = false;
                }
                if(!$is_default_variation && $variation_values['is_in_stock'] ){
                    $variation_id = $variation_values['variation_id'];
                }
            }
        }
        return $variation_id;
    }
}
