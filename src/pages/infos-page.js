import { connect } from "pwa-helpers";
import { store } from "../redux/store";
import { LitElement, html } from "lit-element";

export default class InfosPage extends connect(store)(LitElement) {
    static get is() { return 'infos-page'; }
    static get properties() { return {} }

    constructor() {
        super();
    }

    createRenderRoot() { return this; }
    render() {
        return html`
        <ons-page>
            <div class="content">
                <h1>Infos@home</h1>
                <p>
                    Unter diesem Bereich findest du alle Infos rund um Fragen zu COVID-19, in und um Ulm. Nachbarschafts-Hilfen, Stellenausschreibungen von Betrieben, die aktuell Unterstützung benötigen, 
                    aber auch generelle Infos, wie Links zu youtube-Videos, Hygiene-Maßnahmen und Verhaltensweisen, während der aktuellen Lage.
                    Gesammelt unter einer Kategorie, wollen wir hier gemeinsam Nützliches und auch die positiven Aspekte zusammentragen. Eigen-verfasste Texte, wie du mit der aktuellen Lebenssituation umgehst, 
                    haben ebenfalls hier einen Platz. Sende deine Anregung, Angebote zur Mithilfe und co an diese e-mail-Adresse: (LINK)
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
customElements.define(InfosPage.is, InfosPage);
