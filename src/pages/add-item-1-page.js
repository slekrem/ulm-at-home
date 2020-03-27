
import { connect } from "pwa-helpers";
import { store } from "../redux/store";
import { LitElement, html } from "lit-element";

import './list-item-configurator';

export default class AddItem_1_Page extends connect(store)(LitElement) {
    static get is() { return 'add-item-1-page'; }
    static get properties() {
        return {
            _titel: String,
            _kategorie: String,
            _titleImage: String,
            _subtitle: String,
            _beschreibung: String,
            _items: Object,
            _subtitleActive: Boolean,
            _beschreibungActive: Boolean
        }
    }

    constructor() {
        super();
        this._titel = '';
        this._kategorie = '';
        this._titleImage = 'https://via.placeholder.com/800x600';
        this._subtitle = 'Subtitle';
        this._beschreibung = 'Beschreibung';
        this._items = {};
        this._subtitleActive = false;
        this._beschreibungActive = false;
    }

    setTitel(titel) {
        this._titel = titel;
    }

    setKategorie(kategorie) {
        this._kategorie = kategorie;
    }

    _renderInformationenOnsListItem(item) {
        return html`
            <ons-list-item @click="${() => this._onOnsListItemClick(item)}">
                <div class="left">${item.left}</div>
                <div class="center">
                    <span class="list-item__title">${item.title}</span>
                    <span class="list-item__subtitle">${item.subtitle}</span>
                </div>
                <div class="right">${item.right}</div>
            </ons-list-item>
            `;
    }

    _renderFormInputs() {
        return html`
            <input id="titleImage" hidden type="file" accept="image/*"
                @change="${this._onTitleImageChange}" />
        `;
    }

    _renderSubtitle() {
        if (this._subtitleActive)
            return html`<input type="text" autofocus
                @blur="${this._onSubtitleInputBlur}"
                @change="${e => this._subtitle = e.srcElement.value}"
                value="${this._subtitle}"
                style="
                    width: 100%;
                    background: transparent;
                    border: none;

                    color:rgb(79, 79, 79);
                    display:block;
                    font-family:Roboto, Noto, sans-serif;
                    font-size:28px;
                    font-weight:500;
                    height:32px;
                    margin-block-end:16.8px;
                    margin-block-start:16.8px;
                    margin-bottom:16.8px;
                    margin-inline-end:0px;
                    margin-inline-start:0px;
                    margin-left:0px;
                    margin-right:0px;
                    margin-top:16.8px;
                    overflow-wrap:break-word;
                    padding-bottom:0px;
                    padding-left:0px;
                    padding-right:0px;
                    padding-top:0px;
                    text-align:left;
                    text-size-adjust:100%;
                    user-select:none;
                    -webkit-font-smoothing:antialiased;
                    -webkit-tap-highlight-color:rgb(0, 0, 0);">`;
        return html`<h1 @click="${this._onSubtitleClick}">${this._subtitle}</h1>`;
    }

    _renderBeschreibung() {
        if (this._beschreibungActive)
            return html`<input type="text" autofocus
                @blur="${this._onBeschreibungInputBlur}"
                @change="${e => this._beschreibung = e.srcElement.value}"
                value="${this._beschreibung}"
                style="
                    width: 100%;
                    background: transparent;
                    border: none;
                    
                    color:rgb(79, 79, 79);
                    display:block;
                    font-weight:400;
                    height:18px;
                    margin-block-end:16px;
                    margin-block-start:16px;
                    margin-inline-end:0px;
                    margin-inline-start:0px;
                    overflow-wrap:break-word;
                    text-align:left;
                    text-size-adjust:100%;
                    user-select:none;
                    width:366px;
                    -webkit-font-smoothing:antialiased;
                    -webkit-tap-highlight-color:rgb(0, 0, 0);
                    ">`;
        return html`<p @click="${this._onBeschreibungClick}">${this._beschreibung}</p>`;
    }

