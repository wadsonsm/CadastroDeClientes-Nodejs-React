import React, { useEffect, useState } from 'react';
import axios from 'axios';
import ApexChart from 'react-apexcharts';

function Relatorio() {

    const [relatorio, setRelatorio] = useState([]);
    //const [series, setSeries] = useState([]);
    const [label, setLabel] = useState([]);


    useEffect(() => {
        const sigla = [];
        const total = [];
        axios.get('http://localhost:3001/relatorio')
            .then(response => {
                setRelatorio(response.data);
                response.data.map(item => {
                    console.log(item);
                    sigla.push(item.uf)
                    total.push(item.idade);
                });
            verificaIndice(sigla)

                
            }).catch(err => console.log(err.message));
    }, []);

    const series = [44, 55, 13, 43, 22];
    const options = {
        chart: { width: 380, type: 'donut' },
        labels: Array.from(label)
    };    

    function verificaIndice(arr) {
        let novaArr = arr.filter((este, i) => arr.indexOf(este) === i);
        setLabel(novaArr)
    }


    return (
        <div>
            <ApexChart
                options={options}
                series={series}
                type='donut'
                width={640}
                height={480}
            />
        </div>
    )
}

export default Relatorio