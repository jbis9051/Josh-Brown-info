<?php
if (!isset($options)) {
    $options['active_page'] = "Home";
}
?>
<div class="big_logo_top">
    <a href="index.php"><img src="img/logo.png"></a>
</div>
<div class="hamburger_button"><span class="fa fa-bars"></span></div>
<div class="nav_bar_wrapper">
    <a href="index.php">
        <div class="nav_item" <?php
        if ($options['active_page'] == "Home") {
            echo "active";
        }
        ?>>Home
        </div>
    </a>
    <div class="nav_item" <?php
    if ($options['active_page'] == "Partners") {
        echo "active";
    }
    ?>>Partners
        <div class="nav_dropdown">
            <a href="john_baker.php">
                <div>John Baker</div>
            </a>
            <a href="michael_scott.php">
                <div>Michael Scott</div>
            </a>
            <a href="angela_martin.php">
                <div>Angela Martin</div>
            </a>
            <a href="oscar_martinez.php">
                <div>Oscar Martinez</div>
            </a>
        </div>
    </div>
    <div class="nav_item"<?php
    if ($options['active_page'] == "Practice Areas") {
        echo "active";
    }
    ?>>Practice Areas
        <div class="nav_dropdown">
            <div>Personal Injury</div>
            <div>Insurance</div>
            <div>Medical Malpractice</div>
            <div>Auto Accidents</div>
        </div>
    </div>
    <div class="nav_item">Cases</div>
    <a href="contact.php">
        <div class="nav_item"<?php
        if ($options['active_page'] == "Contact") {
            echo "active";
        }
        ?>>Contact
        </div>
    </a>
</div>
<script>
    $('.hamburger_button').click(function () {
        let nav_bar_wrapper = $('.nav_bar_wrapper');
        if (nav_bar_wrapper.css('display') === "block") {
            nav_bar_wrapper.slideUp();
        } else {
            nav_bar_wrapper.slideDown();
        }
    });
    $('.nav_item').click(function () {
        if ($('.hamburger_button').css('display') !== "none") {
            let drop_down_menu = $(this).find('.nav_dropdown').first();
            if (drop_down_menu.css('display') === "block") {
                drop_down_menu.slideUp();
            } else {
                $('.nav_dropdown').slideUp();
                drop_down_menu.slideDown();
            }
        }
    });
</script>