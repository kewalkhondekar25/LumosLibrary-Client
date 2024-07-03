import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { useCookies } from 'react-cookie';
import { useNavigate } from 'react-router-dom';

const Profile = () => {
  const [cookies, setCookie, removeCookie] = useCookies();
  const [data, setData] = useState([]);
  const navigate = useNavigate();

  const getPurchaseData = async () => {
    try {
      const response = await axios.get("http://localhost:8080/api/v1/purchase", {
        headers: {
          Authorization: `${cookies["accessToken"]}`
        }
      });
      const result = response.data;
      if (result) {
        setData(result.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getPurchaseData();
  }, []);

  const handleLogOut = () => {
    removeCookie('accessToken');
    navigate("/signin");
  };

  return (
    <section className='flex flex-col h-screen justify-center items-center p-4'>
      <div className='flex gap-4 mb-4'>
        <div className='flex flex-col items-center cursor-pointer' onClick={handleLogOut}>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="h-8 w-8">
            <path strokeLinecap="round" strokeLinejoin="round" d="M5.636 5.636a9 9 0 1 0 12.728 0M12 3v9" />
          </svg>
          <span className='mt-1'>Logout</span>
        </div>
        <div className='flex flex-col items-center'>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="h-8 w-8">
            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" />
          </svg>
          <span className='mt-1 capitalize'>{cookies['first-id']}</span>
        </div>
      </div>
      <div className='w-full max-w-screen-lg mx-auto'>
        <div className='text-lg font-semibold mb-4'>Your Orders</div>
        <div className='overflow-x-auto'>
          <table className="table-auto w-full border-collapse border border-gray-200">
            <thead>
              <tr className='bg-gray-100 text-black'>
                <th className="border border-gray-300 px-4 py-2 text-left">ORDER PLACED ON</th>
                <th className="border border-gray-300 px-4 py-2 text-left">ORDER ID</th>
                <th className="border border-gray-300 px-4 py-2 text-left">SHIPPED</th>
                <th className="border border-gray-300 px-4 py-2 text-left">QTY</th>
                <th className="border border-gray-300 px-4 py-2 text-left">TOTAL</th>
              </tr>
            </thead>
            <tbody>
              {data.map((item, index) => {
                const date = new Date(item.createdAt);
                const options = { year: 'numeric', month: '2-digit', day: '2-digit' };
                const orderDate = date.toLocaleDateString(undefined, options);

                return (
                  <tr key={index} className={index % 2 === 0 ? 'bg-white text-black' : 'bg-gray-50'}>
                    <td className="border border-gray-300 px-4 py-2">{orderDate}</td>
                    <td className="border border-gray-300 px-4 py-2">{item._id}</td>
                    <td className="border border-gray-300 px-4 py-2">{item.address}</td>
                    <td className="border border-gray-300 px-4 py-2">{item.itemsCount}</td>
                    <td className="border border-gray-300 px-4 py-2">{item.purchaseTotal}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
};

export default Profile;
