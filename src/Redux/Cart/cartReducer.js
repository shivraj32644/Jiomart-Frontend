import { ADD_ITEM, ERROR, LOADING } from "./action_types";

const initialState = {
  loading: false,
  error:false,
  cartItems: [],
};

export const cartReducer = (state = initialState, {type,payload}) => {
  switch (type) {
    
    case LOADING: {
      return {...state, loading:payload}
    }
    case ERROR: {
      return {...state, error:payload}
    }
    case ADD_ITEM: {
      return {...state, cartItems:payload}
    }
    
    default:
      return state;
  }
};
