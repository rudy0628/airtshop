import classes from './Input.module.scss';

const Input = props => {
	return (
		<div className={`${classes.input} ${props.className}`}>
			{props.title && <label htmlFor={props.id}>{props.title}</label>}
			<input
				type={props.type}
				name={props.id}
				id={props.id}
				placeholder={props.placeholder}
				value={props.value}
				onChange={props.onChange}
				onBlur={props.onBlur}
				required
				disabled={props.disabled}
			/>
			{props.error.hasError && (
				<p className="error-text">{props.error.errorMessage}</p>
			)}
		</div>
	);
};

export default Input;
