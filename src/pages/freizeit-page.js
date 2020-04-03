import { connect } from "pwa-helpers";
import { store } from "../redux/store";
import { LitElement, html } from "lit-element";
import { setFreizeitItem } from "../redux/actions/app";
import { render_appPreviewListItem } from "../ons-components/app-components";

export default class FreizeitPage extends connect(store)(LitElement) {
    static get is() { return 'freizeit-page'; }
    static get properties() {
        return {
            _freizeitOnsListData: Object
        };
    }

    constructor() {
        super();
        this._freizeitOnsListData = {};
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
                <ons-list-title>&nbsp;</ons-list-title>
                <ons-list>
                    ${Object.keys(this._freizeitOnsListData)
                .map(key => {
                    const item = this._freizeitOnsListData[key];
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
        this._freizeitOnsListData = state.app.freizeitItems;
    }

    _onOnsListItemClick(item) {
        store.dispatch(setFreizeitItem(item));
        document.querySelector('ons-navigator')
            .pushPage('detail-1-page.html');
    }
}
customElements.define(FreizeitPage.is, FreizeitPage);