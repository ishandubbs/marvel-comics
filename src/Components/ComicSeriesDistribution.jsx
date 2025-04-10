import React, { useEffect, useState } from "react";
import { PieChart, Pie, Cell, Tooltip, Legend } from "recharts";

const ComicSeriesDistribution = ({id}) => {
    const [seriesData, setSeriesData] = useState([]);

    useEffect(() => {
        const fetchSeriesData = async() => {
            const url = `https://gateway.marvel.com/v1/public/comics/${id}?ts=${ts}&apikey=${publicKey}&hash=${hash}`
            const response = await fetch(url);
            const json = await response.json();
              
            if (json.data && json.data.results.length > 0) {
                const comic = json.data.results[0];
                const series = comic.series.items;
                console.log("Series Data:", series)
                setSeriesData(series);
            }
        };

        fetchSeriesData().catch(console.error);
    }, [id]);

    const chartData = {
        labels: seriesData ? seriesData.map(series => series.name) : [],
        datasets: [
            {
                label: 'Series Distribution',
                data: seriesData ? seriesData.map(series => series.count) : [],
                backgroundColor: ['red', 'blue', 'green', 'yellow', 'orange'], // Customize colors if needed
            },
        ],
    };

    return (
        <div>
            <h3>Series Distribution</h3>
            {seriesData ? (
                <Pie data={chartData} />
            ) : (
                <p>Loading series data...</p>
            )}
        </div>
    );
};

export default ComicSeriesDistribution;