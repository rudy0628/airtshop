import { useDispatch, useSelector } from 'react-redux';
import { deleteTicketCartData } from '../../store/tickets-slice';

import TicketContent from '../tickets/TicketContent';
import Card from '../UI/card/Card';
import classes from './TicketCartItem.module.scss';

const TicketCartItem = props => {
	const { ticket } = props;
	const dispatch = useDispatch();
	const token = useSelector(state => state.auth.token);

	const removeFromTicketCart = async () => {
		dispatch(deleteTicketCartData(ticket._id, token));
	};

	return (
		<Card className={classes['ticketCart']}>
			<TicketContent ticket={ticket} />
			<div className={classes['ticketCart__info']}>
				<p className={classes['ticketCart__info--passengerName']}>
					<span>Passenger Name</span>
					{ticket.fullName}
				</p>
				<p className={classes['ticketCart__info--gate']}>
					<span>Boarding Gate</span>
					{ticket.gate}
				</p>
				<p className={classes['ticketCart__info--seat']}>
					<span>Seat</span>
					{ticket.seat}
				</p>
			</div>
			<button
				onClick={removeFromTicketCart}
				className={`btn btn--form ${classes['ticketCart__btn']}`}
			>
				Remove from Cart
			</button>
			{Date.now() > ticket.depTime * 1000 && (
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
