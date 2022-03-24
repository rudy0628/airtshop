import { useDispatch, useSelector } from 'react-redux';
import { deleteTicketCartData } from '../../store/tickets-slice';

import Card from '../UI/card/Card';
import classes from './TicketCartItem.module.scss';

const TicketCartItem = props => {
	const { ticket } = props;
	const dispatch = useDispatch();
	const token = useSelector(state => state.auth.token);
	const formatDepTime = `${new Date(ticket.depTime * 1000).toLocaleDateString(
		'zh-Tw'
	)} ${new Date(ticket.depTime * 1000).toLocaleTimeString('zh-Tw')}`;
	const formatArrTime = `${new Date(ticket.arrTime * 1000).toLocaleDateString(
		'zh-Tw'
	)} ${new Date(ticket.arrTime * 1000).toLocaleTimeString('zh-Tw')}`;

	const removeFromTicketCart = async () => {
		dispatch(deleteTicketCartData(ticket._id, token));
	};

	return (
		<Card className={classes['ticketCart']}>
			<header className={classes['ticketCart__header']}>
				<p className={classes['ticketCart__airline']}>SS Airline</p>
			</header>
			<main className={classes['ticketCart__main']}>
				<p className={classes['ticketCart__name']}>
					<span>Name</span>
					Rudy
				</p>
				<p className={classes['ticketCart__class']}>
					<span>Class</span>
					Business
				</p>
				<p className={classes['ticketCart__flight']}>
					<span>Flight</span>
					{ticket.flight}
				</p>
				<p className={classes['ticketCart__gate']}>
					<span>Gate</span>
					{ticket.gate}
				</p>
				<p className={classes['ticketCart__depTime']}>
					<span>Dep Time</span>
					{formatDepTime}
				</p>
				<p className={classes['ticketCart__arrTime']}>
					<span>Arr Time</span>
					{formatArrTime}
				</p>
				<p className={classes['ticketCart__from']}>
					<span>From</span>
					{ticket.from}
				</p>
				<p className={classes['ticketCart__to']}>
					<span>To</span>
					{ticket.to}
				</p>
				<p className={classes['ticketCart__seat']}>
					<span>Seat</span>
					12A
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
