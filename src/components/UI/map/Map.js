import React, { useEffect, useState } from 'react';
import GoogleMapReact from 'google-map-react';
import useGeoLocation from '../../../hooks/use-geolocation';
import { v4 as uuidv4 } from 'uuid';

import classes from './Map.module.scss';
import { IoMdAirplane } from 'react-icons/io';

const Marker = props => {
	return (
		<button className={classes['map__marker']}>
			<IoMdAirplane
				style={{ transform: `rotate(${props.deg}deg)` }}
				className={classes['map__icon']}
			/>
			<span>{props.text}</span>
		</button>
	);
};

const Map = () => {
	const location = useGeoLocation();
	const [flightData, setFlightData] = useState([]);

	useEffect(() => {
		const fetchFlightData = async () => {
			const response = await fetch(
				`https://airlabs.co/api/v9/flights?api_key=${process.env.REACT_APP_FLIGHT_API_KEY}`
			);

			const responseData = await response.json();

			setFlightData(responseData.response);
		};

		fetchFlightData();
	}, []);

	const lat = Number(JSON.stringify(location.coordinates.lat));
	const lng = Number(JSON.stringify(location.coordinates.lng));

	return (
		<div style={{ height: '100vh', width: '100%' }}>
			<GoogleMapReact
				bootstrapURLKeys={{
					key: `${process.env.REACT_APP_GOOGLE_MAP_API_KEY}`,
				}}
				center={{
					lat: lat || 0,
					lng: lng || 0,
				}}
				zoom={7}
			>
				{flightData.slice(0, 500).map(flight => (
					<Marker
						key={uuidv4()}
						lat={flight.lat}
						lng={flight.lng}
						text={flight.flight_icao || flight.reg_number}
						deg={flight.dir || 0}
					/>
				))}
			</GoogleMapReact>
		</div>
	);
};

export default Map;
