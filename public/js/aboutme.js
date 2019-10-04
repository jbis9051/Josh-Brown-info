function scrollListener() {
    if (document.querySelector('.content').scrollTop > 10) {
        document.querySelector('.my_info').classList.add("scrolled");
    } else {
        document.querySelector('.my_info').classList.remove("scrolled");
    }
}

const MyInfo = {
    addListener: () => document.querySelector('.content').addEventListener("scroll", scrollListener),
    removeListener: () => document.querySelector('.my_info').classList.remove("scrolled") && document.querySelector('.content').removeEventListener("scroll", scrollListener),
};
