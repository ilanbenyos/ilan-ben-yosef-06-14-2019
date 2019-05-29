const initialState = {
    articles: [],
    userName:'',
};
function rootReducer(state = initialState, action) {
    if (action.type === 'ADD_ARTICLE') {
        return Object.assign({}, state, {
            articles: state.articles.concat(action.payload)
        })
    }
    if (action.type === 'setUserName') {
        return {...state, userName:action.payload}
    }
    return state;
}
export default rootReducer;
