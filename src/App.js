import { Fragment } from 'react';
import { Route, Routes } from 'react-router-dom';

import MainHeader from './components/layout/MainHeader';
import IntroducePage from './pages/IntroducePage';
import MyTicketPage from './pages/MyTicketPage';
import SignInPage from './pages/SignInPage';
import TicketsPage from './pages/TicketsPage';

function App() {
	return (
		<Fragment>
			<MainHeader />
			<Routes>
				<Route path="/" element={<IntroducePage />} />
				<Route path="/MyTicket" element={<MyTicketPage />} />
				<Route path="/SignIn" element={<SignInPage />} />
				<Route path="/Tickets" element={<TicketsPage />} />
			</Routes>
		</Fragment>
	);
}

export default App;
