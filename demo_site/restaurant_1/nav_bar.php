<?php
if (!isset($options)) {
    $options['active_page'] = "Home";
}
?>
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
    <a href="index.php">
        <div class="nav_item" <?php
        if ($options['active_page'] == "breakfast") {
            echo "active";
        }
        ?>>Breakfast
        </div>
    </a>
    <a href="index.php">
        <div class="nav_item" <?php
        if ($options['active_page'] == "lunch") {
            echo "active";
        }
        ?>>Lunch
        </div>
    </a>
    <a href="index.php">
        <div class="nav_item" <?php
        if ($options['active_page'] == "dinner") {
            echo "active";
        }
        ?>>Dinner
        </div>
    </a>
    <a href="index.php">
        <div class="nav_item" <?php
        if ($options['active_page'] == "dessert") {
            echo "active";
        }
        ?>>Dessert
        </div>
    </a>
    <a href="index.php">
        <div class="nav_item" <?php
        if ($options['active_page'] == "dessert") {
            echo "active";
        }
        ?>>Reservations
        </div>
    </a>
    <a href="index.php">
        <div class="nav_item" <?php
        if ($options['active_page'] == "dessert") {
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