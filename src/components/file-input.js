
import { connect } from "pwa-helpers";
import { store } from "../redux/store";
import { LitElement, html } from "lit-element";

export default class FileInput extends connect(store)(LitElement) {
    static get is() { return 'file-input'; }
    static get properties() {
        return {
            fileDataUrl: { type: String, /*reflect: true*/ },
            fileName: String
        };
    }

    constructor() {
        super();
        this.fileName = '';
        this.fileDataUrl = '';
    }

    render() {
        return html`
        <input type="file" accept="image/*" hidden
            @change="${this._onInputChange}">
        `;
    }

    openFileDialog() {
        const input = this.shadowRoot.querySelector('input');
        input.click();
    }

    _onInputChange(changeEvent) {
        const file = changeEvent.srcElement.files[0],
            reader = new FileReader();
        if (!file) return;
        reader.onload = (loadEvent) => {
            this.fileDataUrl = loadEvent.target.result;
            this.fileName = file.name;

            let event = new CustomEvent('change', {
                detail: {
                    fileDataUrl: loadEvent.target.result,
                    fileName: file.name
                }
            });
            this.dispatchEvent(event);
        };
        reader.readAsDataURL(file);
    }
}
customElements.define(FileInput.is, FileInput);
