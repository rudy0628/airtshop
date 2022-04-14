import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';

ChartJS.register(ArcElement, Tooltip, Legend);

const Chart = () => {
	const [mileage, setMileage] = useState({});
	const token = useSelector(state => state.auth.token);

	useEffect(() => {
		const fetchData = async () => {
			const response = await fetch(
				`${process.env.REACT_APP_BACKEND_URL}/mileage`,
				{
					method: 'GET',
					headers: {
						Authorization: `Bearer ${token}`,
					},
				}
			);

			const responseData = await response.json();

			setMileage(responseData.mileage);
		};

		fetchData();
	}, [token]);

	let mileageArray = [];
	for (const [key, value] of Object.entries(mileage)) {
		mileageArray.push(value);
	}

	const data = {
		labels: ['Short', 'Medium', 'Long'],
		datasets: [
			{
				label: '# of Votes',
				data: mileageArray,
				backgroundColor: [
					'rgba(255, 99, 132, 0.2)',
					'rgba(54, 162, 235, 0.2)',
					'rgba(255, 206, 86, 0.2)',
				],
				borderColor: [
					'rgba(255, 99, 132, 1)',
					'rgba(54, 162, 235, 1)',
					'rgba(255, 206, 86, 1)',
				],
				borderWidth: 1,
			},
		],
	};

	return <Doughnut data={data} />;
};

export default Chart;
