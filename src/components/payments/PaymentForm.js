import React, { useState } from 'react';
import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';
import { useSelector, useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import { toastStyle } from '../../config/content';
import { updateTicketCartData } from '../../store/tickets-slice';
import { productPrice } from '../../config/helper';
import sendHttp from '../../config/send-http';

import Spinner from '../UI/spinner/Spinner';
import classes from './PaymentForm.module.scss';

/////////////////// PaymentForm ///////////////////

const CARD_OPTIONS = {
	iconStyle: 'solid',
	style: {
		base: {
			iconColor: '#d6336c',
			color: '#333',
			fontWeight: 500,
			fontFamily: 'Roboto, Open Sans, Segoe UI, sans-serif',
			fontSize: '16px',
			fontSmoothing: 'antialiased',
			':-webkit-autofill': { color: '#333' },
			'::placeholder': { color: '#333' },
		},
		invalid: {
			iconColor: '#f03e3e',
			color: '#f03e3e',
		},
	},
};

const PaymentForm = props => {
	const { ticket } = props;
	const stripe = useStripe();
	const elements = useElements();
	const dispatch = useDispatch();
	const token = useSelector(state => state.auth.token);
	const [isLoading, setIsLoading] = useState(false);

	const price = productPrice(ticket.duration, ticket.classType);

	const cancelHandler = () => {
		props.onCancel();
	};

	const submitHandler = async e => {
		e.preventDefault();
		setIsLoading(true);

		const { error, paymentMethod } = await stripe.createPaymentMethod({
			type: 'card',
			card: elements.getElement(CardElement),
		});

		if (!error) {
			try {
				const { id } = paymentMethod;
				const requestBody = {
					query: `
						mutation {
							createPayment(paymentId: "${id}", amount: ${price * 100}, flight: "${
						ticket.flight
					}") {
								id
								success
							}
						}
					`,
				};

				const responseData = await sendHttp(requestBody, token);

				if (responseData.data.createPayment.success) {
					dispatch(
						updateTicketCartData(
							ticket._id,
							responseData.data.createPayment.id,
							token
						)
					);
					toast.success('Payment successful', toastStyle);
					cancelHandler();
				}
			} catch (e) {
				toast.error('Payment failed', toastStyle);
			}
		} else {
			toast.error(error.message, toastStyle);
		}

		setIsLoading(false);
	};

	return (
		<form onSubmit={submitHandler}>
			<React.Fragment>
				<fieldset className={classes['payment__form--Group']}>
					<div className={classes['payment__form--Row']}>
						<CardElement options={CARD_OPTIONS} />
					</div>
				</fieldset>
				{!isLoading && (
					<div className={classes['payment__form--BtnGroup']}>
						<button className="btn btn--form" onClick={cancelHandler}>
							Cancel
						</button>
						{ticket.payment === 'none' && (
							<button type="submit" className="btn btn--form">
								Pay
							</button>
						)}
					</div>
				)}
				{isLoading && (
					<div className="centered">
						<Spinner />
					</div>
				)}
			</React.Fragment>
		</form>
	);
};

export default PaymentForm;
