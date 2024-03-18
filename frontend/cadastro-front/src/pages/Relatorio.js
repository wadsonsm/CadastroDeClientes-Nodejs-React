import React, { useEffect, useRef, useState } from 'react';
import axios from 'axios';
import ApexChart from 'react-apexcharts';
import { useReactToPrint } from 'react-to-print';
import '../App.css';
import thinkIcon from '../images/thinking-22063.png'

function Relatorio() {

    const contentDocument = useRef();
    const handlePrint = useReactToPrint({
        documentTitle: 'Clientes gráfico',
        content: () => contentDocument.current
    });

    const [siglas] = useState([]);
    const [isVisible, setIsVisible] = useState(true);
    const [series, setSeries] = useState([]);
    const options = {
        chart: { width: 380, type: 'donut' },
        labels: Array.from(siglas)
    };    

    useEffect(() => {

        axios.get('http://localhost:3001/relatorio')
            .then(response => {
                //console.log(response.data)        
                montaArray(response.data);
                if (response.data.length === 0)
                    setIsVisible(false);

            }).catch(err => console.log(err.message));
    }, []);

    function montaArray(data) {

        const totais = [];
        let qtde = 0;
        let indice = 0;

        for (let index = 0; index < data.length; index++) {            
            if (siglas.find((item) => item === data[index].uf)) {
                indice = siglas.indexOf(data[index].uf);
                console.log(totais[indice] = totais[indice]+1)
            } else {
                siglas.push(data[index].uf);
                totais.push(++qtde);
                qtde = 0;
            }
        }
        console.log(siglas)
        console.log(totais)
        setSeries(totais)
    }


    return (
        <div className='container'>
            {
                isVisible ?
                    <>
                        <div className='actions'>
                            <button className='btn btn-primary' onClick={handlePrint}>Imprimir</button>
                        </div>
                        <div ref={contentDocument} className='content'>
                            <h1 style={{ color: "#49514D" }}>Relação Clientes/total por estado</h1>
                            <ApexChart
                                options={options}
                                series={series}
                                type='donut'
                                width={640}
                                height={480}
                            />
                        </div>
                    </>
                    :
                    <div>
                        <img src={thinkIcon} style={{ width: '25%', margin: "0 350px auto" }} />
                    </div>
            }
        </div>
    )
}

export default Relatorio