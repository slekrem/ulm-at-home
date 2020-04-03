import {
    SET_FREIZEIT_ITEM,
    SET_KATEGORIE,
    SET_LIEFERDIENSTE_ITEM,
    SET_KULTUR_ITEM,
    ADD_FREIZEIT_ITEM,
    SET_FREIZEIT_ITEMS
} from "../actions/app";

let ulmAppState = undefined;
if (localStorage) {
    const item = localStorage.getItem('ulm-app-state');
    if (item)
        ulmAppState = JSON.parse(item);
}

const INITIAL_STATE = ulmAppState || {
    kategorie: '',
    freizeitItems: {},

    freizeitOnsListData: [],
    lieferdiensteOnsListData: [],
    kulturOnsListData: [],
    infosOnsListData: [],

    freizeitItem: {},
    lieferdiensteItem: {},
    kulturItem: {},
    infosItem: {}
};

const app = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case SET_KATEGORIE:
            state = {
                ...state,
                kategorie: action.payload
            };
            break;
        case SET_FREIZEIT_ITEMS:
            state = {
                ...state,
                freizeitItems: action.payload
            };
            break;
        case SET_FREIZEIT_ITEM:
            state = {
                ...state,
                freizeitItem: action.payload
            };
            break;
        case SET_LIEFERDIENSTE_ITEM:
            state = {
                ...state,
                lieferdiensteItem: action.payload
            };
            break;
        case SET_KULTUR_ITEM:
            state = {
                ...state,
                kulturItem: action.payload
            };
            break;
        case ADD_FREIZEIT_ITEM:
            state = {
                ...state,
                freizeitOnsListData: [
                    ...state.freizeitOnsListData,
                    action.payload
                ]
            };
            break;
        default:
            break;
    }

    if (localStorage) {
        localStorage.setItem('ulm-app-state', JSON.stringify(state))
    }

    return state;
};

export default app;