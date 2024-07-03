import React, { useState } from 'react'
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as yup from "yup"
import { Link, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import axios from 'axios';

const SignUp = () => {

  const navigate = useNavigate();
  const [errorMsg, setErrorMsg] = useState();

  const handleSignUp = async(payload) => {
  const loadingToast = toast.loading("Signup in Progress...")
    try {
      loadingToast;
      const response = await axios.post("https://lumos-library-server.vercel.app/api/v1/user/register", payload);
      if(response.status === 201){
        toast.dismiss(loadingToast);
        navigate("/signin");
        toast.success(`${response.data.message}`)
        return; 
      }
    } catch (error) {
      console.log(error);
      toast.dismiss(loadingToast);
      setErrorMsg(error.response.data.message);
      toast.error("Username or email already exists")
    }
  };

  return (
    <section className='flex flex-col justify-center items-center h-screen'>
      <Formik
        initialValues={{
          name: "",
          email: "",
          password: "",
        }}
        validationSchema={yup.object({
          name: yup.string().required().min(3, "Minimum 3 Characters Required"),
          email: yup.string().email().required(),
          password: yup.string().required(),
        })}
        onSubmit={(values) => handleSignUp(values)}
      >
        <Form className='w-full max-w-sm'>
          <div className='mb-4'>
            <label htmlFor="name" className='block text-white'>Your Name</label>
            <Field
              type="text"
              name="name"
              id="name"
              placeholder='Name'
              className='bg-[#161921] border border-gray-300 text-white py-2 px-3 rounded w-full mt-1'
            />
            <ErrorMessage name="name" component="div" className='text-red-500 text-sm mt-1' />
          </div>
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
            SignUp
          </button>
        </Form>
      </Formik>
      <div className='flex gap-1 text-sm mt-4'>
        <p>Existing User?</p>
        <Link to="/signin" className='underline'>SignIn</Link>
      </div>
    </section>
  )
}

export default SignUp