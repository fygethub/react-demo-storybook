import 'whatwg-fetch';
import { urlChange } from '../tools';


export const IS_LOADING = 'IS_LOADING';
export const GET_BOOK_LIST = 'GET_BOOK_LIST';
export const AUTO_COMPLETE = 'AUTO_COMPLETE';
export const ADD_SEARCH_HISTORY = 'ADD_SEARCH_HISTORY';
export const REMOVE_SEARCH_HISTORY = 'REMOVE_SEARCH_HISTORY';
export const ADD_BOOK_LONG_INTRO = 'ADD_BOOK_LONG_INTRO';
export const ADD_CHAPTERS_LIST = 'ADD_CHAPTERS_LIST';
export const ADD_READ_DETAIL = 'ADD_READ_DETAIL';


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

export const removeHistory = (bookName = '') => ({
    type: REMOVE_SEARCH_HISTORY,
    bookName,
});

export const addBookLongIntro = (bookIntro = {}) => ({
    type: ADD_BOOK_LONG_INTRO,
    bookIntro
});

export const addChapters = (chapters = {}) => ({
    type: ADD_CHAPTERS_LIST,
    chapters
})


export const readDetail = (readObj = {}) => ({
    type: ADD_READ_DETAIL,
    readObj,
})

//书籍详细介绍
export const receiveBookLongIntro = (bookId) => dispatch => {
    dispatch(isShowLoading(true));
    fetch(`/book/${bookId}`).then(res => res.json())
        .then(data => {
            dispatch(addBookLongIntro(data));
            dispatch(isShowLoading(false));
        })
        .catch(err => {
            dispatch(isShowLoading(false));
            console.error(Error(err));
        })
    };


//自动补全列表
export const receiveAutoComplete = name => dispatch =>{
    if(name === '') {
        return dispatch(autoComplete());
    }
    return fetch(`book/auto-complete?query=${name}`)
        .then(res=>res.json())
        .then(data => dispatch(autoComplete(name,data.keywords)))
        .catch(error => new Error(error));
    };


//获取书籍列表
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
            dispatch(isShowLoading(false));
            new Error(error);
        })
    };

// 章节列表，需要先获取书源信息
export const getChpters = id => dispatch => {
    dispatch(isShowLoading(true));
    let chapters = {};
    fetch(`/api/toc?view=summary&book=${id}`)
        .then(res => res.json())
        .then(data => {
           let sourceId =data[0]._id;
           for(let item of data){
               // 为什么要用他的 我也不知道 可能是比较好拿
               if(item.source === 'shuhaha'){
                   sourceId = item._id;
               }
           }
            chapters.sourceId = sourceId;
            return fetch(`/api/toc/${sourceId}?view=chapters`)
        })
        .then(res => res.json())
        .then(data => {
            chapters.chapters = data;
            let action = dispatch(addChapters(chapters));
            dispatch(isShowLoading(false));
            return action;
        })
        .catch(error => {
            dispatch(isShowLoading(false));
            new Error(error);
        })

}

/*详细阅读*/
export const getReadDetail = url => dispatch => {
    if(url === '') return ;
    dispatch(isShowLoading(true));
    return fetch(`/chapter/${url}?k=2124b73d7e2e1945&t=1468223717`)
        .then(res => res.json())
        .then(data => {
            let action = dispatch(readDetail(data));
            dispatch(isShowLoading(false));
            return action;
        })
        .catch(err=> {
            dispatch(isShowLoading(false));
            new Error(err)
        });

}











