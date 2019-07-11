import { createStore, applyMiddleware, compose } from 'redux';
import thunk from "redux-thunk";
import rootReducer from './reducers/index';
import {saveState, loadState} from './utils/localstorage';

const persistedState = loadState("main")
const middleware = [thunk];

const store = createStore(
    rootReducer, 
    {main: persistedState}, 
    compose(
      applyMiddleware(...middleware),
      //window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  )
);

store.subscribe(() => {saveState("main", store.getState()["main"])});

export default store;
