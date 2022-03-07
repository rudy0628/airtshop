import { createSlice } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';
import { toastStyle } from '../config/content';
import { productionTicketsContent } from '../config/content';

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
		updateTickets(state, action) {
			const ticket = state.tickets.find(
				ticket => ticket.id === action.payload.id
			);

			if (action.payload.type === 'BUY') {
				ticket.seats = action.payload.seats;
			}

			if (action.payload.type === 'CANCEL') {
				ticket.seats.push(action.payload.seat);
			}
		},
		filterTickets(state, action) {
			state.isLoading = true;
			state.tickets = state.tickets.filter(ticket => {
				const isLaterThenDate =
					Date.parse(`${ticket.date} ${ticket.boardingTime}`) >
					Date.parse(`${action.payload.dateTime}`);
				return (
					isLaterThenDate &&
					ticket.from === action.payload.from &&
					ticket.to === action.payload.to
				);
			});
			state.isLoading = false;
		},
		addTicketCart(state, action) {
			if (state.ticketCart.some(ticket => ticket.id === action.payload.id)) {
				toast.error('This ticket already in your cart', toastStyle);
				return;
			}
			state.ticketCart.push({
				id: `${action.payload.id}${action.payload.seat}`,
				name: action.payload.name,
				class: action.payload.class,
				seat: action.payload.seat,
				airline: action.payload.airline,
				flight: action.payload.flight,
				date: action.payload.date,
				from: action.payload.from,
				to: action.payload.to,
				boardingTime: action.payload.boardingTime,
				gate: action.payload.gate,
			});

			toast.success('Add ticket to your cart!', toastStyle);
		},
		removeTicketCart(state, action) {
			state.ticketCart = state.ticketCart.filter(
				ticket => ticket.id !== action.payload
			);
			toast.success('Remove ticket from your cart!', toastStyle);
		},
		replaceTicketCart(state, action) {
			state.ticketCart = action.payload || [];
		},
	},
});

export const fetchTicketsData = () => {
	return async dispatch => {
		dispatch(ticketsActions.setIsLoading(true));
		const response = await fetch(`${process.env.REACT_APP_URL}/tickets.json`);
		const data = await response.json();
		dispatch(ticketsActions.setIsLoading(false));

		const currentTickets = [];
		for (const key in data) {
			currentTickets.push({ ...data[key], id: key });
		}

		dispatch(ticketsActions.replaceTickets(currentTickets));
	};
};

export const sendTicketsData = () => {
	return async dispatch => {
		dispatch(ticketsActions.setIsLoading(true));

		const ticketsContent = productionTicketsContent();
		// clear the tickets content
		await fetch(`${process.env.REACT_APP_URL}/tickets.json`, {
			method: 'PUT',
			body: JSON.stringify([]),
			headers: {
				'Content-Type': 'application/json',
			},
		});

		// set the new Time Limited
		let nextDay = new Date();
		nextDay.setHours(24, 0, 0, 0);
		await fetch(`${process.env.REACT_APP_URL}/currentDate.json`, {
			method: 'PUT',
			body: JSON.stringify(Date.parse(nextDay)),
			headers: {
				'Content-Type': 'application/json',
			},
		});

		// send the new tickets data to firebase realtime database
		for (const ticket of ticketsContent) {
			await fetch(`${process.env.REACT_APP_URL}/tickets.json`, {
				method: 'POST',
				body: JSON.stringify(ticket),
				headers: {
					'Content-Type': 'application/json',
				},
			});
		}

		dispatch(ticketsActions.setIsLoading(false));
	};
};

export const updateTicketsData = ticketsContent => {
	return async dispatch => {
		dispatch(ticketsActions.setIsLoading(true));
		console.log('updated tickets data');

		for (const ticket of ticketsContent) {
			await fetch(`${process.env.REACT_APP_URL}/tickets/${ticket.id}.json`, {
				method: 'PATCH',
				body: JSON.stringify({
					airline: ticket.airline,
					boardingTime: ticket.boardingTime,
					date: ticket.date,
					flight: ticket.flight,
					from: ticket.from,
					to: ticket.to,
					gate: ticket.gate,
					seats: ticket.seats,
				}),
				headers: {
					'Content-Type': 'application/json',
				},
			});
		}

		dispatch(ticketsActions.setIsLoading(false));
	};
};

// update user ticket cart in firebase
export const sendTicketCartData = (ticketCart, id) => {
	return async dispatch => {
		dispatch(ticketsActions.setIsLoading(true));

		console.log('send tickets cart data');
		await fetch(`${process.env.REACT_APP_URL}/user/${id}/ticketCart.json`, {
			method: 'PUT',
			body: JSON.stringify(ticketCart),
			headers: {
				'Content-Type': 'application/json',
			},
		});

		dispatch(ticketsActions.setIsLoading(false));
	};
};

export const getTicketCartData = id => {
	return async dispatch => {
		dispatch(ticketsActions.setIsLoading(true));
		const response = await fetch(
			`${process.env.REACT_APP_URL}/user/${id}/ticketCart.json`
		);
		dispatch(ticketsActions.setIsLoading(true));

		const data = await response.json();

		const currentTicketCart = [];
		for (const key in data) {
			currentTicketCart.push({ ...data[key] });
		}

		dispatch(ticketsActions.replaceTicketCart(currentTicketCart));
	};
};

export default ticketsSlice;
export const ticketsActions = ticketsSlice.actions;
