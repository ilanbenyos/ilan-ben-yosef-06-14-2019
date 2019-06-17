
export const initFavorites = ({ dispatch }) => next => action => {
  if(action.type === 'initFavorites') {
    let favorites = localStorage.getItem('favorites')
    favorites = favorites ? JSON.parse(favorites) : [];
    return dispatch({type: "setFavorites", payload: favorites});
  }
  next(action);
}

export function saveFavorite({ dispatch }) {
    return function(next) {
        return function(action) {
            if (action.type === 'addFavorite') {
              let favorites = localStorage.getItem('favorites')
              favorites = favorites ? JSON.parse(favorites) : [];
              if (!favorites.find(i => i.id === action.payload.id)) {
                let set = new Set(favorites);
                set.add(action.payload);
                favorites = [...set];
                localStorage.setItem('favorites', JSON.stringify(favorites));
                return dispatch({type: "SAVE_FAVORITES", payload: favorites});
              }
            }
            return next(action);
        };
    };
}
