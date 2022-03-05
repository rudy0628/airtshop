import Input from '../../UI/input/Input';
import Card from '../../UI/card/Card';

import useInput from '../../../hooks/use-input';
import classes from './ContactForm.module.scss';

const isNotEmpty = value => value.trim().length !== 0;
const isEmail = value => value.trim().length !== 0 && value.includes('@');

const ContactForm = () => {
	const {
		value: nameValue,
		hasError: nameHasError,
		isValid: nameIsValid,
		valueChangeHandler: nameChangeHandler,
		inputBlurHandler: nameBlurHandler,
		reset: nameReset,
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
		value: messageValue,
		hasError: messageHasError,
		isValid: messageIsValid,
		valueChangeHandler: messageChangeHandler,
		inputBlurHandler: messageBlurHandler,
		reset: messageReset,
	} = useInput(isNotEmpty);

	const fromIsValid = nameIsValid && emailIsValid && messageIsValid;

	const submitHandler = e => {
		e.preventDefault();

		if (!fromIsValid) return;

		nameReset();
		emailReset();
		messageReset();
	};

	return (
		<Card className={classes.form}>
			<form name="contact" method="post">
				<h2 className="heading__secondary">Have Any Question?</h2>
				<p className={classes['form__text']}>Please send the message below</p>
				<Input
					title="Name"
					type="text"
					id="name"
					placeholder="Entered Your Name"
					value={nameValue}
					error={{ hasError: nameHasError, errorMessage: 'InValid Name Input' }}
					onChange={nameChangeHandler}
					onBlur={nameBlurHandler}
				/>
				<Input
					title="Email"
					type="email"
					id="email"
					placeholder="Entered Your Email"
					value={emailValue}
					error={{
						hasError: emailHasError,
						errorMessage: 'InValid Email Input',
					}}
					onChange={emailChangeHandler}
					onBlur={emailBlurHandler}
				/>
				<div className={classes['form__message']}>
					<label htmlFor="message">Message</label>
					<textarea
						name="message"
						id="message"
						rows="2"
						placeholder="What question do you want to ask?"
						value={messageValue}
						onChange={messageChangeHandler}
						onBlur={messageBlurHandler}
					/>
					{messageHasError && (
						<p className="error-text">InValid Message Input</p>
					)}
				</div>
				<button className="btn btn--form">Submit</button>
			</form>
			<div className={classes['form__img-box']} />
		</Card>
	);
};

export default ContactForm;
