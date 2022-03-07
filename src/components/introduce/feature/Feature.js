import ScrollAnimation from 'react-animate-on-scroll';
import { features } from '../../../config/content';
import classes from './Feature.module.scss';

const Feature = () => {
	let delay = -500;
	return (
		<section className={classes['section-feature']}>
			{features.map(feature => {
				delay += 500;
				return (
					<ScrollAnimation
						animateIn="fadeIn"
						animateOut="fadeOut"
						delay={delay}
						className={classes.feature}
						animateOnce
						key={feature.id}
					>
						<div className={classes.feature}>
							<feature.icon className={classes['feature__icon']} />
							<span className={classes['feature__text']}>{feature.amount}</span>
							<span className={classes['feature__text']}>{feature.title}</span>
						</div>
					</ScrollAnimation>
				);
			})}
		</section>
	);
};

export default Feature;
