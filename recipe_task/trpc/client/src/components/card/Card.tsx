import React, { useState } from 'react'
import Modal from '../ui/Model';
import "./Card.css"
import CartContext from '../../store/CartContext';
import { useContext } from 'react';
import CartItem from './CardItems';
import User from '../user/User';
import { trpc } from '../..';

export default function Card(props) {

  const [isOut, setIsOut] = useState(false);
  const [submit, setSubmit] = useState(false);
  const [userPopupOpen, setUserPopupOpen] = useState(false);
  const [userDetails, setUserDetails] = useState(null);
  const cartCtx = useContext(CartContext);

  const totalAmount = `$${cartCtx.totalAmount.toFixed(2)}`;
  const hasItems = cartCtx.items.length > 0;

  const cartItemRemoveHandler = (id) => {
    cartCtx.removeItem(id);
  };
  const cartItemAddHandler = (item) => {
    cartCtx.addItem({ ...item, amount: 1 });
  };

  const orderHandler = () => {
    setIsOut(true);
  };

  const submitOrderHandler = async (details) => {
    setUserDetails(details);
    try {
      const orderData = {
        name: details.name,
        street: details.street,
        pincode: details.pincode,
        city: details.city,
      };

      await trpc.order.createOrder.mutate(orderData);


      setSubmit(true);
      cartCtx.clearCart();
    } catch (error) {
      console.error(error);
    }

  };

  const cartItems = (
    <ul className='cart-items'>
      {cartCtx.items.map((item) => (
        <CartItem
          key={item.id}
          name={item.name}
          amount={item.amount}
          price={item.price}
          onRemove={cartItemRemoveHandler.bind(null, item.id)}
          onAdd={cartItemAddHandler.bind(null, item)}
        />
      ))}
    </ul>
  );

  const modalActions = (
    <div className="actions">
      <button className='buttonalt' onClick={props.onClose}>
        Close
      </button>
      {hasItems && (
        <button className="button" onClick={orderHandler}>
          Order
        </button>
      )}
    </div>
  );

  const cartModalContent = (
    <>
      {cartItems}
      <div className="total">
        <span>Total Amount</span>
        <span>{totalAmount}</span>
      </div>
      {isOut ? (
        <div className='user'>
          <button className="userbutton" onClick={props.onClose}>
            Close
          </button>
          <button className="button" onClick={() => setUserPopupOpen(true)}>
            Enter User Details
          </button>
        </div>
      ) : (
        modalActions
      )}
    </>
  );

  const submitModalContent = (
    <>
      <div className='pop-success'>
        <p>Successfully sent the order!</p>
        <div className="actions">
          <button className="button" onClick={props.onClose}>
            Close
          </button>
        </div>
      </div>
    </>
  );

  return (
    <>
      <Modal onClose={props.onClose}>
        {submit && submitModalContent}
        {!submit && !userDetails && cartModalContent}
      </Modal>
      {userPopupOpen && (
        <Modal onClose={() => setUserPopupOpen(false)}>
          <User
            onCancel={() => setUserPopupOpen(false)}
            onConfirm={(details) => {
              submitOrderHandler(details);
              setUserPopupOpen(false);
            }}
          />
        </Modal>
      )}
    </>
  );
}
