export const productPrice = (duration, classType) => {
	let price;
	if (classType === 'economy') {
		price = duration * 52;
	} else if (classType === 'business') {
		price = duration * 52 * 2;
	} else if (classType === 'first') {
		price = duration * 52 * 5;
	}

	return price;
};
