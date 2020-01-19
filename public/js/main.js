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

const tabControls = document.querySelectorAll(`.read_controls span`);
const tabContents = document.querySelectorAll('.content_tab');

function switchToTab(tabName) {
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
    tabControls.forEach(e => e.removeAttribute("active"));
    tabContents.forEach(tab => {
        if (!tab.hasAttribute("active")) {
            return;
        }
        tab.setAttribute("transition", "");
        tab.removeAttribute("active");
        setTimeout(_ => {
            tab.removeAttribute("transition");
        }, 500);
    });
    setTimeout(_ => {
        elements[0].setAttribute("active", "");
        elements[1].setAttribute("transition", "");
        setTimeout(_ => {
            elements[1].removeAttribute("transition");
            elements[1].setAttribute("active", "");
            document.querySelector('.content').scrollTop = 0;
            if (tabName === 'my_info') {
                MyInfo.addListener();
            } else {
                MyInfo.removeListener();
            }
            if (tabName === "resume") {
                handleOverflows();
            }
        }, 10);

    }, 100);
}

document.querySelectorAll('.read_controls span').forEach(e => e.addEventListener('click', (e) => switchToTab(e.currentTarget.getAttribute("data-tab"))));
document.querySelector('#to_portfolio').addEventListener("click", () => switchToTab('resume'));
