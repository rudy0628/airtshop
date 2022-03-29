import React, { Fragment, Suspense, useEffect } from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { authActions } from './store/auth-slice';
import { ToastContainer } from 'react-toastify';

import IntroducePage from './pages/IntroducePage';
import Spinner from './components/UI/spinner/Spinner';
import MainHeader from './components/layout/MainHeader';
import 'react-toastify/dist/ReactToastify.css';

// lazy loading
const MyTicketPage = React.lazy(() => import('./pages/MyTicketPage'));
const SignInPage = React.lazy(() => import('./pages/SignInPage'));
const TicketsPage = React.lazy(() => import('./pages/TicketsPage'));
const MapPage = React.lazy(() => import('./pages/MapPage'));
const ProfilePage = React.lazy(() => import('./pages/ProfilePage'));

let logoutTimer;

const calculateRemainingTime = expirationTime => {
	const currentDate = new Date().getTime();
	const expirationDate = new Date(expirationTime).getTime();
	const remainingTime = expirationDate - currentDate;
	return remainingTime;
};

function App() {
	const dispatch = useDispatch();
	const isLogged = useSelector(state => state.auth.isLogged);
	const token = localStorage.getItem('token');
	const expirationTime = localStorage.getItem('expirationTime');

	///////////////////////////////////////////////////////////////
	/* put this useEffect hook here cause when the user is login, the "App.js" will re-evaluate again, and we can check the react redux variable */
	///////////////////////////////////////////////////////////////

	useEffect(() => {
		// when the userId is exist(user is logged), replace redux auth content
		if (token) {
			dispatch(
				authActions.login({
					expirationTime: expirationTime,
					token: token,
				})
			);

			if (logoutTimer) {
				clearTimeout(logoutTimer);
			}

			// set remaining time
			const remainingTime = calculateRemainingTime(expirationTime);
			logoutTimer = setTimeout(() => {
				dispatch(authActions.logout(remainingTime));
			}, remainingTime);
		}
	}, [token, expirationTime, dispatch]);

	return (
		<Fragment>
			<Suspense
				fallback={
					<div className="overlay">
						<Spinner />
					</div>
				}
			>
				<ToastContainer className="toast" />
				<MainHeader />
				<Routes>
					<Route path="/" element={<IntroducePage />} />
					<Route path="/tickets" element={<TicketsPage />} />
					<Route path="/flight-map" element={<MapPage />} />
					<Route
						path="/my-ticket"
						element={isLogged ? <MyTicketPage /> : <Navigate to="/sign-in" />}
					/>
					<Route
						path="/sign-in"
						element={isLogged ? <Navigate to="/" /> : <SignInPage />}
					/>
					<Route
						path="/profile"
						element={isLogged ? <ProfilePage /> : <Navigate to="/sign-in" />}
					/>
				</Routes>
			</Suspense>
		</Fragment>
	);
}

export default App;
