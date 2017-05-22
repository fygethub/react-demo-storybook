import {
    IS_LOADING, GET_BOOK_LIST,
    AUTO_COMPLETE,ADD_SEARCH_HISTORY,
    REMOVE_SEARCH_HISTORY,
    ADD_BOOK_LONG_INTRO ,
    ADD_CHAPTERS_LIST,
    ADD_READ_DETAIL
} from './action';
import { isInArr } from '../tools';
import storejs from 'storejs';

//书籍列表
export const bookList = (state = {books:[], name: ''},action={}) => {
    switch (action.type){
        case GET_BOOK_LIST:
            let { books, name } = action;
            return {name,books}
        default:
            return state;
    }
}

//自动补全列表
export const autoBookList = (state = {lists : [],name : '' }, action) => {
   switch (action.type){
       case AUTO_COMPLETE:
            let { completeList, name} = action;
            return {lists:completeList, name};
       default: return state;
   }

}

//加载状态
export const isLoading = (state = false,action) => {
    switch(action.type){
        case IS_LOADING:
            return action.isloading;
        default:
            return state;
    }
}

//历史记录列表
export const historyList = (state = [], action = '') => {
    var historyListArr = storejs.get("historyListArr") || [];
    switch (action.type){
        case ADD_SEARCH_HISTORY:
            //添加搜索记录缓存

            if(action.bookName === '' || !action.bookName){
                if(state.length === 0){
                    return historyListArr;
                }
                return state;
            }
            if(state.length >= 1){
               let has = isInArr(state,[action.bookName]);
                if(has){
                    return state;
                }
            }
            historyListArr.push(action.bookName);
            storejs.set('historyListArr',historyListArr);
            return historyListArr;
        case REMOVE_SEARCH_HISTORY:
            if(state.length >= 1 && action !== ''){
                //移除缓存记录
                historyListArr.splice(historyListArr.indexOf(action.bookName),1);
                storejs.set('historyListArr',historyListArr);
                let arr = [].concat(state.filter((name) => name !== action.bookName));
                return arr;
            }
            return state;
        default:
            return state;

    }
}

//书籍详情
export const bookLongIntro = (state = {}, action) =>{
    switch (action.type){
        case ADD_BOOK_LONG_INTRO:
            let {bookIntro } = action;
            return { bookIntro }
        default:
            return state;
    }
}

//书籍章节列表
export const chaptersList = (state = {}, action) => {
    switch (action.type){
        case ADD_CHAPTERS_LIST:{
            let focusBooks = storejs.get("focusBooks") || [];
            focusBooks.push()
            return action.chapters;
        }
        default:
            return state;
    }
}


//详细阅读
export const readDetail = (state = {}, action) => {
    switch (action.type){
        case ADD_READ_DETAIL:
            action.readObj && storejs.set('readDetail', action.readObj);
            return action.readObj.chapter;
        default:
            return state;
    }
}









