const initialState = {
  favorites: [],
  articles: [],
  userName:'',
  board:null,
  score:0,
};
function rootReducer(state = initialState, action) {
  if (action.type === 'INIT_FAVORITES') {
    return {...state, favorites: action.payload}
  }
  if (action.type === 'SAVE_FAVORITES') {
    localStorage.setItem('favorites', JSON.stringify(action.payload));
    return {...state, favorites: action.payload}
  }
    return state;
}
export default rootReducer;
