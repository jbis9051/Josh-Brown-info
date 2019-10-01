$(function () {
    $('.form_submit_button').click(function () {
        if(!alpha($('.form_wrapper input[name="first"]').val())){
            $('.form_wrapper .error').html('Invalid First Name');
        } else if(!alpha($('.form_wrapper input[name="last"]').val())){
            $('.form_wrapper .error').html('Invalid Last Name');
        } else if(!num($('.form_wrapper input[type="tel"]').val())){
            $('.form_wrapper .error').html('Invalid Phone Number');
        } else {
            let frm = $(`#${$(this).attr('contact_form')}`);
            $.ajax({
                type: frm.attr('method'),
                url: frm.attr('action'),
                data: frm.serialize(),
                success: function (data) {
                    $('.form_wrapper').attr('submitted','');
                },
                error: function (data) {
                    $('.form_wrapper .error').html('An Unknown Error Occurred. Try again. If the problem persist, please call us. ');
                },
            });

        }
    });
    $('.form_wrapper input[type="tel"]').on("keypress keyup blur",function (event) {
        $(this).val($(this).val().replace(/[^\d].+/, ""));
        if ((event.which < 48 || event.which > 57)) {
            event.preventDefault();
        }
    });
});