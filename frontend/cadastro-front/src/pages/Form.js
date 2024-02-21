import React, { useState } from 'react'
import { useEffect } from 'react'
import axios from 'axios';
import Footer from './Footer';


const Form = () => {
  const [estados, setEstados] = useState([]);
  const [campos, setCampos] = useState({
    txtNome: '',
    txtIdade: 0,
    cmbUF: '0'
  });

  function handleInputChange(event) {
    campos[event.target.name] = event.target.value;
    setCampos(campos);
  }

  function handleFormSubmit(event) {
    event.preventDefault();
    console.log(campos);

    axios.post('http://localhost:3001/cadastro', campos).then(response => {
      alert(response.data.dados.length + ' cadastro realizado com sucesso');
    })

    event.target.txtNome.value = ''
    event.target.txtIdade.value = 0
    event.target.cmbUF.value = '0'

    setCampos({});
  }

  useEffect(() => {
    axios.get('https://servicodados.ibge.gov.br/api/v1/localidades/estados')
      .then(response => {
        setEstados(response.data);
        console.log(response.data)
      }).catch(err => console.log(err.message));
  }, []);

  return (
    <>

      <div className='container mb-3 row' style={{ paddingTop: '30px', paddingLeft: '100px' }}>
        <form onSubmit={handleFormSubmit}>

          <div className="mb-3 col-sm-6">
            <label className="form-label"> Nome: </label>
            <input type='text' className="form-control" name='txtNome' id='txtNome' onChange={handleInputChange} />
          </div>

          <div className="mb-3 col-sm-6">
            <div className='row'>
              <div className='col-sm'>
                <label className="form-label"> Idade:</label>
                <input type='number' className="form-control" min={0} name='txtIdade' id='txtIdade' onChange={handleInputChange} />
              </div>
              <div className='col-sm'>
                <label className="form-label"> UF: </label>
                <select className="form-select" name='cmbUF' id='cmbUF' onChange={handleInputChange}>
                  <option value="0">Selecione uma opção</option>
                  {
                    estados.map((estado, index) => (
                      <option key={index} value={estado.sigla}>{estado.sigla}</option>
                    ))
                  }
                </select>
              </div>
            </div>
          </div>

          <div className="mb-3 col-sm-2 row container">
            <button type="submit" className="btn btn-primary">Salvar</button>
          </div>


        </form>
        <Footer />
      </div>
    </>
  )
}

export default Form;