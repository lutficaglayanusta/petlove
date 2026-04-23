import { Suspense } from 'react'
import { Route,Routes } from 'react-router-dom'


import './App.css'

function App() {

  return (
    <>
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          <Route path='/' element={<div>Home</div>} />
        </Routes>
      </Suspense>
    </>
  )
}

export default App
