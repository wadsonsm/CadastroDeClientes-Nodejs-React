import React from 'react'
import { Route, Routes, BrowserRouter } from 'react-router-dom';

import Home from './pages/Home';
import Form from './pages/Form';

const Router = () => {
  return (
      <BrowserRouter>
          <Routes>
              <Route element={<Home />} path='/' exact />
              <Route element={<Form />} path='/cadastro' />
          </Routes>
      </BrowserRouter>
  )
}

export default Router