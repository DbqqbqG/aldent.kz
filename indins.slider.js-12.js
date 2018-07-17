jQuery(document).ready(function($){

    var windowWidthOld,
        indinsSlider = $('.indins-slider');

    $(window).load(function () {
        windowWidthOld = $(window).width();
        indins_slider_init();
        indins_slider_resize();
    });

    $(window, document).resize(function() {
        var windowWidthNew = $(window).width();
        if(windowWidthNew !== windowWidthOld) {
            windowWidthOld = windowWidthNew;
            indins_slider_resize();
        }
    });

    var startX, offset, dx,
        defaultMarginBottom = indinsSlider.css('margin-bottom');

    indinsSlider.on('mouseover', function(){
        var slider = $(this);
        if(slider.attr('data-interval')) {
            var sliderID = slider.attr('data-on-page-id') * 1;
            indinsStopCall(sliderID);
        }
    }).on('mouseout', function(){
        var slider = $(this);
        if(slider.attr('data-interval')) {
            var sliderID = slider.attr('data-on-page-id') * 1;
            indinsStartCall(sliderID);
        }
    }).on('click', '.indins-slider-nav-arrow-left', function(){
        var slider = $(this).parents('.indins-slider');
        indins_slider_move(slider, 'left');
    }).on('click', '.indins-slider-nav-arrow-right', function(){
        var slider = $(this).parents('.indins-slider');
        indins_slider_move(slider, 'right');
    }).on('click', '.indins-slider-nav-circles li', function(){
        if(!$(this).hasClass('indins-slider-nav-active')) {
            var circles_li = $(this);
            indins_slider_move(circles_li.parents('.indins-slider'), circles_li.index());
        }
    }).on('touchstart', '.indins-slider-row', function(e){
        startX = e.originalEvent.touches[0].pageX;
    }).on('touchmove', '.indins-slider-row', function(e){
        startX = e.originalEvent.touches[0].pageX;
    }).on('touchend', '.indins-slider-row', function(e){
        startX = e.originalEvent.changedTouches[0].pageX;
        startX = null;
    });

    function indins_slider_init(){
        if(indinsSlider.length){
            var onPageID = 0;
            indinsSlider.each(function(){
                var slider = $(this),
                    slider_items = slider.find('.indins-slider-item'),
                    slider_items_counts = slider_items.length;
                slider.attr('data-counts', slider_items_counts);
                slider.attr('data-size', 0);

                slider.attr('data-on-page-id', onPageID);

                if(slider.attr('data-interval')) {
                    indinsStartCall(onPageID);
                }

                onPageID++;
            });
        }
    }

    function indins_slider_resize() {
        if(indinsSlider.length){
            indinsSlider.each(function(){
                var slider = $(this),
                    slider_items = slider.find('.indins-slider-item'),
                    slider_items_counts = slider_items.length;
                slider.attr('data-counts', slider_items_counts);

                var wH = $(window).width(),
                    new_size = 0;
                if (wH >= 1200) new_size = getSize(slider,'lg');
                if (wH >= 992 && wH < 1200) new_size = getSize(slider,'md');
                if (wH >= 768 && wH < 992) new_size = getSize(slider,'sm');
                if (wH >= 450 && wH < 768) new_size = getSize(slider,'xs');
                if (wH < 450) new_size = getSize(slider,'ws');

                indins_slider_nav_circles(slider,new_size);
                indins_slider_nav_arrows(slider,new_size);
                indins_slider_reset(slider, new_size);
                indins_slider_same(slider);
            });
        }
    }

    function indins_slider_same(slider){
        if(slider.attr('data-same') === 'true') {
            var bestHeight = 0;
            slider.find('.indins-slider-item').css({height: 'auto'});
            slider.find('.indins-slider-item').each(function(){
                var targetBlockHeight = $(this).outerHeight();
                if(targetBlockHeight>bestHeight) bestHeight = targetBlockHeight;
            });
            slider.attr('data-sameHeight', bestHeight).find('.indins-slider-item').css({height: bestHeight});
        }
    }

    function indins_slider_reset(slider,slider_size){
        var view_width = slider.find('.indins-slider-area').width(),
            view_row = slider.find('.indins-slider-row'),
            view_items = view_row.find('.indins-slider-item'),
            view_items_counts = view_items.length,
            new_items_width = view_width / slider_size;

        view_items.width(new_items_width);
        view_row.width(new_items_width * view_items_counts);

        slider.attr('data-move', 0);
        slider.attr('data-size', slider_size);
        indins_slider_move(slider, '');
    }

    function indins_slider_nav_circles(slider,slider_size){
        if(slider.attr('data-circles') === 'true') {
            if(slider.attr('data-counts')*1 > slider_size) {
                var slider_counts = slider.attr('data-counts')*1,
                    slider_displays = Math.ceil(slider_counts / slider_size),
                    nav_circles = '';

                for (var i = 0; i < slider_displays; i++) {
                    nav_circles += '<li><span></span></li>';
                }

                if (slider.find('.indins-slider-nav-circles').length) {
                    slider.find('.indins-slider-nav-circles').html(nav_circles);
                }
                else {
                    nav_circles = '<ul class="indins-slider-nav-circles">' + nav_circles + '</ul>';
                    slider.append(nav_circles);
                }
                slider.css({marginBottom: slider.find('.indins-slider-nav-circles').innerHeight()});
            }
            else if(slider.attr('data-counts')*1 <= slider_size && slider.find('.indins-slider-nav-circles').length) {
                slider.find('.indins-slider-nav-circles').remove();
                slider.css({marginBottom:defaultMarginBottom});
            }
        }
    }

    function indins_slider_nav_arrows(slider,slider_size){
        if(slider.attr('data-arrows') === 'true') {
            if(!slider.find('.indins-slider-nav-arrows').length && slider.attr('data-counts')*1 > slider_size) {
                var nav_arrows = '<div class="indins-slider-nav-arrows indins-slider-nav-arrow-left"></div>\
                        <div class="indins-slider-nav-arrows indins-slider-nav-arrow-right"></div>';
                slider.append(nav_arrows);

                var slider_margin = slider.find('.indins-slider-nav-arrows').innerWidth();
                slider.css({marginLeft:slider_margin,marginRight:slider_margin});
            }
            else if(slider.attr('data-counts')*1 <= slider_size) {
                slider.find('.indins-slider-nav-arrows').remove();
                slider.css({marginLeft:0,marginRight:0});
            }
        }
    }

    function indins_slider_move(slider, move_direction){
        var slider_item = slider.find('.indins-slider-item'),
            move_block = slider.find('.indins-slider-row'),
            items_width = slider_item.innerWidth(),
            items_length = slider_item.length,
            data_move = slider.attr('data-move')*1,
            slider_size = slider.attr('data-size')*1;
        var move_to = 0;

        if (move_direction === 'right') {
            move_to = data_move + slider_size;
        }
        if (move_direction === 'left') {
            move_to = data_move - slider_size;
        }
        if($.isNumeric(move_direction)) {
            move_to = slider_size * move_direction;
        }

        if(move_to > items_length - slider_size) {
            var ost = items_length - (move_to + slider_size);
            if(ost < slider_size) move_to = items_length - slider_size;
            if (ost == -slider_size) move_to = 0;
        }
        if(move_to < 0) {
            if(data_move > 0) move_to = 0;
            else {move_to = items_length - slider_size;}
        }

        if(slider.attr('data-circles') === 'true' && slider.find('.indins-slider-nav-circles').length) {
            var circles_index = Math.ceil(move_to/slider_size);
            slider.find('.indins-slider-nav-active').removeClass('indins-slider-nav-active');
            slider.find('.indins-slider-nav-circles').find('li').eq(circles_index).addClass('indins-slider-nav-active');
        }

        var move_way = (items_width * move_to) * -1;
        if(items_length <= slider_size) move_way = move_way / 2;

        var newAnimation = 'translate3d('+ move_way + 'px, 0,0)';
        move_block.css('-webkit-transform',newAnimation);
        move_block.css('-moz-transform',newAnimation);
        move_block.css('-o-transform',newAnimation);
        move_block.css('transform',newAnimation);
        slider.attr('data-move', move_to);
    }

    function getSize(slider,size){
        var is_size = 0;
        switch (size) {
            case 'lg':
                if(slider.attr('data-size-lg') && $.isNumeric(slider.attr('data-size-lg'))){
                    is_size = slider.attr('data-size-lg')*1;
                    break;
                }
            case 'md':
                if(slider.attr('data-size-md') && $.isNumeric(slider.attr('data-size-md'))){
                    is_size = slider.attr('data-size-md')*1;
                    break;
                }
            case 'sm':
                if(slider.attr('data-size-sm') && $.isNumeric(slider.attr('data-size-sm'))){
                    is_size = slider.attr('data-size-sm')*1;
                    break;
                }
            case 'xs':
                if(slider.attr('data-size-xs') && $.isNumeric(slider.attr('data-size-xs'))){
                    is_size = slider.attr('data-size-xs')*1;
                    break;
                }
            case 'ws':
                if(slider.attr('data-size-ws') && $.isNumeric(slider.attr('data-size-ws'))){
                    is_size = slider.attr('data-size-ws')*1;
                    break;
                }
            default: is_size = 1;
                break;
        }
        return is_size;
    }

    var calledArr = [];
    function indinsStartCall(call_id){
        var slider = $('[data-on-page-id="'+call_id+'"]'),
            sliderTime = slider.attr('data-interval')*1;
        calledArr[call_id] = setInterval(function () {
            indins_slider_move(slider, 'right');
        },sliderTime);
    }
    function indinsStopCall(call_id){
        clearInterval(calledArr[call_id]);
    }

});