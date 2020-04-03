import { html } from 'lit-element';

export const render_onsListItem_standard = ({ content }) => html`
<ons-list-item>${content}</ons-list-item>
`;

export const render_onsListItem_standard_konfig = ({
    text,
    textChange
}) => html`
<ons-list-title>Konfig</ons-list-title>
<ons-list>
    <ons-list-item>
        <div class="center">Text</div>
        <div class="right">
            <ons-input placeholder="Text", 
                value="${text}",
                @change="${e => textChange(e.srcElement.value)}"></ons-input>
        </div>
    </ons-list-item>
</ons-list>
`;

export const render_onsListItem_url = ({ url, title }) => html`
<a href="${url}" target="_blank">
    <ons-list-item modifier="chevron" tappable>
        <div class="center">
            <span class="list-item__title">${title}</span>
            <span class="list-item__subtitle">${url}</span>
        </div>
    </ons-list-item>
</a>
`;

export const render_onsListItem_url_konfig = ({
    titel,
    titelChange,
    url,
    urlChange
}) => html`
<ons-list-title>Konfig</ons-list-title>
<ons-list>
    <ons-list-item>
        <div class="center">Titel</div>
        <div class="right">
            <ons-input placeholder="Titel" 
                value="${titel}" 
                @change="${e => titelChange(e.srcElement.value)}"></ons-input>
        </div>
    </ons-list-item>
    <ons-list-item>
        <div class="center">Url</div>
        <div class="right">
            <ons-input placeholder="Url" 
                value="${url}"
                @change="${e => urlChange(e.srcElement.value)}"></ons-input>
        </div>
    </ons-list-item>
</ons-list>
`;

export const render_onsListItem_expandable = ({ text, expandableText }) => html`
<ons-list-item expandable>
    ${text}
    <div class="expandable-content">${expandableText}</div>
</ons-list-item>
`;

export const render_onsListItem_expandable_konfig = ({
    text,
    textChange,
    expandableText,
    expandableTextChange
}) => html`
<ons-list-title>Konfig</ons-list-title>
<ons-list>
    <ons-list-item>
        <div class="center">Text</div>
        <div class="right">
            <ons-input placeholder="Text"
                value="${text}"
                @change="${e => textChange(e.srcElement.value)}"></ons-input>
        </div>
    </ons-list-item>
    <ons-list-item>
        <div class="center">Erweiterbarer Text</div>
        <div class="right">
            <ons-input placeholder="Erweiterbarer Text"
                value="${expandableText}"
                @change="${e => expandableTextChange(e.srcElement.value)}"></ons-input>
        </div>
    </ons-list-item>
</ons-list>
`;

export const render_onsListItem_vorschaubilderUndTitel = ({
    thumbnailSrc,
    titel,
    untertitel
}) => html`
<ons-list-item>
    <div class="left">
        <img class="list-item__thumbnail" src="${thumbnailSrc}">
    </div>
    <div class="center">
        <span class="list-item__title">${titel}</span>
        <span class="list-item__subtitle">${untertitel}</span>
    </div>
</ons-list-item>
`;

export const render_onsListItem_vorschaubilderUndTitel_konfig = ({
    thumbnailChange,
    titel,
    titelChange,
    untertitel,
    untertitelChange,
}) => {
    const onOnsButtonClick = () => {
        const input = document.createElement('input'),
            reader = new FileReader();
        input.setAttribute('hidden', true);
        input.setAttribute('type', 'file');
        input.setAttribute('accept', 'image/*');
        input.onchange = (e) => {
            const file = e.srcElement.files[0];
            if (!file) return;
            reader.onload = (e) => thumbnailChange(e.target.result);
            reader.readAsDataURL(file);
        }
        input.click();
    };
    return html`
    <ons-list-title>Konfig</ons-list-title>
    <ons-list>
        <ons-list-item>
            <div class="center">Thumbnail</div>
            <div class="right">
                <ons-button modifier="large--quiet" 
                    @click="${() => onOnsButtonClick()}">Bild auswählen</ons-button>
            </div>
        </ons-list-item>
        <ons-list-item>
            <div class="center">Titel</div>
            <div class="right">
                <ons-input placeholder="Titel"
                    value="${titel}"
                    @change="${e => titelChange(e.srcElement.value)}"></ons-input>
            </div>
        </ons-list-item>
        <ons-list-item>
            <div class="center">Untertitel</div>
            <div class="right">
                <ons-input placeholder="Untertitel"
                    value="${untertitel}"
                    @change="${e => untertitelChange(e.srcElement.value)}"></ons-input>
            </div>
        </ons-list-item>
    </ons-list>
    `;
}