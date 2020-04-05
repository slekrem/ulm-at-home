import { connect } from "pwa-helpers";
import { store } from "../redux/store";
import { LitElement, html } from "lit-element";

import './list-item-configurator';
import {
    render_onsListItem_standard,
    render_onsListItem_expandable,
    render_onsListItem_url,
    render_onsListItem_vorschaubilderUndTitel
} from "../ons-components/ons-components";

import '../components/file-input';
import { uploadDataUrlAsync, createFreizeitItem, createLieferdiensteItem, createKulturItem, createInfoItem } from "../services/firebaseService";

export default class AddItem_1_Page extends connect(store)(LitElement) {
    static get is() { return 'add-item-1-page'; }
    static get properties() {
        return {
            _onsListItemData: Object,

            _titelbild_fileName: String,

            _titel: String,
            _titleImage: String,
            _subtitle: String,
            _beschreibung: String,

            _items: Object,
        }
    }

    constructor() {
        super();
        this._onsListItemData = {};

        this._titelbild_fileName = '';
        this._titel = '';
        this._titleImage = 'https://via.placeholder.com/800x600';
        this._subtitle = '';
        this._beschreibung = '';
        this._items = {};
    }

    _render_onsToolbar() {
        return html`
        <ons-toolbar>
            <div class="left">
                <ons-back-button>Zurück</ons-back-button>
            </div>
            <div class="center">${this._titel}</div>
            <div class="right">
                <ons-toolbar-button @click="${this._onFertigClick}">Fertig</ons-toolbar-button>
            </div>
        </ons-toolbar>
        `;
    }

    _render_onsCard() {
        return html`
        <ons-card>
            <h1>Lorem ipsum</h1>
            <p>
                Lorem ipsum dolor sit amet, consetetur sadipscing elitr, 
                sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam
            </p>
        </ons-card>
        `;
    }

    _render_onsList_stammdaten() {
        return html`
        <ons-list-title>Stammdaten</ons-list-title>
        <ons-list>
            <ons-list-item>
                <div class="center">Titelbild</div>
                <div class="right">
                    <file-input @change="${this._onTitelbildFileInputChange}"></file-input>
                    <ons-button
                        modifier="large--quiet"
                        @click="${this._onTitelbildAuswaelenClick}">Bild auswählen</ons-button>
                </div>
            </ons-list-item>
            <ons-list-item>
                <div class="center">Titel</div>
                <div class="right">
                    <ons-input placeholder="Titel" style="width: 167px;"
                        @value="${this._titel}"
                        @change="${e => this._subtitle = e.srcElement.value}"></ons-input>
                </div>
            </ons-list-item>
            <ons-list-item>
                <div class="center">Beschreibung</div>
                <div class="right">
                    <ons-input placeholder="Beschreibung" style="width: 167px;"
                        @value="${this._beschreibung}"
                        @change="${e => this._beschreibung = e.srcElement.value}"></ons-input>
                </div>
            </ons-list-item>
        </ons-list>
        `;
    }

    _render_onsList_informationen_onsListitem(item) {
        switch (item.vorlage) {
            case 'Standard':
                return html`
                    <ons-list-item modifier="chevron" tappable
                        @click="${() => this._onInformationsEintragClick(item)}">
                        ${item.text}
                    </ons-list-item>
                `;
            case 'Erweiterbar':
                return html`
                <ons-list-item modifier="chevron" tappable
                    @click="${() => this._onInformationsEintragClick(item)}">
                    ${item.text}
                </ons-list-item>
                `;
            case 'Url':
                return html`
                <ons-list-item modifier="chevron" tappable
                    @click="${() => this._onInformationsEintragClick(item)}">
                    ${item.title}
                </ons-list-item>
                `;
            case 'Vorschaubilder und Titel':
                return html`
                <ons-list-item modifier="chevron" tappable
                    @click="${() => this._onInformationsEintragClick(item)}">
                    ${item.titel}
                </ons-list-item>
                `;
            default:
                return html``;
        }
    }

    _render_onsList_informationen() {
        return html`
        <ons-list-title>Informationen</ons-list-title>
        <ons-list>
            ${Object.keys(this._items).map(key => this._render_onsList_informationen_onsListitem(this._items[key]))}
            ${this._renderNeuerInformationsEintrag()}
        </ons-list>
        `;
    }

