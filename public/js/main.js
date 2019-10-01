"use strict";


$('.load_text').fadeIn(2000).delay(500).fadeOut(function () {
    $('.background').fadeIn(1000, function () {
        $('.content').delay(200).fadeIn(1000, startExecution());
    });
});


/* Scoll stuff */
//$(document).scroll(function (e) {
setInterval(function () {
    const document_scrollTop = $(document).scrollTop();
    const whenCheck = function (aFunction) {
        if (aFunction.min !== -1 && aFunction.max !== -1) { /* range */
            return aFunction.min <= document_scrollTop && aFunction.max >= document_scrollTop;
        } else if (aFunction.min === -1) { /* only max */
            return aFunction.max >= document_scrollTop;
        } else {
            return aFunction.min <= document_scrollTop;
        }
    };
    for (let i = 0; i < scroll_functions.length; i++) {
        if (whenCheck(scroll_functions[i]) && scroll_functions[i].nextIsWhen) {
            scroll_functions[i].when();
            scroll_functions[i].nextIsWhen = false;
        } else if (!whenCheck(scroll_functions[i]) && !scroll_functions[i].nextIsWhen) {
            scroll_functions[i].whenNot();
            scroll_functions[i].nextIsWhen = true;
        }
    }
}, 200);
// });

/* Detect CSS Done from  https://jonsuh.com/blog/detect-the-end-of-css-animations-and-transitions-with-javascript/ */

// Function from David Walsh: http://davidwalsh.name/css-animation-callback
function whichTransitionEvent() {
    let t,
        el = document.createElement("fakeelement");

    const transitions = {
        "transition": "transitionend",
        "OTransition": "oTransitionEnd",
        "MozTransition": "transitionend",
        "WebkitTransition": "webkitTransitionEnd"
    };

    for (t in transitions) {
        if (el.style[t] !== undefined) {
            return transitions[t];
        }
    }
}


const transitionEvent = whichTransitionEvent();

function startExecution() {
    if ($(window.location.hash).length) {
        $(window.location.hash).click();
    } else {
        console.log("Else");
        $('.my_info').trigger('change_event');
    }
    if ((getCookie("init_modal_closed") === null)) {
        $('#welcome_side_banner').stop().fadeIn();
        setTimeout(function () {
            setCookie({
                name: "init_modal_closed",
                value: true,
            });
        }, 5000);
        /* Set cookie after 5 sec to prevent missing message if quick reload */
    }
}

$(window).click(function (event) {
    const theModal = $('.modal_wrapper');
    if (event.target === theModal.get(0)) {
        theModal.fadeOut(200);
        $('body').css('overflow', 'auto');
    }
});

$('body').scroll(function () {
    if ($('.hamburger_button').eq(0).css('display') !== "none") {
        $('.read_controls').slideUp();
    }
});

$('.tab').click(function () {
    let attr = $(this).attr('active');
    if (typeof attr === typeof undefined || attr === false) {
        $('.tab').removeAttr('active');
        $(this).attr('active', '');
        $('.tab_content').removeAttr('active');
        $(`.tab_content[data-name="${$(this).attr('data-name')}"]`).attr('active', '');
    }
});

$('.right img').click(function () {
    zoomImage($('#the_modal'), $(this).attr('src'));
});

$('.hamburger_button').click(function () {
    $('.read_controls').stop().slideToggle();

    /*
    $('.read_controls').stop().slideDown(250);
    $(this).stop().fadeOut(125);
    $('.x_button').fadeIn(125);
    */
});
$('.x_button').click(function () {
    $('.read_controls').stop().slideUp(200);
    $(this).stop().fadeOut(100);
    $('.hamburger_button').fadeIn(100);
});
$('#validate_form_button').click(function () {
    if (!validateName($('#fname').val())) {
        $('.contact_form .form_input_error').eq(0).text('Invalid First Name');
        return false;
    }
    if (!validateName($('#lname').val())) {
        $('.contact_form .form_input_error').eq(0).text('Invalid Last Name');
        return false;
    }
    if (!validateEmail($('#email').val())) {
        $('.contact_form .form_input_error').eq(0).text('Invalid Email');
        return false;
    }
    let contactForm = $('#contact_form');
    contactForm.submit();
    return true;
});
$('.modal_close_button').click(function () {
    $(this).parent().parent().fadeOut(200);
    $('body').css('overflow', 'auto');
});
$('.product_button_more').click(function () {
    $(this).parent().find('.expand_content').stop().slideToggle(250);
    this.innerText = (this.innerText === 'More') ? 'Close' : 'More';
});
$('.product_button.game').click(function () {
    $('#game_player').html(`<embed id="the_game" src="${$(this).attr('data-url')}" quality="high" pluginspage="//www.macromedia.com/go/getflashplayer" play="true" loop="true" wmode="transparent" allowfullscreen="true" flashvars="" type="application/x-shockwave-flash" align="middle" height="480px" width="640px">`);
    $('#game_modal').fadeIn(200);
    $('#the_game').click();
    $('body').css('overflow', 'hidden');
});
$('.game_close_button').click(function () {
    $('#the_game').remove();
    $(this).parent().parent().fadeOut(200);
    $('body').css('overflow', 'auto');
});

