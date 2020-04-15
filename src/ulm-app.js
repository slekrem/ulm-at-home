import { connect } from "pwa-helpers";
import { store } from "./redux/store";
import { LitElement, html } from "lit-element";

import {
    renderKategorienPage,
    renderDetail1Page,
    renderListItemConfigurator
} from "./template";

import app from './redux/reducers/app';
import './pages/willkommen-page';
import './pages/version-0-2';

store.addReducers({ app });

export default class UlmApp extends connect(store)(LitElement) {
    static get is() { return 'ulm-app'; }
    static get properties() {
        return {
            _version: String
        };
    }

    constructor() {
        super();
        const urlParams = new URLSearchParams(location.search),
            version = urlParams.get('version');
        switch (version) {
            case '0.2':
                this._version = version;
                break;
            default:
                this._version = '0.2';
                break;
        }
    }

    createRenderRoot() { return this; }
    render() {
        customElements.upgrade = () => { };
        switch (this._version) {
            case '0.2':
                return html`<version-0-2></version-0-2>`;
            case '0.2':
            default:
                return html`<version-0-2></version-0-2>`;
        }

        return html`
        <ons-navigator>
            <ons-page>
                <willkommen-page></willkommen-page>
            </ons-page>
        </ons-navigator>

        ${renderKategorienPage()}
        ${renderDetail1Page()}
        ${renderListItemConfigurator()}
        `;
    }
}
customElements.define(UlmApp.is, UlmApp);
