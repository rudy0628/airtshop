import { useDispatch } from 'react-redux';
import { ticketsActions } from '../../store/tickets-slice';

import Card from '../UI/card/Card';
import classes from './TicketCartItem.module.scss';

const TicketCartItem = props => {
	const { ticket } = props;
	const dispatch = useDispatch();

	const removeFromTicketCart = async () => {
		dispatch(ticketsActions.removeTicketCart(ticket.id));

		dispatch(
			ticketsActions.updateTickets({
				id: ticket.id.slice(0, -2),
				seat: ticket.id.slice(-2),
				type: 'CANCEL',
			})
		);
	};

	return (
		<Card key={ticket.id} className={classes['ticketCart']}>
			<header className={classes['ticketCart__header']}>
				<p className={classes['ticketCart__airline']}>{ticket.airline}</p>
			</header>
			<main className={classes['ticketCart__main']}>
				<p className={classes['ticketCart__name']}>
					<span>Name</span>
					{ticket.name}
				</p>
				<p className={classes['ticketCart__class']}>
					<span>Class</span>
					{ticket.class}
				</p>
				<p className={classes['ticketCart__flight']}>
					<span>Flight</span>
					{ticket.flight}
				</p>
				<p className={classes['ticketCart__date']}>
					<span>Date</span>
					{ticket.date}
				</p>
				<p className={classes['ticketCart__from']}>
					<span>From</span>
					{ticket.from}
				</p>
				<p className={classes['ticketCart__to']}>
					<span>To</span>
					{ticket.to}
				</p>
				<p className={classes['ticketCart__boardingTime']}>
					<span>Boarding Time</span>
					{ticket.boardingTime}
				</p>
				<p className={classes['ticketCart__gate']}>
					<span>Gate</span>
					{ticket.gate}
				</p>
				<p className={classes['ticketCart__gate']}>
					<span>Seat</span>
					{ticket.seat}
				</p>
			</main>
			<footer className={classes['ticketCart__footer']}>
				<button
					onClick={removeFromTicketCart}
					className={classes['ticketCart__btn--cancel']}
				>
					Cancel
				</button>
			</footer>
		</Card>
	);
};

export default TicketCartItem;
