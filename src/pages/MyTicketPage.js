import { Fragment } from 'react';
import { Helmet } from 'react-helmet';
import TicketCart from '../components/tickets/TicketCart';

const MyTicketPage = () => {
	return (
		<Fragment>
			<Helmet>
				<title>airtshop - My Ticket</title>
				<meta
					name="description"
					content="This Page can show what the ticket you order from tickets page, and you can see your tickets information, also can cancel the ticket. When the ticket is overtime, this page will show you your ticket is overtime."
				/>
			</Helmet>
			<TicketCart />
		</Fragment>
	);
};

export default MyTicketPage;
