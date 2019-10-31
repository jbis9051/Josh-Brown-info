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
        });
        document.querySelector('.resume-page').classList.add("active");
    });
});
document.querySelector('.resume-page .x-button').addEventListener("click", () => {
    document.querySelector('.resume-content').classList.remove("loaded");
    document.querySelector('.resume-page').classList.remove("active");
});
