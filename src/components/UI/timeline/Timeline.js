import React from 'react';

import classes from './Timeline.module.scss';

const TimeLine = props => {
	return (
		<ul className={classes['step__list']}>
			{props.step.map((step, i) => {
				const currentStepClass =
					i + 1 === props.currentStep
						? `${classes['step__item--number']} ${classes['step__item--number-fill']}`
						: classes['step__item--number'];

				return (
					<React.Fragment key={i}>
						<li className={classes['step__item']}>
							<span className={currentStepClass}>{i + 1}</span>
							<span className={classes['step__item--description']}>{step}</span>
						</li>
						<p className={classes['step__arrow']}>&rarr;</p>
					</React.Fragment>
				);
			})}
		</ul>
	);
};

export default TimeLine;
