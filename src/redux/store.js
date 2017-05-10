import { createStore, combineReducers, applyMiddleware } from 'redux';
import * as reducer from './reducer';
import { thunk, logger} from './middleware/middleware';

let store = createStore(
    combineReducers(reducer),
    applyMiddleware(thunk,logger));

export default store;






