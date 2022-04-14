import { createSlice } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';
import { toastStyle } from '../config/content';
import sendHttp from '../config/send-http';

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
		const requestBody = {
			query: `
				query {
					tickets {
						_id
						flight
						depTime
						arrTime
						from
						to
						gate
						duration
						classType
						passenger
						seat
						fullName
						email
						phoneNumber
						payment
					}
				}
			`,
		};

		try {
			const responseData = await sendHttp(requestBody, token);
			if (responseData.error) throw new Error();

			dispatch(ticketsActions.replaceTicketCart(responseData.data.tickets));
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

		const requestBody = {
			query: `
				mutation addTicket($flight: String!, $depTime: String!, $arrTime: String!, $from: String!, $to: String!, $gate: String!, $duration: Float!, $classType: String!, $passenger: String!, $seat: String!, $fullName: String!, $email: String!, $phoneNumber: String!, $payment: String!) {
					addTicket(ticketInput: { flight: $flight, depTime: $depTime, arrTime: $arrTime, from: $from, to: $to, gate: $gate, duration: $duration, classType: $classType, passenger: $passenger, seat: $seat, fullName: $fullName, email: $email, phoneNumber: $phoneNumber, payment: $payment })
				}
			`,
			variables: ticket,
		};

		try {
			const responseData = await sendHttp(requestBody, token);
			if (responseData.error) throw new Error();

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

		const requestBody = {
			query: `
				mutation {
					updateTicket(ticketId: "${id}", payment: "${payment}") {
						_id
						flight
						depTime
						arrTime
						from
						to
						gate
						duration
						classType
						passenger
						seat
						fullName
						email
						phoneNumber
						payment
					}
				}
			`,
		};

		try {
			const responseData = await sendHttp(requestBody, token);
			if (responseData.error) throw new Error();

			dispatch(
				ticketsActions.replaceTicketCart(responseData.data.updateTicket)
			);
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

		const requestBody = {
			query: `
				mutation {
					deleteTicket(ticketId: "${id}") {
						_id
						flight
						depTime
						arrTime
						from
						to
						gate
						duration
						classType
						passenger
						seat
						fullName
						email
						phoneNumber
						payment
					}
				}
			`,
		};

		try {
			const responseData = await sendHttp(requestBody, token);
			if (responseData.error) throw new Error();

			dispatch(
				ticketsActions.replaceTicketCart(responseData.data.deleteTicket)
			);
			toast.success(`Delete ticket from your cart!`, toastStyle);
		} catch (e) {
			toast.error(`Delete ticket from your cart failed!`, toastStyle);
		}

		dispatch(ticketsActions.setIsLoading(false));
	};
};

export default ticketsSlice;
export const ticketsActions = ticketsSlice.actions;
