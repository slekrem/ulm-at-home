import { connect } from "pwa-helpers";
import { store } from "../redux/store";
import { LitElement, html } from "lit-element";
import { render_appPreviewListItem } from "../ons-components/app-components";
import { setInfoItem } from "../redux/actions/app";

export default class InfosPage extends connect(store)(LitElement) {
    static get is() { return 'infos-page'; }
    static get properties() {
        return {
            _infoItems: Object
        }
    }

    constructor() {
        super();
        this._infoItems = {};
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
                    ${Object.keys(this._infoItems)
                .map(key => {
                    const item = {
                        ...this._infoItems[key],
                        key: key,
                        kategorie: 'freizeit',
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
        this._infoItems = state.app.infoItems;
    }

    _onOnsListItemClick(item) {
        store.dispatch(setInfoItem(item));
        document.querySelector('ons-navigator')
            .pushPage('detail-1-page.html');
    }
}
customElements.define(InfosPage.is, InfosPage);
