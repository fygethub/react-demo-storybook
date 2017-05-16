import { IS_LOADING, GET_BOOK_LIST, AUTO_COMPLETE,ADD_SEARCH_HISTORY, REMOVE_SEARCH_HISTORY, ADD_BOOK_LONG_INTRO } from './action';
import { isInArr } from '../tools';
import storejs from 'storejs';
export const bookList = (state = {books:[], name: ''},action={}) => {
    switch (action.type){
        case GET_BOOK_LIST:
            let { books, name } = action;
            return {name,books}
        default:
            return state;
    }
}

export const autoBookList = (state = {lists : [],name : '' }, action) => {
   switch (action.type){
       case AUTO_COMPLETE:
            let { completeList, name} = action;
            return {lists:completeList, name};
       default: return state;
   }

}

export const isLoading = (state = false,action) => {
    switch(action.type){
        case IS_LOADING:
            return action.isloading;
        default:
            return state;
    }
}

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
            let arr = [];
            if(state.length === 0){
                return historyListArr;
            }
            arr = state.concat([]);
            arr.concat(historyListArr);
            return arr;
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



export const bookLongIntro = (state = {}, action) =>{
    switch (action.type){
        case ADD_BOOK_LONG_INTRO:
            let {bookIntro } = action;
            return { bookIntro }
        default:
            return state;
    }
}






