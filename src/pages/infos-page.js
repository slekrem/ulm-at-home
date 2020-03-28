import { connect } from "pwa-helpers";
import { store } from "../redux/store";
import { LitElement, html } from "lit-element";

export default class InfosPage extends connect(store)(LitElement) {
    static get is() { return 'infos-page'; }
    static get properties() {
        return {
            _infosOnsListData: Array
        }
    }

    constructor() {
        super();
        this._infosOnsListData = [];
    }

    _renderOnsListItem(item) {
        return html`
            <ons-list-item modifier="chevron" tappable @click="${() => this._onOnsListItemClick(item)}">
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
                <ons-card>
                    <h1>Infos@home</h1>
                    <p>
                        Unter diesem Bereich findest du alle Infos rund um Fragen zu COVID-19, in und um Ulm. Nachbarschafts-Hilfen, Stellenausschreibungen von Betrieben, die aktuell Unterstützung benötigen, 
                        aber auch generelle Infos, wie Links zu youtube-Videos, Hygiene-Maßnahmen und Verhaltensweisen, während der aktuellen Lage.
                        Gesammelt unter einer Kategorie, wollen wir hier gemeinsam Nützliches und auch die positiven Aspekte zusammentragen. Eigen-verfasste Texte, wie du mit der aktuellen Lebenssituation umgehst, 
                        haben ebenfalls hier einen Platz. Sende deine Anregung, Angebote zur Mithilfe und co an diese e-mail-Adresse: (LINK)
                    </p>
                </ons-card>
                <ons-list-title>&nbsp;</ons-list-title>
                <ons-list>
                    ${this._infosOnsListData.map(item => this._renderOnsListItem(item))}
                </ons-list>
            </div>
        </ons-page>
        `;
    }

    stateChanged(state) {
        this._infosOnsListData = state.app.infosOnsListData;
    }

    _onOnsListItemClick() {
        //store.dispatch(setInfo(item));
        document.querySelector('ons-navigator')
            .pushPage('detail-1-page.html');
    }
}
customElements.define(InfosPage.is, InfosPage);
