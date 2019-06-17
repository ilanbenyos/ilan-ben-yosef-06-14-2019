
export function initFavorites(payload) {
    return { type: 'initFavorites', payload };
}

export function removeFromFavorites(payload) {
    return { type: 'removeFromFavorites', payload };
}
export function addToFavorites(payload) {
    return { type: 'addToFavorites', payload };
}

