import React from 'react';

import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { generateSeat } from '../../config/content';
import { sendTicketCartData } from '../../store/tickets-slice';
import useInput from '../../hooks/use-input';
import { isNotEmpty, isEmail, isPhoneNumber } from '../../config/validator';

import Spinner from '../UI/spinner/Spinner';
import Input from '../UI/input/Input';
import TicketContent from './TicketContent';
import Card from '../UI/card/Card';
import itemClasses from './TicketItem.module.scss';
import infoClasses from './TicketInfo.module.scss';

const TicketInfo = props => {
	const { ticket } = props;
	const token = useSelector(state => state.auth.token);
	const isLoading = useSelector(state => state.tickets.isLoading);
	const dispatch = useDispatch();
	const navigate = useNavigate();

	const {
		value: fullNameValue,
		hasError: fullNameHasError,
		isValid: fullNameIsValid,
		valueChangeHandler: fullNameChangeHandler,
		inputBlurHandler: fullNameBlurHandler,
		reset: fullNameReset,
	} = useInput(isNotEmpty);
	const {
		value: emailValue,
		hasError: emailHasError,
		isValid: emailIsValid,
		valueChangeHandler: emailChangeHandler,
		inputBlurHandler: emailBlurHandler,
		reset: emailReset,
	} = useInput(isEmail);

	const {
		value: phoneNumberValue,
		hasError: phoneNumberHasError,
		isValid: phoneNumberIsValid,
		valueChangeHandler: phoneNumberChangeHandler,
		inputBlurHandler: phoneNumberBlurHandler,
		reset: phoneNumberReset,
	} = useInput(isPhoneNumber);

	const addToCartHandler = e => {
		e.preventDefault();

		if (!fullNameIsValid || !emailIsValid || !phoneNumberIsValid) {
			return;
		}

		dispatch(
			sendTicketCartData(
				{
					flight: ticket.flight,
					depTime: String(ticket.depTime),
					arrTime: String(ticket.arrTime),
					from: ticket.from,
					to: ticket.to,
					gate: ticket.gate || 'A1',
					duration: ticket.duration,
					classType: ticket.class,
					passenger: props.selectedPassenger,
					seat: generateSeat(),
					fullName: fullNameValue,
					email: emailValue,
					phoneNumber: phoneNumberValue,
					payment: 'none',
				},
				token
			)
		);

		navigate('/my-ticket');

		fullNameReset();
		emailReset();
		phoneNumberReset();
	};

	return (
		<Card className={itemClasses['ticketItem']}>
			{isLoading && (
				<div className="centered">
					<Spinner />
				</div>
			)}
			{!isLoading && (
				<React.Fragment>
					<TicketContent ticket={ticket} />
					<form
						onSubmit={addToCartHandler}
						className={infoClasses['ticketInfo']}
					>
						<h2 className={infoClasses['ticketInfo__title']}>Passenger Info</h2>
						<Input
							type="text"
							title="Full Name *"
							name="fullName"
							id="fullName"
							placeholder="Please input your full name"
							value={fullNameValue}
							onChange={fullNameChangeHandler}
							onBlur={fullNameBlurHandler}
							error={{
								hasError: fullNameHasError,
								errorMessage: 'Invalid full name',
							}}
						/>
						<Input
							type="email"
							title="Email *"
							name="email"
							id="email"
							placeholder="Please input your email"
							value={emailValue}
							onChange={emailChangeHandler}
							onBlur={emailBlurHandler}
							error={{
								hasError: emailHasError,
								errorMessage: 'Invalid email',
							}}
						/>
						<Input
							type="text"
							title="Phone Number *"
							name="phoneNumber"
							id="phoneNumber"
							placeholder="Please input your phone number"
							value={phoneNumberValue}
							onChange={phoneNumberChangeHandler}
							onBlur={phoneNumberBlurHandler}
							error={{
								hasError: phoneNumberHasError,
								errorMessage: 'Invalid phone number',
							}}
						/>
						<button
							className={`btn btn--form ${infoClasses['ticketInfo__btn']}`}
						>
							Add To Cart
						</button>
					</form>
				</React.Fragment>
			)}
		</Card>
	);
};

export default TicketInfo;
