import { useState, useRef } from 'react';
import { useDispatch } from 'react-redux';
import { ticketsActions, fetchTicketsData } from '../../store/tickets-slice';

import { airportCode } from '../../config/content';
import Select from 'react-select';
import { AiOutlineSearch, AiOutlineRollback } from 'react-icons/ai';

import classes from './TicketsHeader.module.scss';

const TicketsHeader = () => {
	const [selectedFrom, setSelectedFrom] = useState(null);
	const [selectedTo, setSelectedTo] = useState(null);
	const dateTimeRef = useRef();
	const dispatch = useDispatch();

	const submitHandler = e => {
		e.preventDefault();

		if (!dateTimeRef.current.value || !selectedFrom || !selectedTo) {
			return;
		}

		dispatch(
			ticketsActions.filterTickets({
				dateTime: dateTimeRef.current.value,
				from: selectedFrom.value,
				to: selectedTo.value,
			})
		);
	};

	const resetHandler = () => {
		dispatch(fetchTicketsData());
	};

	return (
		<nav className={classes['tickets__nav']}>
			<form onSubmit={submitHandler}>
				<div className={classes['tickets__input']}>
					<label htmlFor="date">Date</label>
					<input
						ref={dateTimeRef}
						type="datetime-local"
						id="date"
						name="date"
						required
					/>
				</div>
				<div className={classes['tickets__input']}>
					<label htmlFor="from">From</label>
					<Select
						options={airportCode}
						onChange={setSelectedFrom}
						className={classes['tickets__select']}
						style={{ width: '500px' }}
					/>
				</div>
				<div className={classes['tickets__input']}>
					<label htmlFor="from">To</label>
					<Select
						options={airportCode}
						onChange={setSelectedTo}
						className={classes['tickets__select']}
					/>
				</div>
				<button className={classes['tickets__btn--search']}>
					<AiOutlineSearch className={classes['tickets__icon']} />
				</button>
				<button
					type="button"
					onClick={resetHandler}
					className={classes['tickets__btn--reset']}
				>
					<AiOutlineRollback className={classes['tickets__icon']} />
				</button>
			</form>
		</nav>
	);
};

export default TicketsHeader;
