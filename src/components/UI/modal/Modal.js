import { Fragment } from 'react';
import ReactDOM from 'react-dom';
import useInput from '../../../hooks/use-input';

import Input from '../input/Input';
import Card from '../card/Card';
import classes from './Modal.module.scss';

const isNotEmpty = value => value.trim().length > 0;

const Backdrop = props => {
	return <div className={classes.backdrop} onClick={props.onClose} />;
};

const ModalOverlay = props => {
	const { ticket } = props;

	const {
		value: nameValue,
		hasError: nameHasError,
		isValid: nameIsValid,
		inputBlurHandler: nameBlurHandler,
		valueChangeHandler: nameChangeHandler,
		reset: nameReset,
	} = useInput(isNotEmpty);

	const submitHandler = () => {
		if (!nameIsValid) return;
		props.onAddToCart(nameValue);
		nameReset();
	};

	return (
		<Card className={classes.modal}>
			<header className={classes['modal__header']}>
				<h2>Check you ticket</h2>
			</header>
			<main className={classes['modal__main']}>
				<p className={classes['modal__flight']}>
					<span>Flight</span>
					{ticket.flight}
				</p>
				<p className={classes['modal__date']}>
					<span>Date</span>
					{ticket.date}
				</p>
				<p className={classes['modal__from']}>
					<span>From</span>
					{ticket.from}
				</p>
				<p className={classes['modal__to']}>
					<span>To</span>
					{ticket.to}
				</p>
				<p className={classes['modal__boardingTime']}>
					<span>Boarding Time</span>
					{ticket.boardingTime}
				</p>
				<p className={classes['modal__class']}>
					<span>Class</span>
					{ticket.class}
				</p>
				<p className={classes['modal__seat']}>
					<span>Seat</span>
					{ticket.seat}
				</p>
				<p className={classes['modal__gate']}>
					<span>Gate</span>
					{ticket.gate}
				</p>
				<Input
					title="Name"
					id="name"
					type="text"
					name="name"
					placeholder="Your FullName"
					value={nameValue}
					onChange={nameChangeHandler}
					onBlur={nameBlurHandler}
					error={{ hasError: nameHasError, errorMessage: 'InValid name' }}
				/>
			</main>
			<footer className={classes['modal__footer']}>
				<button className={classes['modal__btn']} onClick={props.onClose}>
					Cancel
				</button>
				<button className={classes['modal__btn']} onClick={submitHandler}>
					Order
				</button>
			</footer>
		</Card>
	);
};

const Modal = props => {
	return (
		<Fragment>
			{ReactDOM.createPortal(
				<Backdrop onClose={props.onClose} />,
				document.querySelector('#backdrop-root')
			)}
			{ReactDOM.createPortal(
				<ModalOverlay
					ticket={props.ticket}
					onClose={props.onClose}
					onAddToCart={props.onAddToCart}
				/>,
				document.querySelector('#overlay-root')
			)}
		</Fragment>
	);
};

export default Modal;
