
import { connect } from "pwa-helpers";
import { store } from "../redux/store";
import { LitElement, html } from "lit-element";

export default class WillkommenPage extends connect(store)(LitElement) {
    static get is() { return 'willkommen-page'; }
    static get properties() { return {} }

    constructor() {
        super();
    }

    createRenderRoot() { return this; }
    render() {
        return html`
        <ons-page>
            <div class="content">
                <h1>Willkommen</h1>
                <p>Kurze Info über die App</p>
            </div>
            <ons-bottom-toolbar>
                <ons-button modifier="large--quiet" @click="${this._onWeiterClick}">Weiter</ons-button>
            </ons-bottom-toolbar>
        </ons-page>
        `;
    }

    _onWeiterClick() {
        document.querySelector('ons-navigator')
            .pushPage('kategorien-page.html');
    }
}
customElements.define(WillkommenPage.is, WillkommenPage);
