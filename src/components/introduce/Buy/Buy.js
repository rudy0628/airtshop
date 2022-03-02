import { NavLink } from 'react-router-dom';

import buyImg from '../../../img/buy.jpg';
import classes from './Buy.module.scss';

const Buy = () => {
	return (
		<section className={classes['section-buy']}>
			<div className={classes['buy__text-box']}>
				<h2 className="heading__secondary">Buy Your Ticket</h2>
				<p className={classes['buy__text']}>
					Now, It's time to buy your own ticket, click the link below!
				</p>
				<NavLink to="/tickets" className={classes['buy__link']}>
					Tickets Page
					<span> &rarr;</span>
				</NavLink>
			</div>
			<div className={classes['buy__img-box']} />
		</section>
	);
};

export default Buy;
