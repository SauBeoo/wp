<?php

if( !function_exists('store_menu')){
    function store_menu($menu){
        $menu = array(
            'theme_location' => $menu,
            'items_wrap'      => '<ul class="sliderMenu">%3$s</ul>',
            'fallback_cb'     => false,
            'container'       => null,
            'start_depth'     => 1,
            'walker'          => new Bootstrap_Nav_Walker()
        );
        wp_nav_menu($menu);
    }
};
class Bootstrap_Nav_Walker extends Walker_Nav_Menu
{
    // Modify the start_lvl function to add Bootstrap dropdown classes
    function start_lvl(&$output, $depth = 0, $args = null)
    {
        $indent = str_repeat("\t", $depth);
        if($depth > 0){
            $output .= "\n$indent<ul class=\"subMenuThree\">\n";
        }else{
            $output .= "\n$indent<ul class=\"subMenu\">\n";
        }

    }

    // Modify the start_el function to add Bootstrap classes
    function start_el(&$output, $item, $depth = 0, $args = null, $id = 0)
    {
        $indent = ($depth) ? str_repeat("\t", $depth) : '';
//
        $li_attributes = '';
        $classes = [];
        $class_names = $value = '';
//
//        $classes = empty($item->classes) ? array() : (array) $item->classes;
//
        if ($args->walker->has_children) {
            $classes[] = 'active';
        }
        if($depth > 0){
            $classes[] = 'subMenuItem hasChild';
        }


        $class_names = join(' ', apply_filters('nav_menu_css_class', array_filter($classes), $item, $args));
        $class_names = $class_names ? ' class="' . esc_attr($class_names) . '"' : '';
//
        $output .= $indent . '<li ' . $value . $class_names . $li_attributes . '>';
//
        $attributes = !empty($item->title) ? ' title="' . esc_attr($item->title) . '"' : '';
        $attributes .= !empty($item->target) ? ' target="' . esc_attr($item->target) . '"' : '';
        $attributes .= !empty($item->xfn) ? ' rel="' . esc_attr($item->xfn) . '"' : '';
        $attributes .= !empty($item->url) ? ' href="' . esc_attr($item->url) . '"' : '';
//
        $item_output = $args->before;

        // Check if the item has children (sub-menu)
        if ($args->walker->has_children) {
            $item_output .= '<a' . $attributes . ' >';
        } else {
            $item_output .= '<a' . $attributes . ' >';
        }

        $item_output .= $args->link_before . apply_filters('the_title', $item->title, $item->ID) . $args->link_after;

        // Add a caret icon for dropdowns
        if ($args->walker->has_children) {
            if($depth > 0){
                $item_output .= ' <i class="lni lni-chevron-right"></i>'.'</a>';
            }else{
                $item_output .= ' <i class="lni lni-chevron-down"></i>'.'</a>';
            }
        } else {
            $item_output .= '</a>';
        }

        $item_output .= $args->after;

        $output .= apply_filters('walker_nav_menu_start_el', $item_output, $item, $depth, $args);
    }
}
