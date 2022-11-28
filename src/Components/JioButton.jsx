import React from "react";
import MinusButton from "./MinusButton";
import PlusButton from "./PlusButton";
import "./JioButton.css";
import { useDispatch, useSelector } from "react-redux";
import { getCartData, updateCart } from "../Redux/Cart/actions";
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
import { Spinner } from '@chakra-ui/react'
import axios from "axios";
import { useNavigate } from "react-router-dom";

const userId = localStorage.getItem("user_id") || "";
export const PlusMinusBtn = ({ product }) => {
  const dispatch = useDispatch();
  const [loading, setLoading]=useState(false)
  const navigate = useNavigate();
  if (userId === "") {
    console.log(userId)
    return navigate('/account/login')
  }
 
  product.item_Id = product._id;
  product.user_Id = userId;
  // console.log(product._id)
  
  const handleInc = () => {
    
    setLoading(true)
    axios.patch(`https://jiomart-server.cyclic.app/cart/incCart/${product._id}`).then((res) => {
      console.log(res);
      dispatch(getCartData(userId))
    }).catch((err) => {
      console.log(err);
    }).finally(() => {
      setLoading(false)
    })

  };

  const handleDec = () => {
    setLoading(true)
    fetch(`https://jiomart-server.cyclic.app/cart/decCart/${product._id}`, {
      mode:"cors",
      method: 'PATCH',
      body: JSON.stringify({}),
      headers: {
        'Content-type':'application/json'
      }
      
    }).then((res) => {
      dispatch(getCartData(userId))
    }).catch((err) => {
      console.log(err)
    }).finally(() => {
      setLoading(false)
    })
  };
  if (loading) {
    return (
      <div className="plusMinusBtn">
      <span style={{ cursor: "pointer" }}>
      <Spinner />
      </span>
      <h3 className="order-nums">{product.item_quantity}</h3>
      <span style={{ cursor: "pointer" }}>
      <Spinner />
      </span>
    </div>
    )
  }

  



  return (
    <div className="plusMinusBtn">
      <span style={{ cursor: "pointer" }} onClick={handleDec}>
        <MinusButton />
      </span>
      <h3 className="order-nums">{product.item_quantity}</h3>
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
