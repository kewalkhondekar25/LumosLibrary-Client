import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { calculateTotal, clearCart, decrease, increase, removeBook } from '../features/books/booksSlice';
import { Link, useNavigate } from 'react-router-dom';
import { useCookies } from 'react-cookie';
import axios from 'axios';

const Cart = () => {
  const [cookies, setCookie, removeCookie] = useCookies();
  const dispatch = useDispatch();
  const { books, cart, amount, total } = useSelector(store => store.books);
  const navigate = useNavigate();

  const handleCheckout = () => {
    navigate("/checkout");
  };

  const handleDecrement = async (_id, qty) => {
    if (qty === 1) {
      dispatch(removeBook(_id));
    }
    dispatch(decrease(_id));
    try {
      const response = await axios.delete(`http://localhost:8080/api/v1/cart/${_id}`, {
        headers: {
          Authorization: `${cookies["accessToken"]}`
        }
      });
      const result = await response.data;
      console.log(result);
    } catch (error) {
      console.log(error);
    }
  };

  const handleIncrement = async (_id, qty) => {
    dispatch(increase(_id));
    try {
      const response = await axios.post(`http://localhost:8080/api/v1/cart/${_id}`, "", {
        headers: {
          Authorization: `${cookies["accessToken"]}`
        }
      });
      const result = await response.data;
      console.log(result);
    } catch (error) {
      console.log(error);
    }
  };

  const handleClearCart = async () => {
    dispatch(clearCart());
    try {
      const response = await axios.delete(`http://localhost:8080/api/v1/cart`, {
        headers: {
          Authorization: `${cookies["accessToken"]}`
        }
      });
      const result = await response.data;
      console.log(result);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    dispatch(calculateTotal());
  }, [cart]);

  return (
    <section className="container mx-auto px-4 py-8">
      {cart.length === 0 ? (
        <div className="flex justify-center items-center h-full">
          <p>Your cart is empty.</p>
        </div>
      ) : (
        <div className="flex flex-col md:flex-row md:justify-between md:items-start">
          <div className="md:w-2/3">
            {cart.map(item => {
              const { _id, title, author, coverImage, price, description, reviews, ratings, qty } = item;
              return (
                <div key={_id} className="flex justify-between items-center p-4 mb-4 bg-white rounded-lg shadow-md">
                  <div className="flex items-center">
                    <img src={coverImage} alt={title} className="h-20 w-20 object-cover rounded-lg mr-4" />
                    <div>
                      <p className="text-lg font-bold text-black">{title}</p>
                      <p className="text-gray-600">&#8377; {price}</p>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <div className="flex items-center border rounded-md border-gray-300">
                      <button className="p-2" onClick={() => handleDecrement(_id, qty)}>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" className="w-6 h-6 text-black">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M20 12H4" />
                        </svg>
                      </button>
                      <p className="p-2 text-black">{qty}</p>
                      <button className="p-2" onClick={() => handleIncrement(_id, qty)}>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" className="w-6 h-6 text-black">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v12M6 12h12" />
                        </svg>
                      </button>
                    </div>
                    <div className="ml-4 text-red-500 cursor-pointer" onClick={() => dispatch(removeBook(_id))}>
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
          <div className="md:w-1/3 md:ml-8">
            <div className="bg-white p-4 rounded-lg shadow-md">
              <div className="flex justify-between items-center mb-4">
                <Link to="/shop">
                  <button className="bg-gray-200 text-black px-4 py-2 rounded-md hover:bg-gray-300">
                    Shop More
                  </button>
                </Link>
                <button className="flex gap-1 bg-gray-200 text-black px-4 py-2 rounded-md hover:bg-gray-300" onClick={handleClearCart}>
                  <p>Clear Cart</p>
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" className="w-6 h-6 text-red-500">
                    <path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                  </svg>
                </button>
              </div>
              <div className="text-black">
                <p className="mb-2">Billing</p>
                <p>Total Items: {amount}</p>
                <p>Total Price: &#8377; {total}</p>
              </div>
              <button className="mt-4 bg-gray-200 text-black px-4 py-2 rounded-md hover:bg-gray-300" onClick={handleCheckout}>
                Checkout
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default Cart;
