import { connect } from "pwa-helpers";
import { store } from "../redux/store";
import { LitElement, html } from "lit-element";
import { setKulturItem } from "../redux/actions/app";
import { render_appPreviewListItem } from "../ons-components/app-components";

export default class KulturPage extends connect(store)(LitElement) {
    static get is() { return 'kultur-page'; }
    static get properties() {
        return {
            _kulturItems: Object,
        }
    }

    constructor() {
        super();
        this._kulturItems = {};
    }

    createRenderRoot() { return this; }
    render() {
        return html`
        <ons-page>
            <div class="content">
                <ons-card>
                    <h1>Kultur@home</h1>
                    <p>
                        Museen, Kinos und Clubs müssen aufgrund der Corona-Pandemie aktuell ihre Türen geschlossen halten. 
                        Es gibt inzwischen täglich immer mehr kreative Idden und Möglichkeiten, wie auch dieses wichtige Gut weiterhin aktiv stattfinden und praktiziert werden kann.
                        Fotografen führen euch in ihren Online-Kursen an neue Praktiken und Techniken, rund ums Fotografieren – auch im geschlossenen Raum, DJ's veranstalten Live-Streams von ihren Sets, 
                        zum Mithören und Tanzen und viele lokale Kunst- und Handwerk-Schaffende, wie Tätowierer, 
                        Maler oder regionale Modelabels bieten ihre Kunst oder Produkte in Online-Shops zum Verkauf an – gerade hier findest du aktuell jede Menge Sonderangebote und eine bequeme Möglichkeit, 
                        Kunst und Handwerk zu dir nach Hause liefern zu lassen.
                        Um auch deinen Link zur Website, Socialmedia-Kanal oder zum Onlineshop unter einer der untenstehenden Kategorien zu finden, schicke uns eine e-mail an – schreibe uns dafür gerne auch einen kleinen Text, 
                        den wir in die Info-Box packen dürfen (LINK).
                    </p>
                </ons-card>
                <ons-list-title>&nbsp;</ons-list-title>
                <ons-list>
                ${Object.keys(this._kulturItems)
                .map(key => {
                    const item = {
                        ...this._kulturItems[key],
                        key: key,
                        kategorie: 'kultur',
                    };

                    return render_appPreviewListItem({
                        item: item,
                        title: item.listItemData.titel,
                        subtitle: item.listItemData.untertitel,
                        thumbnailSrc: item.listItemData.thumbnailSrc,
                        onClick: this._onOnsListItemClick
                    })
                })}
                </ons-list>
            </div>
        </ons-page>
        `;
    }

    stateChanged(state) {
        this._kulturItems = state.app.kulturItems;
    }

    _onOnsListItemClick(item) {
        store.dispatch(setKulturItem(item));
        document.querySelector('ons-navigator')
            .pushPage('detail-1-page.html');
    }
}
customElements.define(KulturPage.is, KulturPage);