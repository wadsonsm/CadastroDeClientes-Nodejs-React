import React, { useState } from 'react'
import '../App.css';
import { useEffect } from 'react'
import axios from 'axios';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { object, string } from 'yup';

const schema = object({
  name: string().required("Nome obrigatório"),
  txtIdade: string().required("Idade obrigatório"),
  cmbUF: string().required("UF obrigatória").min(2, "Você precisa escolher uma UF"),
});

const Form = () => {
  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(schema)
  });
  const [estados, setEstados] = useState([]);
  const [campos, setCampos] = useState({});

  const handleInputChange = (event) => {
    campos[event.target.name] = event.target.value;
    setCampos(campos);
  }

  const handleFormSubmit = (event) => {
    //event.preventDefault();
    console.log(campos);

    axios.post('http://localhost:3001/cadastro', campos).then(response => {
      alert(response.data.dados.length + ' cadastro realizado com sucesso');
    });
    
    document.getElementsByTagName('form')[0].reset();
    setCampos([]);    
    console.log(campos);
    window.location.reload();    
  }
  

  useEffect(() => {
    axios.get('https://servicodados.ibge.gov.br/api/v1/localidades/estados')
      .then(response => {
        setEstados(response.data);
        //console.log(response.data)
      }).catch(err => console.log(err.message));
  }, []);

  return (
    <>
      <div className='container mb-3 row' style={{ paddingTop: '30px', paddingLeft: '100px' }}>
        <form onSubmit={handleSubmit(handleFormSubmit)}>
          <div className="mb-3 col-sm-6">
            <label className="form-label"> Nome: </label>
            <input type='text' {...register('name')} className="form-control" value={campos.name} name='name' id='name' onChange={handleInputChange} />
            <span className='error'>{errors.name?.message}</span>
          </div>

          <div className="mb-3 col-sm-6">
            <div className='row'>
              <div className='col-sm'>
                <label className="form-label"> Idade:</label>
                <input type='number' {...register('txtIdade')} className="form-control" min={0} name='txtIdade' id='txtIdade' onChange={handleInputChange} />
                <span className='error'>{errors.txtIdade?.message}</span>
              </div>
              <div className='col-sm'>
                <label className="form-label"> UF: </label>
                <select className="form-select" {...register('cmbUF')} name='cmbUF' id='cmbUF' onChange={handleInputChange}>
                  <option value="0">Selecione uma opção</option>
                  {
                    estados.map((estado, index) => (
                      <option key={index} value={estado.sigla}>{estado.sigla}</option>
                    ))
                  }
                </select>
                <span className='error'>{errors.cmbUF?.message}</span>
              </div>
            </div>
          </div>

          <div className="mb-3 col-sm-2 row container">
            <button type="submit" className="btn btn-primary">Salvar</button>
          </div>

        </form>

      </div>
    </>
  )
}

export default Form;