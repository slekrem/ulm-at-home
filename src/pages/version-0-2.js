
import { connect } from "pwa-helpers";
import { store } from "../redux/store";
import { LitElement, html } from "lit-element";
import { render_app_page_content } from "../ons-components/app-components";

export default class version_0_2 extends connect(store)(LitElement) {
    static get is() { return 'version-0-2'; }
    static get properties() {
        return {
            _contentItem: Object
        };
    }

    constructor() {
        super();
        this._contentItem = {
            titel: 'ULM@home',
            titelbildSrc: '/assets/ulm-at-home.png',
            beschreibung: 'wir bauen ULM@home',
            informationen: {
                0: {
                    vorlage: 'Url',
                    url: 'https://www.instagram.com/ulm_at_home/',
                    titel: 'Instagram'
                },
                1: {
                    vorlage: 'Url',
                    url: 'https://www.facebook.com/ulmapp',
                    titel: 'facebook'
                },
                2: {
                    vorlage: 'Url',
                    url: 'https://twitter.com/ULMhome1',
                    titel: 'twitter'
                }
            }
        };
    }

    createRenderRoot() { return this; }
    render() {
        return html`
        <ons-page>
            <div class="content">
                ${render_app_page_content(this._contentItem)}
            </div>
        </ons-page>
        `;
    }
}
customElements.define(version_0_2.is, version_0_2);
