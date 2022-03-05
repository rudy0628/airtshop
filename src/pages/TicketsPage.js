import { Fragment } from 'react';
import { Helmet } from 'react-helmet';
import Tickets from '../components/tickets/Tickets';

const TicketsPage = () => {
	return (
		<Fragment>
			<Helmet>
				<title>airtshop - Tickets</title>
				<meta
					name="description"
					content="In this page, we can see all airline tickets and the tickets information, if user want to choose specific ticket, airtshop provide search bar to search for ticket."
				/>
			</Helmet>
			<Tickets />
		</Fragment>
	);
};

export default TicketsPage;
