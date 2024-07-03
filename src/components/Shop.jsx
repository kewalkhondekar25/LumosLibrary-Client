import axios from 'axios';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { loadAllBooks, searchCartByName } from '../features/books/booksSlice';
import useFetch from '../hooks/useFetch';
import { Link } from 'react-router-dom';

const Shop = () => {

  const dispatch = useDispatch();
  const { books } = useSelector(store => store.books);
  const { data } = useFetch("http://localhost:8080/api/v1/books");

  const handleSearch = (e) => {
    dispatch(searchCartByName(e.target.value));
  };

  useEffect(() => {
    if (data) {
      dispatch(loadAllBooks(data));
    }
  }, [data, dispatch]);

  return (
    <section className="container mx-auto px-4 py-8">

      <div className="mb-5">
        <input
          type="text"
          placeholder="Search Book or Author"
          className="w-full p-2 text-white bg-[#353434] rounded"
          onChange={handleSearch}
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {books.map(item => (
          <Link to={`/book/${item._id}`} key={item._id}>
            <div className="flex flex-col items-center p-3">
              <img
                src={item.coverImage}
                alt={item.title}
                className="rounded-md"
              />
              <p className="mt-2 text-center text-lg font-semibold capitalize">{item.title}</p>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
};

export default Shop;
