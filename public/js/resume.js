document.querySelectorAll('.project_item .short_info').forEach(si => {
    si.addEventListener("click", (e) => {
        const id = e.currentTarget.parentElement.getAttribute('data-id');
        if (!id) {
            return;
        }
        fetch(`/project/${id}`).then(e => e.text()).then(html => {
            document.querySelector('.resume-content').innerHTML = html;
            document.querySelector('.resume-content').scrollTo(0, 0);
            document.querySelector('.resume-content').classList.add("loaded");
            document.querySelectorAll('.game').forEach(e => e.addEventListener("click", () => modalEnable(document.querySelector('#game_modal'), `<embed id="the_game" src="${e.getAttribute('data-url')}" quality="high" pluginspage="//www.macromedia.com/go/getflashplayer" play="true" loop="true" wmode="transparent" allowfullscreen="true" flashvars="" type="application/x-shockwave-flash" align="middle" height="480px" width="640px">`)));
            document.querySelectorAll('.resume-content img').forEach(e => e.addEventListener("click", () => modalEnable(document.querySelector('#main_modal'), `<img src=${e.src}>`)));
        });
        document.querySelector('.resume-page').classList.add("active");
    });
});
document.querySelector('.resume-page .x-button').addEventListener("click", () => {
    document.querySelector('.resume-content').classList.remove("loaded");
    document.querySelector('.resume-page').classList.remove("active");
});