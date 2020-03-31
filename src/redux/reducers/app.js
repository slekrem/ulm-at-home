import {
    SET_FREIZEIT_ITEM,
    SET_KATEGORIE,
    SET_LIEFERDIENSTE_ITEM,
    SET_KULTUR_ITEM,
    ADD_FREIZEIT_ITEM
} from "../actions/app";

const INITIAL_STATE = {

    freizeitOnsListData: [],
    lieferdiensteOnsListData: [],
    kulturOnsListData: [],
    infosOnsListData: [],

    kategorie: '',
    
    freizeitItem: {},
    lieferdiensteItem: {},
    kulturItem: {},
    infosItem: {}
};

const app = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case SET_KATEGORIE:
            return {
                ...state,
                kategorie: action.payload
            };
        case SET_FREIZEIT_ITEM:
            return {
                ...state,
                freizeitItem: action.payload
            };
        case SET_LIEFERDIENSTE_ITEM:
            return {
                ...state,
                lieferdiensteItem: action.payload
            };
        case SET_KULTUR_ITEM:
            return {
                ...state,
                kulturItem: action.payload
            };
        case ADD_FREIZEIT_ITEM:
            return {
                ...state,
                freizeitOnsListData: [
                    ...state.freizeitOnsListData,
                    action.payload
                ]
            };
        default:
            return state;
    }
};

export default app;