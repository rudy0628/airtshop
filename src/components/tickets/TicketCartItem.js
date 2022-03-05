import { useDispatch } from 'react-redux';
import { ticketsActions } from '../../store/tickets-slice';

import Card from '../UI/card/Card';
import classes from './TicketCartItem.module.scss';

const TicketCartItem = props => {
	const { ticket } = props;
	const dispatch = useDispatch();

	const removeFromTicketCart = async () => {
		// remove the ticket from ticket cart, this action will trigger useEffect function in TicketCart component
		dispatch(ticketsActions.removeTicketCart(ticket.id));

		const id = ticket.id.replace(`${ticket.seat}`, '');
		dispatch(
			ticketsActions.updateTickets({
				id: id,
				seat: ticket.seat,
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
				<p className={classes['ticketCart__seat']}>
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
			{Date.now() > Date.parse(`${ticket.date} ${ticket.boardingTime}`) && (
				<div className={classes['ticketCart__overtime']}>
					<p className={classes['ticketCart__overtime--text']}>
						This ticket is overtime!
					</p>
					<button
						onClick={removeFromTicketCart}
						className={classes['ticketCart__overtime--btn']}
					>
						Cancel
					</button>
				</div>
			)}
		</Card>
	);
};

export default TicketCartItem;
