import { Fragment } from 'react';
import { Helmet } from 'react-helmet';

import Hero from '../components/introduce/hero/Hero';
import Cooperate from '../components/introduce/cooperate/Cooperate';
import Steps from '../components/introduce/step/Steps';
import Feature from '../components/introduce/feature/Feature';
import Buy from '../components/introduce/Buy/Buy';
import Contact from '../components/introduce/contact/Contact';
import Footer from '../components/introduce/footer/Footer';

const IntroducePage = () => {
	console.log(process.env.API_KEY);
	return (
		<Fragment>
			<Helmet>
				<title>airtshop - introduce</title>
				<meta
					name="description"
					content="Introduce the airtshop web app, what airline company support us, how to use this web app and if user have any question, we provide form to collect question."
				/>
			</Helmet>
			<Hero />
			<Cooperate />
			<Steps />
			<Feature />
			<Buy />
			<Contact />
			<Footer />
		</Fragment>
	);
};

export default IntroducePage;
