<?php  // Set defaults.
$array_defaults = array(
    'response'          => []
);

$args = wp_parse_args($args, $array_defaults );
$response = $args['response'];
?>
<div class="productWrapQW">
    <div class="container">
        <div class="row">
            <div class="col-lg-6 col-md-6 col-sm-12 col-12">
                <div class="productWrapImageQW">
                    <div class="featureImageQW swiper-container swiper-container-initialized swiper-container-horizontal">
                        <div class="swiper-wrapper">
                            <div class="thumbImageItemQW swiper-slide swiper-slide-duplicate" >
                                <picture>
                                    <img class="img-fluid" src="<?php echo $response['product_img'] ?>" alt="<?php echo $response['product_name'] ?>">
                                </picture>
                            </div>
                            <div class="thumbImageItemQW swiper-slide" >
                                <picture>
                                    <img class="img-fluid" src="<?php echo $response['product_img'] ?>" alt="<?php echo $response['product_name'] ?>">
                                </picture>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="col-lg-6 col-md-6 col-sm-12 col-12">
                <div class="productWrapDetailQW">
                    <h1 class="productTitleQW"><?php echo $response['product_name'] ?></h1>
                    <div class="productPriceQW">
                        <div class="productPriceBoxQW">
                            <span class="productPriceMainQW"><?php echo $response['price'] ?></span>
                        </div>
                    </div>
                    <div class="productInfoMainQW">

                        <div class="productSkuQW">
                            <span>Mã sản phẩm: </span>
                            <span id="sku"></span>
                        </div>
                        <div class="productVendorQW">
                            <span>Thương hiệu: </span> Lamluy
                        </div>
                        <div class="productCollectionQW">
                            <span>Nhóm sản phẩm: </span>

                            <?php echo $response['cate'] ?>

                        </div>
                    </div>
                    <div class="product-swatchQW">
                        <div class="product-sw-lineQW">
                            <div class="product-sw-titleQW">
                                Kích thước
                            </div>
                            <div class="product-sw-selectQW">
                                <?php
                                if($response['variation_qty'])
                                    foreach ($response['variation_qty'] as $key =>$value):?>
                                    <span class="product-sw-select-itemQW">
                                        <input type="radio" name="product-choose-kich-thuocQW" data-name="option1"
                                               value="<?php echo $key?>"
                                               data-sku="<?php echo $value['sku'] ?>"
                                               data-qty="<?php echo (int)$value['max_qty'] ?>"
                                               class="trigger-option-swQW d-none <?php echo (int)$value['max_qty'] == 0 ? 'soldOut' : '' ?>"
                                               id="product-choose-kich-thuoc-<?php echo $key?>">
                                        <label for="product-choose-kich-thuoc-<?php echo $key?>"
                                               class="product-sw-select-item-spanQW "><?php echo $value['name'] ?></label>
                                    </span>
                                <?php endforeach; ?>
                            </div>
                        </div>
                    </div>
                    <div class="productActionMainQW">
                        <div class="quantityAreaQW">
                            <button class="qtyBtn minusQuanQW" data-type="minus">-</button>
                            <input type="number" id="quantityQW" name="quantity" value="1" min="1"
                                   class="quantitySelector">
                            <button class="qtyBtn plusQuanQW" data-type="plus">+</button>
                        </div>
                        <div class="productActionQW">
                            <button type="button" id="addToCartQW">
                                Thêm vào giỏ
                            </button>
                            <button type="button" id="buyNowQW">
                                Mua ngay
                            </button>
                        </div>
                    </div>
                    <div class="productSharingQW">
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>