import { Fragment } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { sendTicketCartData } from '../../store/tickets-slice';

import Card from '../UI/card/Card';
import classes from './TicketItem.module.scss';

const TicketItem = props => {
	const token = useSelector(state => state.auth.token);
	const isLogged = useSelector(state => state.auth.isLogged);
	const dispatch = useDispatch();
	const formatDepTime = `${new Date(props.depTime * 1000).toLocaleDateString(
		'zh-Tw'
	)} ${new Date(props.depTime * 1000).toLocaleTimeString('zh-Tw')}`;
	const formatArrTime = `${new Date(props.arrTime * 1000).toLocaleDateString(
		'zh-Tw'
	)} ${new Date(props.arrTime * 1000).toLocaleTimeString('zh-Tw')}`;

	const addToCartHandler = name => {
		dispatch(
			sendTicketCartData(
				{
					flight: props.flight,
					depTime: String(props.depTime),
					arrTime: String(props.arrTime),
					from: props.from,
					to: props.to,
					gate: props.gate,
				},
				token
			)
		);
	};

	return (
		<Fragment>
			<Card className={classes.ticket}>
				<header className={classes['ticket__header']}>
					<p className={classes['ticket__airline']}>SS Airline</p>
				</header>
				<main className={classes['ticket__main']}>
					<p className={classes['ticket__flight']}>
						<span>Flight</span>
						{props.flight}
					</p>
					<p className={classes['ticket__gate']}>
						<span>Gate</span>
						{props.gate}
					</p>
					<p className={classes['ticket__depTime']}>
						<span>Dep Time</span>
						{formatDepTime}
					</p>
					<p className={classes['ticket__arrTime']}>
						<span>Arr Time</span>
						{formatArrTime}
					</p>
					<p className={classes['ticket__from']}>
						<span>From</span>
						{props.from}
					</p>
					<p className={classes['ticket__to']}>
						<span>To</span>
						{props.to}
					</p>
				</main>
				<footer className={classes['ticket__footer']}>
					{isLogged && (
						<button
							onClick={addToCartHandler}
							className={classes['ticket__btn--order']}
						>
							Order
						</button>
					)}
					{!isLogged && (
						<p className={classes['ticket__text']}>
							Please login to order ticket
						</p>
					)}
				</footer>
			</Card>
		</Fragment>
	);
};

export default TicketItem;
