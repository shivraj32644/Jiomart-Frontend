import {
  applyMiddleware,
  combineReducers,
  compose,
  legacy_createStore as createStore,
} from "redux";
import thunk from "redux-thunk";
import { Authreduce } from "./Login/Authreducer";
import { singleProductReducer } from "./SingleProduct/singleReducer";
import { cartReducer } from "./Cart/cartReducer";
import productReducer from "./Products/productReducer";

// const functionOrObject = (store) => (next) => (action) => {
//     if (typeof action === "function") {
//       console.log(1);
//       return action(store.dispatch);
//     }
//     return next(action);
//   };

  export const rootReducer = combineReducers({
    auth: Authreduce,
    cart: cartReducer,
    singleProduct: singleProductReducer,
    products: productReducer,
  });


const composeEnhancers =
  typeof window === "object" && window._REDUX_DEVTOOLS_EXTENSION_COMPOSE_
    ? window._REDUX_DEVTOOLS_EXTENSION_COMPOSE_({
      })
    : compose;

const middlewares = applyMiddleware(thunk);
const enhancer = composeEnhancers(middlewares);

export const store = createStore(rootReducer, enhancer);

// store.subscribe(() => {
//   console.log("store got updated", store.getState());
// });