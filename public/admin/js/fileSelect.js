class FileSelect {
    constructor(options, callback, error) {
        const modal = document.createElement("div");
        modal.classList.add("file-modal");
        modal.innerHTML += this.getFileSelectTemplate();
        this.modal = modal;
        this.list = modal.querySelector(".file-list");
        document.querySelector('body').append(modal);
        modal.querySelector('.choose-button').addEventListener("click", this._handleConfirm.bind(this));
        modal.querySelector('.cancel-button').addEventListener("click", evt => this.close() && this.resolve());
        this.resolve = callback;
        this.reject = error;
        this.selected = null;
        this.currentPath = "/";
        this.updateToPath(this.currentPath);
    }

    async updateToPath(path) {
        await this.updateView(await this.getHTMLForPath(path));
    }

    async updateView(html) {
        this._unselectAll();
        this.list.innerHTML = html;
        this.updateListeners();
    }

    _unselectAll() {
        this.list.querySelectorAll('.file-item').forEach(el => {
            el.removeAttribute("selected");
        });
        this.selected = null;
    }

    _handleSelect(event) {
        this._unselectAll();
        this.selected = event.currentTarget;
        event.currentTarget.setAttribute("selected", "");
    }

    _handleOpen(event) {
        this.currentPath += event.currentTarget.querySelector('.file-name-text').innerHTML + "/";
        this.updateToPath(this.currentPath)
    }

    _handleConfirm() {
        if (!this.selected) {
            return;
        }
        this.currentPath += this.selected.querySelector('.file-name-text').innerHTML;
        this.close();
        this.resolve(this.currentPath);
    }

    close() {
        this.modal.remove();
    }


    updateListeners() {
        this.list.querySelectorAll('.file-item.file').forEach(el => {
            el.addEventListener('click', this._handleSelect.bind(this));
            el.addEventListener('dblclick', this._handleConfirm.bind(this));
        });
        this.list.querySelectorAll('.file-item.dir').forEach(el => el.addEventListener('dblclick', this._handleOpen.bind(this)));
    }

    async getHTMLForPath(path) {
        const f = await fetch(FileSelect.ENDPOINT + encodeURIComponent(path));
        return await f.text();
    }

    getFileSelectTemplate() {
        return `<div class="dialog-wrapper">
    <div class="file-list">
    </div>
    <div class="bottom">
        <button type="button" class="btn cancel-button">Cancel</button>
        <button type="button" class="btn choose-button">Choose</button>
    </div>
</div>
        `;
    }

    static getFile() {
        return new Promise((resolve, reject) => {
            new FileSelect({}, resolve, reject);
        });
    }

}

FileSelect.ENDPOINT = "/admin/files?path=";
