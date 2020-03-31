import { connect } from "pwa-helpers";
import { store } from "../redux/store";
import { LitElement, html } from "lit-element";
import { render_appPreviewListItem } from "../ons-components/app-components";

export default class DataPage extends connect(store)(LitElement) {
    static get is() { return 'data-page'; }
    static get properties() {
        return {
            _freizeitOnsListData: Array
        };
    }

    constructor() {
        super();
        this._freizeitOnsListData = [];
    }

    _render_onsToolbar() {
        return html`
        <ons-toolbar>
            <div class="left">
                <ons-back-button>Zurück</ons-back-button>
            </div>
            <div class="center">Account</div>
            <div class="right">
                <ons-toolbar-button @click="${this._onNeuerEintragClick}">+</ons-toolbar-button>
            </div>
        </ons-toolbar>
        `;
    }

    _render_onsCard() {
        return html`
        <ons-card class="ul">
            <h1>Lorem ipsum</h1>
            <p>
                Lorem ipsum dolor sit amet, consetetur sadipscing elitr,
                sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam
            </p>
        </ons-card>
        `;
    }

    _render_onsList_eintraege() {
        return html`
        <ons-list-title>Einträge</ons-list-title>
        <ons-list>
            ${this._freizeitOnsListData.map(item =>
            render_appPreviewListItem({
                item: item,
                thumbnailSrc: item.thumbnailSrc,
                subtitle: item.subtitle,
                title: item.title,
                onClick: (x) => { console.log(x) },
            }))}
        </ons-list>
        `;
    }

    createRenderRoot() { return this; }
    render() {
        return html`
        <ons-page>
            ${this._render_onsToolbar()}
            <div class="content">
                ${this._render_onsCard()}
                ${this._render_onsList_eintraege()}
            </div>
        </ons-page>
        `;
    }

    stateChanged(state) {
        this._freizeitOnsListData = state.app.freizeitOnsListData;
        console.log(this._freizeitOnsListData);
    }

    _onNeuerEintragClick() {
        document.querySelector('ons-navigator')
            .pushPage('add-item-page.html');
    }
}
customElements.define(DataPage.is, DataPage);
