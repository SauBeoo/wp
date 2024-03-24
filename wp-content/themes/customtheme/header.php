<?php  require_once get_template_directory() . "/template-parts/nav/walker-menu.php"; ?>
<!DOCTYPE html>
<html <?php language_attributes(); ?>>
<head>
    <meta charset="<?php bloginfo( 'charset' ); ?>">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <link rel="profile" href="https://gmpg.org/xfn/11">
    <?php wp_head(); ?>
</head>
<body <?php body_class(); ?>>
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
<!--                            --><?php
                            $walker = new Bootstrap_Nav_Walker;
                            wp_nav_menu(
                                array(

                                    'items_wrap'      => '<ul class="sliderMenu">%3$s</ul>',
                                    'fallback_cb'     => false,
                                    'container'       => null,
                                    'start_depth'     => 1,
                                    'walker'          => $walker
                                )
                            );
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