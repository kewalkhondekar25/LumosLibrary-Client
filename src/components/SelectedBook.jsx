import React, { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import useFetch from '../hooks/useFetch';
import { useDispatch } from 'react-redux';
import { addToCart } from '../features/books/booksSlice';
import Star from './Star';
import axios from 'axios';
import { useCookies } from 'react-cookie';

const SelectedBook = () => {
  const { id } = useParams();
  const { data, isLoading, errorMessage } = useFetch(`https://lumos-library-server.vercel.app/api/v1/books/${id}`);
  const { _id, title, author, coverImage, price, description, reviews, ratings } = data;
  const [qty, setQty] = useState(1);
  const dispatch = useDispatch();
  const [cookies, setCookie, removeCookie] = useCookies();

  const handleAddToCart = async () => {
    dispatch(addToCart({ _id, title, author, coverImage, price, description, reviews, ratings, qty }));
    try {
      const response = await axios.post(`https://lumos-library-server.vercel.app/api/v1/cart/${id}`, "", {
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

  const stars = [];
  for (let i = 0; i < ratings; i++) {
    stars[i] = i;
  }

  return (
    <section className="container mx-auto px-4 py-8 md:flex items-center">
      <img
        src={data.coverImage}
        alt={data.title}
        className="w-full md:w-1/2 md:p-5"
      />
      <div className="md:w-1/2 md:p-5">
        <p className="capitalize text-2xl font-serif">{data.title}</p>
        <p className="font-serif">{data.description}</p>
        <div className="flex flex-row mt-2">
          {stars.map((item, i) => (
            <Star key={i} />
          ))}
        </div>
        <div className="mt-2">
          {reviews && (
            <>
              <p className="text-xs font-thin">{reviews[0]}</p>
              <p className="text-xs font-thin">{reviews[1]}</p>
            </>
          )}
        </div>
        <Link to="/cart">
          <div className="flex flex-col gap-2 mt-4">
            <p>&#8377; {data.price}</p>
            <button
              className="w-full md:w-32 bg-[#FAFAFA] text-black p-1 rounded"
              onClick={handleAddToCart}
            >
              Add to Cart
            </button>
          </div>
        </Link>
        <Link to="/shop" className="mt-4 text-blue-500 hover:underline">
          Back to Shop
        </Link>
      </div>
    </section>
  );
};

export default SelectedBook;
