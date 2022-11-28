import React from "react";
import MinusButton from "./MinusButton";
import PlusButton from "./PlusButton";
import "./JioButton.css";
import { useDispatch, useSelector } from "react-redux";
import { updateCart } from "../Redux/Cart/actions";
import {
  addToCart,
  incCart,
  decCart,
  getCart,
  findItemInCart,
} from "../service/api";
import { useEffect } from "react";
import { useRef } from "react";
import { useState } from "react";

export const PlusMinusBtn = ({ product }) => {
  const [count, setCount] = React.useState(0);
  let [allItem, SetAllItem] = React.useState([]);

  product.item_Id = product._id;
  product.user_Id = "6awwklsiei8545aesd";
  // console.log(product._id)

  const handleInc = async () => {
    let newQuantity = product.item_quantity+1;
      incCart({id: product._id,item_quantity: newQuantity});
  };

  const handleDec = () => {
    console.log("Inside Desc");
  };


  return (
    <div className="plusMinusBtn">
      <span style={{ cursor: "pointer" }} onClick={handleDec}>
        <MinusButton />
      </span>
      <h3 className="order-nums">{1}</h3>
      <span style={{ cursor: "pointer" }} onClick={handleInc}>
        <PlusButton size={32} />
      </span>
    </div>
  )
};

/*

{
      true ? (
      <>
    <div className='plusMinusBtn'>
      <span style={{cursor:"pointer"}}
        onClick={handleDec}
      >
        <MinusButton />
      </span>
      <h3 className='order-nums'>{quantity}</h3>
      <span style={{cursor:"pointer"}} onClick={handleInc}>
        <PlusButton size={32} />
      </span>

      <div className='btnStyle'>
     <span className="btnText" onClick={handlePost} >Add to Cart</span> <PlusButton size={25} />
   </div>

    </div>
      </>
      ): (
        <div className='btnStyle'>
        <span className="btnText" onClick={handlePost} >Add to Cart</span> <PlusButton size={25} />
      </div>
)
  }
    
    
  );

*/
