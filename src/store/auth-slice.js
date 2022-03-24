import { createSlice } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';
import { toastStyle } from '../config/content';

let logoutTimer;

const authInitialState = {
	token: '',
	isLogged: false,
	isLogging: false,
};

const calculateRemainingTime = expirationTime => {
	const currentDate = new Date().getTime();
	const expirationDate = new Date(expirationTime).getTime();

	const remainingTime = expirationDate - currentDate;

	return remainingTime;
};

const authSlice = createSlice({
	name: 'auth',
	initialState: authInitialState,
	reducers: {
		login(state, action) {
			state.isLogged = true;
			state.token = action.payload.token;

			const remainingTime = calculateRemainingTime(
				action.payload.expirationTime
			);

			localStorage.setItem('token', action.payload.token);
			localStorage.setItem('expirationTime', action.payload.expirationTime);

			logoutTimer = setTimeout(authActions.logout, remainingTime);
		},
		logout(state) {
			state.isLogged = false;
			state.token = '';

			localStorage.removeItem('token');
			localStorage.removeItem('expirationTime');

			if (logoutTimer) {
				clearTimeout(logoutTimer);
			}
		},
		setIsLogging(state, action) {
			state.isLogging = action.payload;
		},
	},
});

export const sendUserData = (email, password = '', username = '', formType) => {
	return async dispatch => {
		let url;
		if (formType === 'SIGNIN') {
			url = `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${process.env.REACT_APP_FIREBASE_API_KEY}`;
		} else if (formType === 'REGISTER') {
			url = `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${process.env.REACT_APP_FIREBASE_API_KEY}`;
		} else if (formType === 'FIND') {
			url = `https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=${process.env.REACT_APP_FIREBASE_API_KEY}`;
		}

		let sendBodyData;
		if (formType === 'SIGNIN') {
			sendBodyData = {
				email: email,
				password: password,
				returnSecureToken: true,
			};
		} else if (formType === 'REGISTER') {
			sendBodyData = {
				displayName: username,
				email: email,
				password: password,
				returnSecureToken: true,
			};
		} else if (formType === 'FIND') {
			sendBodyData = {
				requestType: 'PASSWORD_RESET',
				email: email,
			};
		}

		try {
			dispatch(authActions.setIsLogging(true));
			const response = await fetch(url, {
				method: 'POST',
				body: JSON.stringify(sendBodyData),
				headers: {
					'Content-Type': 'application/json',
				},
			});

			const data = await response.json();
			dispatch(authActions.setIsLogging(false));

			if (response.ok) {
				if (formType === 'FIND') {
					toast.success(
						'The reset password was send to your email!',
						toastStyle
					);
					return;
				}

				const expirationTime = new Date(
					new Date().getTime() + +data.expiresIn * 1000
				);

				dispatch(
					authActions.login({
						token: data.idToken,
						expirationTime: expirationTime.toISOString(),
					})
				);
			} else {
				throw new Error(data.error.message);
			}
		} catch (e) {
			toast.error(e.message, toastStyle);
		}
	};
};

export default authSlice;
export const authActions = authSlice.actions;
