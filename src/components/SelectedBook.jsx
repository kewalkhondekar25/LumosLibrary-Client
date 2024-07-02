import React, { useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import useFetch from '../hooks/useFetch';
import { useDispatch } from 'react-redux';
import { addToCart } from '../features/books/booksSlice';

const SelectedBook = () => {

  const { id } = useParams();
  const { data, isLoading, errorMessage } = useFetch(`http://localhost:8080/api/v1/books/${id}`);
  const {_id, title, author, coverImage, price, description, reviews, ratings} = data;
  const [qty, setQty] = useState(1)
  const dispatch = useDispatch();

  const handleAddToCart = () => {
    dispatch(addToCart({_id, title, author, coverImage, price, description, reviews, ratings, qty}));
  }

  return (
    <section className='h-screen flex'>
      <img
        src={data.coverImage}
        alt={data.title}
        className='p-5' />
      <div className='flex flex-col justify-center '>
        <p className='capitalize text-2xl font-serif'>{data.title}</p>
        <p className='font-serif'>{data.description}</p>
        <div className='flex flex-col gap-2'>
          <p>&#8377; {data.price}</p>
          <Link to="/cart">
            <button
              className='w-32 bg-[#FAFAFA] text-black p-1 rounded'
              onClick={handleAddToCart}
            >Add to cart</button>
          </Link>
        </div>
      </div>
    </section>
  )
}

export default SelectedBook