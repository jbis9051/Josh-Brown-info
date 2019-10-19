const converter = new showdown.Converter();

document.querySelectorAll('.markdown_input').forEach(el => {
    updateMarkdownPreview(el, el.nextElementSibling);
    el.addEventListener("keyup", (evt => {
        updateMarkdownPreview(evt.target, evt.target.nextElementSibling);
    }));
});

function updateMarkdownPreview(input, markdown) {
    markdown.innerHTML = converter.makeHtml(input.value);
}
