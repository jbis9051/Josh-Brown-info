setTimeout(startExecution, 2500);

function startExecution() {
    if (window.location.hash.length) {
        switchToTab(window.location.hash.replace("#", ""));
    } else {
        switchToTab('my_info');
    }
    document.querySelector('.load_text').hidden = true;
    document.querySelector('.main').setAttribute("active", "");
}

function switchToTab(tabName) {
    document.querySelector('.read_controls').removeAttribute("active");
    window.location.hash = tabName;
    const selector = document.querySelector(`.read_controls span[data-tab="${tabName}"]`);
    if (selector.hasAttribute("active")) {
        return;
    }
    const elements = [selector, document.querySelector(`.content_tab[data-tab-name="${tabName}"]`)];
    if (!elements) {
        return
    }
    document.querySelector('.contact_tab').removeAttribute("submitted");
    document.querySelectorAll(`.read_controls span, .content_tab`).forEach(e => e.removeAttribute("active"));
    elements.forEach(e => e.setAttribute("active", ""));
    document.querySelector('.content').scrollTop = 0;
    if (tabName === 'my_info') {
        MyInfo.addListener();
    } else {
        MyInfo.removeListener();
    }
}

document.querySelectorAll('.read_controls span').forEach(e => e.addEventListener('click', (e) => switchToTab(e.target.getAttribute("data-tab"))));

document.querySelectorAll('.right img').forEach(e => e.addEventListener("click", () => modalEnable(document.querySelector('#main_modal'), `<img src=${e.src}>`)));
document.querySelectorAll('.game').forEach(e => e.addEventListener("click", () => modalEnable(document.querySelector('#game_modal'), `<embed id="the_game" src="${e.getAttribute('data-url')}" quality="high" pluginspage="//www.macromedia.com/go/getflashplayer" play="true" loop="true" wmode="transparent" allowfullscreen="true" flashvars="" type="application/x-shockwave-flash" align="middle" height="480px" width="640px">`)));

