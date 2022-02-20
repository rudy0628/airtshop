import { NavLink } from 'react-router-dom';
import classes from './MainHeader.module.scss';

const MainHeader = () => {
	return (
		<header className={classes.header}>
			<NavLink to="/" className={classes['header__logo']}>
				airtshop
			</NavLink>
			<nav className={classes['header__nav']}>
				<ul className={classes['header__list']}>
					<li className={classes['header__item']}>
						<NavLink
							to="/Tickets"
							className={({ isActive }) =>
								isActive
									? `${classes['header__link--active']}`
									: `${classes['header__link']}`
							}
						>
							Tickets
						</NavLink>
					</li>
					<li className={classes['header__item']}>
						<NavLink
							to="/MyTicket"
							className={({ isActive }) =>
								isActive
									? `${classes['header__link--active']}`
									: `${classes['header__link']}`
							}
						>
							My Ticket
						</NavLink>
					</li>
					<li className={classes['header__item']}>
						<NavLink
							to="/SignIn"
							className={({ isActive }) =>
								isActive
									? `${classes['header__link--active']}`
									: `${classes['header__link']}`
							}
						>
							Sign In
						</NavLink>
					</li>
				</ul>
			</nav>
		</header>
	);
};

export default MainHeader;
