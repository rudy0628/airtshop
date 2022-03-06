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
		valueChangeHandler: nameChangeHandler,
		inputBlurHandler: nameBlurHandler,
	} = useInput(isNotEmpty);

	const {
		value: emailValue,
		hasError: emailHasError,
		valueChangeHandler: emailChangeHandler,
		inputBlurHandler: emailBlurHandler,
	} = useInput(isEmail);

	const {
		value: messageValue,
		hasError: messageHasError,
		valueChangeHandler: messageChangeHandler,
		inputBlurHandler: messageBlurHandler,
	} = useInput(isNotEmpty);

	return (
		<Card className={classes.form}>
			<form name="contact" method="post">
				<h2 className="heading__secondary">Have Any Question?</h2>
				<p className={classes['form__text']}>Please send the message below</p>
				<input type="hidden" name="form-name" value="contact" />
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
