import { Fragment, useEffect } from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { authActions } from './store/auth-slice';
import { sendTicketCartData, getTicketCartData } from './store/tickets-slice';
import { ToastContainer } from 'react-toastify';

import MainHeader from './components/layout/MainHeader';
import IntroducePage from './pages/IntroducePage';
import MyTicketPage from './pages/MyTicketPage';
import SignInPage from './pages/SignInPage';
import TicketsPage from './pages/TicketsPage';
import 'react-toastify/dist/ReactToastify.css';

function App() {
	const dispatch = useDispatch();

	// react-redux variables
	const isLogged = useSelector(state => state.auth.isLogged);
	const ticketCart = useSelector(state => state.tickets.ticketCart);

	// local storage variables
	const userId = localStorage.getItem('userId');
	const expirationTime = localStorage.getItem('expirationTime');
	const username = localStorage.getItem('username');

	///////////////////////////////////////////////////////////////
	/* put this two useEffect hook here cause when the user is login, the app will re-evaluate again, and we can check the react redux variable */
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

	useEffect(() => {
		// when userId is exist(user is logged) and ticket cart is change(add or delete)
		if (userId) {
			dispatch(sendTicketCartData(ticketCart, userId));
		}
	}, [ticketCart, dispatch, userId]);

	return (
		<Fragment>
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
		</Fragment>
	);
}

export default App;
