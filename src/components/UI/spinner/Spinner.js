import classes from './Spinner.module.css';

const Spinner = props => {
	const spinnerArray = Array.from(Array(4).keys());

	const style = `${props.className} ${classes['lds-ring']}`;

	return (
		<div className={style}>
			{spinnerArray.map(num => (
				<div key={num} />
			))}
		</div>
	);
};

export default Spinner;
