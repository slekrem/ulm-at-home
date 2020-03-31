export const SET_FREIZEIT_ITEM = 'SET_FREIZEIT_ITEM';
export const setFreizeitItem = (payload) => (dispatch) => dispatch({
    type: SET_FREIZEIT_ITEM,
    payload: payload
});

export const SET_KATEGORIE = 'SET_KATEGORIE';
export const setKategorie = (payload) => (dispatch) => dispatch({
    type: SET_KATEGORIE,
    payload: payload
});

export const SET_LIEFERDIENSTE_ITEM = 'SET_LIEFERDIENSTE_ITEM';
export const setLieferdiensteItem = (payload) => (dispatch) => dispatch({
    type: SET_LIEFERDIENSTE_ITEM,
    payload: payload
});

export const SET_KULTUR_ITEM = 'SET_KULTUR_ITEM';
export const setKulturItem = (payload) => (dispatch) => dispatch({
    type: SET_KULTUR_ITEM,
    payload: payload
});

export const ADD_FREIZEIT_ITEM = 'ADD_FREIZEIT_ITEM';
export const addFreizeitItem = (payload) => (dispatch) => dispatch({
    type: ADD_FREIZEIT_ITEM,
    payload: payload
});
