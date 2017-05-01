(function ($) {
    "use strict"; // Start of use strict
    /*Logo*/
    /*	$('.har_logo_eq span').each(function(){
     var animated = $(this);
     function animate() {
     animated.animate({
     height: Math.floor(Math.random() * 100) + '%'
     }, 350);
     }
     setInterval(animate, 350);
     });*/

    /*Countdown*/
    $('.har_countdown').each(function () {
        var year = $(this).attr('data-year');
        var month = $(this).attr('data-month');
        var day = $(this).attr('data-day');
        $(this).countdown({until: new Date(year, month - 1, day)});

    });

    /*CountTo*/
    $('.har_timer').appear(function () {
        var e = $(this);
        e.countTo({
            from: 0,
            to: e.html(),
            speed: 1300,
            refreshInterval: 60
        })
    })
    $('.date_picker').datepicker();

    function send_form(type) {
        var arr = [];
        $("#" + type + " .form-control").each(function () {

            var element = $(this).attr('name');
            var value = $(this).val();
            $(this).css({border: "1px solid #c4c4c4"});
            if ($(this).prop('required') && value == "") {
                $(this).css({border: "2px solid red"});
                $(this).focus();
                return false;
            }
            arr.push("'&" + element + "=' + " + value);
        })


        var dataString = (arr.join(' + '));

        $.ajax({
            method: "POST",
            url: "http://formspree.io/rodalermakov@gmail.com",
            data: dataString,
            dataType: "json",
            success: function () {
                $("#" + type).html("<div id='form_send_message'>Thank you for your request, we will contact you as soon as possible.</div>", 1500);
            }
        });


    }


    /*OWL Intro Slider*/
    $(".har_slider_carousel").owlCarousel({
        navigation: true,
        pagination: false,
        responsive: true,
        responsiveRefreshRate: 200,
        responsiveBaseElement: window,
        slideSpeed: 300,
        addClassActive: true,
        paginationSpeed: 200,
        rewindSpeed: 300,
        items: 1,
        autoPlay: 99999999,
        touchDrag: false,
        singleItem: true,
        transitionStyle: 'fade',
        navigationText: ['<i class="ti ti-angle-left"></i>', '<i class="ti ti-angle-right"></i>']
    });


    /* Section Background */
    $('.har_image_bck').each(function () {
        var image = $(this).attr('data-image');
        var gradient = $(this).attr('data-gradient');
        var color = $(this).attr('data-color');
        var blend = $(this).attr('data-blend');
        var opacity = $(this).attr('data-opacity');
        var position = $(this).attr('data-position');
        var height = $(this).attr('data-height');
        if (image) {
            $(this).css('background-image', 'url(' + image + ')');
        }
        if (gradient) {
            $(this).css('background-image', gradient);
        }
        if (color) {
            $(this).css('background-color', color);
        }
        if (blend) {
            $(this).css('background-blend-mode', blend);
        }
        if (position) {
            $(this).css('background-position', position);
        }
        if (opacity) {
            $(this).css('opacity', opacity);
        }
        if (height) {
            $(this).css('height', height);
        }

    });

    /*	/!* Over *!/
     $('.har_over, .har_head_bck').each(function(){
     var color = $(this).attr('data-color');
     var image = $(this).attr('data-image');
     var opacity = $(this).attr('data-opacity');
     var blend = $(this).attr('data-blend');
     if (color){
     $(this).css('background-color', color);
     }
     if (image){
     $(this).css('background-image', 'url('+image+')');
     }
     if (opacity){
     $(this).css('opacity', opacity);
     }
     if (blend){
     $(this).css('mix-blend-mode', blend);
     }
     });*/

    /*Scroll Effect*/
    $('.har_go').on("click", function (e) {
        var anchor = $(this);
        $('html, body').stop().animate({
            scrollTop: $(anchor.attr('href')).offset().top
        }, 300);
        e.preventDefault();
    });

    /*Animation Block Delay*/

    $('div[data-animation=animation_blocks]').each(function () {
        var i = 0;
        $(this).find('.har_icon_box, .skill-bar-content, .har_anim_box').each(function () {
            $(this).css('transition-delay', '0.' + i + 's');
            i++;
        })
    })

    /*Increase-Decrease*/
    $('.increase-qty').on("click", function (e) {
        var qtya = $(this).parents('.add-to-cart').find('.qty').val();
        var qtyb = qtya * 1 + 1;
        $(this).parents('.add-to-cart').find('#qty').val(qtyb);
        e.preventDefault();
    });
    $('.decrease-qty').on("click", function (e) {
        var qtya = $(this).parents('.add-to-cart').find('#qty').val();
        var qtyb = qtya * 1 - 1;
        if (qtyb < 1) {
            qtyb = 1;
        }
        $(this).parents('.add-to-cart').find('#qty').val(qtyb);
        e.preventDefault();
    });

    /* Shortcode Nav */
    var top_offset = $('header').height() - 1;

    $('#nav-sidebar').onePageNav({
        currentClass: 'current',
        changeHash: false,
        scrollSpeed: 700,
        scrollOffset: top_offset,
        scrollThreshold: 0.5,
        filter: '',
        easing: 'swing',
    });


    /* Bootstrap */
    $('[data-toggle="tooltip"]').tooltip();
    $('[data-toggle="popover"]').popover();

    /* Anchor Scroll */
    $(window).scroll(function () {
        if ($(window).scrollTop() > 100) {
            $(".har_logo").addClass('active');
            $('body').addClass('har_first_step');

        }
        else {
            $('body').removeClass('har_first_step');
            $(".har_logo").removeClass('active');
        }
        if ($(window).scrollTop() > 500) {
            $('body').addClass('har_second_step');
        }
        else {
            $('body').removeClass('har_second_step');
        }
    });

    /* Fixed for Parallax */
    $(".har_fixed").css("background-attachment", "fixed");


    /* Submenu */
    $('.har_parent').on({
        mouseenter: function () {
            $(this).find('ul').stop().fadeIn(300);
        }, mouseleave: function () {
            $(this).find('ul').stop().fadeOut(300);
        }
    });

    /* Mobile Menu */

    $('.har_mobile_menu_content .har_parent').on("click", function (e) {
        $(this).find('ul').slideToggle(300);
    });
    $('.har_mobile_menu').on("click", function (e) {
        $(this).toggleClass('active');
        $('.har_mobile_menu_hor').toggleClass('active');
    });

    $('.har_header_search').on({
        mouseenter: function () {
            $(this).find('.har_header_search_cont, .har_header_basket_cont').stop().fadeToggle();
        }, mouseleave: function () {
            $(this).find('.har_header_search_cont, .har_header_basket_cont').stop().fadeToggle();
        }
    });

    /* Top Menu Click to Section */
    $('.har_top_menu_cont a[href*=\\#]:not([href=\\#])').on("click", function () {
        $(".har_mobile_menu").trigger('click');
        $('.har_top_menu_cont a[href*=\\#]:not([href=\\#])').removeClass('active');
        $(this).addClass('active');

        if (location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '')
            || location.hostname == this.hostname) {

            var target = $(this.hash);
            target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
            if (target.length) {
                $('html,body').animate({
                    scrollTop: target.offset().top
                }, 1000);
                return false;
            }
        }
    });


    /* Block Autheight */
    if (!device.tablet() && !device.mobile()) {
        $('.har_auto_height').each(function () {
            setEqualHeight($(this).find('div[class^="col"]'));
        });
    }
    if (device.tablet() && device.landscape()) {
        $('.har_auto_height').each(function () {
            setEqualHeight($(this).find('div[class^="col"]'));
        });
    }

    $(window).resize(function () {
        if (!device.tablet() && !device.mobile()) {
            $('.har_auto_height').each(function () {
                setEqualHeight($(this).find('div[class^="col"]'));
            });
        }
        if (device.tablet() && device.landscape()) {
            $('.har_auto_height').each(function () {
                setEqualHeight($(this).find('div[class^="col"]'));
            });
        }
    });

    /*Boxes AutoHeight*/
    function setEqualHeight(columns) {
        var tallestcolumn = 0;
        columns.each(
            function () {
                $(this).css('height', 'auto');
                var currentHeight = $(this).height();
                if (currentHeight > tallestcolumn) {
                    tallestcolumn = currentHeight;
                }
            }
        );
        columns.height(tallestcolumn);
    }

    /*Player*/
    var myPlaylist = new jPlayerPlaylist({
        jPlayer: "#jquery_jplayer_1",
        cssSelectorAncestor: "#jp_container_1"
    }, [
        {
            artist: "Aly & Fila / Susana",
            title: "Unbreakable",
            mp3: "http://trancervatory.com/static/Home/mp3/unbreakable.mp3",
            oga: "http://trancervatory.com/static/Home/mp3/unbreakable.mp3"
        }
    ], {
        playlistOptions: {
            enableRemoveControls: true
        },
        swfPath: "assets/jplayer/jplayer",
        supplied: "oga, mp3",
        wmode: "window",
        useStateClassSkin: true,
        autoBlur: false,
        smoothPlayBar: true,
        keyEnabled: true,
    });

    $('.toggle-tickets').click(function () {
        var $tickets = $(this).parent().siblings('.collapse');

        if ($tickets.hasClass('in')) {
            $tickets.collapse('hide');
            $(this).html('Show Tickets');
            $(this).closest('.ticket-card').removeClass('active');
        } else {
            $tickets.collapse('show');
            $(this).html('Hide Tickets');
            $(this).closest('.ticket-card').addClass('active');
        }
    });

    // Show The Current Track !!
    $("#jquery_jplayer_1").on(
        $.jPlayer.event.ready + ' ' + $.jPlayer.event.play,
        function (event) {
            var current = myPlaylist.current;
            var playlist = myPlaylist.playlist;
            $.each(playlist, function (index, obj) {
                if (index == current) {
                    $("#nowPlaying .artist-name").html(obj.artist + " - ");
                    $("#nowPlaying .track-name").html(obj.title);
                }
            });
        }
    );
    // Open Close PlayList
    $('#playlist-toggle').on('click', function (e) {
        e.preventDefault();
        $(this).toggleClass('close-icon');
        $('#jp_container_1').find(".jp-playlist").fadeToggle(300);
    });
    $('.har_music').on('click', function () {
        $('.har_player_container').fadeToggle(400);
    });


})(jQuery);


