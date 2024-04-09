<?php  // Set defaults.
$array_defaults = array(
    'response'          => []
);

$args = wp_parse_args($args, $array_defaults );
$response = $args['response'];
?>
<div class="itemMainWishlist">
    <a href="#">
        <picture>
            <img data-src="<?php echo $response['product_img'] ?>"
                 src="<?php echo $response['product_img'] ?>"
                 class="itemImage img-fluid ls-is-cached lazyloaded" alt="<?php echo $response['product_name'] ?>">
        </picture>
    </a>
    <div class="itemInfo">
        <a class="itemTitle" href="#"><?php echo $response['product_name'] ?></a>
        <div class="itemVariant">Size:<span style="text-transform: uppercase;"><?php echo $response['variation_name'] ?></span></div>
        <div class="itemPriceInfo">
            <span class="itemPriceMain"><?php echo $response['price'] ?></span>

        </div>
        <div class="itemAction">
            <div class="groupAdd">
                <div class="itemQuantity">
                    <button class="qtyBtn minusQuan" data-type="minus">-</button>
                    <input type="number" id="itemQuantityWishlist" name="quantity" value="1" min="1"
                           class="quantitySelector">
                    <button class="qtyBtn plusQuan" data-type="plus">+</button>
                </div>
                <div class="removeItem" data-handle="canh-tim-diu-dang">
                    <i class="lni lni-trash"></i>
                </div>
            </div>
            <div class="itemAdd">
                <a class="itemAddFromWishList" data-id="1117836747">Thêm vào giỏ</a>
            </div>
        </div>
    </div>
</div>