import { connect } from "pwa-helpers";
import { store } from "../redux/store";
import { LitElement, html } from "lit-element";
import {
    render_onsListItem_standard,
    render_onsListItem_standard_konfig,

    render_onsListItem_expandable,
    render_onsListItem_expandable_konfig,

    render_onsListItem_url,
    render_onsListItem_url_konfig,
    render_onsListItem_vorschaubilderUndTitel_konfig,
    render_onsListItem_vorschaubilderUndTitel,

} from "../ons-components/ons-components";

export default class ListItemConfigurator extends connect(store)(LitElement) {
    static get is() { return 'list-item-configurator'; }
    static get properties() {
        return {
            _key: String,
            _left: String,
            _title: String,
            _subtitle: String,
            _right: String,

            _showDeleteButton: Boolean,

            // new
            _onsListItemText: String,
            _vorlage: String,

            _urlKonfigTitel: String,
            _urlKonfigUrl: String,

            _onsListItem_standard_text: String,
            _onsListItem_expandable_text: String,
            _onsListItem_expandable_expandableText: String,
            _onsListItem_url_titel: String,
            _onsListitem_url_url: String,
            _onsListItem_vorschaubilderUndTitel_thumbnailSrc: String,
            _onsListItem_vorschaubilderUndTitel_titel: String,
            _onsListItem_vorschaubilderUndTitel_untertitel: String
        };
    }

    constructor() {
        super();
        this._key = '';
        this._left = '';
        this._title = '';
        this._subtitle = '';
        this._right = '';
        this._showDeleteButton = false;

        this._vorlage = 'Standard';
        this._onsListItemText = '';

        this._urlKonfigTitel = '';
        this._urlKonfigUrl = '';

        this._onsListItem_standard_text = '';
        this._onsListItem_expandable_text = '';
        this._onsListItem_expandable_expandableText = '';
        this._onsListItem_url_titel = '';
        this._onsListitem_url_url = '';
        this._onsListItem_vorschaubilderUndTitel_thumbnailSrc = 'https://via.placeholder.com/40x40';
        this._onsListItem_vorschaubilderUndTitel_titel = '';
        this._onsListItem_vorschaubilderUndTitel_untertitel = '';
    }

