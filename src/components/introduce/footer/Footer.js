import { NavLink } from 'react-router-dom';

import { FiFacebook, FiInstagram, FiTwitter } from 'react-icons/fi';
import classes from './Footer.module.scss';

const Footer = () => {
	const year = new Date().getFullYear();

	return (
		<footer className={classes.footer}>
			<NavLink to="/" className={classes['footer__logo']}>
				airtshop
			</NavLink>
			<div className={classes['footer__link-box']}>
				<a
					href="https://www.facebook.com/"
					className={classes['footer__link']}
					target="_blank"
					rel="noreferrer"
				>
					<FiFacebook className={classes['footer__icon--facebook']} />
				</a>
				<a
					href="https://www.instagram.com/"
					className={classes['footer__link']}
					target="_blank"
					rel="noreferrer"
				>
					<FiInstagram className={classes['footer__icon--instagram']} />
				</a>
				<a
					href="https://twitter.com/"
					className={classes['footer__link']}
					target="_blank"
					rel="noreferrer"
				>
					<FiTwitter className={classes['footer__icon--twitter']} />
				</a>
			</div>
			<p className={classes['footer__copyright']}>
				{year} &copy; airtshop reserve all right
			</p>
		</footer>
	);
};

export default Footer;
