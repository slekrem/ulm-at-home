import { connect } from "pwa-helpers";
import { store } from "../redux/store";
import { LitElement, html } from "lit-element";

export default class ItemExportPage extends connect(store)(LitElement) {
    static get is() { return 'item-export-page'; }
    static get properties() { return {} }

    constructor() {
        super();
    }

    createRenderRoot() { return this; }
    render() {
        return html`
        <ons-page>
            export page
        </ons-page>
        `;
    }
}
customElements.define(ItemExportPage.is, ItemExportPage);
