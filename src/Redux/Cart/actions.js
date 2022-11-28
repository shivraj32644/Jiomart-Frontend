import axios from 'axios';
import {
  REMOVE_FROM_CART,
  UPDATE_CART,
  ORDER_CONFIRMED
} from './action_types';
const URL = 'https://jiomart-server.cyclic.app/cart'


export const getCartItem = (data) => async(dispatch) => {
  let res = await axios.post(`${URL}/addCart`, data);
}