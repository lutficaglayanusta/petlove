import { lazy, Suspense, use, useEffect } from 'react'
import { Route, Routes } from 'react-router-dom'
import PrivateRoute from './components/PrivateRoute'
import RestrictedRoute from './components/RestrictedRoute'
import Header from './components/Header'
import { useDispatch, useSelector } from 'react-redux'
import { selectRefreshing } from './redux/auth/selector'
import type { AppDispatch } from './redux/store'
import { refreshUser } from './redux/auth/operations'



const HomePage = lazy(() => import('./pages/HomePage'))
const LoginPage = lazy(() => import('./pages/LoginPage'))
const RegisterPage = lazy(() => import('./pages/RegistrationPage'))

function App() {

  const isRefreshing = useSelector(selectRefreshing);

  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {

    dispatch(refreshUser());
  }, [dispatch]);

  return isRefreshing ? (
    <div>Loading...</div>
  ) : (
    <>
      <Header />
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          <Route path='/' element={<HomePage />} />
          <Route path='/login' element={<RestrictedRoute redirectTo='/' component={LoginPage} />} />
          <Route path='/register' element={<RestrictedRoute redirectTo='/' component={RegisterPage} />} />
        </Routes>
      </Suspense>
    </>
  )
}

export default App
