import { type JSX } from 'react'
import { Formik, Form, Field } from "formik"
import * as Yup from 'yup';
import type { AppDispatch } from '../redux/store';
import { useDispatch } from 'react-redux';
import { register } from '../redux/auth/operations';
 
interface MyFormValues {
   name: string;
   email: string;
   password: string;
}

const RegistrationSchema = Yup.object().shape({
  name: Yup.string().min(2, 'Too Short!').required('Required'),
  email: Yup.string().email('Invalid email').required('Required'),
  password: Yup.string().min(6, 'Too Short!').required('Required'),
});

const RegistrationForm = (): JSX.Element => {
  const initialValues: MyFormValues = { name: '', email: '', password: '' };
  
  const dispatch = useDispatch<AppDispatch>();


  const handleSubmit = (values: MyFormValues): void => {
    console.log(values);
    dispatch(register(values));
  }

  return (
    <>
      <Formik
         initialValues={initialValues}
         onSubmit={handleSubmit}
         validationSchema={RegistrationSchema}
       >
         <Form>
           <label htmlFor="name">Name</label>
          <Field id="name" name="name" placeholder="Name" />
          
           <label htmlFor="email">Email</label>
          <Field id="email" name="email" placeholder="Email" />
          
           <label htmlFor="password">Password</label>
          <Field id="password" name="password" type="password" placeholder="Password" />
          
           <button type="submit">Submit</button>
         </Form>
       </Formik>
    </>
  )
}

export default RegistrationForm
