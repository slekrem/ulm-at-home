import { connect } from "pwa-helpers";
import { store } from "../redux/store";
import { LitElement, html } from "lit-element";
import { setFreizeitItem } from "../redux/actions/app";

export default class FreizeitPage extends connect(store)(LitElement) {
    static get is() { return 'freizeit-page'; }
    static get properties() {
        return {
            _freizeitOnsListData: []
        };
    }

    constructor() {
        super();
        this._freizeitOnsListData = [];
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
                <ons-card class="ul">
                    <h1>Freizeit@home</h1>
                    <p>
                        Der Aufenthalt zu Hause bietet viele kreative und nützliche Möglichkeiten, um seine Freizeit abwechslungsreich, sinnvoll und bunt zu gestalten. 
                        In dieser Kategorie sammeln wir Ideen, Inspirationen und Vorschläge gegen die Langeweile daheim. 
                        Hobbys jeglicher Art sollen hier Platz finden. Communities, Workshops oder zum Beispiel auch Online-Treffen, zum gemeinsamen Yoga, findest du unter diesem Bereich.
                        Für eine Teilnahme, Links oder Ideen sende eine email an (LINK)
                    </p>
                </ons-card>
                <ons-list-title>Titel</ons-list-title>
                <ons-list>
                    ${this._freizeitOnsListData.map(item => this._renderOnsListItem(item))}
                </ons-list>
            </div>
        </ons-page>
        `;
    }

    stateChanged(state) {
        this._freizeitOnsListData = state.app.freizeitOnsListData;
    }

    _onOnsListItemClick(item) {
        store.dispatch(setFreizeitItem(item));
        document.querySelector('ons-navigator')
            .pushPage('detail-1-page.html');
    }
}
customElements.define(FreizeitPage.is, FreizeitPage);