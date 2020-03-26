
import { connect } from "pwa-helpers";
import { store } from "../redux/store";
import { LitElement, html } from "lit-element";

export default class WillkommenPage extends connect(store)(LitElement) {
    static get is() { return 'willkommen-page'; }
    static get properties() { return {} }

    constructor() {
        super();
    }

    createRenderRoot() { return this; }
    render() {
        return html`
        <ons-page>
            <div class="content">
                <h1>Willkommen</h1>
                <p>
                    ULM@home ist eine lokale und kostenlose App, die Menschen, Unternehmen und co. Auf einer gemeinsamen Plattform, in Zeiten der Corona-Krise, auflistet und zusammenführen soll.
                    Egal ob Nachbarschafts-Hilfen, Sonderangebote in der Gastronomie oder soziale Gruppen für die Freizeit - hier kann sich jeder miteinbringen.
                    Wir haben für jegliche Form von Teilnahme und Interesse passende email-Postfächer eingerichtet. (link)
                    Die aktuelle Situation bietet viele positive Chancen, um soziales Leben zu unterstützen, Gruppen zu Gründen und Menschen nachhaltig miteinander zu verbinden.
                    In der App findest du deshalb auch einen Bereich für Inspirationen gegen die Langeweile zu Hause und (Whatsapp-)Gruppen für den Austausch zu Interessensgebieten. 
                    Auch Communities, z.B. für gemeinsame Online-Games können hier Raum finden.
                    Du bist offen dafür aufgerufen Ideen, Aktivitäten und co, für einen positiven Alltag – von zu Hause aus - an uns zu richten.
                    Dein ULM@home-Team
                </p>
            </div>
            <ons-bottom-toolbar>
                <ons-button modifier="large--quiet" @click="${this._onWeiterClick}">Weiter</ons-button>
            </ons-bottom-toolbar>
        </ons-page>
        `;
    }

    _onWeiterClick() {
        document.querySelector('ons-navigator')
            .pushPage('kategorien-page.html');
    }
}
customElements.define(WillkommenPage.is, WillkommenPage);
