import { connect } from "pwa-helpers";
import { store } from "../redux/store";
import { LitElement, html } from "lit-element";
import {
    renderFreizeitPage,
    renderLieferdienstePage,
    renderKulturPage,
    renderInfosPage,
    renderAddItemPage,
    renderAddItem_1_Page,
    renderItemExportPage
} from "../template";

export default class KategorienPage extends connect(store)(LitElement) {
    static get is() { return 'kategorien-page'; }
    static get properties() { return {} }

    constructor() {
        super();
    }

    createRenderRoot() { return this; }
    render() {
        return html`
        <ons-page>
            <ons-toolbar>
                <div class="center">ULM@home</div>
                <div class="right">
                    <ons-toolbar-button icon="fa-plus" @click="${this._onFaPlusClick}"></ons-toolbar-button>
                </div>
            </ons-toolbar>
            <ons-tabbar>
                <ons-tab page="freizeit-page.html" label="Freizeit" icon="fa-clock" active></ons-tab>
                <ons-tab page="lieferdienste-page.html" label="Lieferdienste" icon="fa-truck"></ons-tab>
                <ons-tab page="kultur-page.html" label="Kultur" icon="fa-theater-masks"></ons-tab>
                <ons-tab page="infos-page.html" label="Infos" icon="fa-info"></ons-tab>
            </ons-tabbar>
        </ons-page>

        ${renderFreizeitPage()}
        ${renderLieferdienstePage()}
        ${renderKulturPage()}
        ${renderInfosPage()}
        ${renderAddItemPage()}
        ${renderAddItem_1_Page()}
        ${renderItemExportPage()}
        `;
    }

    _onFaPlusClick() {
        document.querySelector('ons-navigator')
            .pushPage('add-item-page.html');
    }
}
customElements.define(KategorienPage.is, KategorienPage);