import {
    SET_FREIZEIT_ITEM,
    SET_KATEGORIE,
    SET_LIEFERDIENSTE_ITEM,
    SET_KULTUR_ITEM,
    SET_FREIZEIT_ITEMS,
    SET_LIEFERDIENSTE_ITEMS,
    SET_KULTUR_ITEMS,
    
    SET_INFO_ITEMS,
    SET_INFO_ITEM,
} from "../actions/app";

const INITIAL_STATE = {
    kategorie: '',

    freizeitItems: {},
    freizeitItem: {},

    lieferdiensteItems: {},
    lieferdiensteItem: {},

    kulturItems: {},
    kulturItem: {},

    infoItems: {},
    infoItem: {},
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
        case SET_LIEFERDIENSTE_ITEMS:
            state = {
                ...state,
                lieferdiensteItems: action.payload
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
        case SET_KULTUR_ITEMS:
            state = {
                ...state,
                kulturItems: action.payload
            };
            break;
        case SET_KULTUR_ITEM:
            state = {
                ...state,
                kulturItem: action.payload
            };
            break;
        case SET_INFO_ITEMS:
            state = {
                ...state,
                infoItems: action.payload
            };
            break;
        case SET_INFO_ITEM:
            state = {
                ...state,
                infoItem: action.payload
            };
            break;
        default:
            break;
    }
    return state;
};

export default app;