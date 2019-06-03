const initialState = {
    articles: [],
    userName:'',
    board:null,
    score:0,
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
    if (action.type === 'addScore') {
      return {...state,score:state.score + action.scoreToAdd}
    }
  if (action.type === 'setBoard') {
    return {...state, board:action.newBoard}
  }
    return state;
}
export default rootReducer;
