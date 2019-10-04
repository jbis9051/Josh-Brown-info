document.querySelector('#welcome_side_banner .modal_close_button').addEventListener("click", () => {
    document.querySelector('#welcome_side_banner').removeAttribute("active");
    sessionStorage.setItem('viewed', 'true')
});
if (sessionStorage.getItem('viewed') === "true") {
    document.querySelector('#welcome_side_banner').removeAttribute("active")
}
