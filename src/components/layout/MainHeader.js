import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { authActions } from '../../store/auth-slice';
import { NavLink, useNavigate } from 'react-router-dom';

import { AiOutlineMenu, AiOutlineClose } from 'react-icons/ai';
import 'react-toastify/dist/ReactToastify.css';
import classes from './MainHeader.module.scss';

const MainHeader = () => {
	const [menuIsOpen, setMenuIsOpen] = useState(false);
	const isLogged = useSelector(state => state.auth.isLogged);
	const dispatch = useDispatch();
	const navigate = useNavigate();

	const logoutHandler = () => {
		dispatch(authActions.logout());
		setMenuIsOpen(prevState => !prevState);
		navigate('/');
	};

	const toggleMenuHandler = () => {
		setMenuIsOpen(prevState => !prevState);
	};

	let headerClasses;
	if (menuIsOpen) {
		headerClasses = `${classes.header} ${classes['nav-open']}`;
	} else {
		headerClasses = `${classes.header}`;
	}

	return (
		<header className={headerClasses}>
			<NavLink to="/" className={classes['header__logo']}>
				airtshop
			</NavLink>
			<nav className={classes['header__nav']}>
				<ul className={classes['header__list']}>
					<li className={classes['header__item']}>
						<NavLink
							to="/tickets"
							className={({ isActive }) =>
								isActive
									? `${classes['header__link--active']}`
									: `${classes['header__link']}`
							}
							onClick={toggleMenuHandler}
						>
							Tickets
						</NavLink>
					</li>
					{isLogged && (
						<li className={classes['header__item']}>
							<NavLink
								to="/my-ticket"
								className={({ isActive }) =>
									isActive
										? `${classes['header__link--active']}`
										: `${classes['header__link']}`
								}
								onClick={toggleMenuHandler}
							>
								My Ticket
							</NavLink>
						</li>
					)}
					<li className={classes['header__item']}>
						{!isLogged && (
							<NavLink
								to="/sign-in"
								className={({ isActive }) =>
									isActive
										? `${classes['header__link--active']}`
										: `${classes['header__link']}`
								}
								onClick={toggleMenuHandler}
							>
								Sign In
							</NavLink>
						)}
						{isLogged && (
							<button
								onClick={logoutHandler}
								className={classes['header__link']}
							>
								Logout
							</button>
						)}
					</li>
				</ul>
			</nav>
			<button
				onClick={toggleMenuHandler}
				className={classes['header__link--menu']}
			>
				{!menuIsOpen && (
					<AiOutlineMenu className={classes['header__icon--menu']} />
				)}
				{menuIsOpen && (
					<AiOutlineClose className={classes['header__icon--close']} />
				)}
			</button>
		</header>
	);
};

export default MainHeader;
