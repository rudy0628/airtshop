import React, { useState, useEffect, useRef } from 'react';
import useInput from '../../hooks/use-input';
import { isNotEmpty } from '../../config/validator';
import { useSelector, useDispatch } from 'react-redux';
import {
	authActions,
	setUserData,
	updateUserData,
	sendUserData,
} from '../../store/auth-slice';
import { toast } from 'react-toastify';
import { toastStyle } from '../../config/content';
import defaultHeadshot from '../../img/default-headshot.jpeg';

import Spinner from '../UI/spinner/Spinner';
import Input from '../UI/input/Input';
import Card from '../UI/card/Card';
import { AiFillCamera } from 'react-icons/ai';
import classes from './Profile.module.scss';

const Profile = () => {
	const dispatch = useDispatch();
	const imageRef = useRef();
	const userData = useSelector(state => state.auth.userData);
	const token = useSelector(state => state.auth.token);
	const isLoading = useSelector(state => state.auth.isLoading);
	const [isInChangeName, setIsInChangeName] = useState(false);

	const {
		value: nameValue,
		hasError: nameHasError,
		isValid: nameIsValid,
		valueChangeHandler: nameChangeHandler,
		inputBlurHandler: nameBlurHandler,
	} = useInput(isNotEmpty);

	useEffect(() => {
		// get user data when user visited this page
		dispatch(setUserData(token));
	}, [dispatch, token]);

	//////////////////////////change name//////////////////////////
	const changeNameHandler = () => {
		if (!nameIsValid) {
			return;
		}
		dispatch(
			updateUserData({
				idToken: token,
				displayName: nameValue,
				returnSecureToken: true,
			})
		);
		setIsInChangeName(false);
	};

	const isInChangeNameHandler = () => {
		setIsInChangeName(prevState => !prevState);
	};

	///////////////////////////image upload///////////////////////////
	const uploadImage = async e => {
		let responseData;
		try {
			dispatch(authActions.setIsLoading(true));

			const formData = new FormData();
			formData.append('file', e.target.files[0]);
			formData.append(
				'upload_preset',
				`${process.env.REACT_APP_CLOUDINARY_PRESET_NAME}`
			);

			const response = await fetch(
				`https://api.cloudinary.com/v1_1/${process.env.REACT_APP_CLOUDINARY_CLOUD_NAME}/image/upload`,
				{
					method: 'POST',
					body: formData,
				}
			);
			responseData = await response.json();

			dispatch(authActions.setIsLoading(false));
		} catch (e) {
			toast.error('Upload image failed', toastStyle);
			dispatch(authActions.setIsLoading(false));
		}

		dispatch(
			updateUserData({
				idToken: token,
				photoUrl: responseData.secure_url,
				returnSecureToken: true,
			})
		);
	};

	// open image file selector
	const openSelectedHandler = () => {
		imageRef.current.click();
	};

	//////////////////////////rest password//////////////////////////
	const sendResetPasswordHandler = () => {
		dispatch(sendUserData(userData.email, '', '', 'FIND'));
	};

	// check user account is not google account
	let isNotGoogleAccount;
	if (userData && Object.keys(userData).length !== 0) {
		isNotGoogleAccount =
			String(userData.providerUserInfo[0].providerId) === 'password';
	}

	return (
		<section className={classes['section-profile']}>
			<Card className={classes['profile']}>
				{isLoading && (
					<div className="centered">
						<Spinner />
					</div>
				)}
				{!isLoading && (
					<React.Fragment>
						<div className={classes['profile__upload']}>
							<input type="file" ref={imageRef} onChange={uploadImage} hidden />
							<img src={userData.photoUrl || defaultHeadshot} alt="user" />
							{isNotGoogleAccount && (
								<button onClick={openSelectedHandler}>
									<AiFillCamera />
								</button>
							)}
						</div>
						<div className={classes['profile__name']}>
							<span>Name：</span>
							<Input
								className={classes['profile__input']}
								type="text"
								id="name"
								placeholder={userData.displayName}
								value={nameValue}
								onChange={nameChangeHandler}
								onBlur={nameBlurHandler}
								error={{
									hasError: nameHasError,
									errorMessage: 'Invalid name!',
								}}
								disabled={!isInChangeName}
							/>
							{!isInChangeName && isNotGoogleAccount && (
								<button
									onClick={isInChangeNameHandler}
									className={`btn btn--form ${classes['profile__btn']}`}
								>
									Chagne Name
								</button>
							)}
							{isInChangeName && isNotGoogleAccount && (
								<button
									onClick={changeNameHandler}
									className={`btn btn--form ${classes['profile__btn']}`}
								>
									Save
								</button>
							)}
						</div>
						<p className={classes['profile__email']}>
							<span>Email：</span>
							{userData.email}
						</p>
						{isNotGoogleAccount && (
							<p className={classes['profile__reset']}>
								<span>Password：</span>
								<button
									onClick={sendResetPasswordHandler}
									className={`btn btn--form ${classes['profile__btn']}`}
								>
									Reset Password
								</button>
							</p>
						)}
					</React.Fragment>
				)}
			</Card>
		</section>
	);
};

export default Profile;