$(window).load(function () {

    $(".har_preloader").fadeOut("slow");

    // Page loader

    $("body").imagesLoaded(function () {
        $(".har_page_loader div").fadeOut();
        $(".har_page_loader").delay(200).fadeOut("slow");
    });


    /*SkroolR*/
    if (!device.tablet() && !device.mobile()) {
        var s = skrollr.init({
            forceHeight: false,
        });
        $(window).stellar({
            horizontalScrolling: false,
            responsive: true,
        });
    }

    /*Masonry*/

    var $grid = $('.grid').isotope({
        itemSelector: '.grid-item',
        percentPosition: true,
        masonry: {
            columnWidth: '.grid-item'
        }
    });
    $grid.imagesLoaded().progress(function () {
        $grid.isotope('layout');
    });
    $(window).resize(function () {
        $grid.isotope('layout');
    });


    $('.masonry').masonry({
        itemSelector: '.masonry-item',
    });

    $('.filter-button-group').on('click', 'a', function () {
        $(this).parents('.filter-button-group').find('a').removeClass('active');
        $(this).addClass('active');
        var filterValue = $(this).attr('data-filter');
        $grid.isotope({filter: filterValue});
    });


});


$(document).ready(function () {
    var selectbox = $('<select id="City" class="placeholder">' +
        '<option value="Guayaquil">Guayaquil</option>' +
        '<option value="Samborondón">Samborondón</option>' +
        '<option value="Durán">Durán</option>' +
        '<option value="Jujan">Jujan</option>' +
        '<option value="Balao">Balao</option>' +
        '<option value="Balzar">Balzar</option>' +
        '<option value="Colimes">Colimes</option>' +
        '<option value="Daule">Daule</option>' +
        '<option value="El Triunfo">El Triunfo</option>' +
        '<option value="Empalme">Empalme</option>' +
        '<option value="Bucay">Bucay</option>' +
        '<option value="Playas">Playas</option>' +
        '<option value="Isidro Ayora">Isidro Ayora</option>' +
        '<option value="Lomas De Sargentillo">Lomas De Sargentillo</option>' +
        '<option value="Marcelino Maridueña">Marcelino Maridueña</option>' +
        '<option value="Milagro">Milagro</option>' +
        '<option value="Naranjal">Naranjal</option>' +
        '<option value="Naranjito">Naranjito</option>' +
        '<option value="Nobol">Nobol</option>' +
        '<option value="Palestina">Palestina</option>' +
        '<option value="Pedro Carbo">Pedro Carbo</option>' +
        '<option value="Santa Lucía">Santa Lucía</option>' +
        '<option value="Simon Bolivar">Simon Bolivar</option>' +
        '<option value="Salitre">Salitre</option>' +
        '<option value="Yaguachi">Yaguachi</option>' +
        '</select>');
    $("#City").replaceWith(selectbox);

    $('#Country').on('change', function () {
        if (this.value != "Ecuador") {
            var input = $('<input type="text" id="City" name="city" class="placeholder" placeholder=" Ciudad" required>');
            $("#City").replaceWith(input);
        }
    });

    $('#Province').on('change', function () {
        if (this.value == "G") {
            var selectbox = $('<select id="City" class="placeholder">' +
                '<option value="Guayaquil">Guayaquil</option>' +
                '<option value="Samborondón">Samborondón</option>' +
                '<option value="Durán">Durán</option>' +
                '<option value="Jujan">Jujan</option>' +
                '<option value="Balao">Balao</option>' +
                '<option value="Balzar">Balzar</option>' +
                '<option value="Colimes">Colimes</option>' +
                '<option value="Daule">Daule</option>' +
                '<option value="El Triunfo">El Triunfo</option>' +
                '<option value="Empalme">Empalme</option>' +
                '<option value="Bucay">Bucay</option>' +
                '<option value="Playas">Playas</option>' +
                '<option value="Isidro Ayora">Isidro Ayora</option>' +
                '<option value="Lomas De Sargentillo">Lomas De Sargentillo</option>' +
                '<option value="Marcelino Maridueña">Marcelino Maridueña</option>' +
                '<option value="Milagro">Milagro</option>' +
                '<option value="Naranjal">Naranjal</option>' +
                '<option value="Naranjito">Naranjito</option>' +
                '<option value="Nobol">Nobol</option>' +
                '<option value="Palestina">Palestina</option>' +
                '<option value="Pedro Carbo">Pedro Carbo</option>' +
                '<option value="Santa Lucía">Santa Lucía</option>' +
                '<option value="Simon Bolivar">Simon Bolivar</option>' +
                '<option value="Salitre">Salitre</option>' +
                '<option value="Yaguachi">Yaguachi</option>' +
                '</select>');
            $("#City").replaceWith(selectbox);
        }
        else if (this.value == "M") {
            var selectbox = $('<select id="City" class="placeholder">' +
                '<option value="Bahia de Caraquez">Bahia de Caraquez</option>' +
                '<option value="Calceta">Calceta</option>' +
                '<option value="Chone">Chone</option>' +
                '<option value="El Carmen">El Carmen</option>' +
                '<option value="Jipi Japa">Jipi Japa</option>' +
                '<option value="Junin">Junin</option>' +
                '<option value="Manta">Manta</option>' +
                '<option value="Montecristi">Montecristi</option>' +
                '<option value="Pajan">Pajan</option>' +
                '<option value="Pedernales">Pedernales</option>' +
                '<option value="Portoviejo">Portoviejo</option>' +
                '<option value="Rocafuerte">Rocafuerte</option>' +
                '<option value="Santa Ana">Santa Ana</option>' +
                '<option value="Sucre">Sucre</option>' +
                '<option value="Tosagua">Tosagua</option>' +
                '</select>');
            $("#City").replaceWith(selectbox);
        }
        else if (this.value == "P") {
            var selectbox = $('<select id="City" class="placeholder">' +
                '<option value="Quito">Quito</option>' +
                '<option value="Cayambe">Cayambe</option>' +
                '<option value="Machachi">Machachi</option>' +
                '<option value="Sangolqui">Sangolqui</option>' +
                '<option value="Santo Domingo">Santo Domingo</option>' +
                '</select>');
            $("#City").replaceWith(selectbox);
        }
        else if (this.value == "A") {
            var selectbox = $('<select id="City" class="placeholder">' +
                '<option value="Cuenca">Cuenca</option>' +
                '<option value="Gualaceo">Gualaceo</option>' +
                '</select>');
            $("#City").replaceWith(selectbox);
        }
        else if (this.value == "SE") {
            var selectbox = $('<select id="City" class="placeholder">' +
                '<option value="Salinas">Salinas</option>' +
                '<option value="Santa Elena">Santa Elena</option>' +
                '<option value="Punta Blanca">Punta Blanca</option>' +
                '<option value="La Libertad">La Libertad</option>' +
                '<option value="Ballenita">Ballenita</option>' +
                '<option value="Ayangue">Ayangue</option>' +
                '<option value="Punta Carnero">Punta Carnero</option>' +
                '<option value="Manglaralto/ Montañita">Manglaralto/ Montañita</option>' +
                '<option value="San Pablo">San Pablo</option>' +
                '<option value="Ancón">Ancón</option>' +
                '</select>');
            $("#City").replaceWith(selectbox);
        }
        else {
            var input = $('<input type="text" id="City" name="city" class="placeholder" placeholder=" Ciudad" required>');
            $("#City").replaceWith(input);
        }
    });
});

$().ready(function () {
    // validate signup form on keyup and submit
    $("#buyForm").validate({
            rules: {
                nombres: "required",
                apellidos: "required",
                cedula: "required",
                email: {
                    required: true,
                    email: true
                },
                celular: "required",
                country: "required",
                ciudad: "required",
                province: "required",
            },
            messages: {
                nombres: "Por favor ingrese su nombres",
                apellidos: "Por favor ingrese sus apellidos",
                cedula: {
                    required: "Por favor ingrese su número de cédula",
                    minlength: "La cédula de identificación debe tener al menos 6 caracteres",
                    maxlength: "La cédula de identificación debe tener máximo 10 caracteres",
                },
                email: "Por favor ingrese un email válido",
                celular: "Por favor ingrese su número de celular",
                country: "Por favor seleccione su país",
                ciudad: "Por favor ingrese su ciudad",
                province: "Por favor seleccione su provincia",
            },
            submitHandler: function (form) {
                buy();
            }

        }
    );

});

$('#ticket-quantity').on('change', function () {
    $('#ticket-total').html("$" + (this.value * 35));
});

