
function errorCode(){
// add error codes and switch case
	alert('Error 1');
}

async function getData(){
	const api_url = 'https://www.googleapis.com/customsearch/v1?key=AIzaSyBwOe5N5d275f_9-XYFfLMrcnm5xgqVJUY&cx=017576662512468239146:omuauf_lfve&q=lectures';


	const response = await fetch(api_url);
  //var data = await response.json();
	var data = await JSON.parse(reponse);
	//console.log(response);

	console.log(data.kind);
	document.getElementsById('myData').testContent = data.hndlr;
}
