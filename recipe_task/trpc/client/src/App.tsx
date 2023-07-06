import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import { trpc } from './index';
import Ingredients from './components/ingredients/Ingredients';
import Recipes from './components/recipes/Recipes';
import Top from './components/layout/Top';
import Food from './components/meals/Food';
import CartProvider from './store/CartProvider';
import Cart from './components/card/Card';


function App() {
  const [cartIsShown, setCartIsShown] = useState(false);

  const showCartHandler = () => {
    setCartIsShown(true);
  };

  const hideCartHandler = () => {
    setCartIsShown(false);
  };
  return (
    <>
      {/* <div className='flex flex-wrap w-full p-4'>
        <div className='md:w-6/12 h-screen'>
          <Ingredients />
        </div>
        <div className='md:w-6/12 h-screen'>
          <Recipes />
        </div>
      </div> */}
     <CartProvider>
      {cartIsShown && <Cart onClose={hideCartHandler} />}
      < Top onShowCart={showCartHandler} />
      <main>
        <Food />
      </main>
    </CartProvider>
    </>
  );
}

export default App
