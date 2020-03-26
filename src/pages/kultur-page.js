import { connect } from "pwa-helpers";
import { store } from "../redux/store";
import { LitElement, html } from "lit-element";

export default class KulturPage extends connect(store)(LitElement) {
    static get is() { return 'kultur-page'; }
    static get properties() { return {} }

    constructor() {
        super();
    }

    createRenderRoot() { return this; }
    render() {
        return html`
        <ons-page>
            <div class="content">
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
                <ons-list-title>Titel</ons-list-title>
                <ons-list>
                    <ons-list-item modifier="chevron" tappable @click="${this._onOnsListItemClick}">
                        <div class="left">
                            <img class="list-item__thumbnail" src="https://via.placeholder.com/40x40">
                        </div>
                        <div class="center">
                            <span class="list-item__title">title 1</span>
                            <span class="list-item__subtitle">subtitle 1</span>
                        </div>
                    </ons-list-item>
                    <ons-list-item modifier="chevron" tappable @click="${this._onOnsListItemClick}">
                        <div class="left">
                            <img class="list-item__thumbnail" src="https://via.placeholder.com/40x40">
                        </div>
                        <div class="center">
                            <span class="list-item__title">title 2</span>
                            <span class="list-item__subtitle">subtitle 2</span>
                        </div>
                    </ons-list-item>
                    <ons-list-item modifier="chevron" tappable @click="${this._onOnsListItemClick}">
                        <div class="left">
                            <img class="list-item__thumbnail" src="https://via.placeholder.com/40x40">
                        </div>
                        <div class="center">
                            <span class="list-item__title">title 3</span>
                            <span class="list-item__subtitle">subtitle 3</span>
                        </div>
                    </ons-list-item>
                    <ons-list-item modifier="chevron" tappable @click="${this._onOnsListItemClick}">
                        <div class="left">
                            <img class="list-item__thumbnail" src="https://via.placeholder.com/40x40">
                        </div>
                        <div class="center">
                            <span class="list-item__title">title 4</span>
                            <span class="list-item__subtitle">subtitle 4</span>
                        </div>
                    </ons-list-item>
                    <ons-list-item modifier="chevron" tappable @click="${this._onOnsListItemClick}">
                        <div class="left">
                            <img class="list-item__thumbnail" src="https://via.placeholder.com/40x40">
                        </div>
                        <div class="center">
                            <span class="list-item__title">title 5</span>
                            <span class="list-item__subtitle">subtitle 5</span>
                        </div>
                    </ons-list-item>
                    <ons-list-item modifier="chevron" tappable @click="${this._onOnsListItemClick}">
                        <div class="left">
                            <img class="list-item__thumbnail" src="https://via.placeholder.com/40x40">
                        </div>
                        <div class="center">
                            <span class="list-item__title">title 6</span>
                            <span class="list-item__subtitle">subtitle 6</span>
                        </div>
                    </ons-list-item>
                    <ons-list-item modifier="chevron" tappable @click="${this._onOnsListItemClick}">
                        <div class="left">
                            <img class="list-item__thumbnail" src="https://via.placeholder.com/40x40">
                        </div>
                        <div class="center">
                            <span class="list-item__title">title 7</span>
                            <span class="list-item__subtitle">subtitle 7</span>
                        </div>
                    </ons-list-item>
                    <ons-list-item modifier="chevron" tappable @click="${this._onOnsListItemClick}">
                        <div class="left">
                            <img class="list-item__thumbnail" src="https://via.placeholder.com/40x40">
                        </div>
                        <div class="center">
                            <span class="list-item__title">title 8</span>
                            <span class="list-item__subtitle">subtitle 8</span>
                        </div>
                    </ons-list-item>
                    <ons-list-item modifier="chevron" tappable @click="${this._onOnsListItemClick}">
                        <div class="left">
                            <img class="list-item__thumbnail" src="https://via.placeholder.com/40x40">
                        </div>
                        <div class="center">
                            <span class="list-item__title">title 9</span>
                            <span class="list-item__subtitle">subtitle 9</span>
                        </div>
                    </ons-list-item>
                    <ons-list-item modifier="chevron" tappable @click="${this._onOnsListItemClick}">
                        <div class="left">
                            <img class="list-item__thumbnail" src="https://via.placeholder.com/40x40">
                        </div>
                        <div class="center">
                            <span class="list-item__title">title 10</span>
                            <span class="list-item__subtitle">subtitle 10</span>
                        </div>
                    </ons-list-item>
                </ons-list>
            </div>
        </ons-page>
        `;
    }

    _onOnsListItemClick() {
        document.querySelector('ons-navigator')
            .pushPage('detail-1-page.html');
    }
}
customElements.define(KulturPage.is, KulturPage);