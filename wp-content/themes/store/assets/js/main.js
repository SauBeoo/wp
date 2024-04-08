var F1GEN = {};
F1GEN.Global = {
    init: function(){
        this.headerScroll();
        this.closeModal();
        this.modalShow();
        this.addCartLoop();
        this.backToTop();
        this.clickScrollMb();
        this.clickMbToggle();
        this.changeImageLoop();
        if($(window).width() < 768){
            this.hoverImageLoop();
        }
        F1GEN.Sidebar.init();
        F1GEN.Megamenu.init();
        F1GEN.Wishlist.init();
        F1GEN.Quickview.init();
        this.salePopup();
        if(window.F1GEN_vars.template == 'index'){
            F1GEN.Indexs.init();
        }
        if(window.F1GEN_vars.template == 'collection'){
            F1GEN.Collections.init();
        }
        if(window.F1GEN_vars.template == 'product'){
            F1GEN.Products.init();
        }
        if(window.F1GEN_vars.template == 'blog'){
            F1GEN.Blogs.init();
        }
        if(window.F1GEN_vars.template == 'article'){
            F1GEN.Articles.init();
        }
        if(window.F1GEN_vars.template.indexOf('page') !== -1){
            F1GEN.Pages.init();
        }
        if(window.F1GEN_vars.template.indexOf('customers') !== -1){
            F1GEN.Accounts.init();
        }
        if(window.F1GEN_vars.template == 'cart'){
            F1GEN.Carts.init();
        }
        if(window.F1GEN_vars.template == 'search'){
            F1GEN.Searchs.init();
        }
    },
    salePopup: function(){
        try{
            if(window.F1GEN_vars.salePopup.active && $(window).width() > 768 ){
                var count_increase = 1;
                var interval = setInterval(function() {
                    var item = window.F1GEN_vars.salePopup.orders[Math.floor(Math.random()*window.F1GEN_vars.salePopup.orders.length)];
                    var customer = window.F1GEN_vars.salePopup.customers[Math.floor(Math.random()*window.F1GEN_vars.salePopup.customers.length)];
                    var time = window.F1GEN_vars.salePopup.time.ago[Math.floor(Math.random()*window.F1GEN_vars.salePopup.time.ago.length)];
                    $.get("/products/" + item + '.js').done(function(data) {
                        var sale_template = `
                            <section class="custom-social-proof" style="display: none;">
                            <div class="custom-notification">
                            <div class="custom-notification-container">
                            <div class="custom-notification-image-wrapper">
                            <img src="${data.featured_image}">
                            </div>
                            <div class="custom-notification-content-wrapper">
                            <p class="custom-notification-content">
                            ${customer}<br>vừa mua <a href="${data.url}"><b>${data.title}</b></a>
                            <small>${time}</small>
                            </p>
                            </div>
                            </div>
                            <div class="custom-close"></div>
                            </div>
                            </section>`;
                        $('body').append(sale_template);
                        $(".custom-social-proof").slideDown(400);
                        setTimeout(function(){
                            $(".custom-social-proof").remove();
                        }, parseInt(window.F1GEN_vars.salePopup.time.delayPopup))
                        count_increase++
                        if (count_increase > parseInt(window.F1GEN_vars.salePopup.count)){
                            clearInterval(interval);
                        }
                    })
                }, parseInt(window.F1GEN_vars.salePopup.time.delayBetween)+parseInt(window.F1GEN_vars.salePopup.time.delayPopup));
                $("body").on('click','.custom-close', function() {
                    $(this).parents(".custom-social-proof").stop().slideUp(400);
                })
            }
        }catch(e){console.log(e)}
    },
    clickMbToggle: function(){
        $('footer#footer .footerMainList.menuclickmb h4').on('click', function(e){
            e.preventDefault();
            $(this).toggleClass('active').parent().find('.FooterMainListToggle ul').stop().slideToggle('400');
        });
    },
    hoverImageLoop: function(){
        $('body').on('click', '.productImgLink', function(e){
            e.preventDefault();
            var p = $(this).parents('.productImg');
            $('.productImg').not(p).removeClass('hovered');
            if(p.hasClass('hovered')){
                window.location.href= $(this).attr('href');
            }else{
                p.addClass('hovered');
            }
        })
    },
    changeImageLoop: function(){
        $('body').on('click', '.productColorsItem', function(e){
            e.preventDefault();
            $(this).parent().find('.productColorsItem').removeClass('active');
            var flagImg = $(this).attr('data-image');
            $(this).parents('.productWrapper').find('.productImgLink').html('').append('<img class="img-fluid" src="' + flagImg + '" alt="Image Change">');
            $(this).addClass('active');
        })
    },
    addCartLoop: function (){
        $('body').on('click', '.setAddCartLoop', function(e){
            e.preventDefault();
            let product_id = $(this).attr('data-product_id');
            $.ajax({
                type: "POST",
                url: wc_add_to_cart_params.ajax_url,
                data: {
                    product_id: product_id,
                    quantity: 1,
                    action: 'woocommerce_ajax_add_to_cart'
                },
                success: function(data){
                    if(data.error){
                        $('#alertError').modal('show').find('.modal-body').html('Xin lỗi, có vấn đề về tồn kho, vui lòng thử lại sau!');;
                    }else{
                        F1GEN.Sidebar.getCartSidebar();
                        setTimeout(function(){
                        $('a[data-type="sidebarAllMainCart"]').trigger('click');
                        $( document.body ).trigger( 'added_to_cart', [ data.fragments, data.cart_hash ] );
                    },1000)

                    }
                },
                error: function(){
                    $('#alertError').modal('show').find('.modal-body').html('Xin lỗi, có vấn đề về tồn kho, vui lòng thử lại sau!');;
                }
            })
        })
    },
    headerScroll:function(){
        var flagScrollInit = 0;
        var funcScroll = function(){
            var flagScrollBegin = $(window).scrollTop();
            if(flagScrollBegin > 150){
                if(flagScrollBegin > flagScrollInit){
                    $('#header').addClass('active');
                    flagScrollInit = flagScrollBegin;
                }else{
                    $('#header').removeClass('active');
                    flagScrollInit = flagScrollBegin;
                }
            }else{
                $('#header').removeClass('active');
            }
        }
        $(window).on('scroll',function() {
            funcScroll();
        })
        funcScroll();
    },
    closeModal: function(){
        $('body').on('click', '.closeModal', function(){
            $('.modal').modal('hide');
        })
    },
    modalShow:function(){
        if($(window).width() > 768 ){
            $('body').on('click','.headerUser a',function(){
                if(window.F1GEN_vars.account.logged == false ){
                    $('#accountModal').modal('show');
                }else{
                    window.location.href = "/account";
                }
            })
        }else{
            $('body').on('click','.headerUser a',function(){
                if(window.F1GEN_vars.account.logged == false ){
                    window.location.href = "/account/login";
                }else{
                    window.location.href = "/account";
                }
            })
        }
    },
    backToTop:function(){
        /* Scroll to top */
        $(window).on('scroll',function() {
            if ( $('.back-to-top').length > 0 && $(window).scrollTop() > 100  ) {
                $('.back-to-top').addClass('display');
            } else {
                $('.back-to-top').removeClass('display');
            }

        })
        $(document).on("click", ".back-to-top", function(){
            $(this).removeClass('display');
            $('html, body').animate({
                scrollTop: 0
            }, 600);
        });
    },
    clickScrollMb:function(){
        $('a.btn-support').click(function(e){
            e.preventDefault();
            $('.support-content').toggleClass('open');
        });
    }
};
F1GEN.Sidebar = {
    init:function(){
        this.sidebarShow();
        this.closeAllByOver();
        setTimeout(function(){
            F1GEN.Sidebar.getCartSidebar();
        },3000)
        this.suggestSearch();
        this.changeQuantitySidebar();
        this.deleteItemSidebar();
    },
    sidebarShow:function(){
        $('body').on('click','.headerTool a',function(e){
            e.preventDefault();
            let type = $(this).attr('data-type');
            $('.overplayAll').addClass('active');
            $('#sidebarAll').addClass('active');
            $('#sidebarAll > div').hide();
            $(`#sidebarAll .${type}`).show();
            $('body, html').addClass('lockScroll')
        })
    },
    closeAllByOver:function(){
        $('body').on('click','.overplayAll, .closeSidebar',function(e){
            e.preventDefault();
            $('#sidebarAll').removeClass('active');
            $('.overplayAll').removeClass('active');
            $('body, html').removeClass('lockScroll')
        })
    },
    getCartSidebar:function(){
        setTimeout(function(){
            $.get(wc_add_to_cart_params.ajax_url,{
                    action: 'fetch_cart_items'
                }, function(res){
                let item = '';
                $.each(res.items, function(index, value){
                    item += `
                        <div class="itemMain" data-cart_item_key="${value.cart_item_key}">
                        <a href="#"><img class="itemImage img-fluid" src="${value.product_img}"/></a>
                            <div class="itemInfo">
                                <a class="itemTitle" href="#">${value.product_name}</a>
                                <div class="itemVariant" >Size:<span style="text-transform: uppercase;">${value.variation_name}</span></div>
                                <div class="itemPriceInfo">
                                    <span class="itemPriceMain">${value.price}</span>
                                    <span class="itemPriceCompare"><del>${value.subtotal}</del></span>
                                </div>
                                <div class="itemAction">
                                    <div class="itemQuantity">
                                        <button class="qtyBtn minusQuan" data-type="minus">-</button>
                                        <input type="number" id="itemQuantityCart" name="quantity" value="${value.quantity}" min="1"  data-stock_quantity="${value.stock_quantity}" class="quantitySelector">
                                        <button class="qtyBtn plusQuan" data-type="plus" >+</button>
                                    </div>
                                    <div class="removeItem">
                                    <i class="lni lni-trash"></i>
                                    </div>
                                </div>
                            </div>
                        </div>
                        `;
                });
                $('.sidebarAllMainCart .sidebarAllBody').html('');
                $('#total_price_cart').html('')
                $('#total_price_cart').html(res.total_price)
                $('.headerCart .sidebarAllMainCartCount').html(res.total)
                $('.sidebarAllMainCart .sidebarAllBody').html(item);
            });
        },0)
    },
    changeQuantitySidebar:function(){
        $('body').on('click', '.sidebarAllMainCart .itemQuantity .qtyBtn', function (e) {
            e.preventDefault();
            let type = $(this).data('type');
            if (type == "plus") {
                let stock_quantity = $(this).prev().data('stock_quantity');
                let quantity = parseInt($(this).prev().val());
                if (quantity < stock_quantity || stock_quantity == null) {
                    $(this).prev().val(parseInt($(this).prev().val()) + 1);
                } else {
                    $('#alertError').modal('show').find('.modal-body').html('Xin lỗi, có vấn đề về tồn kho, vui lòng thử lại sau!');;
                }
            } else {
                if (parseInt($(this).next().val()) !== 1)
                    $(this).next().val(parseInt($(this).next().val()) - 1);
            }
            const cart_item_key = $(this).parents('.itemMain').attr('data-cart_item_key');
            const quanItem = $(this).parent().find('#itemQuantityCart').val();
            $.ajax({
                type: 'POST',
                async:false,
                url: wc_add_to_cart_params.ajax_url,
                data: {
                    cart_item_key: cart_item_key,
                    quantity: quanItem,
                    action: 'update_cart_quantity'
                },
                dataType: 'json',
                success: function (cart) {
                    F1GEN.Sidebar.getCartSidebar();
                },
                error: function (XMLHttpRequest, textStatus) {
                    console.log(XMLHttpRequest, textStatus);
                }
            })
        })
    },
    deleteItemSidebar:function(){
        $('body').on('click','.removeItem',function(e){
            e.preventDefault();
            const cart_item_key = $(this).parents('.itemMain').attr('data-cart_item_key');
            $.ajax({
                type: 'POST',
                async:false,
                url: wc_add_to_cart_params.ajax_url,
                data: {
                    cart_item_key: cart_item_key,
                    quantity: 0,
                    action: 'update_cart_quantity'
                },
                dataType: 'json',
                success: function(cart) {
                    F1GEN.Sidebar.getCartSidebar();
                },
                error: function(XMLHttpRequest, textStatus) {
                    Haravan.onError(XMLHttpRequest, textStatus);
                }
            })
        })
    },
    suggestSearch: function(){
        $('body').on('keyup', '#headerSearchInput', function(e){
            e.preventDefault();
            if(e.which !== 40 && e.which !== 38){
                var s = $(this).val();
                if(	typeof s === 'string' && s.length>0 ){
                    $.getJSON('/search?type=product&view=smart&q='+encodeURIComponent(s), function(res){
                        if(res.length > 0){
                            var item = '';
                            $.each(res, function(index, value){
                                item += '<a href="'+
                                    value.url+'"><img src="'+
                                    value.thumbnail+'" class="img-responsive"><span>'+
                                    value.title+'<span>'+
                                    value.price+'</span></span></a>';
                            });
                            $('#headerSmartSearch .headerSmartSearchResult').html(item).show();
                        }else{
                            $('#headerSmartSearch .headerSmartSearchResult').hide();
                        }
                    });
                }else{
                    $('#headerSmartSearch .headerSmartSearchResult').hide();

                }
            }
        });
        $("body").on('keydown', function(e) {
            if($('#headerSearchInput').is(":visible")){
                switch (e.which) {
                    case 40:
                        e.preventDefault();
                        if($('.search-suggest a.selected').length == 0 ){
                            $('.search-suggest a:first-child').addClass('selected');
                        }else	{
                            $('.search-suggest a:not(:last-child).selected').removeClass('selected').next().addClass('selected');
                        }
                        break;
                    case 38:
                        e.preventDefault();
                        if($('.search-suggest a.selected').is(':first-child')){
                            $('.search-suggest a').removeClass('selected');
                        }else{
                            $('.search-suggest a:not(:first-child).selected').removeClass('selected').prev().addClass('selected');
                        }
                        break;
                }
            }
            if($('.search-suggest').is(":visible") && $('.search-suggest a.selected').length === 1 && e.which === 13){
                e.preventDefault();
                if($('.search-suggest a.selected').length === 1 ){
                    window.location.href = $('.search-suggest a.selected').attr('href');
                }
            }
        });
    },
}
F1GEN.Megamenu = {
    init:function(){
        this.activeMenuTwo();
        this.showMenuThree();
        this.fixWidthMenu();
        this.toggleMenuVertical();
        this.toggleMenuVerticalThree();
    },
    activeMenuTwo:function(){
        $('.headerMenu .sliderMenu li').each(function(){
            $(this).find('.subMenuTwoColumOne.haveThree .subMenuItem.hasChild').first().addClass('activeMenuTwo').find('.subMenuThree').show();
        })
    },
    showMenuThree:function(){
        $('body').on('mouseover','.headerMenu .subMenuTwoColumOne .subMenuItem',function(){
            $(this).siblings().removeClass('activeMenuTwo').find('.subMenuThree').hide();
            $(this).addClass('activeMenuTwo').find('.subMenuThree').show()
        })
    },
    fixWidthMenu:function(){
        let heightTotal = $('.headerMenuFixWidth').width();
        let heightMain = $('.headerMenuFixWidth .mainNav ul').width();
        if( heightMain > heightTotal ){
            $('.showMoreMenu').css('display','flex');
        }else{
            $('.headerTopbarRight').addClass('notMenuFixWidth')
        }
    },
    toggleMenuVertical:function(){
        $('body').on('click','#sliderMenuVertical > ul > li.hasChild > a',function(e){
            e.preventDefault();
            $(this).find('i').toggleClass('activeMenuVertical');
            $(this).next().slideToggle();
        })
    },
    toggleMenuVerticalThree:function(){
        $('body').on('click','#sliderMenuVertical .subMenuTwoColumOne .subMenuItem.hasChild  > a',function(e){
            e.preventDefault();
            $(this).find('i').toggleClass('activeMenuVertical');
            $(this).next().slideToggle();
        })
    },
}
F1GEN.Wishlist = {
    init: function(){
        this.setWishlistProductLoop();
        this.wishlistProduct(3, 5);
        this.removeWishlist();
        this.changeQuantityWishlist();
        this.addFromWishlist();
    },
    setWishlistProductLoop: function(){
        $('body').on('click','.setWishlist',function(e){
            e.preventDefault();
            var phand = [];
            var handle = $(this).attr('data-product_id');
            if(document.cookie.indexOf('last_wishlist_products') !== -1){
                var las = CookiesTop.getJSON('last_wishlist_products');
                if($.inArray(handle, las) === -1){
                    phand = [handle];
                    for(var i = 0; i < las.length; i++){
                        phand.push(las[i]);
                        if(phand.length > 15){
                            break;
                        }
                    }
                    CookiesTop.set('last_wishlist_products', phand, { expires: 180 });
                }
            }else{
                phand = [handle];
                CookiesTop.set('last_wishlist_products', phand, { expires: 180 });
            }
            // F1GEN.Wishlist.wishlistProduct();
            F1GEN.Wishlist.addWishlistProduct($(this));
            $('a[data-type="sidebarAllMainWishlist"]').trigger('click');
            F1GEN.Wishlist.activityWishlist();
        })
    },
    addWishlistProduct:function (that){
        const product_id = that.attr('data-product_id');
        const nonce =  that.attr('data-nonce');
        $.ajax({
            type: 'POST',
            async:false,
            url: wc_add_to_cart_params.ajax_url,
            data: {
                add_to_wishlist: product_id,
                nonce: nonce,
                action: 'add_item_to_wishlist'
            },
            dataType: 'json',
            success: function(cart) {
                F1GEN.Sidebar.getCartSidebar();
            },
            error: function(XMLHttpRequest, textStatus) {
                Haravan.onError(XMLHttpRequest, textStatus);
            }
        })
    },
    wishlistProduct: function(items, margin){
        // console.log(document.cookie.indexOf('last_wishlist_products'),'1232',$('.sidebarAllMainWishlist .sidebarAllBody').length);
        if($('.sidebarAllMainWishlist .sidebarAllBody').length > 0){
            console.log(document.cookie.indexOf('last_wishlist_products'),'1232',$('.sidebarAllMainWishlist .sidebarAllBody').length);
            if(document.cookie.indexOf('last_wishlist_products') !== -1){
                $('.sidebarAllMainWishlist .sidebarAllBody').html('')
                var last_wishlist_pro_array = CookiesTop.getJSON('last_wishlist_products');
                F1GEN.Wishlist.activityWishlist();
                var recentview_promises = [];

                // for(var i = 0; i < 8; i++){
                //     if(typeof last_wishlist_pro_array[i] == 'string'){
                //         var promise = new Promise(function(resolve, reject) {
                //             $.ajax({
                //                 url:'/products/' + last_wishlist_pro_array[i] + '?view=wishlist',
                //                 async: false,
                //                 success: function(product){
                //                     resolve({error: false, data: product});
                //                 },
                //                 error: function(err){
                //                     if(err.status === 404){
                //                         try{
                //                             var u = ((this.url.split('?'))[0]).replace('/products/', '');
                //                             resolve({error: true, handle: u});
                //                         }catch(e){
                //                             resolve({error: false, data: ''})
                //                         }
                //                     }else{
                //                         resolve({error: false, data: ''});
                //                     }
                //                 }
                //             })
                //         });
                //         recentview_promises.push(promise);
                //     }
                // }
                // Promise.all(recentview_promises).then(function(values) {
                //     var x = [];
                //     $.each(values, function(i, v){
                //         if(v.error){
                //             x.push(v.handle);
                //         }else{
                //             $('.sidebarAllMainWishlist .sidebarAllBody').append(v.data);
                //             $('.sidebarAllMainWishlist .sidebarAllBody').show();
                //         }
                //     });
                //     if(x.length > 0){
                //         var new_last_viewed_pro_array = [];
                //         $.each(last_wishlist_pro_array, function(i, v){
                //             if($.inArray(v, x) === -1){
                //                 new_last_viewed_pro_array.push(v);
                //             }
                //         })
                //         if(new_last_viewed_pro_array.length > 0){
                //             CookiesTop.set('last_viewed_products', new_last_viewed_pro_array, { expires: 180 });
                //         }
                //     }
                // });
            }else{
                $('.sidebarAllMainWishlist .sidebarAllBody').hide();
            }
        }else{
            $('.sidebarAllMainWishlist .sidebarAllBody').hide();
        }
    },
    activityWishlist: function(){
        var last_wishlist_pro_array = CookiesTop.getJSON('last_wishlist_products');
        $.each(last_wishlist_pro_array, function(i, v){
            $('.setWishlist[data-product_id="' + v + '"] i').removeClass('lni-heart').addClass('lni-heart-filled');
        })
        setTimeout(function(){
            $('.sidebarAllMainWishlistCount').html($('.itemMainWishlist').length)
        },500)
    },
    changeQuantityWishlist:function(){
        $('body').on('click','.sidebarAllMainWishlist .itemQuantity .qtyBtn',function(e){
            e.preventDefault();
            let type = $(this).data('type');
            if(type == "plus"){
                $(this).prev().val(parseInt($(this).prev().val()) + 1);
            }else{
                if(parseInt($(this).next().val()) !== 1)
                    $(this).next().val(parseInt($(this).next().val()) - 1);
            }
        })
    },
    addFromWishlist: function(){
        $('body').on('click', '.sidebarAllMainWishlist .itemAddFromWishList', function(e){
            e.preventDefault();
            let id = $(this).attr('data-id');
            let quantity = $(this).parents('.itemAction').find('#itemQuantityWishlist').val();
            $.ajax({
                type: "POST",
                url: "/cart/add.js",
                data: {id: id, quantity: quantity},
                success: function(data){
                    $('a[data-type="sidebarAllMainCart"]').trigger('click');
                    F1GEN.Sidebar.getCartSidebar();
                },
                error: function(){
                    $('#alertError').modal('show').find('.modal-body').html('Xin lỗi, có vấn đề về tồn kho, vui lòng thử lại sau!');;
                }
            })
        })
    },
    removeWishlist:function(){
        $('body').on('click','.itemMainWishlist .removeItem',function(e){
            e.preventDefault();
            var phand = [];
            var handle = $(this).attr('data-handle');
            $('a[data-handle="' + handle + '"]').find('i').removeClass('lni-heart-filled').addClass('lni-heart');
            if(document.cookie.indexOf('last_wishlist_products') !== -1){
                var las = CookiesTop.getJSON('last_wishlist_products');
                var flagIndex = $.inArray(handle, las);
                las.splice(flagIndex,1)
                CookiesTop.set('last_wishlist_products', las, { expires: 180 });
            }else{
                phand = [handle];
                CookiesTop.set('last_wishlist_products', phand, { expires: 180 });
            }
            F1GEN.Wishlist.wishlistProduct(3, 5);
        })
    }
}
F1GEN.Indexs = {
    init: function(){
        if($('.sliderMain').length > 0)this.slider();
        this.sliderPolicy();
        this.sliderVendor();
        this.sliderGroupTwo();
        this.sliderBlog();
        this.sliderTabs();
        this.clickTabs();
        this.popupNewletter();
    },
    slider: function(){
        $('#slider .swiper-slide').css('display','block');
        var swiper = new Swiper('#slider .swiper-container',{
            pagination: {
                el: '#slider .swiper-pagination',
                clickable: true
            },
            loop: true,
            navigation: {
                nextEl: '#slider .swiper-button-next',
                prevEl: '#slider .swiper-button-prev',
            }
        });
    },
    sliderVendor: function(){
        var swiper = new Swiper('#vendor .swiper-container', {
            slidesPerView: 5,
            spaceBetween: 30,
            autoplay: {
                delay: 5000,
            },
            breakpoints: {
                0: {
                    slidesPerView: 2,
                    spaceBetween: 15
                },
                768: {
                    slidesPerView: 5,
                    freeMode: true
                }
            },
            navigation: {
                nextEl: '#vendor .swiper-button-next',
                prevEl: '#vendor .swiper-button-prev',
            },
            pagination: {
                el: '#vendor .swiper-pagination',
                clickable: true
            },
        });
    },
    sliderGroupTwo: function(){
        var swiper = new Swiper('#groupTwo .groupMainProducts .swiper-container', {
            slidesPerView: 4,
            spaceBetween: 30,
            breakpoints: {
                0: {
                    slidesPerView: 2,
                    spaceBetween: 15
                },
                768: {
                    slidesPerView: 4,
                    freeMode: true
                }
            },
            navigation: {
                nextEl: '#groupTwo .groupMainProducts .swiper-button-next',
                prevEl: '#groupTwo .groupMainProducts .swiper-button-prev',
            },
            pagination: {
                el: '#groupTwo .groupMainProducts .swiper-pagination',
                clickable: true
            },
        });
    },
    sliderBlog: function(){
        var swiper = new Swiper('#indexBlog .swiper-container', {
            slidesPerView: 2,
            spaceBetween: 30,
            autoHeight: true,
            breakpoints: {
                0: {
                    slidesPerView: 1,
                    spaceBetween: 15
                },
                768: {
                    slidesPerView: 2,
                    freeMode: true
                }
            },
            navigation: {
                nextEl: '#indexBlog .swiper-button-next',
                prevEl: '#indexBlog .swiper-button-prev',
            },
            pagination: {
                el: '#indexBlog .swiper-pagination',
                clickable: true
            },
        });
    },
    sliderTabs: function(){
        if($(window).width() < 768){
            var galleryThumbsTabs = new Swiper('.groupMainTabs', {
                spaceBetween: 0,
                slidesPerView: 3
            });
        }
    },
    sliderPolicy: function(){
        var galleryThumbsTabs = new Swiper('#policy .swiper-container', {
            slidesPerView: 4,
            loop: true,
            autoplay: {
                delay: 5000,
            },
            breakpoints: {
                0: {
                    slidesPerView: 2
                },
                768: {
                    slidesPerView: 2
                },
                1024: {
                    slidesPerView: 4
                },
            }
        });
    },
    clickTabs: function(){
        $('body').on('click', '.groupMainTabs ul li a', function(){
            var flagUrlTab = $(this).attr('data-tabs');
            $('.groupMainTabs ul li a').removeClass('active');
            $(this).addClass('active');
            $.ajax({
                url: flagUrlTab +'?view=tab_index',
                type: "GET",
                asycn: false,
                success:function(data){
                    $('.groupMainProducts').html(data);
                    setTimeout(function(){
                        F1GEN.Indexs.sliderGroupTwo();
                    },0)
                }
            })
        })
    },
    popupNewletter:function(){
        if ($('#popup-contact').length > 0 && $(window).width() > 768 ){


            setTimeout(function(){
                if(!sessionStorage.mega_popup ){
                    sessionStorage.setItem("mega_popup", 'show');
                    $('#popup-contact').modal('show');
                }
                if(sessionStorage.mega_popup == null ){
                    $('#popup-contact').modal('show');
                }
            },3000);
            if ($('.popupForm').length > 0){
                $('.popup-form-customer form.contact-form').submit(function(e){
                    e.preventDefault();
                    $.ajax({
                        type: 'POST',
                        url:'/account/contact',
                        data: $('.popup-form-customer form.contact-form').serialize(),
                        success: function(data) {
                            if($(data).find('#error_customer').length == 0){
                                $('.popup-form-customer .succes-popup').addClass('success').html('Cảm ơn bạn đã đăng ký email theo dõi!');
                                setTimeout(function(){
                                    $('#popup-contact').modal('hide');
                                    location.reload();
                                },1500);
                            }
                            else{
                                $('.popup-form-customer .succes-popup').addClass('error').html($(data).find('#error_customer').html());
                            }
                        }
                    })
                    if(sessionStorage.mega_popup == null ){
                        sessionStorage.mega_popup = 'show' ;
                    }
                });
            }
            else{
                $(document).on('click','.linkbanner-popup-contact', function(){
                    $('#popup-contact').modal('hide');
                    if(sessionStorage.mega_popup == null ){
                        sessionStorage.mega_popup = 'show' ;
                    }
                });
            }
            $(document).on('click','.modal-popupContact .close-popup-contact', function(e){
                e.preventDefault();
                $('#popup-contact').modal('hide');
                if(sessionStorage.mega_popup == null ){
                    sessionStorage.mega_popup = 'show' ;
                }
            });
            $(".modal-popupContact").on('hidden.bs.modal', function(){
                if(sessionStorage.mega_popup == null ){
                    sessionStorage.mega_popup = 'show' ;
                }
            });
        }

    }
};
F1GEN.Collections = {
    init: function(){
        this.sortBy();
        this.checkFilter();
        this.filter.init();
    },
    sortBy: function(){
        $('#sortBy').val(window.F1GEN_vars.collection.data.sortBy);
    },
    checkFilter:function(){
        if($(window).width() < 768){
            $('.collectionMainContentLeft .collectionFilter').remove();
        }else{
            $('#sidebarAll .collectionFilter').remove();
        }
    },
    filter: {
        init: function(){
            this.trigger();
        },
        trigger: function(){
            var self = this;
            $('body').on('click', '.collectionFilterClose', function(e){
                e.preventDefault();
                $('.collectionFilter').removeClass('appeared');
            })

            $('body').on('click', '.filterIconOpen', function(e){
                e.preventDefault();
                $('.collectionFilter').addClass('appeared');
            })
            $('body').on('click', '.checkboxFilter', function(){
                self.pick();
                var q = self.query();
                var query = `/search?q=${q}&view=filter`;
                self.fetch(query);
            })
            $('body').on('click', '.collectionFilterMobileApply', function(e){
                e.preventDefault();
                var q = self.query();
                var query = `/search?q=${q}&view=filter`;
                self.fetch(query);
                $('.collectionFilter').removeClass('appeared');
            })
            $('body').on('click', '#pagination.filtered a:not(.current)', function(e){
                e.preventDefault();
                var query = $(this).attr('href');
                self.fetch(query);
            })
            $('body').on('click', '#loadColorFilter', function(e){
                e.preventDefault();
                $(this).parents('.collectionFilterBlock.color').find('li').show();
                $(this).hide();
            })
            $('body').on('change', '#sortBy', function(e){
                self.pick();
                var q = self.query();
                var query = `/search?q=${q}&view=filter`;
                self.fetch(query);
            })
            var min = parseInt(window.F1GEN_vars.collection.filter.config.price.min);
            var max = parseInt(window.F1GEN_vars.collection.filter.config.price.max);
            var step = parseInt(window.F1GEN_vars.collection.filter.config.price.step);
            var timeOutFilter, slidePrice = true;
            var rangeSlider = document.getElementById('priceRange');
            noUiSlider.create(rangeSlider, {
                start: [min, max],
                connect: true,
                step: step,
                range: {
                    'min': [min],
                    'max': [max]
                }
            });
            var rangeSliderValueElement = document.getElementById('priceRangeValue');
            rangeSlider.noUiSlider.on('update', function (values, handle) {
                let html = ''
                html += Haravan.formatMoney((values[0] * 100), window.F1GEN_vars.formatMoney) + ' - ';
                html += Haravan.formatMoney((values[1] * 100), window.F1GEN_vars.formatMoney);
                rangeSliderValueElement.innerHTML = html;
            });
            rangeSlider.noUiSlider.on('end', function (values, handle) {
                let html = ''
                html += Haravan.formatMoney((values[0] * 100), window.F1GEN_vars.formatMoney) + ' - ';
                html += Haravan.formatMoney((values[1] * 100), window.F1GEN_vars.formatMoney);
                rangeSliderValueElement.innerHTML = html;
                window.F1GEN_vars.collection.filter.data.prices = {
                    min: Math.round(values[0]),
                    max: Math.round(values[1])
                }
                setTimeout(function(){
                    $('.priceRangeValueBox input').trigger('click');
                },1000)
            });
        },
        pick: function(){
            window.F1GEN_vars.collection.filter.data = {
                vendors: null,
                types: null,
                sortBy: $('#sortBy').val(),
                prices: window.F1GEN_vars.collection.filter.data.prices,
                tags: null,
                variants: {
                    option1:null,
                    option2:null,
                    option3:null,
                }
            }
            $('.checkboxFilter:checked').each(function(){

                var name = $(this).attr('name');
                var value = $(this).val();
                switch(name){
                    case 'typeFilter':
                        if(window.F1GEN_vars.collection.filter.data.types){
                            if($.inArray(value, window.F1GEN_vars.collection.filter.data.types) === -1){
                                window.F1GEN_vars.collection.filter.data.types.push(value);
                            }
                        }else{
                            window.F1GEN_vars.collection.filter.data.types = [value];
                        }
                        break;
                    case 'tagFilter':
                        if(window.F1GEN_vars.collection.filter.data.tags){
                            if($.inArray(value, window.F1GEN_vars.collection.filter.data.tags) === -1){
                                window.F1GEN_vars.collection.filter.data.tags.push(value);
                            }
                        }else{
                            window.F1GEN_vars.collection.filter.data.tags = [value];
                        }
                        break;
                    case 'vendorFilter':
                        if(window.F1GEN_vars.collection.filter.data.vendors){
                            if($.inArray(value, window.F1GEN_vars.collection.filter.data.vendors) === -1){
                                window.F1GEN_vars.collection.filter.data.vendors.push(value);
                            }
                        }else{
                            window.F1GEN_vars.collection.filter.data.vendors = [value];
                        }
                        break;
                    case 'colorFilter':
                        if(window.F1GEN_vars.collection.filter.data.variants.option1){
                            if($.inArray(value, window.F1GEN_vars.collection.filter.data.variants.option1) === -1){
                                window.F1GEN_vars.collection.filter.data.variants.option1.push(value);
                            }
                        }else{
                            window.F1GEN_vars.collection.filter.data.variants.option1 = [value];
                        }
                        break;
                    case 'sizeFilter':
                        if(window.F1GEN_vars.collection.filter.data.variants.option2){
                            if($.inArray(value, window.F1GEN_vars.collection.filter.data.variants.option2) === -1){
                                window.F1GEN_vars.collection.filter.data.variants.option2.push(value);
                            }
                        }else{
                            window.F1GEN_vars.collection.filter.data.variants.option2 = [value];
                        }
                        break;
                    default:
                }
            })
        },
        query: function(){
            var q = '';
            if(window.F1GEN_vars.collection.data.id.length > 0){
                q += `((collectionid:product${(window.F1GEN_vars.collection.data.id === "0")?'>':'='}${window.F1GEN_vars.collection.data.id}))`;
            }

            if(window.F1GEN_vars.collection.filter.data.prices){
                q += `&&((price:product>=${window.F1GEN_vars.collection.filter.data.prices.min})&&(price:product<${window.F1GEN_vars.collection.filter.data.prices.max}))`;
            }

            if(window.F1GEN_vars.collection.filter.data.vendors){
                if(window.F1GEN_vars.collection.filter.data.vendors.length > 1){
                    q += `&&(`;
                    $.each(window.F1GEN_vars.collection.filter.data.vendors, function(i, v){
                        if(parseInt(i) == (window.F1GEN_vars.collection.filter.data.vendors.length - 1)){
                            q+= `(vendor:product contains ${window.F1GEN_vars.collection.filter.data.vendors[i]})`
                        }else{
                            q+= `(vendor:product contains ${window.F1GEN_vars.collection.filter.data.vendors[i]})||`
                        }
                    })
                    q += `)`;
                }else{
                    q += `&&((vendor:product contains ${window.F1GEN_vars.collection.filter.data.vendors}))`;
                }
            }

            if(window.F1GEN_vars.collection.filter.data.types){
                if(window.F1GEN_vars.collection.filter.data.types.length > 1){
                    q += `&&(`;
                    $.each(window.F1GEN_vars.collection.filter.data.types, function(i, v){
                        if(parseInt(i) == (window.F1GEN_vars.collection.filter.data.types.length - 1)){
                            q+= `(product_type:product contains ${window.F1GEN_vars.collection.filter.data.types[i]})`
                        }else{
                            q+= `(product_type:product contains ${window.F1GEN_vars.collection.filter.data.types[i]})||`
                        }
                    })
                    q += `)`;
                }else{
                    q += `&&((product_type:product contains ${window.F1GEN_vars.collection.filter.data.types}))`;
                }
            }

            if(window.F1GEN_vars.collection.filter.data.tags){
                if(window.F1GEN_vars.collection.filter.data.tags.length > 1){
                    q += `&&(`;
                    $.each(window.F1GEN_vars.collection.filter.data.tag, function(i, v){
                        if(parseInt(i) == (window.F1GEN_vars.collection.filter.data.tag.length - 1)){
                            q+= `(tag:product contains ${window.F1GEN_vars.collection.filter.data.tag[i]})`
                        }else{
                            q+= `(tag:product contains ${window.F1GEN_vars.collection.filter.data.tag[i]})||`
                        }
                    })
                    q += `)`;
                }else{
                    q += `&&((tag:product contains ${window.F1GEN_vars.collection.filter.data.tags}))`;
                }
            }

            if(!window.F1GEN_vars.collection.filter.data.viewNotAvailable){
                q += `&&((available:product=true))`;
            }

            if(window.F1GEN_vars.collection.filter.data.variants.option1){
                if(window.F1GEN_vars.collection.filter.data.variants.option1.length > 1){
                    q += `&&(`;
                    $.each(window.F1GEN_vars.collection.filter.data.variants.option1, function(i, v){
                        if(parseInt(i) == (window.F1GEN_vars.collection.filter.data.variants.option1.length - 1)){
                            q+= `(variantonhand:product = ${window.F1GEN_vars.collection.filter.data.variants.option1[i]})`
                        }else{
                            q+= `(variantonhand:product = ${window.F1GEN_vars.collection.filter.data.variants.option1[i]})||`
                        }
                    })
                    q += `)`;
                }else{
                    q += `&&((variantonhand:product = ${window.F1GEN_vars.collection.filter.data.variants.option1}))`;
                }
            }

            if(window.F1GEN_vars.collection.filter.data.variants.option2){
                if(window.F1GEN_vars.collection.filter.data.variants.option2.length > 1){
                    q += `&&(`;
                    $.each(window.F1GEN_vars.collection.filter.data.variants.option2, function(i, v){
                        if(parseInt(i) == (window.F1GEN_vars.collection.filter.data.variants.option2.length - 1)){
                            q+= `(variantonhand:product = ${window.F1GEN_vars.collection.filter.data.variants.option2[i]})`
                        }else{
                            q+= `(variantonhand:product = ${window.F1GEN_vars.collection.filter.data.variants.option2[i]})||`
                        }
                    })
                    q += `)`;
                }else{
                    q += `&&((variantonhand:product = ${window.F1GEN_vars.collection.filter.data.variants.option2}))`;
                }
            }
            var filter = `filter=${encodeURIComponent(q)}`;
            if(window.F1GEN_vars.collection.filter.data.sortBy){
                switch(window.F1GEN_vars.collection.filter.data.sortBy){
                    case 'manual':
                        break;
                    case 'title-ascending':
                        filter += '&sortby=(title:product=asc)';
                        break;
                    case 'title-descending':
                        filter += '&sortby=(title:product=desc)';
                        break;
                    case 'price-descending':
                        filter += '&sortby=(price:product=desc)';
                        break;
                    case 'price-ascending':
                        filter += '&sortby=(price:product=asc)';
                        break;
                    case 'created-descending':
                        filter += '&sortby=(updated_at:product=desc)';
                        break;
                    case 'created-ascending':
                        filter += '&sortby=(updated_at:product=asc)';
                        break;
                    case 'best-selling':
                        filter += '&sortby=(sold_quantity:product=desc)';
                        break;
                    case 'quantity-descending':
                        break;
                    default:
                }
            }
            return filter;
        },
        fetch: function(query){
            $('.collectionBody').html(`<div class="loading"><div class="lds-ring"><div></div><div></div><div></div><div></div></div></div>`);
            $.ajax({
                url: query,
                async: true,
                success:function(data){
                    $('.collectionBody').html(data);
                    $('#pagination').addClass('filtered');
                }
            })
        }
    }
}
F1GEN.Products = {
    init: function(){
        this.sliderInit();
        this.changeQuantity();
        this.sliderProductRelate();
        this.sliderProduct();
        this.sliderTabs();
        this.changeOption();
        this.render();
        this.setStatusVariants();
        this.checkOptionFirst();
        //this.activeAvailable();
        this.setViewedProduct();
        this.viewedProduct(3, 5);
        this.actions();
        this.hoverColor();
        this.magnificImage();
    },
    galleryThumbs: null,
    galleryTop: null,
    statusVariants: {},
    statusOption1: {},
    changeQuantity:function(){
        $('body').on('click','.productActionMain .qtyBtn',function(e){
            e.preventDefault();
            let type = $(this).data('type');
            if(type == "plus"){
                $(this).prev().val(parseInt($(this).prev().val()) + 1);
            }else{
                if(parseInt($(this).next().val()) !== 1)
                    $(this).next().val(parseInt($(this).next().val()) - 1);
            }
        })
    },
    setStatusVariants: function(){
        var self = this;
        var opsAll = [];
        var ops1 = [];
        $.each(window.F1GEN_vars.product.data.variants, function(i, v){
            var flagOpsAll = { val:'', status:''};
            if($.inArray(v['options'], opsAll) === -1){
                flagOpsAll.val = v['options'].toString();
                flagOpsAll.status = v.available;
                opsAll.push(flagOpsAll);
            }
            if($.inArray(v['option1'], ops1) === -1){
                ops1.push(v['option1']);
            }
        });
        self.statusVariants = opsAll;
        self.statusOption1 = ops1;
    },
    checkOptionFirst: function(){
        var self = this;
        var flagClick0 = false;
        $('.product-sw-line').eq(0).find('.product-sw-select-item input').addClass('soldOut').prop('checked',false);
        $.each(self.statusOption1, function(keyC1, valC1){
            $.each(self.statusVariants, function(keyC2, valC2){
                if(String(valC2.val).indexOf(valC1) !== -1){
                    if(valC2.status === true){
                        $('.product-sw-select-item input[value="'+ valC1 +'"]').removeClass('soldOut');
                        if(flagClick0 == false){
                            $('.product-sw-select-item input[value="'+ valC1 +'"]').next().trigger('click');
                            flagClick0 = true;
                        }
                    }
                }
            })
        })
    },
    checkAvailable: function(type, name, value){
        var self = this;
        if(name.indexOf(1) !== -1){
            $('.product-sw-line').eq(1).find('.product-sw-select-item input').addClass('soldOut').prop('checked',false);
            $('.product-sw-line').eq(2).find('.product-sw-select-item input').addClass('soldOut').prop('checked',false);
            var flagClick1 = false;
            $('.product-sw-line').eq(1).find('input').each(function(key1, val1){
                var flagOption1 = $(this).val();
                if(window.F1GEN_vars.product.data.options.length === 3){
                    $('.product-sw-line').eq(2).find('input').each(function(key1, val1){
                        var flagOption2 = $(this).val();
                        var flagCheck = `${value},${flagOption1},${flagOption2}`;
                        $.each(self.statusVariants, function(keyC, valC){
                            if(String(valC.val) === String(flagCheck) && valC.status){
                                $('.product-sw-select-item input[value="'+ flagOption1 +'"]').removeClass('soldOut');
                                $('.product-sw-select-item input[value="'+ flagOption2 +'"]').removeClass('soldOut');
                                if(flagClick1 == false){
                                    $('.product-sw-select-item input[value="'+ flagOption1 +'"]').trigger('click');
                                    flagClick1 = true;
                                }
                                return false;
                            }
                        })
                    });
                }else{
                    var flagCheck = `${value},${flagOption1}`
                    $.each(self.statusVariants, function(keyC, valC){
                        if(String(valC.val) === String(flagCheck) && valC.status){
                            $('.product-sw-select-item input[value="'+ flagOption1 +'"]').removeClass('soldOut');
                            if(flagClick1 == false){
                                $('.product-sw-select-item input[value="'+ flagOption1 +'"]').trigger('click');
                                flagClick1 = true;
                            }
                            return false;
                        }
                    })
                }
            })
        }else if(name.indexOf(2) !== -1){
            if(window.F1GEN_vars.product.data.options.length == 3){
                var flagClick2 = false;
                $('.product-sw-line').eq(2).find('input').each(function(key23, val3){
                    var flagOption2 = $(this).val();
                    var flagCheck = `${$('.product-sw-line').eq(0).find('input:checked').val()},${value},${flagOption2}`;
                    $.each(self.statusVariants, function(keyC, valC){
                        if(String(valC.val) === String(flagCheck) && valC.status){
                            $('.product-sw-select-item input[value="'+ value +'"]').removeClass('soldOut');
                            $('.product-sw-select-item input[value="'+ flagOption2 +'"]').removeClass('soldOut');
                            if(flagClick2 == ''){
                                $('.product-sw-select-item input[value="'+ flagOption2 +'"]').trigger('click');
                                flagClick2 = true;
                            }
                            return false;
                        }
                    })
                })
            }
        }
    },
    changeOption: function(){
        var self = this;
        $('body').on('change', '.trigger-option-sw', function(e){
            e.preventDefault();
            var name = $(this).attr('data-name');
            var value = $(this).val();
            $('select[data-option='+name+'][id^="productSelect"]').val(value).trigger('change');
            self.sliderProduct($('#productSelect').val());
            self.checkAvailable(true, name, value);
        })
    },
    render: function(){
        new Haravan.OptionSelectors("productSelect", { product: window.F1GEN_vars.product.data, onVariantSelected: this.variants });
    },
    variants: function(variant, selector){
        if(variant){
            if(variant.available){
                $('#addToCart').removeClass('sold-out').text('Thêm vào giỏ hàng');
                window.F1GEN_vars.product.availableOption = true;
            }else{
                $('#addToCart').addClass('sold-out').text('Hết hàng');
                window.F1GEN_vars.product.availableOption = false;
            }
            var saleChange = Math.round(100 - (variant.price / (variant.compare_at_price / 100)));
            $('.productWrapDetail .productPriceMain').text(Haravan.formatMoney(variant.price, window.F1GEN_vars.formatMoney));
            if(variant.compare_at_price > variant.price){
                $('.productWrapDetail .productPriceCompare').text(Haravan.formatMoney(variant.compare_at_price, window.F1GEN_vars.formatMoney)).removeClass('hidden');
                $('.productDiscount').html('(-' + saleChange + '%)')
            }else{
                $('.productWrapDetail .productPriceCompare').addClass('hidden');
            }
            $('.productSku').html('<span>Mã sản phẩm: </span>' + variant.sku);
        }else{
            $('#addToCart').addClass('sold-out').text('Hết hàng');
            window.F1GEN_vars.product.availableOption = false;
        }
    },
    activeAvailable: function(){
        if(window.F1GEN_vars.product.data.available){
            $.each(window.F1GEN_vars.product.data.variants, function(i, v){
                if(v.available){
                    if(v.option1 && v.option1.length > 0){
                        if($('.trigger-option-sw[data-name="option1"]').is('input')){
                            $('.trigger-option-sw[data-name="option1"][value="'+v.option1+'"]').trigger('click');
                        }else{
                            $('.trigger-option-sw[data-name="option1"]').val(v.option1).trigger('change');
                        }
                    }
                    if(v.option2 && v.option2.length > 0){
                        if($('.trigger-option-sw[data-name="option2"]').is('input')){
                            $('.trigger-option-sw[data-name="option2"][value="'+v.option2+'"]').trigger('click');
                        }else{
                            $('.trigger-option-sw[data-name="option2"]').val(v.option2).trigger('change');
                        }
                    }
                    if(v.option3 && v.option3.length > 0){
                        if($('.trigger-option-sw[data-name="option3"]').is('input')){
                            $('.trigger-option-sw[data-name="option3"][value="'+v.option3+'"]').trigger('click');
                        }else{
                            $('.trigger-option-sw[data-name="option3"]').val(v.option3).trigger('change');
                        }
                    }
                    return false;
                }
            })
        }
    },
    sliderInit: function(){
        var self = this;
        self.galleryThumbs = new Swiper('#productPage .thumbImage ', {
            spaceBetween: 10,
            slidesPerView: 5,
            loopedSlides: 5, //looped slides should be the same
            watchSlidesVisibility: true,
            watchSlidesProgress: true,
            centeredSlides:true,
            loop: true
        });
        self.galleryTop = new Swiper('#productPage .featureImage ', {
            spaceBetween: 10,
            loop:true,
            loopedSlides: 5, //looped slides should be the same
            navigation: {
                nextEl: '.swiper-button-next',
                prevEl: '.swiper-button-prev',
            },
            pagination: {
                el: '.swiper-pagination',
                clickable: true
            },
            thumbs: {
                swiper: self.galleryThumbs,
            },
            clickable:true,
            clickableClass:'swiper-pagination-clickable',
            centeredSlides:true
        });
    },
    sliderProduct: function(id){
        var self = this;
        if(id){
            $.each(window.F1GEN_vars.product.data.variants, function(i, v){
                if(v.id.toString() == id && v.featured_image){
                    var items = $('.thumbImageItem[data-id="'+v.featured_image.id+'"]');
                    self.galleryTop.slideTo(parseInt(items.attr('data-swiper-slide-index')));
                    return false;
                }
            })
        }
    },
    sliderProductRelate: function(){
        var galleryThumbsRelate = new Swiper('.productRelateMain ', {
            spaceBetween: 10,
            slidesPerView: 4,
            freeMode: true,
            loopedSlides: 5, //looped slides should be the same
            watchSlidesVisibility: true,
            watchSlidesProgress: true,
            breakpoints: {
                0: {
                    slidesPerView: 2,
                    spaceBetween: 10
                },
                768: {
                    slidesPerView: 4,
                    spaceBetween: 15
                }
            },
        });
    },
    sliderTabs: function(){
        if($(window).width() < 768){
            var galleryThumbsTabs = new Swiper('.productTabsContent .swiper-container', {
                spaceBetween: 0,
                slidesPerView: 3,
            });
        }
    },
    setViewedProduct: function(){
        if(window.F1GEN_vars.product.data.price > 0){
            var phand = [];
            if(document.cookie.indexOf('last_viewed_products') !== -1){
                var las = CookiesTop.getJSON('last_viewed_products');
                if($.inArray(window.F1GEN_vars.product.handle, las) === -1){
                    phand = [window.F1GEN_vars.product.handle];
                    for(var i = 0; i < las.length; i++){
                        phand.push(las[i]);
                        if(phand.length > 15){
                            break;
                        }
                    }
                    CookiesTop.set('last_viewed_products', phand, { expires: 180 });
                }
            }else{
                phand = [window.F1GEN_vars.product.handle];
                CookiesTop.set('last_viewed_products', phand, { expires: 180 });
            }
        }
    },
    viewedProduct: function(items, margin){
        if($('.productSeenMain').length > 0){
            if(document.cookie.indexOf('last_viewed_products') !== -1){
                var last_viewed_pro_array = CookiesTop.getJSON('last_viewed_products');
                var recentview_promises = [];
                for(var i = 0; i < 8; i++){
                    if(typeof last_viewed_pro_array[i] == 'string'){
                        var promise = new Promise(function(resolve, reject) {
                            $.ajax({
                                url:'/products/' + last_viewed_pro_array[i] + '?view=item',
                                success: function(product){
                                    resolve({error: false, data: product});
                                },
                                error: function(err){
                                    if(err.status === 404){
                                        try{
                                            var u = ((this.url.split('?'))[0]).replace('/products/', '');
                                            resolve({error: true, handle: u});
                                        }catch(e){
                                            resolve({error: false, data: ''})
                                        }
                                    }else{
                                        resolve({error: false, data: ''});
                                    }
                                }
                            })
                        });
                        recentview_promises.push(promise);
                    }
                }
                Promise.all(recentview_promises).then(function(values) {
                    var x = [];
                    $.each(values, function(i, v){
                        if(v.error){
                            x.push(v.handle);
                        }else{
                            $('.productSeenMain .swiper-wrapper').append(v.data);
                        }
                    });
                    if(x.length > 0){
                        var new_last_viewed_pro_array = [];
                        $.each(last_viewed_pro_array, function(i, v){
                            if($.inArray(v, x) === -1){
                                new_last_viewed_pro_array.push(v);
                            }
                        })
                        if(new_last_viewed_pro_array.length > 0){
                            CookiesTop.set('last_viewed_products', new_last_viewed_pro_array, { expires: 180 });
                        }
                    }
                    var galleryThumbs = new Swiper('.productSeenMain', {
                        spaceBetween: 10,
                        slidesPerView: 4,
                        freeMode: true,
                        loopedSlides: 5, //looped slides should be the same
                        watchSlidesVisibility: true,
                        watchSlidesProgress: true,
                        breakpoints: {
                            0: {
                                slidesPerView: 2,
                                spaceBetween: 10
                            },
                            768: {
                                slidesPerView: 4,
                                spaceBetween: 15
                            }
                        },
                    });
                });
            }else{
                $('.productSeen').hide();
            }
        }else{
            $('.productSeen').hide();
        }
    },
    actions: function(){
        var self = this;
        $('body').on('click', '#addToCart', function(e){
            e.preventDefault();
            let id = $('#productSelect').val();
            let quantity = $('#productPage #quantity').val();
            $.ajax({
                type: "POST",
                url: "/cart/add.js",
                data: {id: id, quantity: quantity},
                success: function(data){
                    $('a[data-type="sidebarAllMainCart"]').trigger('click');
                    F1GEN.Sidebar.getCartSidebar();
                },
                error: function(){
                    $('#alertError').modal('show').find('.modal-body').html('Xin lỗi, có vấn đề về tồn kho, vui lòng thử lại sau!');;
                }
            })
        })
        $('body').on('click', '#buyNow', function(e){
            e.preventDefault();
            let id = $('#productSelect').val();
            let quantity = $('#productPage #quantity').val();
            $.ajax({
                type: "POST",
                url: "/cart/add.js",
                data: {id: id, quantity: quantity},
                success: function(data){
                    window.location.href="/checkout";
                },
                error: function(){
                    $('#alertError').modal('show').find('.modal-body').html('Xin lỗi, có vấn đề về tồn kho, vui lòng thử lại sau!');
                }
            })
        })
    },
    hoverColor: function(){
        $('body').on('click','.product-sw-select-item.sw-color label',function(){
            var flagValHover = $(this).prev().attr('data-value');
            $(this).parents('.product-sw-line').find('.product-sw-title .colorHover').attr('data-hover',flagValHover);
        })
        $('body').on('mouseover','.product-sw-select-item.sw-color label',function(){
            var flagValHover = $(this).prev().attr('data-value');
            $(this).parents('.product-sw-line').find('.product-sw-title .colorHover').html(flagValHover);
        })
        $('body').on('mouseout','.product-sw-select-item.sw-color label',function(){
            var flagValHoverMain =  $(this).parents('.product-sw-line').find('.product-sw-title .colorHover').attr('data-hover');
            $(this).parents('.product-sw-line').find('.product-sw-title .colorHover').html(flagValHoverMain);
        })
    },
    magnificImage: function(){
        $('.featureImage .swiper-wrapper').magnificPopup({
            delegate: 'a',
            type: 'image',
            closeOnContentClick: false,
            closeBtnInside: false,
            mainClass: 'mfp-with-zoom mfp-img-mobile',
            image: {
                verticalFit: true,
                titleSrc: function(item) {
                    return F1GEN_vars.product.title;
                }
            },
            gallery: {
                enabled: true
            },
            zoom: {
                enabled: true,
                duration: 300, // don't foget to change the duration also in CSS
                opener: function(element) {
                    return element.find('img');
                }
            }
        });
        $('body').on('click', '#clickMagnific', function(){
            $('.featureImage .swiper-wrapper .swiper-slide-active').trigger('click');
        })
        $('.sizeGuide').magnificPopup({
            type: 'image'
        });
    }
};
F1GEN.Blogs = {
    init: function(){

    },
};
F1GEN.Articles = {
    init: function(){

    },
};
F1GEN.Pages = {
    init: function(){

    },
};
F1GEN.Accounts = {
    init: function(){
        this.auth();
        this.sidebar();
    },
    auth: function(){
        switch(window.location.hash){
            case '#recover':
                $('#auth-form').removeClass('login-layout register-layout recover-layout').addClass('recover-layout');
                break;
            case '#login':
                $('#auth-form').removeClass('login-layout register-layout recover-layout').addClass('login-layout');
                break;
            default:
        }
        $('body').on('click', '.auth-layout-trigger', function(e){
            e.preventDefault();
            var layout = $(this).attr('data-layout');
            $('#auth-form').removeClass('login-layout register-layout recover-layout').addClass(layout);
        })
    },
    sidebar: function(){
        var path = window.location.pathname;
        var s = window.location.search;
        $('.account-sidebar-menu a[href="'+path+s+'"]').addClass('active');
        if(path.indexOf('/account/orders/') !== -1){
            $('.account-sidebar-menu a[href="/account?view=orders"]').addClass('active');
        }
    }
}

