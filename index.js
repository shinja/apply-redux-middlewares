import { createStore, applyMiddleware } from 'redux';
import logger from 'redux-logger';
import thunk from 'redux-thunk';
import fetch from 'node-fetch';

/**
 * actions
 */
const inc = () => {
    return {
        type: "INC"
    }
}

const desc = () => {
    return {
        type: "DESC"
    }
}

const add = (num) => {
    return {
        type: "ADD",
        payload: num
    }
}

/**
 * redux-thunk
 */
const asyncAdd = () => {
    
    // http://redux.js.org/docs/recipes/ReducingBoilerplate.html#actioncreatorsjs

    // Interpreted by the thunk middleware:
    return (dispatch, getState) => {
        console.log("async Action", getState());

        fetch('https://jsonplaceholder.typicode.com/posts/4')
        .then(res => res.json())
        .then(json => dispatch(add(json.id)));
    }
}

/**
 * reducer
 * @param {*} state 
 * @param {*} action 
 */
const reducer = (state = 0, action) => {

    switch (action.type) {
        case "INC":
            return state + 1;
        case "DESC":
            return state - 1;
        case "ADD":
            return state + action.payload;
        case "ERROR":
            throw new Error();
            break;
        default: //return default state
            return state;
    }
}

/**
 * middlewares
 */
const middlewares = [thunk, logger];
const middleware = applyMiddleware(...middlewares);

// http://redux.js.org/docs/api/createStore.html#createstorereducer-preloadedstate-enhancer
let store = createStore(reducer, 10, middleware);
// Log the initial state
console.log("Initialize, ", store.getState());

// Every time the state changes, log it
// Note that subscribe() returns a function for unregistering the listener
let unsubscribe = store.subscribe(() =>
  console.log("store changed, ", store.getState())
)

store.dispatch(inc());
store.dispatch(asyncAdd());
store.dispatch(desc());