import type { JSX } from "react"
import { Formik, Form, Field,ErrorMessage } from "formik"
 import * as Yup from 'yup';
import { useDispatch } from "react-redux";
import { login } from "../redux/auth/operations";
import type { AppDispatch } from "../redux/store";
import toast from 'react-hot-toast';

 interface MyFormValues {
   email: string;
   password: string;
}
 const LoginSchema = Yup.object().shape({
  email: Yup.string().email('Invalid email').required('Required'),
  password: Yup.string().min(6, 'Too Short!').required('Required'),
});


const LoginForm = (): JSX.Element => {
  const initialValues: MyFormValues = { email: '', password: '' };
  
  const dispatch = useDispatch<AppDispatch>();


  const handleSubmit = (values: MyFormValues): void => {
    dispatch(login(values))
      .unwrap()
      .then(() => {
        toast.success("Login successfully",{duration:2000});
      })
      .catch((error) => {
        if (error.status === 401) {
          return toast.error("Email or password invalid",{duration:2000})
        }
        toast.error("Something went wrong",{duration:2000})
      });
  }

  return (
    <>
      <Formik
         initialValues={initialValues}
         onSubmit={handleSubmit}
         validationSchema={LoginSchema}
       >
         <Form className="flex flex-col gap-4">
           
          <Field className="p-4 border-[1px] border-gray-300 border-solid rounded-3xl" id="email" name="email" placeholder="Email" />
          <ErrorMessage name="email" component="span" className="text-red-500 text-sm" />
          
           
          <Field className="mb-4 p-4 border-[1px] border-gray-300 border-solid rounded-3xl" id="password" name="password" type="password" placeholder="Password" />
          <ErrorMessage name="password" component="span" className="text-red-500 text-sm" />

           <button type="submit" className="bg-[#F6B83D] text-white p-4 rounded-3xl">
             Log In
          </button>
          <p className="text-center mt-2">
            Don't have an account? <a href="/register" className="text-[#F6B83D]">Register here</a>
          </p>
         </Form>
       </Formik>
    </>
  )
}

export default LoginForm
