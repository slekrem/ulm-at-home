
import { connect } from "pwa-helpers";
import { store } from "../redux/store";
import { LitElement, html } from "lit-element";

export default class Detail1Page extends connect(store)(LitElement) {
    static get is() { return 'detail-1-page'; }
    static get properties() {
        return {
            _item: Object
        }
    }

    constructor() {
        super();
        this._item = {};
    }

    _renderInformationenOnsListItem(item) {
        return html`
            <ons-list-item>
                <div class="left">${item.left}</div>
                <div class="center">
                    <span class="list-item__title">${item.title}</span>
                    <span class="list-item__subtitle">${item.subtitle}</span>
                </div>
                <div class="right">${item.right}</div>
            </ons-list-item>
            `;
    }

    createRenderRoot() { return this; }
    render() {
        return html`
        <ons-page>
            <ons-toolbar>
                <div class="left">
                    <ons-back-button>Zurück</ons-back-button>
                </div>
                <div class="center">${this._item.title}</div>
            </ons-toolbar>
            <div class="content">
                <img src="${this._item.titleImage}" style="width:100%">
                <ons-card class="ul">
                    <h1>${this._item.subtitle}</h1>
                    <p>${this._item.beschreibung}</p>
                </ons-card>
                <ons-list-title>Informationen</ons-list-title>
                <ons-list>
                    ${Object.keys(this._item.informationen).map(key => this._renderInformationenOnsListItem(this._item.informationen[key]))}
                </ons-list>
            </div>
        </ons-page>
        `;
    }

    stateChanged(state) {
        this._item = state.app.freizeitItem;
    }
}
customElements.define(Detail1Page.is, Detail1Page);