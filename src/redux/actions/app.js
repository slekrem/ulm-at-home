export const SET_FREIZEIT_ITEM = 'SET_FREIZEIT_ITEM';
export const setFreizeitItem = (payload) => (dispatch) => dispatch({
    type: SET_FREIZEIT_ITEM,
    payload: payload
});