import React, { useState, useEffect } from 'react';
import { fetchDailyData } from '../../api';
import { Bar, Line } from 'react-chartjs-2';
import styles from './Chart.module.css';

const Chart = ({ data: { confirmed, recovered, deaths }, country, countryData }) => {
    const [dailyData, setDailyData] = useState([]);
    useEffect(() => {
        const getDailyData = async () => {
            setDailyData(await fetchDailyData());
        }
        getDailyData();
    }, []);

    const lineChart = (
        dailyData.length ? (
            <Line
                data={{
                    labels: dailyData.map(({ date }) => date),
                    datasets: [{
                        data: dailyData.map(({ confirmed }) => confirmed),
                        label: 'Infected',
                        borderColor: '#3333ff',
                        fill: true,
                    }, {
                        data: dailyData.map(({ deaths }) => deaths),
                        label: 'Deaths',
                        borderColor: 'red',
                        backgroundColor: 'rgba(255,0,0,0.5)',
                        fill: true,
                    }],
                }}
            />) : 'ERROR'
    )
    console.log(countryData);
    let top5 = countryData
    if (countryData !== null) {
        // top5 = countryData.slice(5);     
        console.log(top5);
    }
    const statesBarChart = (
        countryData ? (<Bar

            data={{
                labels: countryData.map((state) => state.state ? state.state : 'All states'),
                datasets: [{
                    data: countryData.map(({ confirmed }) => confirmed),
                    label: 'Confirmed',
                    backgroundColor: 'rgba(0, 0, 255, 0.5)'

                }, {
                    data: countryData.map(({ recovered }) => recovered),
                    label: 'Recovered',
                    backgroundColor: 'rgba(0, 255, 0, 0.5)'

                }, {
                    data: countryData.map(({ deaths }) => deaths),
                    label: 'Deaths',
                    backgroundColor: 'rgba(255, 0, 0, 0.5)'
                }]
            }}
            options={{
                scales: {
                    xAxes: [{
                        stacked: false
                    }],
                    yAxes: [{
                        stacked: false,
                        ticks: {
                            beginAtZero: true,
                            callback: function (label, index, labels) {
                                return Intl.NumberFormat('hi').format(label);
                            }
                        }
                    }]
                },
                hover: {
                    mode: 'label',
                    intersect: false,
                    callback: function (label, index, labels) {
                        return Intl.NumberFormat('hi').format(label);
                    }
                }
            }}
        />) : null
    );


    const barChart = (
        confirmed ? (<Bar
            data={{
                labels: ['Infected', 'Recovered', 'Deaths'],
                datasets: [{
                    data: [confirmed.value, recovered.value, deaths.value],
                    label: 'People',
                    backgroundColor: [
                        'rgba(0, 0, 255, 0.5)',
                        'rgba(0, 255, 0, 0.5)',
                        'rgba(255, 0, 0, 0.5)'
                    ]
                }]
            }}
            options={{
                legend: { display: false },
                title: { display: true, text: `Current state in ${country}` },
                // maintainAspectRatio: false,
                // responsive: true,
            }}
        />) : null
    );

    return (
        <div className={styles.container}>
            {country && country !== 'global' ? barChart : lineChart}
            {country && country !== 'global' && countryData[0] && countryData[0].state ? statesBarChart : null}
        </div>
    )
}

export default Chart