function setCookie(options) {
    if (!(options['name'] && options['value'])) {
        throw 'Options do not contain a name or value';
    }
    if (options['expires'] && options['max-age']) {
        throw 'Options have both expires and max-age';
    }
    let cookie = options['name'] + "=" + options['value'];
    let iteraor = ['domain', 'expires', 'max_age', 'path'];
    for (let option in iteraor) {
        if (options[option]) {
            cookie += ";" + options[option];
        }
    }
    iteraor = ['strict', 'samesite'];
    for (let option in iteraor) {
        if (options[option]) {
            cookie += ";" + option;
        }
    }
    document.cookie = cookie;
}

function zoomImage(element, content) {
    $('body').css('overflow', 'hidden');
    element.find('.modal_content').html(`<img src=${content}>`);
    element.fadeIn(200);
}

function content_change(element, control) {
    if ($('.hamburger_button').css('display') !== "none") {
        $('.read_controls').stop().slideUp();
        $('.site_info').stop().slideDown();
    }
    let attr = element.attr('active');
    if (typeof attr === typeof undefined || attr === false) { /* https://stackoverflow.com/questions/1318076/jquery-hasattr-checking-to-see-if-there-is-an-attribute-on-an-element */

        $('my_info').onscrollToOff("my_info_scroll");
        $('.content_tab').removeAttr('active').each(function (index, element) {
            element = $(element);
            attr = element.attr('data-scroll');
            if (typeof attr !== typeof undefined && attr !== false) {
                $(document).off(`scroll.` + element.attr('data-scroll'));
            }
        });
        $(element).attr('active', '');
        /*  $("html, body").animate({ scrollTop: 0 }, 0); */
        $('.control_item').removeAttr('data-selected');
        control.attr('data-selected', 'data-selected');
        window.location.hash = control.attr('id') || "";
        element.trigger('change_event');
        $(window).scrollTop(0);
    }
}

function validateEmail(email) {
    const re = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
    return re.test(String(email).toLowerCase());
}

function validateName(name) {
    const re = /^[a-zA-Z.']*$/;
    return re.test(String(name)) && name.length > 0;
}

function getCookie(name) {
    let end;
    /* Yup, I took this from SO --> https://stackoverflow.com/a/5968306/7886229 */
    let dc = document.cookie;
    let prefix = name + "=";
    let begin = dc.indexOf("; " + prefix);
    if (begin === -1) {
        begin = dc.indexOf(prefix);
        if (begin !== 0) return null;
    } else {
        begin += 2;
        end = document.cookie.indexOf(";", begin);
        if (end === -1) {
            end = dc.length;
        }
    }
    // because unescape has been deprecated, replaced with decodeURI
    //return unescape(dc.substring(begin + prefix.length, end));
    return decodeURI(dc.substring(begin + prefix.length, end));
}

$('.control_item').click(function () {
    let ele = $(`.${$(this).attr('data-tab')}`);
    if (ele.length) {
        content_change(ele, $(this));
    }
});

$("#contact_form").submit(function (e) {
    let form = $(this);
    const url = "contact.php";

    $('#contact_form').fadeOut(function () {
        $('#contact_form_thanks').fadeIn();
    });

    $.ajax({
        type: "POST",
        url: url,
        data: form.serialize(),
        /*  success: (data) =>{
        data = JSON.parse(data);
              if(data.status !== "success"){
                  $('#contact_form_thanks').fadeOut(function () {
                      $('.contact_form .form_input_error').eq(0).text('An unexpected Error Occurred. Please try again and reload.');
                      $('#contact_form').fadeIn();
                  });
              }
          }*/
    });

    e.preventDefault();
});

/* Bindings */
$('.resume_wrapper').bind('change_event', function () {
    $(this).find('.project_wrapper').removeClass('fadeIn_2').addClass('fadeIn_2');
});
$('.my_info').bind('change_event', function () {
    $('my_info').onscrollTo({
        name: "my_info_scroll",
        min: 5,
        when: function () {
            $('.big_profile_title_wrapper').addClass('big_profile_title_wrapper_scrolled');
            $('.code_editor_wrapper').addClass('code_editor_wrapper_scrolled');
            setTimeout(function () {
                $(document).scrollTop(80);
            }, 200);
        },
        whenNot: function () {
            $('.big_profile_title_wrapper').removeClass('big_profile_title_wrapper_scrolled');
            $('.code_editor_wrapper').removeClass('code_editor_wrapper_scrolled');
        },
    });
});
