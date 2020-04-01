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
    renderItemExportPage,
    renderDataPage
} from "../template";
import { setKategorie } from "../redux/actions/app";

export default class KategorienPage extends connect(store)(LitElement) {
    static get is() { return 'kategorien-page'; }
    static get properties() { return {} }

    constructor() {
        super();
        store.dispatch(setKategorie(0));
    }

    _render_onsToolbar() { 
        return html`
        <ons-toolbar>
            <div class="center">ULM@home</div>
            <div class="right">
                <ons-toolbar-button icon="fa-database" @click="${this._onFaDatabaseClick}"></ons-toolbar-button>
            </div>
        </ons-toolbar>
        `;
    }

    createRenderRoot() { return this; }
    render() {
        return html`
        <ons-page>
            ${this._render_onsToolbar()}
            <ons-tabbar @prechange="${this._onTabbarPrechange}">
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
        ${renderDataPage()}
        `;
    }

    _onTabbarPrechange(event) {
        store.dispatch(setKategorie(event.index));
    }

    _onFaDatabaseClick() {
        document.querySelector('ons-navigator')
            .pushPage('data-page.html');
    }
}
customElements.define(KategorienPage.is, KategorienPage);