import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { deleteTicketCartData } from '../../store/tickets-slice';
import { productPrice } from '../../config/helper';
import { toast } from 'react-toastify';
import { toastStyle } from '../../config/content';
import sendHttp from '../../config/send-http';

import StripeContainer from '../payments/StripeContainer';
import TicketContent from '../tickets/TicketContent';
import Card from '../UI/card/Card';
import classes from './TicketCartItem.module.scss';

const TicketCartItem = props => {
	const { ticket } = props;
	const [isPayment, setIsPayment] = useState(false);
	const dispatch = useDispatch();
	const token = useSelector(state => state.auth.token);

	const price = productPrice(ticket.duration, ticket.classType);

	const removeFromTicketCart = async () => {
		dispatch(deleteTicketCartData(ticket._id, token));

		try {
			const requestBody = {
				query: `
					mutation {
						refundPayment(paymentIntentId: "${ticket.payment}", amount: ${price * 100}) {
							message
							success
						}
					}
				`,
			};

			const responseData = await sendHttp(requestBody, token);

			if (responseData.data.refundPayment.success)
				toast.success('Refund successful', toastStyle);

			if (responseData.error) throw new Error();
		} catch (e) {
			toast.error('Refund failed', toastStyle);
		}
	};

	return (
		<Card className={classes['ticketCart']}>
			<TicketContent ticket={ticket} />
			{!isPayment && (
				<>
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
					<div className={classes['ticketCart__btn--group']}>
						<button
							onClick={removeFromTicketCart}
							className={`btn btn--form ${classes['ticketCart__btn']}`}
						>
							Remove from Cart
						</button>
						{ticket.payment === 'none' && (
							<button
								onClick={() => setIsPayment(true)}
								className={`btn btn--form ${classes['ticketCart__btn']}`}
							>
								Pay
							</button>
						)}
					</div>
				</>
			)}
			{isPayment && (
				<StripeContainer ticket={ticket} onCancel={() => setIsPayment(false)} />
			)}

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
