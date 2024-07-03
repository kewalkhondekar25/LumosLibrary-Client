import axios from 'axios';
import React, { useState } from 'react'
import { useCookies } from 'react-cookie';
import toast from 'react-hot-toast';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const Checkout = () => {

  const payment = [
    { type: "card" },
    { type: "netbanking" },
    { type: "upi" },
    { type: "COD" }
  ];
  const [cookies, setCookie, removeCookie] = useCookies();
  const {amount, total } = useSelector(store => store.books);
  const [order, setOrder] = useState({
    address: "",
    payment: "",
    delivery: "",
    itemsCount: amount,
    purchaseTotal: total
  });
  const navigate = useNavigate();
  const handleProcessOrder = async () => {
    try {
      const loadOrder = toast.loading("Order Processing");
      const response = await axios.post("http://localhost:8080/api/v1/purchase", order, {
        headers: {
          Authorization: `${cookies["accessToken"]}`
        }
      });
      const result = await response.data;
      if(result){
        toast.dismiss(loadOrder);
        toast.success("Order Placed");
        navigate("/profile")
      }
      console.log(result);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <section className='flex justify-evenly place-items-center h-screen'>
      <dl>
        <dt>Delivery Address</dt>
        <dd>
          <input type="text" placeholder='add delivery address'
            className='text-white bg-[#353434] rounded'
            onChange={(e) => setOrder(prev => ({...prev, address: e.target.value}))}/>
        </dd>
        <dt>Select A Payment Method</dt>
        <dd>
          <select 
          className='text-white bg-[#353434] rounded'
          onChange={(e) => setOrder(prev => ({...prev, payment: e.target.value}))}>
            {
              payment.map(item => {
                return (
                  <option key={item.type} value={item.type}>{item.type.toUpperCase()}</option>
                )
              })
            }
          </select>
        </dd>
        <dt>Delivery Method</dt>
        <dd>
          <select 
            className='text-white bg-[#353434] rounded'
            onChange={(e) => setOrder(prev => ({...prev, delivery: e.target.value}))}>
            <option value="standard">Standard</option>
            <option value="express">Express</option>
          </select>
        </dd>
      </dl>
      <div>
        <div>
          <h3>Order Summary</h3>
          <p>Items: {amount}</p>
          <p>Order Total: {total}</p>
        </div>
        <button 
          className='bg-[#FAFAFA] text-black p-1 rounded'
          onClick={handleProcessOrder}>
          Place Order
        </button>
      </div>
    </section>
  )
}

export default Checkout