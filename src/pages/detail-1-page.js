
import { connect } from "pwa-helpers";
import { store } from "../redux/store";
import { LitElement, html } from "lit-element";
import { render_app_page_content } from "../ons-components/app-components";

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
        console.log('item', this._item);
        return html`
        <ons-page>
            <ons-toolbar>
                <div class="left">
                    <ons-back-button>Zurück</ons-back-button>
                </div>
                <div class="center">${this._item.title}</div>
            </ons-toolbar>
            <div class="content">
                ${render_app_page_content({
            titel: this._item.pageData.titel,
            titelbildSrc: this._item.pageData.titelbildSrc,
            beschreibung: this._item.pageData.beschreibung,
            informationen: this._item.pageData.informationen
        })}
            </div>
        </ons-page>
        `;
    }

    stateChanged(state) {
        switch (state.app.kategorie) {
            case 0:
                this._item = state.app.freizeitItem;
                break;
            case 1:
                this._item = state.app.lieferdiensteItem;
                break;
            case 2:
                this._item = state.app.kulturItem;
                break;
            default:
                break;
        }
        console.log('asd', this._item);
    }
}
customElements.define(Detail1Page.is, Detail1Page);