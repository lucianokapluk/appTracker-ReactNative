import {createStore, applyMiddleware} from 'redux';
import reducers from './index';
//reducer,initialstate, enhanser
import reduxThunk from 'redux-thunk';

//store recibe reducers and initial state
const store = createStore(reducers, {}, applyMiddleware(reduxThunk));

export default store;
