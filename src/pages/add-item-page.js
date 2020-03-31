import { connect } from "pwa-helpers";
import { store } from "../redux/store";
import { LitElement, html } from "lit-element";

export default class AddItemPage extends connect(store)(LitElement) {
    static get is() { return 'add-item-page'; }
    static get properties() {
        return {
            _kategorie: String,
            _titel: String,
            _untertitel: String,
            _thumbnailSrc: String
        };
    }

    constructor() {
        super();
        this._kategorie = 'freizeit';
        this._titel = '';
        this._untertitel = '';
        this._thumbnailSrc = 'https://via.placeholder.com/40x40';
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

    _render_onsList_stammdaten() {
        const onBildAuswaelenClick = () => {
            const input = document.createElement('input'),
                reader = new FileReader();
            input.setAttribute('type', 'file');
            input.setAttribute('accept', 'image/*');
            input.onchange = (e) => {
                const file = e.srcElement.files[0];
                if (!file) return;
                reader.onload = (e) => this._thumbnailSrc = e.target.result;
                reader.readAsDataURL(file);
            }
            input.click();
        };

        return html`
        <ons-list-title>Stammdaten</ons-list-title>
        <ons-list>
            <ons-list-item>
                <div class="center">Kategorie</div>
                <div class="right">
                    <ons-select class="ul" 
                        value="${this._kategorie}"
                        @change="${e => this._kategorie = e.srcElement.value}">
                        <option value="freizeit">Freizeit</option>
                        <option value="lieferdienste">Lieferdienste</option>
                        <option value="kultur">Kultur</option>
                        <option value="infos">Infos</option>
                    </ons-select>
                </div>
            </ons-list-item>
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
                    <ons-button modifier="large--quiet" 
                        @click="${onBildAuswaelenClick}">Bild auswählen</ons-button>
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
        </ons-page>
        `;
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
                }));
    }
}
customElements.define(AddItemPage.is, AddItemPage);