    createRenderRoot() { return this; }
    render() {
        return html`
        <ons-page>
            <ons-toolbar>
                <div class="left">
                    <ons-back-button>Zurück</ons-back-button>
                </div>
                <div class="center">${this._titel}</div>
                <div class="right">
                    <ons-toolbar-button @click="${this._onDownloadClick}">Download</ons-toolbar-button>
                </div>
            </ons-toolbar>
            <div class="content">
                <img src="${this._titleImage}" 
                    style="width:100%"
                    @click="${this._onTitleImageClick}">
                <ons-card class="ul">
                    ${this._renderSubtitle()}
                    ${this._renderBeschreibung()}
                </ons-card>
                <ons-list-title>Informationen</ons-list-title>
                <ons-list>
                    ${Object.keys(this._items).map(key => this._renderInformationenOnsListItem(this._items[key]))}
                    <ons-list-item>
                        <div class="right">
                            <ons-button modifier="large--quiet"
                                @click="${this._onAddItemClick}">add item</ons-button>
                        </div>
                    </ons-list-item>
                </ons-list>
            </div>
            ${this._renderFormInputs()}
        </ons-page>

        <ons-modal direction="up">
            <list-item-configurator 
                @zurueckClick="${this._onListItemConfiguratorZurueckClick}"
                @fertigClick="${this._onListItemConfiguratorFertigClick}"
                @entfernenClick="${this._onListItemConfiguratorEntfernenClick}"></list-item-configurator>
        </ons-modal>
        `;
    }

    _onDownloadClick() {
        const data = {
            kategorie: this._kategorie,

            thumbnail: this._titleImage,
            title: this._titel,
            subtitle: this._subtitle,
            titleImage: this._titleImage,
            beschreibung: this._beschreibung,
            informationen: this._items
        };

        var dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(data));
        var downloadAnchorNode = document.createElement('a');
        downloadAnchorNode.setAttribute("href", dataStr);
        downloadAnchorNode.setAttribute("download", this._titel + ".json");
        document.body.appendChild(downloadAnchorNode); // required for firefox
        downloadAnchorNode.click();
        downloadAnchorNode.remove();
    }

    _onAddItemClick() {
        const listItemConfigurator = this.querySelector('list-item-configurator'),
            onsModal = this.querySelector('ons-modal');
        listItemConfigurator.setItem({
            key: this._uuidv4(),
            left: '',
            title: '',
            subtitle: '',
            right: ''
        }, false);
        onsModal.show();
    }

    _onListItemConfiguratorEntfernenClick(event) {
        delete this._items[event.detail.key];// = undefined;

        this.querySelector('ons-modal').hide();
        this.requestUpdate();
    }

    _onListItemConfiguratorFertigClick() {
        const listItemConfigurator = this.querySelector('list-item-configurator'),
            onsModal = this.querySelector('ons-modal'),
            item = listItemConfigurator.getItem();
        this._items[item.key] = item;
        onsModal.hide();
        this.requestUpdate();
    }

    _onListItemConfiguratorZurueckClick(e) {
        this.querySelector('ons-modal')
            .hide();
    }

    _onTitleImageClick() {
        this.querySelector('input#titleImage').click();
    }

    _onTitleImageChange(event) {
        const src = event.srcElement,
            file = src.files[0];
        if (!file) return;

        const reader = new FileReader(),
            _this = this;
        reader.onload = (e) => _this._titleImage = e.target.result;
        reader.readAsDataURL(file);
    }

    _onSubtitleClick() {
        this._subtitleActive = true;
    }

    _onSubtitleInputBlur() {
        this._subtitleActive = false;
    }

    _onBeschreibungClick() {
        this._beschreibungActive = true;
    }

    _onBeschreibungInputBlur() {
        this._beschreibungActive = false;
    }

    _onOnsListItemClick(item) {
        const listItemConfigurator = this.querySelector('list-item-configurator'),
            onsModal = this.querySelector('ons-modal');
        listItemConfigurator.setItem(item, true);
        onsModal.show();
    }

    _uuidv4() {
        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
            var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
            return v.toString(16);
        });
    }
}
customElements.define(AddItem_1_Page.is, AddItem_1_Page);