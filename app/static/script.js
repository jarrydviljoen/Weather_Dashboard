const url = 'https://weather-by-api-ninjas.p.rapidapi.com/v1/weather?city=Mauritius';
const options = {
	method: 'GET',
	headers: {
		'x-rapidapi-key': '920c60aaacmsh4299c10ef6d0dcbp1d18f2jsn5ac3f4984f97',
		'x-rapidapi-host': 'weather-by-api-ninjas.p.rapidapi.com'
	}
};

try {
	const response = await fetch(url, options);
	const result = await response.text();
	console.log(result);
} catch (error) {
	console.error(error);
}
