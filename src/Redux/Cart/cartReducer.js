import { ORDER_CONFIRMED, REMOVE_FROM_CART, UPDATE_CART } from "./action_types";
import {  omit, uniq } from "lodash";
import { GetData, Setdata } from "../../Utils/localStorage";
import { getCart } from "../../service/api";
import { useState } from "react";


async function dataFun (){
  let result = await getCart();
  console.log(result);
  localStorage.setItem("cart", JSON.stringify(result));
  return result;
}

dataFun();
const initialState = JSON.parse(localStorage.getItem("cart")) || {
  cartItems: {},
  additionHistory: [],
};

export const cartReducer = (state = initialState, action) => {
  switch (action.type) {
    case UPDATE_CART:
      let data = {
        cartItems: {
          ...state.cartItems,
          [action.payload.product.id]: action.payload,
        },
        additionHistory: uniq([
          ...state.additionHistory,
          action.payload.product.id,
        ]),
      };
      localStorage.setItem("cart", JSON.stringify(data));
      return data;

    case REMOVE_FROM_CART:
      let data2 = {
        cartItems: omit(state.cartItems, [action.payload]),
        additionHistory: state.additionHistory.filter(
          (pId) => pId !== action.payload
        ),
      };
      localStorage.setItem("cart", JSON.stringify(data2));
      return data2;

    case ORDER_CONFIRMED:
      let orders = GetData("JioMartCloneOrders") || []
      orders = [...orders,state.cartItems]
      Setdata("JioMartCloneOrders",orders)
      let data3 = {
        cartItems: {},
        additionHistory: [],
      };
      localStorage.setItem("cart", JSON.stringify(data3));
      return data3;
    default:
      return state;
  }
};
