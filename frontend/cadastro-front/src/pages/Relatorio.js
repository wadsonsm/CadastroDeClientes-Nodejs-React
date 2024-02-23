import React, { useEffect, useRef, useState } from 'react';
import axios from 'axios';
import ApexChart from 'react-apexcharts';
import { useReactToPrint } from 'react-to-print';
import '../App.css';

function Relatorio() {

    const contentDocument = useRef();
    const handlePrint = useReactToPrint({
        documentTitle:'Clientes gráfico',
        content: () => contentDocument.current
    });
    const [relatorio, setRelatorio] = useState([]);
    //const [series, setSeries] = useState([]);
    const [label, setLabel] = useState([]);
    const [sigla, setSigla] = useState([]);


    useEffect(() => {
        //const sigla = [];
        const total = [];
        axios.get('http://localhost:3001/relatorio')
            .then(response => {
                setRelatorio(response.data);
                response.data.map(item => {
                    console.log(item);
                    setSigla(item.uf)
                    total.push(item.idade);
                });
                verificaIndice(sigla)


            }).catch(err => console.log(err.message));
    }, []);

    const series = [44, 55, 13, 43, 22];
    const options = {
        chart: { width: 380, type: 'donut' },
        labels: Array.from(sigla)
    };

    function verificaIndice(arr) {
        let novaArr = arr.filter((este, i) => arr.indexOf(este) === i);
        setLabel(novaArr)
    }


    return (
        <div className='container'>
            <div className='actions'>
                <button className='btn btn-primary' onClick={handlePrint}>Imprimir</button>
            </div>
            <div ref={contentDocument} className='content'>
                <ApexChart
                    options={options}
                    series={series}
                    type='donut'
                    width={640}
                    height={480}
                />            
            </div>
        </div>
    )
}

export default Relatorio