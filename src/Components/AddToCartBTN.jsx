import { Skeleton, Spinner } from "@chakra-ui/react";
import axios from "axios";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getCartData } from "../Redux/Cart/actions";
import { addToCart } from "../service/api";
import PlusButton from "./PlusButton";

export const AddToCartBTN = ({ product }) => {
  const userId = localStorage.getItem("user_id") || "";
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  

  const handlePost = () => {
    const userId = localStorage.getItem("user_id") || "";
    product.item_Id = product._id;
    product.user_Id = userId;
    product.item_quantity = 1;

    if (userId === "") {
      console.log(userId)
      return navigate('/account/login')
    }
    else {
      setLoading(true);
      axios
        .post(`https://jiomart-server.cyclic.app/cart/addCart`, product)
        .then((res) => {
          dispatch(getCartData(userId));
        })
        .catch((err) => {
          console.log(err);
        })
        .finally(() => {
          setLoading(false);
        });
    }
  };
  if (loading) {
    return (
      <div style={{display:"flex",alignItems:'center',justifyContent:"center"}} >
        <Spinner color='blue' />
      </div>
    );
  }
  return (
    <div aria-disabled={loading} className="btnStyle">
      <span aria-disabled={loading} className="btnText" onClick={handlePost}>
        Add to Cart
      </span>{" "}
      <PlusButton size={25} />
    </div>
  );
};
