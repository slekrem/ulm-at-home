import { html } from "lit-element";
import {
    render_onsListItem_standard,
    render_onsListItem_expandable,
    render_onsListItem_url,
    render_onsListItem_vorschaubilderUndTitel
} from "./ons-components";

export const render_appPreviewListItem = ({
    item,

    thumbnailSrc,
    title,
    subtitle,

    onClick,
}) => {
    return html`
    <ons-list-item modifier="chevron" tappable @click="${() => { if (onClick) onClick(item); }}">
        <div class="left" >
            <img class="list-item__thumbnail" src="${thumbnailSrc}">
        </div>
            <div class="center">
                <span class="list-item__title">${title}</span>
                <span class="list-item__subtitle">${subtitle}</span>
            </div>
    </ons-list-item>
    `;
};

export const render_app_page_content = ({
    titelbildSrc,
    titel,
    beschreibung,
    informationen
}) => {
    return html`
    <img src="${titelbildSrc}" style="width:100%">
    <ons-card class="ul">
        <h1>${titel}</h1>
        <p>${beschreibung}</p>
    </ons-card>
    <ons-list-title>Informationen</ons-list-title>
    <ons-list>
        ${Object.keys(informationen)
            .map(key => {
                const item = informationen[key];
                console.log(item.vorlage, item);
                switch (item.vorlage) {
                    case 'Standard':
                        return html`
                        ${render_onsListItem_standard({
                            content: item.text
                        })}`;
                    case 'Erweiterbar':
                        return html`
                        ${render_onsListItem_expandable({
                            text: item.text,
                            expandableText: item.expandableText
                        })}`;
                    case 'Url':
                        return html`
                        ${render_onsListItem_url({
                            url: item.url,
                            title: item.titel,
                        })}`;
                    case 'Vorschaubilder und Titel':
                        return html`
                        ${render_onsListItem_vorschaubilderUndTitel({
                            thumbnailSrc: item.thumbnailSrc,
                            titel: item.titel,
                            untertitel: item.untertitel
                        })}`;
                    default:
                        return html``;
                }
            })}
    </ons-list>
    `;
};

export const render_appPreviewListItem_configurator = ({});