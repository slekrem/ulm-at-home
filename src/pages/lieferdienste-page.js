import { connect } from "pwa-helpers";
import { store } from "../redux/store";
import { LitElement, html } from "lit-element";

export default class LieferdienstePage extends connect(store)(LitElement) {
    static get is() { return 'lieferdienste-page'; }
    static get properties() {
        return {
            _lieferdiensteOnsListData: []
        };
    }

    constructor() {
        super();
        this._lieferdiensteOnsListData = [];
    }

    _renderOnsListItem(item) {
        return html`
            <ons-list-item modifier="chevron" tappable @click="${this._onOnsListItemClick}">
                <div class="left">
                    <img class="list-item__thumbnail" src="${item.thumbnail}">
                </div>
                    <div class="center">
                        <span class="list-item__title">${item.title}</span>
                        <span class="list-item__subtitle">${item.subtitle}</span>
                    </div>
                </ons-list-item>
                `;
    }

    createRenderRoot() { return this; }
    render() {
        return html`
        <ons-page>
            <div class="content">
                <h1>Hunger@home</h1>
                <p>
                    Viele lokale Gastronomen - darunter Restaurants, Bars und Kneipen - bieten aktuell einen speziellen Lifer- oder Abholservice an. 
                    Egal ob regionale Burger, der Coktail aus deiner Lieblings-Bar oder die Familienpizza vom Italiener deines Vertrauens – der Betrieb vieler Unternehmen geht weiter. 
                    Gerade jetzt sind diese auf dich angewiesen. Im Folgenden findest du eine Vielzahl an Ulmer Betrieben, die dich mit leckerem Essen, besonderen Drinks und Snacks beliefern.
                    Klicke einfach auf den Namen, um weitere Infos zu Lieferzeiten, Sonderangeboten und co zu finden.
                    Falls dein Betrieb noch nicht in der Liste zu finden ist, sende eine email an (LINK)
                </p>
                <ons-list-title>Titel</ons-list-title>
                <ons-list>
                    ${this._lieferdiensteOnsListData.map(item => this._renderOnsListItem(item))}
                </ons-list>
            </div>
        </ons-page>
        `;
    }

    stateChanged(state) {
        this._lieferdiensteOnsListData = state.app.lieferdiensteOnsListData;
    }

    _onOnsListItemClick() {
        document.querySelector('ons-navigator')
            .pushPage('detail-1-page.html');
    }
}
customElements.define(LieferdienstePage.is, LieferdienstePage);
