
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

    _renderKategorieOnsListItem() {
        return html`
            <ons-list-item>
                <div class="center">Kategorie</div>
                <div class="right">
                    <ons-select class="ul" @change="${e => this._kategorie = e.srcElement.value}">
                        <option value="freizeit">Freizeit</option>
                        <option value="lieferdienste">Lieferdienste</option>
                        <option value="kultur">Kultur</option>
                        <option value="infos">Infos</option>
                    </ons-select>
                </div>
            </ons-list-item>
            `;
    }

    _renderTitelOnsListItem() {
        return html`
            <ons-list-item>
                <div class="center">Titel</div>
                <div class="right">
                    <ons-input placeholder="Titel"
                        @change="${e => this._titel = e.srcElement.value}"
                        style="width: 167px;"></ons-input>
                </div>
            </ons-list-item>
            `;
    }

    _renderUntertitelOnsListItem() {
        return html`
            <ons-list-item>
                <div class="center">Untertitel</div>
                <div class="right">
                    <ons-input placeholder="Untertitel"
                        @change="${e => this._untertitel = e.srcElement.value}"
                        style="width: 167px;"></ons-input>
                </div>
            </ons-list-item>
            `;
    }

    _renderThumbnailOnsListItem() {
        return html`
        <ons-list-item>
            <div class="center">Thumbnail</div>
            <div class="right">
                <ons-button modifier="large--quiet" @click="${this._onBildAuswaelenClick}">Bild auswählen</ons-button>
                <input id="thumbnailImage" hidden type="file" accept="image/*" @change="${this._onThumbnailImageChange}" />
            </div>
        </ons-list-item>
        `;
    }

    _renderVorschauOnsListItem() {
        return html`
            <ons-list-item>
                <ons-list-item modifier="chevron" tappable>
                    <div class="left">
                        <img class="list-item__thumbnail" src="${this._thumbnailSrc}">
                    </div>
                    <div class="center">
                        <span class="list-item__title">${this._titel}</span>
                        <span class="list-item__subtitle">${this._untertitel}</span>
                    </div>
                </ons-list-item>
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
                <div class="center">Neuer Eintrag</div>
                <div class="right">
                    <ons-toolbar-button @click="${this._onWeiterClick}">Weiter</ons-toolbar-button>
                </div>
            </ons-toolbar>
            <div class="content">
                <ons-card>
                    <h1>Lorem ipsum</h1>
                    <p>
                        Lorem ipsum dolor sit amet, consetetur sadipscing elitr, 
                        sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam
                    </p>
                </ons-card>
                <ons-list-title>Stammdaten</ons-list-title>
                <ons-list>
                    ${this._renderKategorieOnsListItem()}
                    ${this._renderTitelOnsListItem()}
                    ${this._renderUntertitelOnsListItem()}
                    ${this._renderThumbnailOnsListItem()}
                </ons-list>
                <ons-list-title>Vorschau</ons-list-title>
                <ons-list>
                    ${this._renderVorschauOnsListItem()}
                </ons-list>
            </div>
        </ons-page>
        `;
    }

    _onThumbnailImageChange() {
        const src = event.srcElement,
            file = src.files[0];
        if (!file) return;

        const reader = new FileReader(),
            _this = this;
        reader.onload = (e) => _this._thumbnailSrc = e.target.result;
        reader.readAsDataURL(file);
    }

    _onBildAuswaelenClick() {
        this.querySelector('#thumbnailImage').click();
    }

    _onWeiterClick() {
        if (!this._titel) {
            ons.notification.toast('Titel ist erforderlich!', { timeout: 2000 });
            return;
        }
        if (!this._kategorie) {
            ons.notification.toast('Kategorie ist erforderlich!', { timeout: 2000 });
            return;
        }


        document.querySelector('ons-navigator')
            .pushPage('add-item-1-page.html')
            .then(x => {
                const addItem1Page = x.querySelector('add-item-1-page');
                addItem1Page.setTitel(this._titel);
                addItem1Page.setKategorie(this._kategorie);
            });
    }
}
customElements.define(AddItemPage.is, AddItemPage);
