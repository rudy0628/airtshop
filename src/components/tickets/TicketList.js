import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { v4 as uuidv4 } from 'uuid';
import ssairlineLogo from '../../img/ssairline-logo.png';
import InfiniteScroll from 'react-infinite-scroll-component';

import Spinner from '../UI/spinner/Spinner';
import TicketItem from './TicketItem';
import classes from './TicketList.module.scss';

const TicketList = props => {
	const [infiniteTickets, setInfiniteTickets] = useState([]);
	const [sortByAsc, setSortByAsc] = useState(true);
	let ticketsContent = useSelector(state => state.tickets.tickets);

	let sortingTickets;
	if (sortByAsc) {
		sortingTickets = infiniteTickets
			.slice(0)
			.sort((a, b) => a.props.duration - b.props.duration);
	} else {
		sortingTickets = infiniteTickets
			.slice(0)
			.sort((a, b) => b.props.duration - a.props.duration);
	}

	const filterTickets = ticketsContent
		.filter(
			ticket =>
				ticket.dep_time_ts * 1000 > Date.now() &&
				ticket.dep_time_ts * 1000 > props.selectedDate
		)
		.map(ticket => {
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
					duration={ticket.duration}
					class={props.selectedClass}
					onChooseTicket={props.onChooseTicket}
					onNextStep={props.onNextStep}
				/>
			);
		});

	const searchAgainHandler = () => {
		props.onNextStep(1);
	};

	const sortByHandler = () => {
		setSortByAsc(prevState => !prevState);
	};

	// infinite load
	useEffect(() => {
		setInfiniteTickets(filterTickets);
	}, []);

	const fetchMoreData = () => {
		setTimeout(() => {
			setInfiniteTickets(prevTickets => prevTickets.concat(filterTickets));
		}, 1500);
	};

	return (
		<React.Fragment>
			{infiniteTickets && infiniteTickets.length !== 0 && (
				<div className={classes['ticketList__header']}>
					<p className={classes['ticketList__title']}>
						{infiniteTickets.length} ticket
						{infiniteTickets.length < 1 ? '' : 's'} from{' '}
						<img src={ssairlineLogo} alt="ss airline" /> SS Airline
					</p>
					<button
						onClick={sortByHandler}
						className={classes['ticketList__btn--sort']}
					>
						Price: {sortByAsc ? <>Low &rarr; High</> : <>High &rarr; Low</>}
					</button>
				</div>
			)}
			{infiniteTickets && infiniteTickets.length !== 0 && (
				<ul className={classes['ticketList']}>
					<InfiniteScroll
						dataLength={infiniteTickets.length}
						next={fetchMoreData}
						hasMore={true}
						loader={
							<div className="centered">
								<Spinner />
							</div>
						}
					>
						{sortingTickets}
					</InfiniteScroll>
				</ul>
			)}
			{infiniteTickets.length === 0 && (
				<div className={classes['ticketList__notFound']}>
					<p className={classes['ticketList__emptyText']}>No tickets found!</p>
					<button onClick={searchAgainHandler} className="btn btn--form">
						Search Again
					</button>
				</div>
			)}
		</React.Fragment>
	);
};

export default TicketList;
