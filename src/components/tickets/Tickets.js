import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchTicketsData } from '../../store/tickets-slice';
import { v4 as uuidv4 } from 'uuid';

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
		dispatch(fetchTicketsData());
	}, [dispatch]);

	const filterTicket = ticketsContent.map(ticket => {
		const id = uuidv4();
		return (
			<TicketItem
				key={id}
				id={id}
				flight={ticket.flight_iata}
				depTime={ticket.dep_time_ts}
				arrTime={ticket.arr_time_ts}
				from={ticket.dep_iata}
				to={ticket.arr_iata}
				gate={ticket.dep_gate}
			/>
		);
	});

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
					{!isLoading && filterTicket.length !== 0 && filterTicket}
					{!isLoading && filterTicket.length === 0 && (
						<p className="empty-text">No airline tickets!</p>
					)}
				</div>
			</Card>
		</section>
	);
};

export default Tickets;
