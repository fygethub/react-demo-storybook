import { IS_LOADING, GET_BOOK_LIST, AUTO_COMPLETE } from './action';

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










