<?php
$term_args = array( 'taxonomy' => 'product_cat',
// 'childless' => 'true'
);
$term_query = new WP_Term_Query($term_args);
if (!empty($term_query->terms)) {
    foreach ($term_query->terms as $term) {
        
        if ($custom_content = get_field('category_top', 'product_cat_' . $term->term_id)){
?>
<section id="groupOne">
    <div class="container" >
        <div class="groupHeader" >
            <p></p>
            <h2> <?php echo $term->name ?? '' ?> </h2>
        </div>
        <div class="groupMain" >
            <?php if ( !wp_is_mobile() ){ ?>
            
            <div class="groupMainDesktop" >
                <div class="grid-container">
            <?php } else { ?>
            <div class="groupMainMobile" >
            <?php }?>
        <?php
            $top_products = wc_get_products(array(
                'limit' => 6,
                'tax_query'             => array(
                    array(
                        'taxonomy'      => 'product_cat',
                        'field'         => 'term_id',
                        'terms'         => $term->term_id,
                        'operator'      => 'IN'
                    ),
                ),
            ));
            $i = 0;
            foreach($top_products as $key => $product) {
        ?>
            <?php if ( !wp_is_mobile() ){ ?>
            <div class="grid-item-<?php echo $key++ ?>">
                <div class="proLoop" >
                    <div class="productWrapper" >
                        <div class="productImg" >
                            <div class="productImgWrap" >
                                <a href="/products/canh-tim-diu-dang" title="<?php echo $product->get_title();?>"
                                   class="productImgLink">
                                    <picture>
                                        <img  loading="lazy" data-src="<?php echo wp_get_attachment_image_url ( $product->get_image_id(), 'woocommerce_single' ); ?>"
                                              src="<?php echo wp_get_attachment_image_url ( $product->get_image_id(), 'woocommerce_single' ); ?>"
                                              class="img-fluid lazyloaded" alt="<?php echo $product->get_title();?> ">
                                    </picture>
                                    
                                    <?php    if ($custom_content = get_field('img-layer',$product->id)){?>
                                    <picture>
                                        <img  loading="lazy" data-src="<?php echo $custom_content['url']; ?>"
                                              src="<?php echo $custom_content['url']; ?>"
                                              class="lazyload img-fluid" alt="<?php echo $product->get_title();?>">
                                    </picture>
                                <?php } ?>
                                </a>
                            </div>
                            <div class="productAction" >
                                <a href="<?php echo do_shortcode( '[add_to_cart_url id=' .  $product->id . ']' ) ?>"
                                   data-quantity="1" class="setAddCartLoop add_to_cart_button ajax_add_to_cart added" data-product_id="<?php echo $product->id ?>" ><i class="lni lni-shopping-basket">
                                    </i>
                                </a>

                                <a href="javascript:void:0" class="setWishlist" data-handle="canh-tim-diu-dang"><i
                                        class="lni lni-heart"></i></a>
                            </div>
                        </div>
                        <div class="productDetail" >
                            <div class="productDetailMain" >
                                <h3 class="productName">
                                    <a href="/products/canh-tim-diu-dang" title="<?php echo $product->get_title();?>"><?php echo $product->get_title();?></a>
                                </h3>
                                <div class="productPriceMain" >
                                    <p class="productPrice">
                                        <?php echo $product->price ?? 0 ?>₫
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <?php } else { ?>
            <div class="proLoop" >
                <div class="productWrapper" >
                    <div class="productImg" >
                        <div class="productImgWrap" >
                            <a href="/products/canh-tim-diu-dang" title="<?php echo $product->get_title();?>"
                               class="productImgLink">
                                <picture>
                                    <source srcset="<?php echo wp_get_attachment_image_url ( $product->get_image_id(), 'woocommerce_single' ); ?>"
                                            data-srcset="<?php echo wp_get_attachment_image_url ( $product->get_image_id(), 'woocommerce_single' ); ?>"
                                            media="(max-width: 767px)">
                                    <source srcset="<?php echo wp_get_attachment_image_url ( $product->get_image_id(), 'woocommerce_single' ); ?>"
                                            data-srcset="<?php echo wp_get_attachment_image_url ( $product->get_image_id(), 'woocommerce_single' ); ?>"
                                            media="(max-width: 768px)">
                                    <img  loading="lazy" data-src="<?php echo wp_get_attachment_image_url ( $product->get_image_id(), 'woocommerce_single' ); ?>"
                                          src="<?php echo wp_get_attachment_image_url ( $product->get_image_id(), 'woocommerce_single' ); ?>"
                                          class="img-fluid lazyloaded" alt=" Bralette Cánh Tím Dịu Dàng ">
                                </picture>
                                <picture>
                                    <source srcset="<?php echo wp_get_attachment_image_url ( $product->get_image_id(), 'woocommerce_single' ); ?>"
                                            data-srcset="<?php echo wp_get_attachment_image_url ( $product->get_image_id(), 'woocommerce_single' ); ?>"
                                            media="(max-width: 767px)">
                                    <source srcset="<?php echo wp_get_attachment_image_url ( $product->get_image_id(), 'woocommerce_single' ); ?>"
                                            data-srcset="<?php echo wp_get_attachment_image_url ( $product->get_image_id(), 'woocommerce_single' ); ?>"
                                            media="(max-width: 768px)">
                                    <img  loading="lazy" data-src="<?php echo wp_get_attachment_image_url ( $product->get_image_id(), 'woocommerce_single' ); ?>"
                                          src="<?php echo wp_get_attachment_image_url ( $product->get_image_id(), 'woocommerce_single' ); ?>"
                                          class="img-fluid lazyloaded" alt=" Bralette Cánh Tím Dịu Dàng ">
                                </picture>
                            </a>
                        </div>
                        <div class="productAction" >
                            <a href="<?php echo do_shortcode( '[add_to_cart_url id=' .  $product->id . ']' ) ?>" class="setAddCartLoop"><i class="lni lni-shopping-basket">
                                </i>
                            </a>
                            <a href="javascript:void:0" class="setWishlist" ><i
                                    class="lni lni-heart"></i></a>
                        </div>
                    </div>
                    <div class="productDetail" >
                        <div class="productDetailMain" >
                            <h3 class="productName">
                                <a href="/products/canh-tim-diu-dang" title="<?php echo $product->get_title();?>"><?php echo $product->get_title();?></a>
                            </h3>
                            <div class="productPriceMain" >
                                <p class="productPrice"><?php echo $product->price ?? 0 ?>₫</p>
                            </div>
                        </div>
                    </div>
                </div>
        </div>
        <?php
            }
            }
        }
    }
} else {
    echo 'No term found';
}
?>
            </div>
        </div>
</section>
