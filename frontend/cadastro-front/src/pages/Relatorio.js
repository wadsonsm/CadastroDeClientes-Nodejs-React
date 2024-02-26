import React, { useEffect, useRef, useState } from 'react';
import axios from 'axios';
import ApexChart from 'react-apexcharts';
import { useReactToPrint } from 'react-to-print';
import '../App.css';
import thinkIcon from '../images/thinking-22063.png'

function Relatorio() {

    const contentDocument = useRef();
    const handlePrint = useReactToPrint({
        documentTitle:'Clientes gráfico',
        content: () => contentDocument.current
    });
    const [relatorio, setRelatorio] = useState([]);    
    const [label, setLabel] = useState([]);
    const [sigla, setSigla] = useState([]);
    const [isVisible, setIsVisible] = useState(true);

    useEffect(() => {        
        const total = [];
        axios.get('http://localhost:3001/relatorio')
            .then(response => {
                setRelatorio(response.data);
                console.log(response.data.length)
                if (response.data.length == 0) {
                    setIsVisible(false);
                }
                // response.data.map(item => {
                //     console.log(item);
                //     setSigla(item.uf)
                //     total.push(item.idade);
                // });
                //verificaIndice(sigla)
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
            {
                isVisible ?
                    <>
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
                    </>
                    : 
                    <div>
                        <img src={thinkIcon} style={{ width: '25%', margin: "0 350px auto"}} />
                    </div>
            }            
        </div>
    )
}

export default Relatorio