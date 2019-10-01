<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <?php require_once 'standard_header.php' ?>
    <link rel="stylesheet" href="css/contact_form.css">
    <title>John Baker - Founding Partner</title>
    <script src="validation.js"></script>
    <script src="contact.js"></script>
</head>
<body>
<?php $options['active_page'] = "Contact";
require_once 'nav_bar.php'; ?>
<div class="main_content_wrapper">
    <div class="form_wrapper">
        <div class="submitted_message">
            <h2 class="centered_text">Thank you for your submission! We will contact you soon. (NOTE: THIS IS A DEMO NO INFORMATION HAS BEEN SENT)</h2>
        </div>
        <form id="contact_form">
            <h1>Contact Us</h1>
            <h3 class="error"></h3>
            <div class="name_one_line">
                <input type="text" name="first" placeholder="First Name"><input name="last" type="text" placeholder="Last Name">
            </div>
            <input type="tel" maxlength="10" placeholder="Phone Number">
            <input type="email" placeholder="Email Address">
            <textarea placeholder="Message" name="message"></textarea>
            <button data-form-id="contact_form" type="button" class="standard_button form_submit_button">Send</button>
            <p class="legal_text">All information is kept confidential.  Your email and other personal information will not be shared. By clicking Send you are agreeing to be contacted by email and/or phone. You also agree that you have read and accept the Terms and Conditions. <b style="color: red">(NOTE: THIS IS A DEMO NO INFORMATION WILL BE SENT)</b></p>
        </form>
        <h1>Our Information</h1>
        <p>Phone Number: <a href="tel:5552583434">(555) 258 - 3434</a></p>
        <p>Email:  <a href="mailto:contact@bakerassociates.com">contact@bakerassociates.com</p>
        <p>Address: 20 W 34th St, New York, NY 10001</p>
        <div class="mapouter">
            <div class="gmap_canvas">
                <iframe id="gmap_canvas"
                        src="https://maps.google.com/maps?q=20%20W%2034th%20St%2C%20New%20York%2C%20NY%2010001&t=&z=13&ie=UTF8&iwloc=&output=embed"
                        frameborder="0" scrolling="no" marginheight="0" marginwidth="0"></iframe>
            </div>
        </div>
    </div>
</div>
</body>
</html>