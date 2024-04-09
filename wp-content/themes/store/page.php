<?php
/*
Template Name: Custom Cart
*/
get_header()
?>
<?php
echo do_shortcode('[yith_wcwl_wishlist]');
//echo do_shortcode('[woocommerce_cart]')
;?>

<?php get_footer() ?>