    _render_vorschau_onsListItem(item) {
        switch (item.vorlage) {
            case 'Standard':
                return render_onsListItem_standard({
                    content: item.text
                });
            case 'Erweiterbar':
                return render_onsListItem_expandable(item);
            case 'Url':
                return render_onsListItem_url(item);
            case 'Vorschaubilder und Titel':
                return render_onsListItem_vorschaubilderUndTitel(item);
            default:
                return html``;
        }
    }

    _render_vorschau() {
        return html`
        <ons-list-title>&nbsp;</ons-list-title>
        <ons-list-title>Vorschau</ons-list-title>
        <img src="${this._titleImage}" style="width:100%">
        <ons-card class="ul">
            <h1>${this._subtitle}</h1>
            <p>${this._beschreibung}</p>
        </ons-card>
        <ons-list-title>Informationen</ons-list-title>
        <ons-list>
            ${Object.keys(this._items).map(key => this._render_vorschau_onsListItem(this._items[key]))}
        </ons-list>
        `;
    }

    _renderInformationenOnsListItem(item) {
        return html`
            <ons-list-item @click="${() => this._onOnsListItemClick(item)}">
                <div class="left">${item.left}</div>
                <div class="center">
                    <span class="list-item__title">${item.title}</span>
                    <span class="list-item__subtitle">${item.subtitle}</span>
                </div>
                <div class="right">${item.right}</div>
            </ons-list-item>
            `;
    }

    _renderNeuerInformationsEintrag() {
        return html`
            <ons-list-item modifier="chevron" tappable
                @click="${this._onNeuerInformationsEintragClick}">Neuer Informations Eintrag</ons-list-item>
        `;
    }

    createRenderRoot() { return this; }
    render() {
        return html`
        <ons-page>
            ${this._render_onsToolbar()}
            <div class="content">
                ${this._render_onsCard()}
                ${this._render_onsList_stammdaten()}
                ${this._render_onsList_informationen()}
                ${this._render_vorschau()}                
            </div>
        </ons-page>
        `;
    }

    setOnsListItemData(data) {
        this._onsListItemData = data;
    }

    _onTitelbildFileInputChange(event) {
        this._titelbild_fileName = event.detail.fileName;
        this._titleImage = event.detail.fileDataUrl;
    }

    _onTitelbildAuswaelenClick(event) {
        this.querySelector('file-input').openFileDialog();
    }

    _onInformationsEintragClick(item) {
        document.querySelector('ons-navigator')
            .pushPage('list-item-configurator.html')
            .then(x => {
                const listItemConfigurator = x.querySelector('list-item-configurator');
                listItemConfigurator.addEventListener('fertigClick', (e) => {
                    const item = e.detail.item;
                    this._items[item.key] = item;
                    document.querySelector('ons-navigator').popPage();
                    this.requestUpdate();
                });
                listItemConfigurator.setItem(item, true);
            });
    }

    _onNeuerInformationsEintragClick() {
        document.querySelector('ons-navigator')
            .pushPage('list-item-configurator.html')
            .then(x => {
                const listItemConfigurator = x.querySelector('list-item-configurator');
                listItemConfigurator.addEventListener('fertigClick', (e) => {
                    const item = e.detail.item;
                    this._items[item.key] = item;
                    document.querySelector('ons-navigator').popPage();
                    this.requestUpdate();
                });

                listItemConfigurator.setItem({
                    key: this._uuidv4(),
                    left: '',
                    title: '',
                    subtitle: '',
                    right: ''
                }, false);

            });
    }

