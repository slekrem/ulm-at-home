
import { connect } from "pwa-helpers";
import { store } from "../redux/store";
import { LitElement, html } from "lit-element";

export default class AddItemPage extends connect(store)(LitElement) {
    static get is() { return 'add-item-page'; }
    static get properties() {
        return {
            _titel: String,
            _kategorie: String
        };
    }

    constructor() {
        super();
        this._titel = '';
        this._kategorie = '';
    }

    createRenderRoot() { return this; }
    render() {
        return html`
        <ons-page>
            <ons-toolbar>
                <div class="left">
                    <ons-back-button>Zurück</ons-back-button>
                </div>
                <div class="center">add new item</div>
                <div class="right">
                    <ons-toolbar-button @click="${this._onWeiterClick}">Weiter</ons-toolbar-button>
                </div>
            </ons-toolbar>
            <div class="content">
                <ons-list-title>Stammdaten</ons-list-title>
                <ons-list>
                    <ons-list-item>
                        <div class="center">Titel</div>
                        <div class="right">
                            <ons-input placeholder="Titel" @change="${e => this._titel = e.srcElement.value}"></ons-input>
                        </div>
                    </ons-list-item>
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
                </ons-list>
            </div>
        </ons-page>
        `;
    }

    _onWeiterClick() {
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
