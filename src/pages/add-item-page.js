import { connect } from "pwa-helpers";
import { store } from "../redux/store";
import { LitElement, html } from "lit-element";

import '../components/file-input';

export default class AddItemPage extends connect(store)(LitElement) {
    static get is() { return 'add-item-page'; }
    static get properties() {
        return {
            _item: Object,
            _kategorie: String,
            _titel: String,
            _untertitel: String,
            _thumbnailSrc: String,
            _thumbnail_fileName: String,

            _renderOnsBottomToolbar: Boolean,

        };
    }

    constructor() {
        super();
        this._item = {};
        this._kategorie = 'freizeit';
        this._titel = '';
        this._untertitel = '';
        this._thumbnailSrc = 'https://via.placeholder.com/40x40';
        this._thumbnail_fileName = '';
        this._renderOnsBottomToolbar = false;
    }

    _render_onsToolbar() {
        return html`
        <ons-toolbar>
            <div class="left">
                <ons-back-button>Zurück</ons-back-button>
            </div>
            <div class="center">Neuer Eintrag</div>
            <div class="right">
                <ons-toolbar-button @click="${this._onWeiterClick}">Weiter</ons-toolbar-button>
            </div>
        </ons-toolbar>
        `;
    }

    _render_onsCard() {
        return html`
        <ons-card>
            <h1>Lorem ipsum</h1>
            <p>
                Lorem ipsum dolor sit amet, consetetur sadipscing elitr,
                sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam
            </p>
        </ons-card>
        `;
    }

    _render_onsListItem_stammdatenKategorie() {
        const disabled = this._renderOnsBottomToolbar;
        console.log(this._item)
        return html`
        <ons-list-item>
            <div class="center">Kategorie</div>
                <div class="right">
                    <ons-select class="ul" 
                        ?disabled="${disabled}"
                        value="${this._kategorie}"
                        @change="${e => this._kategorie = e.srcElement.value}">
                        <option value="freizeit">Freizeit</option>
                        <option value="lieferdienste" selected>Lieferdienste</option>
                        <option value="kultur">Kultur</option>
                        <option value="infos">Infos</option>
                    </ons-select>
                </div>
            </div>
        </ons-list-item>
        `;
    }

    _render_onsList_stammdaten() {
        return html`
        <ons-list-title>Stammdaten</ons-list-title>
        <ons-list>
            ${this._render_onsListItem_stammdatenKategorie()}
            <ons-list-item>
                <div class="center">Titel</div>
                <div class="right">
                    <ons-input placeholder="Titel"
                        value="${this._titel}"
                        @change="${e => this._titel = e.srcElement.value}"
                        style="width: 167px;"></ons-input>
                </div>
            </ons-list-item>
            <ons-list-item>
                <div class="center">Untertitel</div>
                <div class="right">
                    <ons-input placeholder="Untertitel"
                        value="${this._untertitel}"
                        @change="${e => this._untertitel = e.srcElement.value}"
                        style="width: 167px;"></ons-input>
                </div>
            </ons-list-item>
            <ons-list-item>
                <div class="center">Thumbnail</div>
                <div class="right">
                    <file-input @change="${this._onThumbnailFileInputChange}"></file-input>
                    <ons-button modifier="large--quiet" 
                        @click="${this._onBildAuswaelenClick}">Bild auswählen</ons-button>
                </div>
            </ons-list-item>
        </ons-list>
        `;
    }

    _render_vorschau() {
        return html`
        <ons-list-title>Vorschau</ons-list-title>
        <ons-list>
            <ons-list-item modifier="chevron" tappable>
                <div class="left">
                    <img class="list-item__thumbnail" src="${this._thumbnailSrc}">
                </div>
                <div class="center">
                    <span class="list-item__title">${this._titel}</span>
                    <span class="list-item__subtitle">${this._untertitel}</span>
                </div>
            </ons-list-item>
        </ons-list>
        `;
    }

    _render_onsBottomToolbar() {
        if (this._renderOnsBottomToolbar)
            return html`
        <ons-bottom-toolbar>
            <ons-button modifier="large--quiet"
                @click="${this._onEntfernenClick}">Entfernen</ons-button>
        </ons-bottom-toolbar>
        `;
        return html``;
    }

    createRenderRoot() { return this; }
    render() {
        return html`
        <ons-page>
            ${this._render_onsToolbar()}
            <div class="content">
                ${this._render_onsCard()}
                ${this._render_onsList_stammdaten()}
                ${this._render_vorschau()}
            </div>
            ${this._render_onsBottomToolbar()}
        </ons-page>
        `;
    }

    setItem(item, kategorie) {
        this._item = item;
        this._kategorie = kategorie;
        this._titel = this._item.listItemData.titel;
        this._untertitel = this._item.listItemData.untertitel;
        this._thumbnailSrc = this._item.listItemData.thumbnailSrc;
        this._renderOnsBottomToolbar = true;
    }

    _onWeiterClick() {
        if (!this._kategorie) {
            ons.notification.toast('Kategorie ist erforderlich!', { timeout: 2000 });
            return;
        }
        if (!this._titel) {
            ons.notification.toast('Titel ist erforderlich!', { timeout: 2000 });
            return;
        }
        if (!this._untertitel) {
            ons.notification.toast('Untertitel ist erforderlich!', { timeout: 2000 });
            return;
        }
        if (!this._thumbnailSrc) {
            ons.notification.toast('Thumbnail ist erforderlich!', { timeout: 2000 });
            return;
        }

        document.querySelector('ons-navigator')
            .pushPage('add-item-1-page.html')
            .then(x => x.querySelector('add-item-1-page')
                .setOnsListItemData({
                    kategorie: this._kategorie,
                    titel: this._titel,
                    untertitel: this._untertitel,
                    thumbnailSrc: this._thumbnailSrc,
                    thumbnail_fileName: this._thumbnail_fileName
                }));
    }

    _onBildAuswaelenClick() {
        this.querySelector('file-input').openFileDialog();
    }

    _onThumbnailFileInputChange(event) {
        this._thumbnailSrc = event.detail.fileDataUrl;
        this._thumbnail_fileName = event.detail.fileName
    }

    _onEntfernenClick() {
        const database = firebase.database();
        ons.notification.confirm('Confirm!')
            .then(x => {
                if (x === 1) {
                    let path = '';
                    switch (this._item.kategorie) {
                        case 'freizeit':
                            path = 'freizeitItems/';
                            break;
                        case 'lieferdienste':
                            path = 'lieferdiensteItems/';
                            break;
                        case 'kultur':
                            path = 'kulturItems/';
                            break;
                        case 'infos':
                            path = 'infoItems/';
                            break;
                        default:
                            console.error('', this._item);
                            break;
                    }
                    let itemRef = database.ref(path + this._item.key);
                    itemRef.remove()
                        .then(() => {
                            document.querySelector('ons-navigator')
                                .resetToPage('kategorien-page.html');
                        })
                        .catch(console.error);
                }
            });
    }
}
customElements.define(AddItemPage.is, AddItemPage);
