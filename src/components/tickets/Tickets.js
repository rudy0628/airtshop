import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
	updateTicketsData,
	fetchTicketsData,
	sendTicketsData,
} from '../../store/tickets-slice';

import TicketsHeader from './TicketsHeader';
import TicketItem from './TicketItem';
import Card from '../UI/card/Card';
import Spinner from '../UI/spinner/Spinner';

import classes from './Tickets.module.scss';

const Tickets = () => {
	const [isFirstLoad, setIsFirstLoad] = useState(true);
	const dispatch = useDispatch();
	const ticketsContent = useSelector(state => state.tickets.tickets);
	const isLoading = useSelector(state => state.tickets.isLoading);

	useEffect(() => {
		// fetch time limited
		const fetchTimeLimited = async () => {
			const response = await fetch(
				'https://airtshop-default-rtdb.firebaseio.com/currentDate.json'
			);
			const data = await response.json();

			if (Date.now() > data) {
				dispatch(sendTicketsData());
			}
		};
		fetchTimeLimited();

		dispatch(fetchTicketsData());
	}, []);

	// when add tickets to cart, the tickets content change, updated all tickets in firebase
	useEffect(() => {
		if (!isFirstLoad) {
			dispatch(updateTicketsData(ticketsContent));
		}
		setIsFirstLoad(false);
	}, [dispatch, ticketsContent]);

	return (
		<section className={classes['section-tickets']}>
			<Card className={classes.tickets}>
				<TicketsHeader />
				<div className={classes['tickets__box']}>
					{isLoading && (
						<div className="centered">
							<Spinner />
						</div>
					)}
					{!isLoading &&
						ticketsContent.length !== 0 &&
						ticketsContent.map(ticket => (
							<TicketItem
								key={ticket.id}
								id={ticket.id}
								seats={ticket.seats}
								airline={ticket.airline}
								flight={ticket.flight}
								date={ticket.date}
								from={ticket.from}
								to={ticket.to}
								boardingTime={ticket.boardingTime}
								gate={ticket.gate}
							/>
						))}
					{!isLoading && ticketsContent.length === 0 && (
						<div>No airline tickets!</div>
					)}
				</div>
			</Card>
		</section>
	);
};

export default Tickets;
