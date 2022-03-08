import { useState } from 'react';
import Select from 'react-select';
import { useSelector, useDispatch } from 'react-redux';
import { classOptions } from '../../config/content';
import { ticketsActions } from '../../store/tickets-slice';
import { toast } from 'react-toastify';
import { toastStyle } from '../../config/content';

import Card from '../UI/card/Card';
import classes from './TicketItem.module.scss';

const TicketItem = props => {
	const [selectedClass, setSelectedClass] = useState(null);
	const [selectedSeat, setSelectedSeat] = useState(null);
	const isLogged = useSelector(state => state.auth.isLogged);
	const name = useSelector(state => state.auth.username);
	const dispatch = useDispatch();

	// create sort seats option
	const seatOptions = [];
	const sortSeats = [...props.seats].sort((a, b) => {
		const stringACode = Number(a.slice(0, -1));
		const stringBCode = Number(b.slice(0, -1));

		if (stringACode < stringBCode) {
			return -1;
		}

		if (stringACode > stringBCode) {
			return 1;
		}

		return 0;
	});
	for (const seat of sortSeats) {
		seatOptions.push({ value: seat, label: seat });
	}

	const addToCartHandler = () => {
		if (!selectedClass) {
			toast.error('Please select class!', toastStyle);
			return;
		}

		if (!selectedSeat) {
			toast.error('Please select seat!', toastStyle);
			return;
		}

		const ticketCartData = {
			id: props.id,
			name: name,
			class: selectedClass.value,
			seat: selectedSeat.value,
			airline: props.airline,
			flight: props.flight,
			date: props.date,
			from: props.from,
			to: props.to,
			boardingTime: props.boardingTime,
			gate: props.gate,
		};

		// take current seats and filter with selected value
		const filterSeats = props.seats.filter(seat => seat !== selectedSeat.value);

		// updated cart, updated current ticket seats
		dispatch(ticketsActions.addTicketCart(ticketCartData));
		dispatch(
			ticketsActions.updateTickets({
				id: props.id,
				seats: filterSeats,
				type: 'BUY',
			})
		);

		setSelectedClass(null);
		setSelectedSeat(null);
	};

	return (
		<Card className={classes.ticket}>
			<header className={classes['ticket__header']}>
				<p className={classes['ticket__airline']}>{props.airline}</p>
			</header>
			<main className={classes['ticket__main']}>
				<p className={classes['ticket__flight']}>
					<span>Flight</span>
					{props.flight}
				</p>
				<p className={classes['ticket__date']}>
					<span>Date</span>
					{props.date}
				</p>
				<p className={classes['ticket__from']}>
					<span>From</span>
					{props.from}
				</p>
				<p className={classes['ticket__to']}>
					<span>To</span>
					{props.to}
				</p>
				<p className={classes['ticket__boardingTime']}>
					<span>Boarding Time</span>
					{props.boardingTime}
				</p>
				<p className={classes['ticket__gate']}>
					<span>Gate</span>
					{props.gate}
				</p>
			</main>
			<footer className={classes['ticket__footer']}>
				{isLogged && (
					<div className={classes['ticket__select-box']}>
						<span>class</span>
						<Select
							value={selectedClass}
							onChange={setSelectedClass}
							options={classOptions}
							className={classes['ticket__select']}
							isSearchable={false}
						/>
					</div>
				)}
				{isLogged && (
					<div className={classes['ticket__select-box']}>
						<span>seat</span>
						<Select
							value={selectedSeat}
							onChange={setSelectedSeat}
							options={seatOptions}
							className={classes['ticket__select']}
							isSearchable={false}
						/>
					</div>
				)}
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
	);
};

export default TicketItem;
