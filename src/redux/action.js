import 'whatwg-fetch';
const BOOK_LOADING_START = 'BOOK_LOADING_START';
const BOOK_LOADING_STOP = 'BOOK_LOADING_STOP';

const GET_BOOK_LIST = 'GET_BOOK_LIST';

const receiveBookList = (data, name) => ({
    type: GET_BOOK_LIST,
    searchData: data,
    name: name
});



const fetchBookList = (name) =>{
    return dispatch => {
        "use strict";
        fetch(`/api/book/fuzzy-search?query=${name}&start=0`)
    }

}