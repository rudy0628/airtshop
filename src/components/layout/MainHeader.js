import { useSelector, useDispatch } from 'react-redux';
import { authActions } from '../../store/auth-slice';
import { NavLink, useNavigate } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';
import classes from './MainHeader.module.scss';

const MainHeader = () => {
	const isLogged = useSelector(state => state.auth.isLogged);
	const dispatch = useDispatch();
	const navigate = useNavigate();

	const logoutHandler = () => {
		dispatch(authActions.logout());
		navigate('/');
	};

	return (
		<header className={classes.header}>
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
		</header>
	);
};

export default MainHeader;
