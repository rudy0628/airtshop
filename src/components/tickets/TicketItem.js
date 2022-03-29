import React from 'react';
import { useSelector } from 'react-redux';

import Card from '../UI/card/Card';
import TicketContent from './TicketContent';
import classes from './TicketItem.module.scss';

const TicketItem = props => {
	const isLogged = useSelector(state => state.auth.isLogged);

	const addToCartHandler = () => {
		props.onChooseTicket({
			flight: props.flight,
			depTime: props.depTime,
			arrTime: props.arrTime,
			from: props.from,
			to: props.to,
			gate: props.gate,
			duration: props.duration,
			class: props.class,
		});

		props.onNextStep(3);
	};

	return (
		<li>
			<Card className={classes['ticketItem']}>
				<TicketContent
					ticket={{
						flight: props.flight,
						depTime: props.depTime,
						arrTime: props.arrTime,
						from: props.from,
						to: props.to,
						gate: props.gate,
						duration: props.duration,
						class: props.class,
					}}
				/>
				{isLogged && (
					<button
						onClick={addToCartHandler}
						className={`btn btn--form ${classes['ticketItem__btn']}`}
					>
						Choose
					</button>
				)}
				{!isLogged && (
					<p className={classes['ticketItem__text']}>
						Please login to order ticket!
					</p>
				)}
			</Card>
		</li>
	);
};

export default TicketItem;
