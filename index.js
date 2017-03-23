import { createStore } from 'redux'

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
        default: //return default state
            return state;
    }
}

// http://redux.js.org/docs/api/createStore.html#createstorereducer-preloadedstate-enhancer
let store = createStore(reducer, 10);
// Log the initial state
console.log("Initialize, ", store.getState());

// Every time the state changes, log it
// Note that subscribe() returns a function for unregistering the listener
let unsubscribe = store.subscribe(() =>
  console.log("store changed, ", store.getState())
)

store.dispatch(inc());
store.dispatch(inc());
store.dispatch(desc());
store.dispatch(desc());