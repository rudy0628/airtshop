import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
	updateTicketsData,
	sendTicketCartData,
} from '../../store/tickets-slice';

import Spinner from '../UI/spinner/Spinner';
import TicketCartItem from './TicketCartItem';
import classes from './TicketCart.module.scss';

const TicketCart = () => {
	const dispatch = useDispatch();
	const ticketCart = useSelector(state => state.tickets.ticketCart);
	const ticketsContent = useSelector(state => state.tickets.tickets);
	const isLoading = useSelector(state => state.tickets.isLoading);
	const userId = localStorage.getItem('userId');

	/* when we updated tickets and ticketCart redux in TicketItem, and then we visited this page, this useEffect detected the cart change, so we updated the cart data and tickets data to firebase */

	/* why we update the ticketCart and tickets data at the same time, cause the tickets only update in tickets change, related to tickets, is the ticketCart change(buy a ticket to reduce seat, cancel ticket to updated seat) */
	useEffect(() => {
		if (userId) {
			dispatch(sendTicketCartData(ticketCart, userId));
			dispatch(updateTicketsData(ticketsContent));
		}
	}, [ticketCart, userId, dispatch, ticketsContent]);

	return (
		<section className={classes['section-ticketCart']}>
			<h2 className="heading__secondary">My Ticket</h2>
			{isLoading && (
				<div className="centered">
					<Spinner />
				</div>
			)}
			{!isLoading &&
				ticketCart.length > 0 &&
				ticketCart.map(ticket => (
					<TicketCartItem ticket={ticket} key={ticket.id} />
				))}
			{!isLoading && ticketCart.length === 0 && (
				<p className="empty-text">No ticket in your cart!</p>
			)}
		</section>
	);
};

export default TicketCart;
