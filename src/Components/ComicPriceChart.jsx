import React, { useEffect, useState } from "react";
import { Line } from "react-chartjs-2"
import {Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from "chart.js";

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend)

const ComicPriceChart = ({ id }) => {
    const [priceData, setPriceData] = useState([]);

    useEffect(() => {
        const fetchPriceData = async () => {
            const url = `https://gateway.marvel.com/v1/public/comics/${id}?ts=${ts}&apikey=${publicKey}&hash=${hash}`
              const response = await fetch(url);
              const json = await response.json();
              
              if (json.data && json.data.results.length > 0) {
                const comic = json.data.results[0];
                console.log("Price Data", comic.prices)
                setPriceData(json);
              }
            };
            fetchPriceData().catch(console.error);
        }, [id]);

        const chartData = {
            labels: priceData.map(item => item.date),
            datasets: [
                {
                    label: 'Comic Price Over Time',
                    data: priceData.map(item => item.price),
                    fill: false,
                    borderColor: 'rgba(75, 192, 192, 1)',
                    tension: 0.1
                }
            ]
        }

      return (
        <div>
            <h2>Price Over Time</h2>
            <Line data={chartData} />
        </div>
      );
    
  };

export default ComicPriceChart;