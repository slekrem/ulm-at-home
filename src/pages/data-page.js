import { connect } from "pwa-helpers";
import { store } from "../redux/store";
import { LitElement, html } from "lit-element";
import { render_appPreviewListItem } from "../ons-components/app-components";

export default class DataPage extends connect(store)(LitElement) {
    static get is() { return 'data-page'; }
    static get properties() {
        return {
            _freizeitItems: Object,
            _lieferdiensteItems: Object,
            _kulturItems: Object,
            _infoItems: Object,
        };
    }

    constructor() {
        super();
        this._freizeitItems = {};
        this._lieferdiensteItems = {};
        this._kulturItems = {};
        this._infoItems = {};
    }

    _render_onsToolbar() {
        return html`
        <ons-toolbar>
            <div class="left">
                <ons-back-button>Zurück</ons-back-button>
            </div>
            <div class="center">Datenbank</div>
            <div class="right">
                <ons-toolbar-button icon="fa-plus" @click="${this._onNeuerEintragClick}"></ons-toolbar-button>
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

    _render_onsListItems(items, kategorie) {
        return html`
        <ons-list>
            ${Object.keys(items)
                .map(key => {
                    const item = {
                        ...items[key],
                        key: key,
                        kategorie: kategorie
                    };
                    return render_appPreviewListItem({
                        item: item,
                        title: item.listItemData.titel,
                        subtitle: item.listItemData.untertitel,
                        thumbnailSrc: item.listItemData.thumbnailSrc,
                        onClick: this._on_appPreviewListItem_click,
                    });
                })}
        </ons-list>`;
    }

    _render_onsList() {
        return html`
        <ons-list-title>Freizeit</ons-list-title>
        <ons-list>
            ${this._render_onsListItems(this._freizeitItems, 'freizeit')}
        </ons-list>

        <ons-list-title>Lieferdienste</ons-list-title>
        <ons-list>
            ${Object.keys(this._lieferdiensteItems)
                .map(key => {
                    const item = {
                        ...this._lieferdiensteItems[key],
                        key: key,
                        kategorie: 'lieferdienste'
                    },
                        {
                            titel,
                            untertitel,
                            thumbnailSrc,
                        } = item.listItemData;
                    return render_appPreviewListItem({
                        item: item,
                        title: titel,
                        subtitle: untertitel,
                        thumbnailSrc: thumbnailSrc,
                        onClick: this._on_appPreviewListItem_click,
                    });
                })}
        </ons-list>

        <ons-list-title>Kultur</ons-list-title>
        <ons-list>
            ${Object.keys(this._kulturItems)
                .map(key => {
                    const item = {
                        ...this._kulturItems[key],
                        key: key,
                        kategorie: 'kultur'
                    },
                        {
                            titel,
                            untertitel,
                            thumbnailSrc,
                        } = item.listItemData;
                    return render_appPreviewListItem({
                        item: item,
                        title: titel,
                        subtitle: untertitel,
                        thumbnailSrc: thumbnailSrc,
                        onClick: this._on_appPreviewListItem_click,
                    });
                })}
        </ons-list>

        <ons-list-title>Infos</ons-list-title>
        <ons-list>
            ${Object.keys(this._infoItems)
                .map(key => {
                    const item = {
                        ...this._infoItems[key],
                        key: key,
                        kategorie: 'infos'
                    },
                        {
                            titel,
                            untertitel,
                            thumbnailSrc,
                        } = item.listItemData;
                    return render_appPreviewListItem({
                        item: item,
                        title: titel,
                        subtitle: untertitel,
                        thumbnailSrc: thumbnailSrc,
                        onClick: this._on_appPreviewListItem_click,
                    });
                })}
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
                ${this._render_onsList()}
            </div>
        </ons-page>
        `;
    }

    stateChanged(state) {
        this._freizeitItems = state.app.freizeitItems;
        this._lieferdiensteItems = state.app.lieferdiensteItems;
        this._kulturItems = state.app.kulturItems;
        this._infoItems = state.app.infoItems;
    }

    _on_appPreviewListItem_click(item) {
        document.querySelector('ons-navigator')
            .pushPage('add-item-page.html')
            .then(x => {
                const additemPage = x.querySelector('add-item-page');
                additemPage.setItem(item, 'freizeit');
            });
    }

    _onNeuerEintragClick() {
        document.querySelector('ons-navigator')
            .pushPage('add-item-page.html');
    }
}
customElements.define(DataPage.is, DataPage);
