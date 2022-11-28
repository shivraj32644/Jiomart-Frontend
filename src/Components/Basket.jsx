import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { v4 as uuidv4 } from 'uuid';
import { getCartData } from '../Redux/Cart/actions';
import './Basket.css';
import { PlusMinusBtn } from './JioButton';

const Basket = ({ cartDetails, visible = true }) => {
  const dispatch = useDispatch();
  const { cartItems } = useSelector((state) => state.cart);
  useEffect(() => {
    const user_id = localStorage.getItem("user_id") || ""
    dispatch(getCartData(user_id))
   
  },[])
  // console.log(cartItems);
  var total = null;
  const cards = cartItems?.map((product) => {
    total += (Number(product.item_quantity)*Number(product.item_final_price))
    return (
      <div key={uuidv4()} className='cart-cards'>
        <div>
     
          <img src={product.item_img_url} alt='pr-i' />
        </div>
        <div>
          <section style={{ fontFamily: 'jioMedium', fontSize: '16px' }}>
            <p>{product.item_name}</p>
          </section>
          <section>
            <p>
              <span style={{ fontFamily: 'jioMedium', fontSize: '18px' }}>
                &#8377; {product.item_final_price*product.item_quantity}
              </span>
              <span>
                {product.discount && (
                  <span className='mrp'>
                    MRP:{' '}
                    {
                      <span style={{ textDecoration: 'line-through' }}>
                        &#8377; {product.item_price*product.item_quantity} 
                      </span>
                    }{' '}
                  </span>
                )}
              </span>
            </p>
          </section>
          {visible && <section style={{ textAlig: 'right' }}>
            <PlusMinusBtn product={product} />
          </section>}
        </div>
      </div>
    );
  });

  return (
    <div className='cart-item-section'>
      <div className='basket-title'>
        
        <section>{`Groceries Basket (${cartItems.length} items) `}</section>
        <section>₹{total}</section>
      </div>
      {cards}
    </div>
  );
};

export default Basket;
