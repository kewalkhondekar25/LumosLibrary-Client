import React from 'react'
import { useSelector } from 'react-redux'

const Cart = () => {
  const {books, cart} = useSelector(store => store.books);
  console.log("cart: ", cart);
  return (
    <div>Cart</div>
  )
}

export default Cart