import { createStore, applyMiddleware } from 'redux'

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
const logger = ({
    getState,
    dispatch
}) => next => action => {
    console.log("logger - 1", getState());
    next(action); //calling the next middleware until reducer is called.
    console.log("logger - 2", getState());
}

const errorHandler = ({
    getState,
    dispatch
}) => next => action => {
    try {
        next(action);
    } catch (e) {
        console.log("Exception!!");
    }
}

const middleware = applyMiddleware(logger, errorHandler);

// http://redux.js.org/docs/api/createStore.html#createstorereducer-preloadedstate-enhancer
let store = createStore(reducer, 10, middleware);
// Log the initial state
console.log("Initialize, ", store.getState());
console.log("==============")

// Every time the state changes, log it
// Note that subscribe() returns a function for unregistering the listener
let unsubscribe = store.subscribe(() =>
  console.log("store changed, ", store.getState())
)

store.dispatch(inc());
console.log("==============");
store.dispatch({
    type: "ERROR"
});
console.log("==============");
store.dispatch(desc());
console.log("==============");