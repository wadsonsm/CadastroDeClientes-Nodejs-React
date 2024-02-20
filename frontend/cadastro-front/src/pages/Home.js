import React from 'react'
import logo from '../images/cadastro.png'
import { useState } from 'react';
import '../App.css';


const Home = () => {
    
  return (
      <div className="App">
      <h1 className='title01'>Cadastro de Clientes</h1>  
          <div>
            <img src={logo} alt="sem imagem" />
          </div>
      </div>
  )
}

export default Home;