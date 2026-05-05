import { type JSX } from 'react'
import { Formik, Form, Field,ErrorMessage } from "formik"
import * as Yup from 'yup';
import type { AppDispatch } from '../redux/store';
import { useDispatch } from 'react-redux';
import { register } from '../redux/auth/operations';
import toast from 'react-hot-toast';
 
interface MyFormValues {
   name: string;
   email: string;
  password: string;
  confirmPassword: string;
}

const RegistrationSchema = Yup.object().shape({
  name: Yup.string().min(2, 'Too Short!').required('Required'),
  email: Yup.string().email('Invalid email').required('Required'),
  password: Yup.string().min(6, 'Too Short!').required('Required'),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref('password')], 'Passwords must match')
    .required('Required'),
});

const RegistrationForm = (): JSX.Element => {
  const initialValues: MyFormValues = { name: '', email: '', password: '', confirmPassword: '' };
  
  const dispatch = useDispatch<AppDispatch>();


  const handleSubmit = (values: MyFormValues): void => {
    const { name, email, password } = values;
    dispatch(register({ name, email, password }))
      .unwrap()
      .then(() => {
      toast.success("Register successfully",{duration:2000})
      })
      .catch((e) => {
        if (e.status === 409) {
         return toast.error("Such email already exists",{duration:2000})
        }
      toast.error("Something went wrong",{duration:2000})
    })
  }

  return (
    <>
      <Formik
         initialValues={initialValues}
         onSubmit={handleSubmit}
         validationSchema={RegistrationSchema}
       >
         <Form className="flex flex-col gap-4">
           
          <Field className="p-4 border-[1px] border-gray-300 border-solid rounded-3xl" id="name" name="name" placeholder="Name" />
          <ErrorMessage name="name" component="span" className="text-red-500 text-sm" />
          
           
          <Field className="p-4 border-[1px] border-gray-300 border-solid rounded-3xl" id="email" name="email" placeholder="Email" />
          <ErrorMessage name="email" component="span" className="text-red-500 text-sm" />
           

          <Field className="p-4 border-[1px] border-gray-300 border-solid rounded-3xl" id="password" name="password" type="password" placeholder="Password" />
          <ErrorMessage name="password" component="span" className="text-red-500 text-sm" />

          <Field className="p-4 border-[1px] border-gray-300 border-solid rounded-3xl" id="confirmPassword" name="confirmPassword" type="password" placeholder="Confirm Password" />
          <ErrorMessage name="confirmPassword" component="span" className="text-red-500 text-sm" />
          
          <button type="submit" className="bg-[#F6B83D] text-white p-4 rounded-3xl">
            Registration
          </button>
          <p className="text-center">
            Already have an account? <a href="/login" className="text-[#F6B83D]">Login</a>
          </p>
         </Form>
       </Formik>
    </>
  )
}

export default RegistrationForm
