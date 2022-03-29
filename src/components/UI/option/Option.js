import React from 'react';

import classes from './Option.module.scss';

const Option = props => {
	return (
		<div className={classes.select}>
			<label>{props.title}</label>
			<select value={props.value} onChange={props.onChange}>
				<option value="" defaultValue>
					Choose {props.title}
				</option>
				{props.option.map((option, i) => (
					<option key={i} value={option.value}>
						{option.text}
					</option>
				))}
			</select>
		</div>
	);
};

export default Option;
