import React, { useState, useEffect } from 'react';
import { fetchDailyData } from '../../api';
import { Line, Pie } from 'react-chartjs-2';

import styles from './chart.module.css';

const Chart = ({ data: { confirmed, deaths, recovered }, country }) => {
    const [dailyData, setDailyData] = useState([]);

    useEffect(() => {
        const fetchAPI = async () => {
            setDailyData(await fetchDailyData());
        }

        fetchAPI();
    }, []);

    const lineChart = (
        dailyData.length
        ? (
        <Line
            data={{
                labels: dailyData.map(({ date }) => date),
                datasets: [{
                    data: dailyData.map(({ confirmed }) => confirmed),
                    label: 'Infected',
                    borderColor: '#3333ff',
                    backgroundColor: 'rgba(0, 0, 255, 0.5)',
                    fill: true,
                }, {
                    data: dailyData.map(({ deaths }) => deaths),
                    label: 'Deaths',
                    borderColor: 'red',
                    backgroundColor: 'rgba(255, 0, 0, 0.5)',
                    fill: true,
                }],
            }}
            options={{
                tooltips: {
                callbacks: {
                    label: function(tooltipItem, data) {
                  var value = data.datasets[0].data[tooltipItem.index];
                  if(parseInt(value) >= 1000){
                             return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
                          } else {
                             return value;
                          }
              }
        } 
      }}}
        />) : null
    );

    const pieChart = (
        confirmed
        ? (
            <Pie 
            data={{
                labels: ['Infected', 'Recovered', 'Deaths'],
                datasets: [{
                    labels: ['Infected', 'Recovered', 'Deaths'],
                    backgroundColor: ['rgba(0, 0, 255, 0.5)',
                    'rgba(0, 255, 0, 0.5)',
                    'rgba(255, 0, 0, 0.5)',],
                    data:[confirmed.value, recovered.value, deaths.value],
                    fill: true,
                }]
            }}
            options={{
                legend: { display: true},
                title: { display: true, text:`Current state in ${country}`},
            tooltips: {
                callbacks: {
                    label: function(tooltipItem, data) {
                  var value = data.datasets[0].data[tooltipItem.index];
                  if(parseInt(value) >= 1000){
                             return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
                          } else {
                             return value;
                          }
              }
        } 
      }
}}
            />
        ) : null
    );

    return (
        <div className={styles.container}>
            {country ? pieChart : lineChart}
        </div>
    )
}

export default Chart;