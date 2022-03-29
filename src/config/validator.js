export const isNotEmpty = value => value.trim().length !== 0;
export const isEmail = value =>
	value.trim().length !== 0 && value.includes('@');
export const isIataCode = value =>
	value.trim().length === 3 && value === value.toUpperCase() && isNaN(value);
export const isPhoneNumber = value =>
	value.startsWith('09') && value.length === 10;

export const isPassword = value =>
	value.trim().length > 7 && value.trim().length < 17;
