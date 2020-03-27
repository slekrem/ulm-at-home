
import { connect } from "pwa-helpers";
import { store } from "../redux/store";
import { LitElement, html } from "lit-element";

export default class ListItemConfigurator extends connect(store)(LitElement) {
    static get is() { return 'list-item-configurator'; }
    static get properties() {
        return {
            _key: String,
            _left: String,
            _title: String,
            _subtitle: String,
            _right: String,

            _showDeleteButton: Boolean
        }
    }

    constructor() {
        super();
        this._key = '';
        this._left = '';
        this._title = '';
        this._subtitle = '';
        this._right = '';
        this._showDeleteButton = false;
    }

    setItem(item, showDeleteButton) {
        this._key = item.key;
        this._left = item.left;
        this._title = item.title;
        this._subtitle = item.subtitle;
        this._right = item.right;
        this._showDeleteButton = showDeleteButton;
    }

    getItem() {
        return {
            key: this._key,
            left: this._left,
            title: this._title,
            subtitle: this._subtitle,
            right: this._right
        };
    }

    _renderOnsBottomToolbar() {
        if (this._showDeleteButton)
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
                <ons-toolbar>
                    <div class="left">
                        <ons-toolbar-button @click="${this._onZurueckClick}">Zurück</ons-toolbar-button>
                    </div>
                    <div class="right">
                        <ons-toolbar-button @click="${this._onFertigClick}">Fertig</ons-toolbar-button>
                    </div>
                </ons-toolbar>
                <div class="content">
                    <ons-list-title>Daten</ons-list-title>
                    <ons-list>
                        <ons-list-item>
                            <div class="center">Links</div>
                            <div class="right">
                                <ons-input placeholder="Links" 
                                    value="${this._left}"
                                    @change="${e => this._left = e.srcElement.value}">
                                </ons-input>
                            </div>
                        </ons-list-item>
                        <ons-list-item>
                            <div class="center">Titel</div>
                            <div class="right">
                                <ons-input placeholder="Titel" 
                                    value="${this._title}"
                                    @change="${e => this._title = e.srcElement.value}">
                                </ons-input>
                            </div>
                        </ons-list-item>
                        <ons-list-item>
                            <div class="center">Subtitel</div>
                            <div class="right">
                                <ons-input placeholder="Subtitel" 
                                    value="${this._subtitle}"
                                    @change="${e => this._subtitle = e.srcElement.value}">
                                </ons-input>
                            </div>
                        </ons-list-item>
                        <ons-list-item>
                            <div class="center">Rechts</div>
                            <div class="right">
                                <ons-input placeholder="Rechts" 
                                    value="${this._right}"
                                    @change="${e => this._right = e.srcElement.value}">
                                </ons-input>
                            </div>
                        </ons-list-item>
                    </ons-list>

                    <ons-list-title>Vorschau</ons-list-title>
                    <ons-list>
                        <ons-list-item>
                            <div class="left">${this._left}</div>
                            <div class="center">
                                <span class="list-item__title">${this._title}</span>
                                <span class="list-item__subtitle">${this._subtitle}</span>
                            </div>
                            <div class="right">${this._right}</div>
                        </ons-list-item>
                    </ons-list>
                </div>
                ${this._renderOnsBottomToolbar()}
            </ons-page>
        `;
    }

    _onEntfernenClick() {
        this.dispatchEvent(new CustomEvent('entfernenClick', {
            detail: { key: this._key }
        }));
    }

    _onFertigClick() {
        this.dispatchEvent(new CustomEvent('fertigClick'));
    }

    _onZurueckClick(e) {
        this.dispatchEvent(new CustomEvent('zurueckClick'));
    }
}
customElements.define(ListItemConfigurator.is, ListItemConfigurator);
