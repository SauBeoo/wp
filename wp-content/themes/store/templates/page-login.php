<?php
/*
 * Template Name: Login Page
 */
?>
<?php get_header();?>
<?php while (have_posts()):the_post();?>
    <div class="content_main login">
        <div class="theme_gallery about_us">
            <div class="theme_gallery_title">
                <h1><?php the_title();?></h1>
            </div>
            <div class="category_description"><?php the_content(); ?> </div>
            <div class="login-form">

                <?php
                $login  = (isset($_GET['login']) ) ? $_GET['login'] : 0;
                if ( $login === "failed" ) {
                    echo '<p class="login-msg"><strong>ERROR:</strong> Invalid username and/or password.</p>';
                } elseif ( $login === "empty" ) {
                    echo '<p class="login-msg"><strong>ERROR:</strong> Username and/or Password is empty.</p>';
                } elseif ( $login === "false" ) {
                    echo '<p class="login-msg"><strong>ERROR:</strong> You are logged out.</p>';
                }
                $args = array(
                    'redirect' => home_url(),
                    'id_username' => 'user',
                    'id_password' => 'pass',
                )
                ;?>
                <?php wp_login_form( $args ); ?>
            </div>
        </div>
    </div>
    <!-- End gallery -->
<?php endwhile;?>
<?php get_footer();?>    