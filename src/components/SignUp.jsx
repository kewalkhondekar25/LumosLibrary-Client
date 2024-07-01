import React from 'react'
import { useFormik } from 'formik'
import * as yup from "yup"

const signUpSchema = yup.object({
  name: yup.string().min(3, "Name must be at least 3 characters").required("Whoops! Looks like Name is Required."),
  email: yup.string().email("Whoops! Looks like the e-mail is Invalid.").required("Whoops! Looks like the e-mail is Required."),
  password: yup.string().required("Whoops! Looks like the Password is Required."),
});


const SignUp = () => {

  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: ""
    },
    validationSchema: signUpSchema,
    onSubmit: (values) => console.log(values)
  })
  return (
    <section>
      <input type="text" placeholder='name'/>
      <input type="text" placeholder='email'/>
      <input type="text" placeholder='password'/>
    </section>
  )
}

export default SignUp