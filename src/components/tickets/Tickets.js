import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchTicketsData, sendTicketsData } from '../../store/tickets-slice';

import TicketsHeader from './TicketsHeader';
import TicketItem from './TicketItem';
import Card from '../UI/card/Card';
import Spinner from '../UI/spinner/Spinner';
import classes from './Tickets.module.scss';

const Tickets = () => {
	const dispatch = useDispatch();
	const ticketsContent = useSelector(state => state.tickets.tickets);
	const isLoading = useSelector(state => state.tickets.isLoading);

	// if app is first load, check if date is overtime, if it's, updated the tickets to firebase
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
	}, [dispatch]);

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
						ticketsContent.map(ticket => {
							if (
								Date.parse(`${ticket.date} ${ticket.boardingTime}`) > Date.now()
							) {
								return (
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
								);
							}
						})}
					{!isLoading && ticketsContent.length === 0 && (
						<p className="empty-text">No airline tickets!</p>
					)}
				</div>
			</Card>
		</section>
	);
};

export default Tickets;
