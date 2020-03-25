
import { connect } from "pwa-helpers";
import { store } from "./redux/store";
import { LitElement, html } from "lit-element";

import './pages/willkommen-page'
import { renderKategorienPage, renderDetail1Page } from "./template";

export default class UlmApp extends connect(store)(LitElement) {
    static get is() { return 'ulm-app'; }
    static get properties() { return {} }

    constructor() {
        super();
    }

    createRenderRoot() { return this; }
    render() {
        customElements.upgrade = () => { };
        return html`
        <ons-navigator>
            <ons-page>
                <willkommen-page></willkommen-page>
            </ons-page>
        </ons-navigator>

        ${renderKategorienPage()}
        ${renderDetail1Page()}
        `;
    }
}
customElements.define(UlmApp.is, UlmApp);