F1GEN.Carts = {
    init: function(){
        this.quantityButton();
        this.handleChange();
        this.invoice();
        this.checkout();
    },
    updateCart: function(){
        var data = {};
        $('.cart-product-quanity').each(function(){
            data[$(this).attr('data-vid')] = $(this).val();
        })
        $('.loading-full').addClass('appeared');
        $.ajax({
            type: 'POST',
            url: '/cart/update.js',
            dataType: 'json',
            data: {
                updates: data
            },
            success: function(cart){
                window.location.reload();
            },
            error: function(error){

            }
        })
    },
    handleChange: function(){
        var self = this;
        $('body').on('change', '.cart-product-quanity', function(e){
            self.updateCart();
        })
        $('body').on('click', '.item-actions-remove', function(e){
            e.preventDefault();
            var vid = $(this).attr('data-vid');
            $('.modal-confirm-remove-buttons .btn-primary').attr('data-vid', vid);
            $('#modal-confirm-remove').modal();
        })
        $('body').on('click', '.modal-confirm-remove-buttons .btn-primary', function(e){
            e.preventDefault();
            $('#modal-confirm-remove').modal('hide');
            var vid = $(this).attr('data-vid');
            $('.cart-product-quanity[data-vid="'+vid+'"]').val(0).trigger('change');
        })
    },
    quantityButton: function(){
        $('body').on('click', '.cart-product-quantity-button-plus', function(e){
            e.preventDefault();
            var quantity = parseInt($(this).siblings('input[type="number"]').val());
            $(this).siblings('input[type="number"]').val(quantity + 1).trigger('change');
        })
        $('body').on('click', '.cart-product-quantity-button-minus', function(e){
            e.preventDefault();
            var quantity = parseInt($(this).siblings('input[type="number"]').val());
            if(quantity > 1){
                $(this).siblings('input[type="number"]').val(quantity - 1).trigger('change');
            }
        })
    },
    checkout: function(){
        var self = this;
        $('body').on('click', '.cart-page-checkout a', function(e){
            e.preventDefault();
            if(self.invoiceHandle()){
                window.location.href = '/checkout?step=1';
            };
        });
    },
    invoice: function(){
        $('body').on('change', '#invoice-export', function(){
            if($(this).is(':checked')){
                $('.invoice-block-body').slideDown(300);
            }else{
                $('.invoice-block-body').slideUp(300);
            }
        })
        // $.ajax({
        //     type: 'GET',
        //     url: '/cart.js',
        //     dataType: 'json',
        //     success: function(res){
        //         window.cart_attr  = res.attributes;
        //         if(typeof res.attributes.company_name !== 'undefined' && res.attributes.company_name.length > 0){
        //             $('#invoice-export').trigger('click');
        //         }
        //     }
        // })
    },
    invoiceHandle: function(){
        $('.invoice-block-body .text-danger').remove();
        if($('#invoice-export').is(':checked')){
            var cn = $('#company_name').val();
            var ct = $('#company_taxcode').val();
            var ca = $('#company_address').val();
            var ce = $('#company_email').val();
            var fl = false;
            $('.invoice-block-body .form-control').each(function(){
                var va = $(this).val();
                if((typeof va === 'undefined') || ( va == '' && va.length < 1 )){
                    $(this).after('<span class="small text-danger">Không được để trống</span>');
                    fl = true;
                }
            })
            if(fl){
                return false;
            }else{
                var inv_at = window.cart_attr || {};
                inv_at["invoice"] = "yes";
                inv_at["company_name"] = $('#company_name').val();
                inv_at["tax_code"] = $('#company_taxcode').val();
                inv_at["company_address"] = $('#company_address').val();
                //inv_at["bill_email"] = $('#company_email').val();
                $.ajax({
                    type: 'post',
                    url: '/cart/update.js',
                    async: false,
                    data: {attributes: inv_at, note: (typeof $('#note-input').val() !== 'undefined' && $('#note-input').val().length > 0)?$('#note-input').val():null},
                    success: function(response){

                    }
                });
            }
        }else{
            var inv_at = window.cart_attr || {};
            inv_at["invoice"] = "no";
            inv_at["company_name"] = '';
            inv_at["tax_code"] = '';
            inv_at["company_address"] = '';
            //inv_at["bill_email"] = '';
            $.ajax({
                type: 'post',
                url: '/cart/update.js',
                async: false,
                data: {attributes: inv_at, note: (typeof $('#note-input').val() !== 'undefined' && $('#note-input').val().length > 0)?$('#note-input').val():null},
                success: function(response){

                }
            });
        }
        return true;
    }
}
F1GEN.Searchs = {
    init: function(){

    },
};
F1GEN.Quickview = {
    init: function(){
        this.getDataQuickview();
        this.actions();
        this.changeQuantity();
    },
    galleryThumbs: null,
    galleryTop: null,
    statusVariants: {},
    statusOption1: {},
    getDataQuickview:function(){
        var self = this;
        $('body').on('click','.setQuickview',function(e){
            if($(window).width() > 768 ){
                e.preventDefault();
                $('.loadingWrapper').addClass('open');
                $('#quickviewModal').modal('show');
                $('#quickviewModal .modal-body').css('opacity',0);
                // let flagHandle = $(this).attr('data-handle');
                // $('.loadingWrapper').removeClass('open');
                // $('#quickviewModal .modal-body').css('opacity',1);
                let product_id = $(this).attr('data-product_id');
                // self.changeOption();
                // self.render();
                // /*F1GEN.Quickview.setAvailableVariants();*/
                // self.setStatusVariants();
                // self.checkOptionFirst();
                // $.ajax({
                //     url:'/products/' + flagHandle + '.js',
                //     async: false,
                //     success: function(data){
                //         window.F1GEN_vars.quickview = data;
                //     }
                // })
                $.get(wc_add_to_cart_params.ajax_url,{
                    action: 'get_items',
                    product_id: product_id,
                }, function(res){
                        $('#quickviewModal .modal-body').html(res);
                        setTimeout(function(){
                            // self.sliderInit();
                            $('.loadingWrapper').removeClass('open');
                            $('#quickviewModal .modal-body').css('opacity',1);
                            self.variants();
                        //     /*F1GEN.Quickview.setAvailableVariants();*/
                        //     self.setStatusVariants();
                        //     self.checkOptionFirst();
                        },1000)
                    });
                //     error: function(err){}
            }else{
                let flagHandlex = $(this).attr('data-handle');
                window.location.href= '/products/'+flagHandlex;
            }
        })
    },
    changeQuantity:function(){
        $('body').on('click','.productActionMainQW .qtyBtn',function(e){
            e.preventDefault();
            let type = $(this).data('type');
            if(type == "plus"){
                $(this).prev().val(parseInt($(this).prev().val()) + 1);
            }else{
                if(parseInt($(this).next().val()) !== 1)
                    $(this).next().val(parseInt($(this).next().val()) - 1);
            }
        })
    },
    setStatusVariants: function(){
        var self = this;
        var opsAll = [];
        var ops1 = [];
        $.each(window.F1GEN_vars.quickview.variants, function(i, v){
            var flagOpsAll = { val:'', status:''};
            if($.inArray(v['options'], opsAll) === -1){
                flagOpsAll.val = v['options'].toString();
                flagOpsAll.status = v.available;
                opsAll.push(flagOpsAll);
            }
            if($.inArray(v['option1'], ops1) === -1){
                ops1.push(v['option1']);
            }
        });
        self.statusVariants = opsAll;
        self.statusOption1 = ops1;
    },
    checkOptionFirst: function(){
        debugger;
        var self = this;
        var flagClick0 = false;
        $('.product-sw-lineQW').eq(0).find('.product-sw-select-itemQW input').addClass('soldOut').prop('checked',false);
        $.each(self.statusOption1, function(keyC1, valC1){
            $.each(self.statusVariants, function(keyC2, valC2){
                if(String(valC2.val).indexOf(valC1) !== -1){
                    if(valC2.status === true){
                        $('.product-sw-select-itemQW input[value="'+ valC1 +'"]').removeClass('soldOut');
                        if(flagClick0 == false){
                            $('.product-sw-select-itemQW input[value="'+ valC1 +'"]').next().trigger('click');
                            flagClick0 = true;
                        }
                    }
                }
            })
        })
    },
    checkAvailable: function(type, name, value){
        var self = this;
        if(name.indexOf(1) !== -1){
            $('.product-sw-lineQW').eq(1).find('.product-sw-select-itemQW input').addClass('soldOut').prop('checked',false);
            $('.product-sw-lineQW').eq(2).find('.product-sw-select-itemQW input').addClass('soldOut').prop('checked',false);
            var flagClick1 = false;
            $('.product-sw-lineQW').eq(1).find('input').each(function(key1, val1){
                var flagOption1 = $(this).val();
                if(window.F1GEN_vars.quickview.options.length === 3){
                    $('.product-sw-lineQW').eq(2).find('input').each(function(key1, val1){
                        var flagOption2 = $(this).val();
                        var flagCheck = `${value},${flagOption1},${flagOption2}`;
                        $.each(self.statusVariants, function(keyC, valC){
                            if(String(valC.val) === String(flagCheck) && valC.status){
                                $('.product-sw-select-itemQW input[value="'+ flagOption1 +'"]').removeClass('soldOut');
                                $('.product-sw-select-itemQW input[value="'+ flagOption2 +'"]').removeClass('soldOut');
                                if(flagClick1 == false){
                                    $('.product-sw-select-itemQW input[value="'+ flagOption1 +'"]').next().trigger('click');
                                    flagClick1 = true;
                                }
                                return false;
                            }
                        })
                    });
                }else{
                    var flagCheck = `${value},${flagOption1}`
                    $.each(self.statusVariants, function(keyC, valC){
                        if(String(valC.val) === String(flagCheck) && valC.status){
                            $('.product-sw-select-itemQW input[value="'+ flagOption1 +'"]').removeClass('soldOut');
                            if(flagClick1 == false){
                                $('.product-sw-select-itemQW input[value="'+ flagOption1 +'"]').next().trigger('click');
                                flagClick1 = true;
                            }
                            return false;
                        }
                    })
                }
            })
        }else if(name.indexOf(2) !== -1){
            if(window.F1GEN_vars.quickview.options.length == 3){
                var flagClick2 = false;
                $('.product-sw-lineQW').eq(2).find('input').each(function(key23, val3){
                    var flagOption2 = $(this).val();
                    var flagCheck = `${$('.product-sw-lineQW').eq(0).find('input:checked').val()},${value},${flagOption2}`;
                    $.each(self.statusVariants, function(keyC, valC){
                        if(String(valC.val) === String(flagCheck) && valC.status){
                            $('.product-sw-select-itemQW input[value="'+ value +'"]').removeClass('soldOut');
                            $('.product-sw-select-itemQW input[value="'+ flagOption2 +'"]').removeClass('soldOut');
                            if(flagClick2 == ''){
                                $('.product-sw-select-itemQW input[value="'+ flagOption2 +'"]').next().trigger('click');
                                flagClick2 = true;
                            }
                            return false;
                        }
                    })
                })
            }
        }
    },
    changeOption: function(){
        var self = this;
        $('body').on('change', '.trigger-option-swQW', function(){
            var name = $(this).attr('data-name');
            var value = $(this).val();
            $('select[data-option='+name+'][id^="productSelect"]').val(value).trigger('change');
            self.sliderProduct($('#productSelectQW').val());
            self.checkAvailable(true, name, value);
        })
    },
    // render: function(){
    //     new Haravan.OptionSelectors("productSelectQW", { product: window.F1GEN_vars.quickview, onVariantSelected: this.variants });
    // },
    variants: function(){
        $('body').on('click', '.product-sw-select-itemQW', function(e){
            const max_qty = $(this).find('.trigger-option-swQW').attr('data-qty');
            const sku = $(this).find('.trigger-option-swQW').attr('data-sku');
            const id = $(this).find('.trigger-option-swQW').val();
            if(max_qty > 0){
                $('#sku').html(sku);
                $('#addToCartQW').attr('data-id',id);
                $('#buyNowQW').attr('data-id',id);
            }
        })
    },
    activeAvailable: function(){
        if(window.F1GEN_vars.quickview.available){
            $.each(window.F1GEN_vars.quickview.variants, function(i, v){
                if(v.available){
                    if(v.option1 && v.option1.length > 0){
                        if($('.trigger-option-swQW[data-name="option1"]').is('input')){
                            $('.trigger-option-swQW[data-name="option1"][value="'+v.option1+'"]').trigger('click');
                        }else{
                            $('.trigger-option-swQW[data-name="option1"]').val(v.option1).trigger('change');
                        }
                    }
                    if(v.option2 && v.option2.length > 0){
                        if($('.trigger-option-swQW[data-name="option2"]').is('input')){
                            $('.trigger-option-swQW[data-name="option2"][value="'+v.option2+'"]').trigger('click');
                        }else{
                            $('.trigger-option-swQW[data-name="option2"]').val(v.option2).trigger('change');
                        }
                    }
                    if(v.option3 && v.option3.length > 0){
                        if($('.trigger-option-swQW[data-name="option3"]').is('input')){
                            $('.trigger-option-swQW[data-name="option3"][value="'+v.option3+'"]').trigger('click');
                        }else{
                            $('.trigger-option-swQW[data-name="option3"]').val(v.option3).trigger('change');
                        }
                    }
                    return false;
                }
            })
        }
    },
    sliderInit: function(){
        var self = this;
        self.galleryTop = new Swiper('#quickviewModal .featureImageQW ', {
            spaceBetween: 10,
            loop:true,
            loopedSlides: 5, //looped slides should be the same
            navigation: {
                nextEl: '.swiper-button-next',
                prevEl: '.swiper-button-prev',
            },
            pagination: {
                el: '.swiper-pagination',
                clickable: true
            },
            thumbs: {
                swiper: self.galleryThumbs,
            },
            clickable:true,
            clickableClass:'swiper-pagination-clickable',
            centeredSlides:true
        });
    },
    sliderProduct: function(id){
        var self = this;
        if(id){
            $.each(window.F1GEN_vars.quickview.variants, function(i, v){
                if(v.id.toString() == id && v.featured_image){
                    var items = $('.thumbImageItemQW[data-id="'+v.featured_image.id+'"]');
                    self.galleryTop.slideTo(parseInt(items.attr('data-swiper-slide-index')));
                    return false;
                }
            })
        }
    },
    actions: function(){
        var self = this;
        $('body').on('click', '#addToCartQW', function(e){
            e.preventDefault();
            let product_id = $(this).attr('data-id');
            const qty= $('#quantityQW').val();
            if(product_id){
                $.ajax({
                    type: "POST",
                    async: false,
                    url: wc_add_to_cart_params.ajax_url,
                    data: {
                        product_id: product_id,
                        quantity: qty,
                        action: 'woocommerce_ajax_add_to_cart'
                    },
                    success: function(data){
                        if(data.error){
                            $('#alertError').modal('show').find('.modal-body').html('Xin lỗi, có vấn đề về tồn kho, vui lòng thử lại sau!');;
                        }else{
                            F1GEN.Sidebar.getCartSidebar();
                            setTimeout(function(){
                                $('a[data-type="sidebarAllMainCart"]').trigger('click');
                                // $( document.body ).trigger( 'added_to_cart', [ data.fragments, data.cart_hash ] );
                            },1000)
                        }
                    },
                    error: function(){
                        $('#alertError').modal('show').find('.modal-body').html('Xin lỗi, có vấn đề về tồn kho, vui lòng thử lại sau!');;
                    }
                })
            }else{
                $('#alertError').modal('show').find('.modal-body').html('Xin lỗi, vui lòng chọn sản phẩm!');;
            }
        })
        $('body').on('click', '#buyNowQW', function(e){
            e.preventDefault();
            let product_id = $(this).attr('data-id');
            let quantity = $('#quantityQW').val();
            if(product_id){
                $.ajax({
                    type: "POST",
                    async: false,
                    url: wc_add_to_cart_params.ajax_url,
                    data: {
                        product_id: product_id,
                        quantity: quantity,
                        action: 'woocommerce_ajax_add_to_cart'
                    },
                    success: function(data){
                        window.location.href="checkout";
                    },
                    error: function(){
                        $('#alertError').modal('show').find('.modal-body').html('Xin lỗi, có vấn đề về tồn kho, vui lòng thử lại sau!');;
                    }
                })
            }else{
                $('#alertError').modal('show').find('.modal-body').html('Xin lỗi, vui lòng chọn sản phẩm!');;
            }
        })
    },
};
F1GEN.Global.init();
