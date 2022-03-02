import { Fragment } from 'react';
import Hero from '../components/introduce/hero/Hero';
import Cooperate from '../components/introduce/cooperate/Cooperate';
import Steps from '../components/introduce/step/Steps';
import Feature from '../components/introduce/feature/Feature';
import Buy from '../components/introduce/buy/Buy';
import Contact from '../components/introduce/contact/Contact';
import Footer from '../components/introduce/footer/Footer';

const IntroducePage = () => {
	return (
		<Fragment>
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
