import { lazy, Suspense } from 'react'
import { Route, Routes } from 'react-router-dom'
import PrivateRoute from './components/PrivateRoute'
import RestrictedRoute from './components/RestrictedRoute'
import Header from './components/Header'



const HomePage = lazy(() => import('./pages/HomePage'))
const LoginPage = lazy(() => import('./pages/LoginPage'))
const RegisterPage = lazy(() => import('./pages/RegistrationPage'))

function App() {

  return (
    <>
      <Header />
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          <Route path='/login' element={<RestrictedRoute redirectTo='/' component={LoginPage} />} />
          <Route path='/register' element={<RestrictedRoute redirectTo='/' component={RegisterPage} />} />
        </Routes>
      </Suspense>
    </>
  )
}

export default App
