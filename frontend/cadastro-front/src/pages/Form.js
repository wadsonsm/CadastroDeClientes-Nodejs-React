import React, { useState } from 'react'
import Header from '../Header'
import { useEffect } from 'react'
import axios from 'axios';

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
      alert(response.data.dados.length + 'cadastro');
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
      <div>
          <Header title="React Form" />
      <form onSubmit={handleFormSubmit}>
          <fieldset>
            <legend>
                <h2>Dados de Cadastro</h2>
          </legend>
          
          <div>
            <label> Nome:
                <input type='text' name='txtNome' id='txtNome' onChange={handleInputChange} />
            </label>
          </div>

          <div>
            <label> Idade:
              <input type='number' name='txtIdade' id='txtIdade' onChange={handleInputChange} />
            </label>
          </div>

          <div>
            <label> UF:
              <select name='cmbUF' id='cmbUF' onChange={handleInputChange}>
                <option value="0">Selecione uma opção</option>
                {
                  estados.map((estado, index) => (
                    <option key={index} value={estado.sigla}>{estado.sigla}</option>
                  ))
                }
              </select>
            </label>
          </div>

          <input type='submit' value="Salvar"/>

          </fieldset>
        </form>
      </div>
  )
}

export default Form