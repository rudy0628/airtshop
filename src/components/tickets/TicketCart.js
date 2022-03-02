import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { updateTicketsData } from '../../store/tickets-slice';

import TicketCartItem from './TicketCartItem';
import classes from './TicketCart.module.scss';

const TicketCart = () => {
	const dispatch = useDispatch();
	const ticketCart = useSelector(state => state.tickets.ticketCart);
	const ticketsContent = useSelector(state => state.tickets.tickets);

	// when the ticket remove from the cart, data flow => remove the ticket from cart => update the redux tickets array => detected ticketCart change, updated the tickets in firebase
	useEffect(() => {
		dispatch(updateTicketsData(ticketsContent));
	}, [ticketCart]);

	return (
		<section className={classes['section-ticketCart']}>
			<h2 className="heading__secondary">My Ticket</h2>
			{ticketCart.map(ticket => (
				<TicketCartItem ticket={ticket} key={ticket.id} />
			))}
		</section>
	);
};

export default TicketCart;
