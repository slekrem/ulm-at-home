import { connect } from "pwa-helpers";
import { store } from "../redux/store";
import { LitElement, html } from "lit-element";
import { setLieferdiensteItem } from "../redux/actions/app";
import { render_appPreviewListItem } from "../ons-components/app-components";

export default class LieferdienstePage extends connect(store)(LitElement) {
    static get is() { return 'lieferdienste-page'; }
    static get properties() {
        return {
            _lieferdiensteItems: Object
        };
    }

    constructor() {
        super();
        this._lieferdiensteItems = {};
    }

    createRenderRoot() { return this; }
    render() {
        return html`
        <ons-page>
            <div class="content">
                <ons-card>
                    <h1>Hunger@home</h1>
                    <p>
                        Viele lokale Gastronomen - darunter Restaurants, Bars und Kneipen - bieten aktuell einen speziellen Lifer- oder Abholservice an. 
                        Egal ob regionale Burger, der Coktail aus deiner Lieblings-Bar oder die Familienpizza vom Italiener deines Vertrauens – der Betrieb vieler Unternehmen geht weiter. 
                        Gerade jetzt sind diese auf dich angewiesen. Im Folgenden findest du eine Vielzahl an Ulmer Betrieben, die dich mit leckerem Essen, besonderen Drinks und Snacks beliefern.
                        Klicke einfach auf den Namen, um weitere Infos zu Lieferzeiten, Sonderangeboten und co zu finden.
                        Falls dein Betrieb noch nicht in der Liste zu finden ist, sende eine email an (LINK)
                    </p>
                </ons-card>
                <ons-list-title>&nbsp;</ons-list-title>
                <ons-list>
                    ${Object.keys(this._lieferdiensteItems)
                .map(key => {
                    const item = {
                        ...this._lieferdiensteItems[key],
                        key: key,
                        kategorie: 'lieferdienste'
                    };

                    return render_appPreviewListItem({
                        item: item,
                        title: item.listItemData.titel,
                        subtitle: item.listItemData.untertitel,
                        thumbnailSrc: item.listItemData.thumbnailSrc,
                        onClick: this._onOnsListItemClick
                    });
                })}
                </ons-list>
            </div>
        </ons-page>
        `;
    }

    stateChanged(state) {
        this._lieferdiensteItems = state.app.lieferdiensteItems;
    }

    _onOnsListItemClick(item) {
        store.dispatch(setLieferdiensteItem(item));
        document.querySelector('ons-navigator')
            .pushPage('detail-1-page.html');
    }
}
customElements.define(LieferdienstePage.is, LieferdienstePage);
