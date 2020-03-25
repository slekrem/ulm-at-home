import { connect } from "pwa-helpers";
import { store } from "../redux/store";
import { LitElement, html } from "lit-element";

export default class LieferdienstePage extends connect(store)(LitElement) {
    static get is() { return 'lieferdienste-page'; }
    static get properties() { return {} }

    constructor() {
        super();
    }

    createRenderRoot() { return this; }
    render() {
        return html`
        <ons-page>
            <div class="content">
                <h1>Hunger@home</h1>
                <p>
                    Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. 
                    At vero eos et accusam et justo duo dolores et ea rebum. 
                    Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. 
                    Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. 
                    At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.
                </p>
                <ons-list-title>Titel</ons-list-title>
                <ons-list>
                    <ons-list-item modifier="chevron" tappable @click="${this._onOnsListItemClick}">
                        <div class="left">
                            <img class="list-item__thumbnail" src="https://via.placeholder.com/40x40">
                        </div>
                        <div class="center">
                            <span class="list-item__title">Pinocchio</span>
                            <span class="list-item__subtitle">Pizzawerkstatt</span>
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
customElements.define(LieferdienstePage.is, LieferdienstePage);
