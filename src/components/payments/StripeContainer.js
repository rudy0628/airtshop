import React from 'react';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';

import PaymentForm from './PaymentForm';

const PUBLIC_KEY = process.env.REACT_APP_STRIPE_PUBLIC_KEY;

const StripePromise = loadStripe(PUBLIC_KEY);

const StripeContainer = props => {
	return (
		<Elements stripe={StripePromise}>
			<PaymentForm ticket={props.ticket} onCancel={props.onCancel} />
		</Elements>
	);
};

export default StripeContainer;
