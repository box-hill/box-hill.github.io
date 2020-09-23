function errorCode(){
// add error codes and switch case
	alert('Error 1');
}

function  getData(){
	const api_url = 'https://www.googleapis.com/customsearch/v1?key=AIzaSyBwOe5N5d275f_9-XYFfLMrcnm5xgqVJUY&cx=017576662512468239146:omuauf_lfve&q=hello&callback=hndlr'

	const response = await fetch(url);
  const data = await response.json();
	console.log(data.notsure);

// let results = {
//
//};
// fetch(url)
// url
// take input from user
}
