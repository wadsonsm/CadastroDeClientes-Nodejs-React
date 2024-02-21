import React, { useEffect, useState } from 'react';
import axios from 'axios';
import ApexChart from 'react-apexcharts';

function Relatorio() {

    const [relatorio, setRelatorio] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:3001/relatorio')
            .then(response => {
                setRelatorio(response.data);
                console.log(JSON.stringify(response))
            }).catch(err => console.log(err.message));
    }, []);

    const options = {

        chart: {
            toolbar: {
                show: false
            },
        },
        xaxis: { type: 'datetime' },
        yaxis: {
            tooltip: {
                enabled: true
            }
        }
    }

    const series = [{
        data: [{
            x: relatorio.uf,
            y: relatorio.idade
        }]
    }]


    return (
        <div>
            <ApexChart
                options={options}
                series={series}
                type='candlestick'
                width={640}
                height={480}
            />
        </div>
    )
}

export default Relatorio