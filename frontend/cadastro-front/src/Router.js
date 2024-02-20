import React from 'react'
import { Route, Routes, BrowserRouter } from 'react-router-dom';
import './App.css';

import Home from './pages/Home';
import Form from './pages/Form';
import Relatorio from './pages/Relatorio';
import { Link } from 'react-router-dom';

const Router = () => {
  return (
      <BrowserRouter>
          <nav className="navbar navbar-expand-lg bg-success-subtle">
              <div className="container-fluid">                  
                  <Link className="navbar-brand" to="/">Home</Link>
                  <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
                      <span className="navbar-toggler-icon"></span>
                  </button>
                  <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
                      <div className="navbar-nav">
                          <Link className="nav-link" to="/cadastro">Cadastro</Link>
                      </div>
                      <div className="navbar-nav">
                          <Link className="nav-link" to="/relatorio">Relatório Clientes</Link>
                      </div>
                  </div>
              </div>              
          </nav>

          <Routes>              
              <Route element={<Home />} path='/' exact />
              <Route element={<Form />} path='/cadastro' />
              <Route element={<Relatorio />} path='/relatorio' />
          </Routes>
          
      </BrowserRouter>
      
  )
}

export default Router