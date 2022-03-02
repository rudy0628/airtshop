import classes from './StepItem.module.scss';

const StepItem = props => {
	let style;
	if (props.flow === 'REV') {
		style = `${classes['step']} ${classes['step--reverse']}`;
	} else {
		style = `${classes['step']}`;
	}

	return (
		<div className={style}>
			<div className={classes['step__img-box']}>
				<img src={props.image} alt={props.title} />
			</div>
			<div className={classes['step__text-box']}>
				<p className={classes['step__number']}>{props.number}</p>
				<h3 className="heading__tertiary">{props.title}</h3>
				<p className={classes['step__text']}>{props.description}</p>
			</div>
		</div>
	);
};

export default StepItem;
