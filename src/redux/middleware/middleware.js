export const thunk = (store) => next => action =>
        typeof action === 'function' ?
            action(store.dispatch, store.getState) :
            next(action);

export const logger = (store) => next => action => {
      console.group(action.type);
      console.info('dispatching', action);
      let result = next(action);
      console.log('next state', store.getState());
      console.groupEnd(action.type);
      return result;
}