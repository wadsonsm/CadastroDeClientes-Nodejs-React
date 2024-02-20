import React, { useEffect, useState } from 'react';
import axios from 'axios';

function Relatorio() {

    const [relatorio, setRelatorio] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:3001/')
            .then(response => {
                setRelatorio(response.data);
                console.log(response.data)
            }).catch(err => console.log(err.message));
    }, []);

    

  return (
    <div>Relatorio</div>
  )
}

export default Relatorio