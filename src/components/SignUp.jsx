import React, { useState } from 'react'
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as yup from "yup"
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import axios from 'axios';

const SignUp = () => {

  const navigate = useNavigate();
  const [errorMsg, setErrorMsg] = useState();

  const handleSignUp = async(payload) => {
  const loadingToast = toast.loading("Signup in Progress...")
    try {
      loadingToast;
      const response = await axios.post("http://localhost:8080/api/v1/user/register", payload);
      if(response.status === 201){
        toast.dismiss(loadingToast);
        navigate("/signin");
        toast.success(`${response.data.message}`)
        setError("");
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
    <section className='flex flex-col justify-center place-items-center h-screen'>
      <Formik
        initialValues={{
          name: "",
          email: "",
          password: "",
        }}
        validationSchema={yup.object({
          name: yup.string().required().min(3, "Minimum 3 Charecters Required"),
          email: yup.string().email().required(),
          password: yup.string().required(),
        })}
        onSubmit={values => handleSignUp(values)}>
        <Form>
          {
            <div>
              <dl>
                <dt>Your Name</dt>
                <dd>
                  <Field type="text" name="name" placeholder='Name'
                    className='bg-[#161921] border' />
                </dd>
                <dd className='text-red-500'><ErrorMessage name="name" /></dd>
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
              <button className='bg-slate-50 text-black'>SignUp</button>
            </div>
          }
        </Form>
      </Formik>
    </section>
  )
}

export default SignUp