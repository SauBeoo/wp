<!DOCTYPE html>
<html <?php language_attributes(); ?>>
<head>
    <meta charset="<?php bloginfo( 'charset' ); ?>">
<!--    <meta name="viewport" content="width=device-width, initial-scale=1">-->
    <link rel="profile" href="https://gmpg.org/xfn/11">
    <link rel="pingback" href="<?php   bloginfo('pingback_url'); ?>" >
    <!-- jQuery library -->
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.7.1/jquery.min.js"></script>

    <!-- Latest compiled JavaScript -->
    <script src="//theme.hstatic.net/200000272403/1000697133/14/f1-js-plugin.js?v=398"></script>
    <script src="https://cdn.jsdelivr.net/npm/swiper@11/swiper-bundle.min.js"></script>
    <script>
        try{
            var salePopupData = {
                o: [],
                u: [],
                a: [],
            };



            salePopupData.o.push("nhan-ban-tu-ao-thun-telly-shit-1");

            salePopupData.o.push("nhan-ban-tu-ao-thun-elix");




            salePopupData.u.push("Bích Thủy ở Quảng Bình");

            salePopupData.u.push("Quang Hải ở Nghệ An");

            salePopupData.u.push("Thu Quỳnh ở Hà Nội");

            salePopupData.u.push("Trọng Nghĩa ở Ninh Thuận");

            salePopupData.u.push("Văn Trọng ở TP.Hồ Chí Minh");



            salePopupData.a.push("Cách đây 30 phút");

            salePopupData.a.push("5 phút trước");

            salePopupData.a.push("7 phút trước");

            salePopupData.a.push("15 phút trước");

            salePopupData.a.push("1 ngày trước");

        }catch(e){}
    </script>
    <script>
        window.F1GEN_vars = {
            template: "index",
            formatMoney: '123₫',
            account: {
                logged: false,
                id: null,
                email: null
            },
            product: {
                data: null,
                id: null,
                handle: null,
                title: "",
                gift: false,
                availableOption: true
            },
            quickView: null,
            collection: {
                paginate: {
                    current: 1,
                    value: ""
                },
                data: {
                    id: "",
                    title: "",
                    vendors: "",
                    types: "",
                    sortBy: ""
                },
                filter: {
                    config:{
                        price: {
                            min: "0",
                            max: "20000000",
                            step: "5000"
                        }
                    },
                    data: {
                        vendors: null,
                        types: null,
                        sortBy: null,
                        prices: null,
                        tags: null,
                        variants: {
                            option1:null,
                            option2:null,
                            option3:null,
                        }
                    }
                }
            },
            salePopup: {
                active: false,
                type: "manual",
                orders: salePopupData.o,
                customers: salePopupData.u,
                time: {
                    ago: salePopupData.a,
                    delayBetween: "7000",
                    delayPopup: "5000",
                },
                count: "20",
            }
        }
    </script>
    <?php wp_head(); ?>
</head>
<body id="lamluy" <?php body_class();  ?>>
<header id="header" class="">
    <div class="headerMain">
        <div class="container-fluid">
            <div class="row">
                <div class="col-lg-2 col-md-6 col-sm-6 col-6 headerLogoMain">
                    <div class="headerLogo">
                        <div class="site-branding">
                            <?php
                            if ( has_custom_logo() ) {
                                the_custom_logo();
                            } else {
                                if ( is_front_page() && is_home() ) :
                                    ?>
                                    <h1 class="site-title"><a href="<?php echo esc_url( home_url( '/' ) ); ?>" rel="home"><?php bloginfo( 'name' ); ?></a></h1>
                                <?php
                                else :
                                    ?>
                                    <a href="<?php echo esc_url( home_url( '/' ) ); ?>">
                                        <h1 class="logo hiddenx">
                                            <?php bloginfo( 'name' ); ?>
                                        </h1>
                                        <img src="https://file.hstatic.net/200000272403/file/wwebsitelogo_300x83px_948745d6afd84a86a4429fb9be236b28.jpg"
                                             alt="Lamluy" class="img-responsive logoimg">
                                    </a>
                                <?php
                                    endif;
                                    $my_theme_description = get_bloginfo( 'description', 'display' );
                                    if ( $my_theme_description || is_customize_preview() ) :
                                        ?>
                                        <p class="site-description"><?php echo $my_theme_description; /* WPCS: xss ok. */ ?></p>
                                    <?php
                                endif;
                                }
                            ?>
                        </div>
                    </div>
                </div>
                <div class="col-lg-8 col-md-8 col-sm-12 col-12 headerMenuFixWidth">
                    <div class="headerMenu">
                        <nav class="mainNav">
                            <?php
                                store_menu('primary-menu');
                            ?>
                        </nav>
                    </div>
                </div>
                <div class="col-lg-2 col-md-6 col-sm-6 col-6 showMoreMenu headerTools">
                    <div class="headerTopbarRight notMenuFixWidth">
                        <div class="headerUser">
                            <a href="javascript:void(0)" data-toggle="modal" data-target="#accountLogin"
                               data-whatever="@accountLogin">
                                <i class="lni lni-user"></i>
                            </a>
                        </div>
                        <div class="headerWishlist headerTool">
                            <a href="/account" data-type="sidebarAllMainWishlist">
                                <i class="lni lni-heart"></i>
                                <span class="sidebarAllMainWishlistCount">0</span>
                            </a>
                        </div>
                        <div class="headerCart headerTool">
                            <a href="/cart" data-type="sidebarAllMainCart">
                                <i class="lni lni-shopping-basket"></i>
                                <span class="sidebarAllMainCartCount">0</span>
                            </a>
                        </div>
                        <div class="headerSearch headerTool">
                            <a href="" data-type="sidebarAllMainSearch">
                                <i class="lni lni-search-alt"></i>
                            </a>
                        </div>
                    </div>
                    <div class="headerTool">
                        <a href="" class="showMoreMenuItem" data-type="sidebarAllMainMenu"><span class="">...More</span>
                            <i class="lni lni-menu"></i></a>
                    </div>
                </div>
            </div>
        </div>
    </div>
</header>