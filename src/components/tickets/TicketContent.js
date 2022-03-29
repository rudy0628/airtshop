import React from 'react';

import ssairlineLogo from '../../img/ssairline-logo.png';
import classes from './TicketItem.module.scss';

const TicketContent = props => {
	const { ticket } = props;
	const flightHour = parseInt(ticket.duration / 60);
	const flightMinute = ticket.duration % 60;
	const depDate = new Date(ticket.depTime * 1000);
	const arrDate = new Date(ticket.arrTime * 1000);

	const classType = ticket.class ? ticket.class : ticket.classType;

	let price;
	if (classType === 'economy') {
		price = ticket.duration * 52;
	} else if (classType === 'business') {
		price = ticket.duration * 52 * 2;
	} else if (classType === 'first') {
		price = ticket.duration * 52 * 5;
	}

	return (
		<React.Fragment>
			<span className={classes['ticketItem__class']}>
				{classType.toUpperCase()}
			</span>
			<p className={classes['ticketItem__price']}>
				NTD$
				{price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
			</p>
			<div className={classes['ticketItem__main']}>
				<div className={classes['ticketItem__main--header']}>
					<p className={classes['ticketItem__date']}>
						<span>{depDate.getDate()}</span>
						{depDate.toLocaleString('default', {
							month: 'long',
						})}
					</p>
					<div className={classes['ticketItem__airline']}>
						<img src={ssairlineLogo} alt="ss airline" />
					</div>
				</div>
				<div className={classes['ticketItem__info']}>
					<p className={classes['ticketItem__from']}>
						<span>
							{depDate.toTimeString().split(' ')[0].split(':')[0]}:
							{depDate.toTimeString().split(' ')[0].split(':')[1]}
						</span>
						{ticket.from}
					</p>
					<div className={classes['ticketItem__duration']}>
						<p className={classes['ticketItem__duration--type']}>DIRECT</p>
						<div className={classes['ticketItem__duration--line']}></div>
						<p className={classes['ticketItem__duration--duration']}>
							{flightHour < 10 ? `0${flightHour}` : flightHour}H{' '}
							{flightMinute < 10 ? `0${flightMinute}` : flightMinute}M
						</p>
					</div>
					<p className={classes['ticketItem__to']}>
						<span>
							{arrDate.toTimeString().split(' ')[0].split(':')[0]}:
							{arrDate.toTimeString().split(' ')[0].split(':')[1]}
						</span>
						{ticket.to}
					</p>
				</div>
			</div>
		</React.Fragment>
	);
};

export default TicketContent;
