import axios from 'axios';
import React, { useEffect, useState } from 'react';

const Csv = () => {
    const [cells, setCells] = useState([]);
    const [predictedY, setPredictedY] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get("http://127.0.0.1:5000/res/666ad0a3ae6a78012aba2d2a");
                const data = response.data; // assuming response.data contains the JSON data
                const Original = "Original y"
                console.log("datadatadata", data)

                const predictedYValues = Object.values(data['Predicted y']);
                setPredictedY(predictedYValues);


                setCells(data.cells || []);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, []);

    return (


        <ul>
            {predictedY.map((value, index) => (
                <li key={index}>{value}</li>
            ))}
        </ul>




    );
};

export default Csv;
