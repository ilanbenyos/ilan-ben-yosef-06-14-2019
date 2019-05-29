import { ADD_ARTICLE } from "../constatns/actions-types";

export function addArticle(payload) {
    return { type: ADD_ARTICLE, payload };
}
