const sendHttp = async (requestBody, token = '') => {
	let headers;
	if (token.length !== 0) {
		headers = {
			'Content-Type': 'application/json',
			Authorization: `Bearer ${token}`,
		};
	} else {
		headers = {
			'Content-Type': 'application/json',
		};
	}

	const response = await fetch(process.env.REACT_APP_BACKEND_URL, {
		method: 'POST',
		body: JSON.stringify(requestBody),
		headers: headers,
	});

	const responseData = await response.json();

	return responseData;
};

export default sendHttp;
