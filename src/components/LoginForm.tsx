import type { JSX } from "react"
import { Formik, Form, Field } from "formik"
 import * as Yup from 'yup';
import { useDispatch } from "react-redux";
import { login } from "../redux/auth/operations";
import type { AppDispatch } from "../redux/store";

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
    console.log(values);
    dispatch(login(values));
  }

  return (
    <>
      <Formik
         initialValues={initialValues}
         onSubmit={handleSubmit}
         validationSchema={LoginSchema}
       >
         <Form>
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

export default LoginForm
