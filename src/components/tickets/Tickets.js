import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { fetchTicketsData } from '../../store/tickets-slice';

import TicketInfo from './TicketInfo';
import TicketList from './TicketList';
import TicketSearch from './TicketSearch';
import TimeLine from '../UI/timeline/Timeline';
import classes from './Tickets.module.scss';

const Tickets = () => {
	const dispatch = useDispatch();
	const [currentStep, setCurrentStep] = useState(1);
	const [chooseTicket, setChooseTicket] = useState({});
	const [selectedPassenger, setSelectedPassenger] = useState('');
	const [selectedClass, setSelectedClass] = useState('');
	const [selectedDate, setSelectedDate] = useState();

	// if app is first load, check if date is overtime, if it's, updated the tickets to firebase
	useEffect(() => {
		dispatch(fetchTicketsData());
	}, [dispatch]);

	const nextStepHandler = step => {
		setCurrentStep(step);
	};

	const userSelectedHandler = (
		selectedPassenger,
		selectedClass,
		selectedDate
	) => {
		setSelectedPassenger(selectedPassenger);
		setSelectedClass(selectedClass);
		setSelectedDate(selectedDate);
	};

	const chooseTicketHandler = chooseTicket => {
		setChooseTicket(chooseTicket);
	};

	return (
		<section className={classes['section-tickets']}>
			<TimeLine
				currentStep={currentStep}
				step={['Search', 'Choose', 'Check']}
			/>
			{currentStep === 1 && (
				<TicketSearch
					onNextStep={nextStepHandler}
					onUserSelected={userSelectedHandler}
				/>
			)}
			{currentStep === 2 && (
				<TicketList
					onChooseTicket={chooseTicketHandler}
					selectedClass={selectedClass}
					selectedDate={selectedDate}
					onNextStep={nextStepHandler}
				/>
			)}
			{currentStep === 3 && (
				<TicketInfo
					selectedPassenger={selectedPassenger}
					ticket={chooseTicket}
				/>
			)}
		</section>
	);
};

export default Tickets;
