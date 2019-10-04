document.querySelectorAll('.modal_wrapper').forEach(e => e.querySelector('.modal_close_button').addEventListener("click", () => {
    document.querySelector('.content').style.overflow = 'auto';
    e.removeAttribute("active");
}));

function modalEnable(modal, content) {
    document.querySelector('.content').style.overflow = 'hidden';
    modal.querySelector('.modal_content').innerHTML = content;
    modal.setAttribute("active", "");
}