    _render_onsToolbar() {
        return html`
        <ons-toolbar>
            <div class="left">
                <ons-back-button>Zurück</ons-back-button>
            </div>
            <div class="center">Item Konfigurator</div>
            <div class="right">
                <ons-toolbar-button @click="${this._onFertigClick}">Fertig</ons-toolbar-button>
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

    _render_onsList_vorlagen() {
        return html`
        <ons-list-title>Stammdaten</ons-list-title>
        <ons-list>
            <ons-list-item>
                <div class="center">Vorlage</div>
                <div class="right">
                    <ons-select class="ul" 
                        @change="${e => this._vorlage = e.srcElement.value}">
                        <option value="Standard">Standard</option>
                        <option value="Erweiterbar">Erweiterbar</option>
                        <option value="Url">Url</option>
                        <option value="Vorschaubilder und Titel">Vorschaubilder und Titel</option>
                    </ons-select>
                </div>
            </ons-list-item>
        </ons-list>
        `;
    }

    _render_onsList_konfig() {
        switch (this._vorlage) {
            case 'Standard':
                return render_onsListItem_standard_konfig({
                    text: this._onsListItem_standard_text,
                    textChange: (text) => this._onsListItem_standard_text = text
                });
            case 'Erweiterbar':
                return render_onsListItem_expandable_konfig({
                    text: this._onsListItem_expandable_text,
                    textChange: value => this._onsListItem_expandable_text = value,
                    expandableText: this._onsListItem_expandable_expandableText,
                    expandableTextChange: value => this._onsListItem_expandable_expandableText = value
                });
            case 'Url':
                return render_onsListItem_url_konfig({
                    titel: this._onsListItem_url_titel,
                    titelChange: (titel) => this._onsListItem_url_titel = titel,
                    url: this._onsListitem_url_url,
                    urlChange: (url) => this._onsListitem_url_url = url,
                });
            case 'Vorschaubilder und Titel':
                return render_onsListItem_vorschaubilderUndTitel_konfig({
                    thumbnailChange: value => this._onsListItem_vorschaubilderUndTitel_thumbnailSrc = value,
                    titel: this._onsListItem_vorschaubilderUndTitel_titel,
                    titelChange: value => this._onsListItem_vorschaubilderUndTitel_titel = value,
                    untertitel: this._onsListItem_vorschaubilderUndTitel_untertitel,
                    untertitelChange: value => this._onsListItem_vorschaubilderUndTitel_untertitel = value
                });
            default:
                return html``;
        }
    }

    _render_onsList_vorschau() {
        switch (this._vorlage) {
            case 'Standard':
                return html`
                <ons-list-title>Vorschau</ons-list-title>
                <ons-list>
                    ${render_onsListItem_standard({
                    content: this._onsListItem_standard_text
                })}
                </ons-list>
                `;
            case 'Erweiterbar':
                return html`
                <ons-list-title>Vorschau</ons-list-title>
                <ons-list>
                    ${render_onsListItem_expandable({
                    text: this._onsListItem_expandable_text,
                    expandableText: this._onsListItem_expandable_expandableText
                })}
                </ons-list>
                `;
            case 'Url':
                return html`
                <ons-list-title>Vorschau</ons-list-title>
                <ons-list>
                    ${render_onsListItem_url({
                    url: this._onsListitem_url_url,
                    title: this._onsListItem_url_titel,
                })}
                </ons-list>
                `;
            case 'Vorschaubilder und Titel':
                return html`
                <ons-list-title>Vorschau</ons-list-title>
                <ons-list>
                    ${render_onsListItem_vorschaubilderUndTitel({
                    thumbnailSrc: this._onsListItem_vorschaubilderUndTitel_thumbnailSrc,
                    titel: this._onsListItem_vorschaubilderUndTitel_titel,
                    untertitel: this._onsListItem_vorschaubilderUndTitel_untertitel
                })}
                </ons-list>
                `;
            default:
                return html``;
        }
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
                ${this._render_onsToolbar()}
                <div class="content">
                    ${this._render_onsCard()}
                    ${this._render_onsList_vorlagen()}
                    ${this._render_onsList_konfig()}
                    ${this._render_onsList_vorschau()}
                </div>
                ${this._renderOnsBottomToolbar()}
            </ons-page>
        `;
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

    _onEntfernenClick() {
        this.dispatchEvent(new CustomEvent('entfernenClick', {
            detail: { key: this._key }
        }));
    }

    _onFertigClick() {
        let item = {
            key: this._key,
            vorlage: this._vorlage
        };
        switch (this._vorlage) {
            case 'Standard':
                item = {
                    ...item,
                    text: this._onsListItem_standard_text
                };
                break;
            case 'Erweiterbar':
                item = {
                    ...item,
                    text: this._onsListItem_expandable_text,
                    expandableText: this._onsListItem_expandable_expandableText
                };
                break;
            case 'Url':
                item = {
                    ...item,
                    title: this._onsListItem_url_titel,
                    url: this._onsListitem_url_url
                };
                break;
            case 'Vorschaubilder und Titel':
                item = {
                    ...item,
                    thumbnailSrc: this._onsListItem_vorschaubilderUndTitel_thumbnailSrc,
                    titel: this._onsListItem_vorschaubilderUndTitel_titel,
                    untertitel: this._onsListItem_vorschaubilderUndTitel_untertitel
                };
                break;
            default:
                break;
        }

        this.dispatchEvent(new CustomEvent('fertigClick', { detail: { item } }));
    }
}
customElements.define(ListItemConfigurator.is, ListItemConfigurator);
