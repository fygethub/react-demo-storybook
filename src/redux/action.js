import 'whatwg-fetch';
import { urlChange } from '../tools';


export const IS_LOADING = 'IS_LOADING';
export const GET_BOOK_LIST = 'GET_BOOK_LIST';
export const AUTO_COMPLETE = 'AUTO_COMPLETE';
export const ADD_SEARCH_HISTORY = 'ADD_SEARCH_HISTORY';
export const REMOVE_SEARCH_HISTORY = 'REMOVE_SEARCH_HISTORY';
export const ADD_BOOK_LONG_INTRO = 'ADD_BOOK_LONG_INTRO';


const receiveBookList = (data, name) => ({
    type: GET_BOOK_LIST,
    books: data,
    name: name
});

export const isShowLoading = (isloading) => ({
    type: IS_LOADING,
    isloading
});

export const autoComplete = (name='', completeList=[]) => ({
    type: AUTO_COMPLETE,
    name,
    completeList
});

export const addSearchHistory = (bookName = '') => {
    return {
        type: ADD_SEARCH_HISTORY,
        bookName
    }
};

export const removeHistory = (bookName = '') => {

    return {
        type: REMOVE_SEARCH_HISTORY,
        bookName
    }

};

export const addBookLongIntro = (bookIntro = {}) => ({
    type: ADD_BOOK_LONG_INTRO,
    bookIntro
});



export const receiveBookLongIntro = (bookId) => dispatch => {
    dispatch(isShowLoading(true));
    fetch(`/book/${bookId}`).then(res => res.json())
        .then(data => {
            dispatch(addBookLongIntro(data));
            dispatch(isShowLoading(false));
        })
        .catch(err => {
            console.error(Error(err));
        })
    };

export const receiveAutoComplete = name => dispatch =>{
    if(name === '') {
        return dispatch(autoComplete());
    }
    return fetch(`book/auto-complete?query=${name}`)
        .then(res=>res.json())
        .then(data => dispatch(autoComplete(name,data.keywords)))
        .catch(error => new Error(error));
    };



export const getBookList = (name) => dispatch => {
    if(name === '') {
       return dispatch(receiveBookList([],''));
    }
    dispatch(isShowLoading(true));
    return fetch(`/api/book/fuzzy-search?query=${name}&start=0`)
        .then(res => res.json())
        .then(data => data.books.map((book) =>{
            return Object.assign({}, book,{cover:urlChange(book.cover)})
        }))
        .then(data => {
            let action = dispatch(receiveBookList(data,name));
            name && dispatch(addSearchHistory(name));
            dispatch(isShowLoading(false));
            return action;
        })
        .catch(error => {
            new Error(error);
        })
    };
