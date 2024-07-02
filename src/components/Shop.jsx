import axios from 'axios'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { loadAllBooks } from '../features/books/booksSlice';
import useFetch from '../hooks/useFetch';
import toast from 'react-hot-toast';
import { Link } from 'react-router-dom';



const Shop = () => {

  const dispatch = useDispatch();
  const {books, qty} = useSelector(store => store.books);

  const { data, isLoading, errorMessage } = useFetch("http://localhost:8080/api/v1/books");
  
  useEffect(() => {
    if(data){
      dispatch(loadAllBooks(data));
    }
  }, [data]);

  return (
    <section className='flex flex-wrap justify-center'>
      {
        data.map(item => {
          return (
            <Link to={`/book/${item._id}`} key={item._id}>
              <div  className='flex  flex-col p-3 justify-center place-items-center' >
                <img height={250} width={250} src={item.coverImage} alt={item.coverImage} />
                <p className='font-bold'>{item.title}</p>
              </div>
            </Link>
          )
        })
      }
    </section>
  )
}

export default Shop