import React from 'react'
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as yup from "yup"

const signUpSchema = yup.object({
  name: yup.string().min(3, "Name must be at least 3 characters").required("Whoops! Looks like Name is Required."),
  email: yup.string().email("Whoops! Looks like the e-mail is Invalid.").required("Whoops! Looks like the e-mail is Required."),
  password: yup.string().required("Whoops! Looks like the Password is Required."),
});


const SignUp = () => {

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
        onSubmit={values => handleRegister(values)}>
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