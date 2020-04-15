
import { connect } from "pwa-helpers";
import { store } from "../redux/store";
import { LitElement, html } from "lit-element";

export default class Version_0_1 extends connect(store)(LitElement) {
    static get is() { return 'version-0-1'; }
    static get properties() { return {} }

    constructor() {
        super();
    }

    createRenderRoot() { return this; }
    render() {
        return html`
        <ons-page>
        
        </ons-page>
        `;
    }
}
customElements.define(Version_0_1.is, Version_0_1);
