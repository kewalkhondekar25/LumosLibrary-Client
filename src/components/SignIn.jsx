import React, { useEffect, useState } from 'react'
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as yup from "yup"
import { Link, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import axios from 'axios';
import { useCookies } from 'react-cookie';

const SignIn = () => {

  const navigate = useNavigate();
  const [cookies, setCookie, removeCookie] = useCookies();

  const handleSignIn = async (payload) => {
    const loadingToast = toast.loading("Signing in progress...");
    try {
      loadingToast;
      const response = await axios.post("https://lumos-library-server.vercel.app/api/v1/user/login", payload);
      if (response.status === 201) {
        toast.dismiss(loadingToast);
        toast.success("SignIn Success");
        setCookie("accessToken", response.data.token);
        setCookie("first-id", response.data.data.name);
        setCookie("second-id", response.data.data.email);
        navigate("/shop");
        return
      }
    } catch (error) {
      console.log(error);
      console.log(error.response.data.message);
      toast.dismiss(loadingToast);
      toast.error("Invalid Credentials")
    }
  };
  useEffect(() => {
    console.log("Hello:)");
  }, [])
  return (
    <section className='flex flex-col justify-center items-center h-screen'>
      <Formik
        initialValues={{
          email: "",
          password: "",
        }}
        validationSchema={yup.object({
          email: yup.string().email().required(),
          password: yup.string().required(),
        })}
        onSubmit={(values) => handleSignIn(values)}
      >
        <Form className='w-full max-w-sm'>
          <div className='mb-4'>
            <label htmlFor="email" className='block text-white'>Your Email</label>
            <Field
              type="text"
              name="email"
              id="email"
              placeholder='Email'
              className='bg-[#161921] border border-gray-300 text-white py-2 px-3 rounded w-full mt-1'
            />
            <ErrorMessage name="email" component="div" className='text-red-500 text-sm mt-1' />
          </div>
          <div className='mb-4'>
            <label htmlFor="password" className='block text-white'>Your Password</label>
            <Field
              type="password"
              name="password"
              id="password"
              placeholder='Password'
              className='bg-[#161921] border border-gray-300 text-white py-2 px-3 rounded w-full mt-1'
            />
            <ErrorMessage name="password" component="div" className='text-red-500 text-sm mt-1' />
          </div>
          <button
            type="submit"
            className='bg-[#FAFAFA] text-black p-2 rounded mt-4 w-full'
          >
            SignIn
          </button>
        </Form>
      </Formik>
      <div className='flex gap-1 text-sm mt-4'>
        <p>New User?</p>
        <Link to="/signup" className='underline'>SignUp</Link>
      </div>
    </section>
  )
}

export default SignIn