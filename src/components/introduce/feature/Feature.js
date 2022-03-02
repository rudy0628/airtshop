import { features } from '../../../config/content';
import classes from './Feature.module.scss';

const Feature = () => {
	return (
		<section className={classes['section-feature']}>
			{features.map(feature => (
				<div className={classes.feature} key={feature.id}>
					<feature.icon className={classes['feature__icon']} />
					<span className={classes['feature__text']}>{feature.amount}</span>
					<span className={classes['feature__text']}>{feature.title}</span>
				</div>
			))}
		</section>
	);
};

export default Feature;
