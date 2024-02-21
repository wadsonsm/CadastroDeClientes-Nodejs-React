import React, { useEffect, useState } from 'react';
import axios from 'axios';
import ApexChart from 'react-apexcharts';

function Relatorio() {

    const [relatorio, setRelatorio] = useState([]);
    //const [series, setSeries] = useState([]);
    //const [labels, setLabels] = useState([]);
    

    useEffect(() => {
        axios.get('http://localhost:3001/relatorio')
            .then(response => {
                setRelatorio(response.data);
                listarUF(response.data);
                console.log(relatorio)
            }).catch(err => console.log(err.message));
    }, []);

    const options = { chart: {} };
    const series = [44, 55, 41, 17, 15];    
    //const labels = ['A', 'B', 'C', 'D', 'E'];

    function listarUF(data) {
        let arr = [];
        let newIndice;
        data.forEach(element => {
            arr.push(element.uf)
        });

        newIndice = verificaIndice(arr)
        //console.log(newIndice)
       // setLabels(newIndice);
    }

    function verificaIndice(arr) {
        let novaArr = arr.filter((este, i) => arr.indexOf(este) === i);
        //console.log(novaArr);
        return novaArr
    }

    function listarValores(data){

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