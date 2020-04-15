import{connect}from"../../node_modules/pwa-helpers/pwa-helpers.js";import{store}from"../redux/store.js";import{LitElement,html}from"../../node_modules/lit-element/lit-element.js";export default class Version_0_1 extends connect(store)(LitElement){static get is(){return"version-0-1"}static get properties(){return{}}constructor(){super()}createRenderRoot(){return this}render(){return html`
        <ons-page>
        
        </ons-page>
        `}}customElements.define(Version_0_1.is,Version_0_1);