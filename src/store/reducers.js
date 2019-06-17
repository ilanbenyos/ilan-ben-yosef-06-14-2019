const initialState = {
  favorites: [],
  articles: [],
  userName:'',
  board:null,
  score:0,
};
function rootReducer(state = initialState, action) {
  if (action.type === 'setFavorites') {
    console.log('5555555555555');
    return {...state, favorites: action.payload}
  }
  if (action.type === 'SET_FAVORITES') {
    console.log('111111111111');
    return {...state, favorites: action.payload}
  }
  if (action.type === 'SAVE_FAVORITES') {
    console.log('222222222222');
    return {...state, favorites: action.payload}
  }
    return state;
}
export default rootReducer;
