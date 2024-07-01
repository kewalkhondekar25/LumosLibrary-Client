import React, { useState } from 'react'
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as yup from "yup"
import { useNavigate } from 'react-router-dom';
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
      const response = await axios.post("http://localhost:8080/api/v1/user/login", payload);
      if (response.status === 201) {
        toast.dismiss(loadingToast);
        toast.success("SignIn Success");
        setCookie("your-cookie", response.data.token);
        setCookie("first-id", response.data.data.name);
        setCookie("second-id", response.data.data.email);
        navigate("/");
        return
      }
    } catch (error) {
      console.log(error);
      console.log(error.response.data.message);
      toast.dismiss(loadingToast);
      toast.error("Invalid Credentials")
    }
  };
  return (
    <section className='flex flex-col justify-center place-items-center h-screen'>
      <Formik
        initialValues={{
          email: "",
          password: "",
        }}
        validationSchema={yup.object({
          email: yup.string().email().required(),
          password: yup.string().required(),
        })}
        onSubmit={values => handleSignIn(values)}>
        <Form>
          {
            <div>
              <dl>
                <dt>Your Email</dt>
                <dd>
                  <Field type="text" name="email" placeholder='Email'
                    className='bg-[#161921] border' />
                </dd>
                <dd className='text-red-500'><ErrorMessage name="email" /></dd>
                <dt>Your Password</dt>
                <dd>
                  <Field type="text" name="password" placeholder='Password'
                    className='bg-[#161921] border' />
                </dd>
                <dd className='text-red-500'><ErrorMessage name="password" /></dd>
              </dl>
              <button className='bg-slate-50 text-black'>SignIn</button>
            </div>
          }
        </Form>
      </Formik>
    </section>
  )
}

export default SignIn