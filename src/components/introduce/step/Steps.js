import { steps } from '../../../config/content';
import StepItem from './StepItem';

import classes from './Steps.module.scss';

const Steps = () => {
	return (
		<section className={classes['section-steps']}>
			<div className={classes.steps}>
				<span className="subheading">Introduce</span>
				<h2 className="heading__secondary">How To Use?</h2>
				{steps.map(step => (
					<StepItem
						key={step.id}
						number={step.number}
						title={step.title}
						description={step.description}
						image={step.image}
						flow={step.flow}
					/>
				))}
			</div>
		</section>
	);
};

export default Steps;
