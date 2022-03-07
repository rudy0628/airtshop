import React, { Fragment, Suspense, useEffect } from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { authActions } from './store/auth-slice';
import { getTicketCartData } from './store/tickets-slice';
import { ToastContainer } from 'react-toastify';

import Spinner from './components/UI/spinner/Spinner';
import MainHeader from './components/layout/MainHeader';
import 'react-toastify/dist/ReactToastify.css';
// lazy loading
const IntroducePage = React.lazy(() => import('./pages/IntroducePage'));
const MyTicketPage = React.lazy(() => import('./pages/MyTicketPage'));
const SignInPage = React.lazy(() => import('./pages/SignInPage'));
const TicketsPage = React.lazy(() => import('./pages/TicketsPage'));

function App() {
	const dispatch = useDispatch();

	// react-redux variables
	const isLogged = useSelector(state => state.auth.isLogged);

	// local storage variables
	const userId = localStorage.getItem('userId');
	const expirationTime = localStorage.getItem('expirationTime');
	const username = localStorage.getItem('username');

	///////////////////////////////////////////////////////////////
	/* put this useEffect hook here cause when the user is login, the "App.js" will re-evaluate again, and we can check the react redux variable */
	///////////////////////////////////////////////////////////////

	useEffect(() => {
		// when the userId is exist(user is logged), replace redux auth content and also get current user cart data
		if (userId) {
			dispatch(
				authActions.replaceAuthContent({
					expirationTime: expirationTime,
					userId: userId,
					username: username,
				})
			);

			dispatch(getTicketCartData(userId));
		}
	}, [userId, expirationTime, username, dispatch]);

	return (
		<Fragment>
			<Suspense
				fallback={
					<div className="centered">
						<Spinner />
					</div>
				}
			>
				<ToastContainer className="toast" />
				<MainHeader />
				<Routes>
					<Route path="/" element={<IntroducePage />} />
					<Route path="/tickets" element={<TicketsPage />} />
					<Route
						path="/my-ticket"
						element={isLogged ? <MyTicketPage /> : <Navigate to="/sign-in" />}
					/>
					<Route
						path="/sign-in"
						element={isLogged ? <Navigate to="/" /> : <SignInPage />}
					/>
				</Routes>
			</Suspense>
		</Fragment>
	);
}

export default App;
