import 'whatwg-fetch';
import { urlChange } from '../tools';

export const IS_LOADING = 'IS_LOADING';
export const GET_BOOK_LIST = 'GET_BOOK_LIST';
export const AUTO_COMPLETE = 'AUTO_COMPLETE';

const receiveBookList = (data, name) => ({
    type: GET_BOOK_LIST,
    searchData: data,
    name: name
});

export const isShowLoading = (isloading) => ({
    type: IS_LOADING,
    isloading
});

export const autoComplete = (name, completeList) => ({
    type: AUTO_COMPLETE,
    name,
    completeList
});

export const receiveAutoComplete = name => dispatch =>
    fetch(`book/auto-complete?query=${name}`)
        .then(res=>res.json())
        .then(data => dispatch(autoComplete(name,data.keywords)))
        .catch(error => new Error(error));



export const getBookList = (name) => dispatch => {
        dispatch(isShowLoading(true));
        return fetch(`/api/book/fuzzy-search?query=${name}&start=0`)
            .then(res => res.json())
            .then(data => data.books.map((book) => urlChange(book.cover)))
            .then(data => {
                let action = dispatch(receiveBookList(data,name));
                dispatch(isShowLoading(false));
                return action;
            })
            .catch(error => {
                new Error(error);
            })
        };
