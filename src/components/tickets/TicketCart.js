import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getTicketCartData } from '../../store/tickets-slice';

import Spinner from '../UI/spinner/Spinner';
import TicketCartItem from './TicketCartItem';
import classes from './TicketCart.module.scss';

const TicketCart = () => {
	const dispatch = useDispatch();
	const token = useSelector(state => state.auth.token);
	const ticketCart = useSelector(state => state.tickets.ticketCart);
	const isLoading = useSelector(state => state.tickets.isLoading);

	useEffect(() => {
		dispatch(getTicketCartData(token));
	}, [dispatch, token]);

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
					<TicketCartItem ticket={ticket} key={ticket._id} />
				))}
			{!isLoading && ticketCart.length === 0 && (
				<p className="empty-text">No ticket in your cart!</p>
			)}
		</section>
	);
};

export default TicketCart;
