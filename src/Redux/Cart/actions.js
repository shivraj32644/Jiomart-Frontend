import axios from "axios";
import {

  ADD_ITEM,
  DEC_CART,
  ERROR,
  INC_CART,
  LOADING,
  REMOVE_ITEM,
} from "./action_types";
const URL = "https://jiomart-server.cyclic.app/cart";

export const isLoading = (payload) => ({
  type: LOADING,
  payload,
});

export const isError = (payload) => ({
  type: ERROR,
  payload,
});

export const getData = (payload) => ({
  type: ADD_ITEM,
  payload,
});


export const incQuantity = () => ({
  type: INC_CART,
  
});

export const decQuantity = () => ({
  type: DEC_CART,
  
});

export const deleteItem = () => ({
  type: REMOVE_ITEM,
  
});



export const getCartData = (user_Id) => (dispatch) => {
  dispatch(isLoading(true));
  axios
    .get(`${URL}/Item/${user_Id}`)
    .then((res) => dispatch(getData(res.data)))
    .catch((err) => dispatch(isError(true)))
    .finally(()=>dispatch(isLoading(false)))
}
export const addDataToCart = (data) => (dispatch) => {
  dispatch(isLoading(true));
  axios
    .post(`${URL}/addCart`, data)
    .then((res) => getCartData())
    .catch((err) => dispatch(isError(true)))
    .finally(()=>dispatch(isLoading(false)))
};

export const incCartFunction = ({ id }) => (dispatch) => {
  
  dispatch(isLoading(true));
  axios
    .patch(`${URL}/incCart/${id}`)
    .then((res) => getCartData())
    .catch((err) => dispatch(isError(true)))
    .finally(()=>dispatch(isLoading(false)))
}

export const decCartFunction = ({id}) => (dispatch) => {
  dispatch(isLoading(true));
  axios
    .get(`${URL}/decCart/${id}`)
    .then((res) => getCartData())
    .catch((err) => dispatch(isError(true)))
    .finally(()=>dispatch(isLoading(false)))
}

export const deleteCartItemFunction = ({id}) => (dispatch) => {
  dispatch(isLoading(true));
  axios
    .get(`${URL}/delCart/${id}`)
    .then((res) => getCartData())
    .catch((err) => dispatch(isError(true)))
    .finally(()=>dispatch(isLoading(false)))
}