    async _onFertigClick() {
        // TODO VALIDATION
        const items = Object.keys(this._items)
            .map(key => this._items[key])
            .filter(y => y.vorlage === 'Vorschaubilder und Titel');
        for (let index = 0; index < items.length; ++index) {
            const item = items[index];
            await uploadDataUrlAsync({
                child: 'testImages',
                fileName: 'test.jpg',
                dataUrl: item.thumbnailSrc,
            }).then(downloadUrl => this._items[item.key].thumbnailSrc = downloadUrl);
        }

        await uploadDataUrlAsync({
            child: 'titelbilder',
            dataUrl: this._titleImage,
            fileName: this._titelbild_fileName
        }).then(downloadUrl => this._titleImage = downloadUrl);

        await uploadDataUrlAsync({
            child: 'thumbnails',
            dataUrl: this._onsListItemData.thumbnailSrc,
            fileName: this._onsListItemData.thumbnail_fileName
        }).then(downloadUrl => this._onsListItemData.thumbnailSrc = downloadUrl);

        const dataItem = {
            listItemData: {
                thumbnailSrc: this._onsListItemData.thumbnailSrc,
                titel: this._onsListItemData.titel,
                untertitel: this._onsListItemData.untertitel
            },
            pageData: {
                titelbildSrc: this._titleImage,
                titel: this._subtitle,
                beschreibung: this._beschreibung,
                informationen: this._items
            }
        };
        switch (this._onsListItemData.kategorie) {
            case 'freizeit':
                await createFreizeitItem(dataItem)
                    .then(() => {
                        document.querySelector('ons-navigator')
                            .resetToPage('kategorien-page.html');
                    });
                break;
            case 'lieferdienste':
                await createLieferdiensteItem(dataItem)
                    .then(() => {
                        document.querySelector('ons-navigator')
                            .resetToPage('kategorien-page.html');
                    });
                break;
            case 'kultur':
                await createKulturItem(dataItem)
                    .then(() => {
                        document.querySelector('ons-navigator')
                            .resetToPage('kategorien-page.html');
                    });
                break;
            case 'infos':
                await createInfoItem(dataItem)
                    .then(() => {
                        document.querySelector('ons-navigator')
                            .resetToPage('kategorien-page.html');
                    });
                break;
            default:
                break;
        }
    }

    _onOnsListItemClick(item) {
        const listItemConfigurator = this.querySelector('list-item-configurator'),
            onsModal = this.querySelector('ons-modal');
        listItemConfigurator.setItem(item, true);
        onsModal.show();
    }

    _upload_file({
        child,
        fileName,
        dataUrl,
        onProgress,
        onError,
        onDownloadURL
    }) {
        const uuidv4 = () => {
            return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'
                .replace(/[xy]/g, (c) => {
                    var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
                    return v.toString(16);
                });
        },
            storageRef = firebase.storage().ref(),
            ref = storageRef.child(`${child}${uuidv4()}-${fileName}`),
            uploadTask = ref.putString(dataUrl, 'data_url');
        uploadTask.on(firebase.storage.TaskEvent.STATE_CHANGED,
            (snapshot) => { if (onProgress) onProgress((snapshot.bytesTransferred / snapshot.totalBytes) * 100); },
            (error) => { if (onError) onError(error); },
            () => uploadTask.snapshot.ref.getDownloadURL().then((downloadURL) => { if (onDownloadURL) onDownloadURL(downloadURL); })
        );
    }

    _upload_file_async({
        child,
        fileName,
        dataUrl,
    }) {
        const uuidv4 = () => {
            return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'
                .replace(/[xy]/g, (c) => {
                    var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
                    return v.toString(16);
                });
        },
            storageRef = firebase.storage().ref(),
            ref = storageRef.child(`${child}${uuidv4()}-${fileName}`),
            uploadTask = ref.putString(dataUrl, 'data_url');

        return new Promise((resolve, reject) => {
            uploadTask.on(firebase.storage.TaskEvent.STATE_CHANGED,
                (snapshot) => { },
                (error) => reject(error),
                () => uploadTask.snapshot.ref.getDownloadURL().then((downloadURL) => resolve(downloadURL))
            );
        });


    }

    _uuidv4() {
        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
            var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
            return v.toString(16);
        });
    }

    async _uploadOnsListItemThumbnails() {
        const items = Object.keys(this._items)
            .map(key => this._items[key])
            .filter(y => y.vorlage === 'Vorschaubilder und Titel');

        for (let i = 0; i < items.length; ++i) {
            const item = items[i];
            await this._upload_file_async({
                child: 'testImages/',
                fileName: 'test.jpg',
                dataUrl: item.thumbnailSrc,
            }).then(downloadURL => {
                this._items[item.key].thumbnailSrc = downloadURL
            })
                .catch(error => console.error(error));
        }
    }
}
customElements.define(AddItem_1_Page.is, AddItem_1_Page);