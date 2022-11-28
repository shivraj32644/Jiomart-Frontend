import React from 'react'
import { addToCart } from '../service/api';
import PlusButton from './PlusButton';

export const AddToCartBTN = ({product}) => {
    const handlePost = async () => {
        let res = await addToCart(product);
        console.log("Result of post request")
      };
  return (
    <div className="btnStyle">
    <span className="btnText" onClick={handlePost}>
      Add to Cart
    </span>{" "}
    <PlusButton size={25} />
  </div>
  )
}
