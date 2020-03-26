import { SET_FREIZEIT_ITEM } from "../actions/app";

const INITIAL_STATE = {
    lieferdiensteOnsListData: [
        {
            thumbnail: 'https://via.placeholder.com/40x40',
            title: 'Pinocchio Pizzawerkstatt',
            subtitle: ''
        },
        {
            thumbnail: 'https://via.placeholder.com/40x40',
            title: 'ulm-isst.de/',
            subtitle: ''
        },
        {
            thumbnail: 'https://via.placeholder.com/40x40',
            title: 'Hungry Turtle',
            subtitle: ''
        },
        {
            thumbnail: 'https://via.placeholder.com/40x40',
            title: 'Triple Lieferservice',
            subtitle: ''
        },
        {
            thumbnail: 'https://via.placeholder.com/40x40',
            title: 'Eismann',
            subtitle: ''
        },
        {
            thumbnail: 'https://via.placeholder.com/40x40',
            title: 'Vorglühbar Ulm',
            subtitle: ''
        },
        {
            thumbnail: 'https://via.placeholder.com/40x40',
            title: 'Mudita Bar',
            subtitle: ''
        },
        {
            thumbnail: 'https://via.placeholder.com/40x40',
            title: 'Buddha Kitchen',
            subtitle: ''
        },
        {
            thumbnail: 'https://via.placeholder.com/40x40',
            title: 'Ahi´s Pizza',
            subtitle: ''
        },
        {
            thumbnail: 'https://via.placeholder.com/40x40',
            title: 'Hemperium',
            subtitle: ''
        },
        {
            thumbnail: 'https://via.placeholder.com/40x40',
            title: 'Burger Brothers Ulm',
            subtitle: ''
        },
    ],
    freizeitOnsListData: [
        {
            thumbnail: 'https://cdn.glitch.com/fd96e08d-f7c4-4288-9bf3-2753e6b1b12e%2Ficon-48x48.png?v=1585075636352',
            title: 'ULM@home',
            subtitle: 'Wir bauen ULM@home',
            titleImage: 'https://cdn.glitch.com/fd96e08d-f7c4-4288-9bf3-2753e6b1b12e%2Flogo-400x800.png?v=1585232517198',

            beschreibung: 'Hallo Ulm, wir bauen ULM@home',
            informationen: [
                {}
            ]
        }
    ],

    freizeitItem: {}
};

const app = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case SET_FREIZEIT_ITEM:
            return {
                ...state,
                freizeitItem: action.payload
            };
        default:
            return state;
    }
};

export default app;