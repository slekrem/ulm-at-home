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
import { addFreizeitItem } from "../redux/actions/app";

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
        const onBildAuswaelenClick = () => {
            const input = document.createElement('input'),
                reader = new FileReader();
            input.setAttribute('type', 'file');
            input.setAttribute('accept', 'image/*');
            input.onchange = (e) => {
                const file = e.srcElement.files[0];
                if (!file) return;
                reader.onload = (e) => {
                    this._titleImage = e.target.result;
                    this._titelbild_fileName = file.name;
                };
                reader.readAsDataURL(file);
            }
            input.click();
        }
        return html`
        <ons-list-title>Stammdaten</ons-list-title>
        <ons-list>
            <ons-list-item>
                <div class="center">Titelbild</div>
                <div class="right">
                    <ons-button
                        modifier="large--quiet"
                        @click="${onBildAuswaelenClick}">Bild auswählen</ons-button>
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

    _onFertigClick() {
        const data = {
            onsListItemData: this._onsListItemData,
            pageData: {
                titelbildSrc: this._titleImage,
                titel: this._subtitle,
                beschreibung: this._beschreibung,
                informationen: this._items
            }
        };

        this._upload_titelbild({
            titelbild_dataUrl: data.pageData.titelbildSrc,
            titelbild_fileName: this._titelbild_fileName,
            onDownloadURL: (titelbildDwnloadUrl) => {
                this._upload_thumbnail({
                    //thumbnail_dataUrl: data.onsListItemData.
                });
            }
        });
        return;


        // Create a reference to 'mountains.jpg'
        var mountainsRef = storageRef.child('mountains.jpg');

        // Create a reference to 'images/mountains.jpg'
        var mountainImagesRef = storageRef.child('images/mountains.jpg');

        // While the file names are the same, the references point to different files
        mountainsRef.name === mountainImagesRef.name            // true
        mountainsRef.fullPath === mountainImagesRef.fullPath













        switch (data.onsListItemData.kategorie) {
            case 'freizeit':
                store.dispatch(addFreizeitItem(data));
                break;
            default:
                console.error('');
        }

        document.querySelector('ons-navigator')
            .resetToPage('kategorien-page.html');


        return;

        var dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(data));
        var downloadAnchorNode = document.createElement('a');
        downloadAnchorNode.setAttribute("href", dataStr);
        downloadAnchorNode.setAttribute("download", data.onsListItemData.titel + ".json");
        document.body.appendChild(downloadAnchorNode); // required for firefox
        downloadAnchorNode.click();
        downloadAnchorNode.remove();
    }

    _onOnsListItemClick(item) {
        const listItemConfigurator = this.querySelector('list-item-configurator'),
            onsModal = this.querySelector('ons-modal');
        listItemConfigurator.setItem(item, true);
        onsModal.show();
    }

    _upload_titelbild({
        titelbild_fileName,
        titelbild_dataUrl,
        onDownloadURL
    }) {
        const storageRef = firebase.storage().ref(),
            ref = storageRef.child('titelbilder/' + titelbild_fileName),
            uploadTask = ref.putString(titelbild_dataUrl, 'data_url');
        uploadTask.on(firebase.storage.TaskEvent.STATE_CHANGED,
            (snapshot) => {
                const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                console.log('Upload is ' + progress + '% done');
                switch (snapshot.state) {
                    case firebase.storage.TaskState.PAUSED:
                        console.log('Upload is paused');
                        break;
                    case firebase.storage.TaskState.RUNNING:
                        console.log('Upload is running');
                        break;
                    default:
                        break;
                }
            }, (error) => {
                console.error(error);
                switch (error.code) {
                    case 'storage/unauthorized':
                        break;
                    case 'storage/canceled':
                        break;
                    case 'storage/unknown':
                        break;
                }
            }, () => uploadTask.snapshot.ref.getDownloadURL()
                .then((downloadURL) => onDownloadURL(downloadURL))
        );
    }

    _upload_thumbnail({
        thumbnail_fileName,
        thumbnail_dataUrl,
        onDownloadURL
    }) {
        const storageRef = firebase.storage().ref(),
            ref = storageRef.child('thumbnails/' + thumbnail_fileName),
            uploadTask = ref.putString(thumbnail_dataUrl, 'data_url');
        uploadTask.on(firebase.storage.TaskEvent.STATE_CHANGED,
            (snapshot) => {
                const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                console.log('Upload is ' + progress + '% done');
                switch (snapshot.state) {
                    case firebase.storage.TaskState.PAUSED:
                        console.log('Upload is paused');
                        break;
                    case firebase.storage.TaskState.RUNNING:
                        console.log('Upload is running');
                        break;
                    default:
                        break;
                }
            }, (error) => {
                console.error(error);
                switch (error.code) {
                    case 'storage/unauthorized':
                        break;
                    case 'storage/canceled':
                        break;
                    case 'storage/unknown':
                        break;
                }
            }, () => uploadTask.snapshot.ref.getDownloadURL()
                .then((downloadURL) => onDownloadURL(downloadURL))
        );
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
            (snapshot) => {
                const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                if (onProgress) onProgress(progress);
            }, (error) => {
                if (onError) onError(error);
            }, () => uploadTask.snapshot.ref.getDownloadURL()
                .then((downloadURL) => { if (onDownloadURL) onDownloadURL(downloadURL); })
        );
    }

    _uuidv4() {
        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
            var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
            return v.toString(16);
        });
    }
}
customElements.define(AddItem_1_Page.is, AddItem_1_Page);