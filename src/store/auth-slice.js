import { createSlice } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';
import { toastStyle } from '../config/content';

const authInitialState = {
	token: '',
	isLogged: false,
	isLoading: false,
	userData: {},
};

const authSlice = createSlice({
	name: 'auth',
	initialState: authInitialState,
	reducers: {
		login(state, action) {
			state.isLogged = true;
			state.token = action.payload.token;

			localStorage.setItem('token', action.payload.token);
			localStorage.setItem('expirationTime', action.payload.expirationTime);
		},
		logout(state) {
			state.isLogged = false;
			state.token = '';

			localStorage.removeItem('token');
			localStorage.removeItem('expirationTime');
		},
		setIsLoading(state, action) {
			state.isLoading = action.payload;
		},
		setUserData(state, action) {
			state.userData = action.payload;
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
			dispatch(authActions.setIsLoading(true));

			const response = await fetch(url, {
				method: 'POST',
				body: JSON.stringify(sendBodyData),
				headers: {
					'Content-Type': 'application/json',
				},
			});
			const data = await response.json();

			dispatch(authActions.setIsLoading(false));

			if (response.ok) {
				if (formType === 'FIND') {
					toast.success(
						'The reset password was send to your email!',
						toastStyle
					);
					return;
				} else {
					toast.success(`Welcome, ${data.displayName}!`, toastStyle);
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

export const setUserData = token => {
	return async dispatch => {
		try {
			dispatch(authActions.setIsLoading(true));
			const response = await fetch(
				'https://identitytoolkit.googleapis.com/v1/accounts:lookup?key=AIzaSyAJDhxbyIDjxD0RybAuhDrqqHiEuqVYQkM',
				{
					method: 'POST',
					body: JSON.stringify({
						idToken: token,
					}),
					headers: {
						'Content-Type': 'application/json',
					},
				}
			);

			const responseData = await response.json();
			dispatch(authActions.setUserData(responseData.users[0]));
		} catch (e) {
			toast.error('Loaded User Data failed', toastStyle);
		}

		dispatch(authActions.setIsLoading(false));
	};
};

export const updateUserData = updateData => {
	return async dispatch => {
		try {
			dispatch(authActions.setIsLoading(true));
			const response = await fetch(
				'https://identitytoolkit.googleapis.com/v1/accounts:update?key=AIzaSyAJDhxbyIDjxD0RybAuhDrqqHiEuqVYQkM',
				{
					method: 'POST',
					body: JSON.stringify(updateData),
					headers: {
						'Content-Type': 'application/json',
					},
				}
			);

			const responseData = await response.json();
			dispatch(authActions.setUserData(responseData));

			toast.success('Update User Data success', toastStyle);
		} catch (e) {
			toast.error('Update User Data failed', toastStyle);
		}

		dispatch(authActions.setIsLoading(false));
	};
};

export default authSlice;
export const authActions = authSlice.actions;
