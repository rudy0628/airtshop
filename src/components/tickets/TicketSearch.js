import { useDispatch, useSelector } from 'react-redux';
import { fetchTicketsData } from '../../store/tickets-slice';
import useInput from '../../hooks/use-input';
import { passengersOption, classOption } from '../../config/content';
import { isNotEmpty, isIataCode } from '../../config/validator';

import Spinner from '../UI/spinner/Spinner';
import Input from '../UI/input/Input';
import Card from '../UI/card/Card';
import Option from '../UI/option/Option';
import classes from './TicketSearch.module.scss';

const TicketSearch = props => {
	const isLoading = useSelector(state => state.tickets.isLoading);
	const dispatch = useDispatch();

	const {
		value: depValue,
		hasError: depHasError,
		isValid: depIsValid,
		valueChangeHandler: depChangeHandler,
		inputBlurHandler: depBlurHandler,
		reset: depReset,
	} = useInput(isIataCode);

	const {
		value: arrValue,
		hasError: arrHasError,
		isValid: arrIsValid,
		valueChangeHandler: arrChangeHandler,
		inputBlurHandler: arrBlurHandler,
		reset: arrReset,
	} = useInput(isIataCode);

	const {
		value: dateValue,
		hasError: dateHasError,
		isValid: dateIsValid,
		valueChangeHandler: dateChangeHandler,
		inputBlurHandler: dateBlurHandler,
		reset: dateReset,
	} = useInput(isNotEmpty);

	const {
		value: passengersValue,
		valueChangeHandler: passengerChangeHandler,
		reset: passengersReset,
	} = useInput(isNotEmpty);

	const {
		value: classValue,
		valueChangeHandler: classChangeHandler,
		reset: classReset,
	} = useInput(isNotEmpty);

	const submitHandler = async e => {
		e.preventDefault();

		if (
			!passengersValue ||
			!classValue ||
			!depIsValid ||
			!arrIsValid ||
			!dateIsValid
		) {
			return;
		}

		await dispatch(fetchTicketsData(depValue, arrValue));

		props.onUserSelected(
			passengersValue,
			classValue,
			new Date(dateValue).getTime()
		);

		depReset();
		arrReset();
		dateReset();
		passengersReset();
		classReset();
		props.onNextStep(2);
	};

	return (
		<Card className={classes['tickets__search-form']}>
			{isLoading && (
				<div className="centered">
					<Spinner />
				</div>
			)}
			{!isLoading && (
				<form onSubmit={submitHandler}>
					<Input
						type="text"
						title="Dep airport *"
						name="dep"
						id="dep"
						placeholder="Please input iata code"
						value={depValue}
						onChange={depChangeHandler}
						onBlur={depBlurHandler}
						error={{ hasError: depHasError, errorMessage: 'Invalid iata code' }}
					/>
					<Input
						type="text"
						title="Arr airport *"
						name="arr"
						id="arr"
						placeholder="Please input iata code"
						value={arrValue}
						onChange={arrChangeHandler}
						onBlur={arrBlurHandler}
						error={{ hasError: arrHasError, errorMessage: 'Invalid iata code' }}
					/>
					<Input
						type="datetime-local"
						title="Dep Date *"
						name="DepDate"
						id="DepDate"
						placeholder="Please select correct time"
						value={dateValue}
						onChange={dateChangeHandler}
						onBlur={dateBlurHandler}
						error={{ hasError: dateHasError, errorMessage: 'Invalid date' }}
						className={classes['tickets__full-row']}
					/>
					<Option
						title="Passengers"
						option={passengersOption}
						onChange={passengerChangeHandler}
						value={passengersValue}
					/>
					<Option
						title="Class"
						option={classOption}
						onChange={classChangeHandler}
						value={classValue}
					/>
					<p>
						Don't know airport iata code？
						<a
							href="https://www.iata.org/en/publications/directories/code-search/"
							target="_blank"
							rel="noreferrer"
						>
							Click here to search.
						</a>
					</p>
					<button className={`btn btn--form ${classes['tickets__full-row']}`}>
						Search
					</button>
				</form>
			)}
		</Card>
	);
};

export default TicketSearch;
