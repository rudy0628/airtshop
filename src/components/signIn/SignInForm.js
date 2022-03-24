import { useState, Fragment } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import useInput from '../../hooks/use-input';
import {
	FacebookAuthProvider,
	GoogleAuthProvider,
	signInWithPopup,
} from 'firebase/auth';
import { auth } from '../../Firebase/firebase';
import { authActions, sendUserData } from '../../store/auth-slice';
import { toastStyle } from '../../config/content';
import { toast } from 'react-toastify';

import { FcGoogle } from 'react-icons/fc';
import { FaFacebookF } from 'react-icons/fa';
import Input from '../UI/input/Input';
import Card from '../UI/card/Card';
import Spinner from '../UI/spinner/Spinner';
import classes from './SignInForm.module.scss';

const isEmail = value => value.trim().length > 0 && value.includes('@');
const isPassword = value => value.trim().length > 7 && value.trim().length < 17;
const isNotEmpty = value => value.trim().length > 0;

const SignInForm = () => {
	const isLogging = useSelector(state => state.auth.isLogging);
	const [formType, setFormType] = useState('SIGNIN');
	const dispatch = useDispatch();
	const navigate = useNavigate();

	const {
		value: emailValue,
		hasError: emailHasError,
		isValid: emailIsValid,
		valueChangeHandler: emailChangeHandler,
		inputBlurHandler: emailBlurHandler,
		reset: emailReset,
	} = useInput(isEmail);

	const {
		value: passwordValue,
		hasError: passwordHasError,
		isValid: passwordIsValid,
		valueChangeHandler: passwordChangeHandler,
		inputBlurHandler: passwordBlurHandler,
		reset: passwordReset,
	} = useInput(isPassword);

	const {
		value: nameValue,
		hasError: nameHasError,
		isValid: nameIsValid,
		valueChangeHandler: nameChangeHandler,
		inputBlurHandler: nameBlurHandler,
		reset: nameReset,
	} = useInput(isNotEmpty);

	// google login
	const signInWithGoogle = () => {
		const provider = new GoogleAuthProvider();
		signInWithPopup(auth, provider)
			.then(result => {
				dispatch(
					authActions.login({
						token: result._tokenResponse.idToken,
						expirationTime: result.user.stsTokenManager.expirationTime,
					})
				);
				navigate('/');

				toast.success(`Welcome, ${result.user.displayName}!`, toastStyle);
			})
			.catch(error => {
				toast.error('Google Login Failed, Please Try Again!', toastStyle);
			});
	};

	// facebook login
	const signInWithFacebook = () => {
		const provider = new FacebookAuthProvider();
		signInWithPopup(auth, provider)
			.then(result => {
				dispatch(
					authActions.login({
						token: result._tokenResponse.idToken,
						expirationTime: result.user.stsTokenManager.expirationTime,
					})
				);
				navigate('/');

				toast.success(`Welcome, ${result.user.displayName}!`, toastStyle);
			})
			.catch(e => {
				toast.error('Facebook Login Failed, Please Try Again!', toastStyle);
			});
	};

	const reset = () => {
		emailReset();
		passwordReset();
		nameReset();
	};

	const changeToRegisterHandler = () => {
		setFormType('REGISTER');
		reset();
	};

	const changeToFindPwdHandler = () => {
		setFormType('FIND');
		reset();
	};

	const changeToLoginHandler = () => {
		setFormType('SIGNIN');
		reset();
	};

	let formIsValid;
	if (formType === 'SIGNIN') {
		formIsValid = emailIsValid && passwordIsValid;
	} else if (formType === 'REGISTER') {
		formIsValid = emailIsValid && passwordIsValid && nameIsValid;
	} else if (formType === 'FIND') {
		formIsValid = emailIsValid;
	}

	const submitHandler = e => {
		e.preventDefault();

		if (!formIsValid) return;

		dispatch(sendUserData(emailValue, passwordValue, nameValue, formType));

		reset();

		if (formType !== 'FIND') {
			toast.success(`Welcome, ${nameValue}!`, toastStyle);
		}
	};

	let title, formBtnText;
	if (formType === 'SIGNIN') {
		title = 'Sign In';
		formBtnText = 'Login';
	} else if (formType === 'REGISTER') {
		title = 'Register';
		formBtnText = 'Sign Up';
	} else if (formType === 'FIND') {
		title = 'Find Password';
		formBtnText = 'Reset Password';
	}

	return (
		<Card className={classes.signIn}>
			{isLogging && <div className="centered">{<Spinner />}</div>}
			{!isLogging && (
				<Fragment>
					<form onSubmit={submitHandler}>
						<h2 className="heading__secondary">{title}</h2>
						{formType === 'REGISTER' && (
							<Input
								type="text"
								id="name"
								title="Name"
								placeholder="Rudy"
								value={nameValue}
								onChange={nameChangeHandler}
								onBlur={nameBlurHandler}
								error={{
									hasError: nameHasError,
									errorMessage: 'InValid Name Input',
								}}
							/>
						)}
						<Input
							type="email"
							id="email"
							title="Email"
							placeholder="rudy@example.com"
							value={emailValue}
							onChange={emailChangeHandler}
							onBlur={emailBlurHandler}
							error={{
								hasError: emailHasError,
								errorMessage: 'InValid Email Input',
							}}
						/>
						{formType !== 'FIND' && (
							<Input
								type="password"
								id="password"
								title="Password"
								placeholder="8 ~ 16 characters"
								value={passwordValue}
								onChange={passwordChangeHandler}
								onBlur={passwordBlurHandler}
								error={{
									hasError: passwordHasError,
									errorMessage: 'InValid Password Input',
								}}
							/>
						)}
						<button className="btn btn--form" disabled={!formIsValid}>
							{formBtnText}
						</button>
					</form>
					{formType !== 'FIND' && (
						<button
							onClick={changeToFindPwdHandler}
							className={classes['signIn__btn--forgotPassword']}
						>
							Forgot Password?
						</button>
					)}
					<p className="line-break">or</p>
					<div className={classes['signIn__oauth']}>
						<button onClick={signInWithGoogle}>
							<FcGoogle className={classes['signIn__icon']} />
						</button>
						<button onClick={signInWithFacebook}>
							<FaFacebookF className={classes['signIn__icon']} />
						</button>
					</div>
					<p className={classes['signIn__switchMode']}>
						Need Account ?
						<button onClick={changeToRegisterHandler}>Register</button>
						else
						<button onClick={changeToLoginHandler}>Sign In</button>
					</p>
				</Fragment>
			)}
		</Card>
	);
};

export default SignInForm;
