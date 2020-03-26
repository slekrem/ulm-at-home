
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
                <div class="left">Source Code</div>
                    <div class="center">
                        <span class="list-item__title"></span>
                        <span class="list-item__subtitle"></span>
                    </div>
                    <div class="right">
                        <a href="https://github.com/slekrem/ulm-at-home" target="blank">github.com</a>
                    </div>
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
                    ${this._item.informationen.map(item => this._renderInformationenOnsListItem(item))}
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