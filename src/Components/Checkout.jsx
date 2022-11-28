import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Radio, Spin, Alert } from "antd";
import "./Checkout.css";
import Basket from "./Basket";
// import { updateCart } from "../Redux/Cart/actions";
import { useNavigate, useParams } from "react-router-dom";
import { getCartData } from "../Redux/Cart/actions";
import axios from "axios";
const Checkout = () => {
  const user_id = localStorage.getItem("user_id") || "";
  // const {  } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const { cartItems } = useSelector((state) => state.cart);
  const [cartDetails, setCartDetails] = useState({
    // products: [],
    finalAmt: 0,
    discount: 0,
    mrp: 0,
  });
  
  const [state, setState] = useState(0);
  useEffect(() => {
    dispatch(getCartData(user_id))
  }, [])
  
  const { id } = useParams();
  const navigate = useNavigate();
  
  useEffect(() => {

    if (state === 1) {
      var stateTime = setTimeout(() => {
        // dispatch(updateCart("order-confirmed"));
        axios.delete(`https://jiomart-server.cyclic.app/cart/deleteall/${user_id}`)
          .then((res) => {
            dispatch(getCartData(user_id))
           return navigate('/')
          }).catch((err) => {
            console.log(err);
          })
        setState(2);
      }, 4000);
    }

    return () => {
      clearTimeout(stateTime);
    };
  }, [state]);

    var finalAmt = 0;
    var discount = 0;
    var mrp = 0; 
    // var items = [];
    console.log(cartItems);
    if (cartItems) {
      cartItems.forEach(element => {
        mrp += (Number(element.item_quantity)*Number(element.item_final_price))
        discount = 0
        finalAmt += Number(element.item_final_price) * Number(element.item_quantity)
      });
  }
  useEffect(() => {
    setCartDetails({
      // totalItems: mrp,
      finalAmt: finalAmt.toFixed(2),
      discount: discount,
      mrp: mrp,
    });
    
  },[mrp])

  return (
    <div className="container">
      {id === "payment" ? (
        <div style={{ minHeight: "100vh" }}>
          {state !== 2 ? (
            <div className="heading">Payment Details</div>
          ) : (
            <div className="heading">Order Confirmed</div>
          )}

          <div className="payment">
            {state === 0 ? (
              <Radio>
                <div className="payment-option">
                  <img
                    src="https://www.jiomart.com/msassets/images/jio-money.png"
                    alt="pay"
                  />
                  <span style={{ marginLeft: "25px", marginRight: "50px" }}>
                    Jio Money
                  </span>
                  <button
                    onClick={() => setState(1)}
                  >{`Pay ₹${cartDetails.finalAmt}`}</button>
                </div>
              </Radio>
            ) : state === 1 ? (
              <div>
                <Spin tip="Loading..." delay={1000}>
                  <Alert
                    message="Please Wait while we confirm your payment"
                    description="This might take a few seconds."
                    type="info"
                  />
                </Spin>
              </div>
            ) : (
              <div>
                <p>Thank you for shopping at JioMart.</p>
                <p>
                  {" "}
                  Your order{" "}
                  <span style={{ color: "#089cdb" }}>
                    15983533739052545M
                  </span>{" "}
                  is booked in JioMart.
                </p>
                <p>
                  You can also check the details and status of your order any
                  time in Your Account - Orders section in JioMart.
                </p>
              </div>
            )}
          </div>
        </div>
      ) : (
        <div className="dynamic-div">
          {id === "review" ? (
            <div className="heading">Order Summary</div>
          ) : (
            <div className="heading">{`My Cart(${cartItems.length})`}</div>
          )}
          {id === "review" && (
            <div className="address-container">
              <h2 style={{ fontFamily: "jioBold" }}>Select Delivery Address</h2>
              <div className="address">
                <div className="default-address">
                  <Radio>
                    <p>Eve Holt</p>
                    <p>
                      E-99, Lorem ipsum dolor, sit amet consectetur adipisicing
                      elit. Iure eum similique quis debitis corrupti ipsam
                      dicta, pariatur
                    </p>
                    <p>+91 - 9999999999</p>
                  </Radio>
                </div>
                <button>Change/ Add Address</button>
              </div>
            </div>
          )}

          <Basket cartDetails={cartDetails} />
        </div>
      )}
      <div className="pay-details">
        {state !== 2 ? (
          <section className="bill">
            <p style={{ fontFamily: "jioBold", fontSize: "18px" }}>
              Payment Details
            </p>
            <div>
              <p>MRP Total</p>
              <p>₹{cartDetails.mrp} </p>
            </div>
            <div>
              <p>Product Discount</p>
              <p>{-(cartDetails.discount).toFixed(2)} </p>
            </div>
            <div>
              <p>Total Amount</p>
              <p>₹{cartDetails.finalAmt} </p>
            </div>
            <div style={{ justifySelf: "flex-end" }}>
              <p>{`You Save ₹${(0).toFixed(
                2
              )}`}</p>
            </div>
          </section>
        ) : null}
        {cartItems.length !== 0 && (
          <section className="pay-btn">
            {id === "review" ? (
              <button onClick={() => navigate("/checkout/payment")}>
                {"Make Payment"}
              </button>
            ) : id === "cart" ? (
              <button
                onClick={() =>
                  user_id ? navigate("/checkout/review") : navigate("/account/login")
                }
              >
                {"Place Order"}
              </button>
            ) : null}
          </section>
        )}
      </div>
    </div>
  );
};

export default Checkout;
