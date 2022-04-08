import { createSlice } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';
import { toastStyle } from '../config/content';

const ticketsInitialState = {
	tickets: [],
	ticketCart: [],
	isLoading: false,
};

const ticketsSlice = createSlice({
	name: 'tickets',
	initialState: ticketsInitialState,
	reducers: {
		setIsLoading(state, action) {
			state.isLoading = action.payload;
		},
		replaceTickets(state, action) {
			state.tickets = action.payload || [];
		},
		replaceTicketCart(state, action) {
			state.ticketCart = action.payload || [];
		},
	},
});

export const fetchTicketsData = (dep, arr) => {
	return async dispatch => {
		dispatch(ticketsActions.setIsLoading(true));

		try {
			// using third party api to get flight data
			const flightResponse = await fetch(
				`https://airlabs.co/api/v9/schedules?dep_iata=${dep}&arr_iata=${arr}&api_key=${process.env.REACT_APP_FLIGHT_API_KEY}`
			);

			if (!flightResponse.ok) {
				throw new Error();
			}

			const responseData = await flightResponse.json();
			const ticketsData = responseData.response;
			dispatch(ticketsActions.replaceTickets(ticketsData));
		} catch (e) {
			toast.error('Fetch flight data failed!', toastStyle);
		}

		dispatch(ticketsActions.setIsLoading(false));
	};
};

export const getTicketCartData = token => {
	return async dispatch => {
		dispatch(ticketsActions.setIsLoading(true));

		try {
			const response = await fetch(
				`${process.env.REACT_APP_BACKEND_URL}/user-tickets`,
				{
					method: 'GET',
					headers: {
						Authorization: `Bearer ${token}`,
					},
				}
			);

			if (!response.ok && response.status !== 404) {
				throw new Error();
			}

			const responseData = await response.json();

			dispatch(ticketsActions.replaceTicketCart(responseData.existingUserCart));
		} catch (e) {
			toast.error('Fetch your ticket cart failed!', toastStyle);
		}

		dispatch(ticketsActions.setIsLoading(false));
	};
};

// add ticket to user cart
export const sendTicketCartData = (ticket, token) => {
	return async dispatch => {
		dispatch(ticketsActions.setIsLoading(true));

		try {
			const response = await fetch(
				`${process.env.REACT_APP_BACKEND_URL}/user-tickets`,
				{
					method: 'POST',
					body: JSON.stringify(ticket),
					headers: {
						'Content-Type': 'application/json',
						Authorization: `Bearer ${token}`,
					},
				}
			);

			if (!response.ok) {
				throw new Error();
			}

			toast.success(`Add ticket to your cart!`, toastStyle);
		} catch (e) {
			toast.error('Add ticket to cart failed!', toastStyle);
		}

		dispatch(ticketsActions.setIsLoading(false));
	};
};

export const updateTicketCartData = (id, payment, token) => {
	return async dispatch => {
		dispatch(ticketsActions.setIsLoading(true));

		try {
			const response = await fetch(
				`${process.env.REACT_APP_BACKEND_URL}/user-tickets`,
				{
					method: 'PATCH',
					body: JSON.stringify({
						ticketId: id,
						payment: payment,
					}),
					headers: {
						'Content-Type': 'application/json',
						Authorization: `Bearer ${token}`,
					},
				}
			);

			if (!response.ok) {
				throw new Error();
			}

			const responseData = await response.json();

			dispatch(ticketsActions.replaceTicketCart(responseData.existingUserCart));
			toast.success(`Updated ticket from your cart!`, toastStyle);
		} catch (e) {
			toast.error(`Updated ticket from your cart failed!`, toastStyle);
		}

		dispatch(ticketsActions.setIsLoading(false));
	};
};

export const deleteTicketCartData = (id, token) => {
	return async dispatch => {
		dispatch(ticketsActions.setIsLoading(true));

		try {
			const response = await fetch(
				`${process.env.REACT_APP_BACKEND_URL}/user-tickets`,
				{
					method: 'DELETE',
					body: JSON.stringify({
						ticketId: id,
					}),
					headers: {
						'Content-Type': 'application/json',
						Authorization: `Bearer ${token}`,
					},
				}
			);

			if (!response.ok) {
				throw new Error();
			}

			const responseData = await response.json();

			dispatch(ticketsActions.replaceTicketCart(responseData.existingUserCart));
			toast.success(`Delete ticket from your cart!`, toastStyle);
		} catch (e) {
			toast.error(`Delete ticket from your cart failed!`, toastStyle);
		}

		dispatch(ticketsActions.setIsLoading(false));
	};
};

export default ticketsSlice;
export const ticketsActions = ticketsSlice.actions;
