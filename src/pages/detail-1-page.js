
import { connect } from "pwa-helpers";
import { store } from "../redux/store";
import { LitElement, html } from "lit-element";

export default class Detail1Page extends connect(store)(LitElement) {
    static get is() { return 'detail-1-page'; }
    static get properties() { return {} }

    constructor() {
        super();
    }

    createRenderRoot() { return this; }
    render() {
        return html`
        <ons-page>
            <ons-toolbar>
                <div class="left">
                    <ons-back-button>Zurück</ons-back-button>
                </div>
                <div class="center">TITEL</div>
            </ons-toolbar>
            <div class="content">
                <img src="https://via.placeholder.com/800x600" style="width:100%">
                <h1>Titel</h1>
                <p>
                    Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. 
                    At vero eos et accusam et justo duo dolores et ea rebum. 
                    Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. 
                    Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. 
                    At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.
                </p>
                <ons-list-title>subtitel</ons-list-title>
                <ons-list>
                    <ons-list-item>simple content</ons-list-item>
                    <ons-list-item>
                        <div class="left">left content</div>
                    </ons-list-item>
                    <ons-list-item>
                        <div class="left">left content</div>
                        <div class="center">center content</div>
                    </ons-list-item>
                    <ons-list-item>
                        <div class="left">left content</div>
                        <div class="center">center content</div>
                        <div class="right">right content</div>
                    </ons-list-item>
                    <ons-list-item>
                        <div class="left">left content</div>
                        <div class="center">
                            <span class="list-item__title">title</span>
                            <span class="list-item__subtitle">subtitle</span>
                        </div>
                        <div class="right">right content</div>
                    </ons-list-item>
                </ons-list>
            </div>
        </ons-page>
        `;
    }
}
customElements.define(Detail1Page.is, Detail1Page);