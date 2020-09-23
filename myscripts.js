// myscripts.js

// example :
// https://stackoverflow.com/questions/11274056/using-google-search-api-from-the-browser

// google custom search api key:
// AIzaSyBwOe5N5d275f_9-XYFfLMrcnm5xgqVJUY



function errorCode(){
// add error codes and switch case
	alert('Error 1');
}

function getData(response) {
	//src = "https://www.googleapis.com/customsearch/v1?key=AIzaSyBwOe5N5d275f_9-XYFfLMrcnm5xgqVJUY&cx=017576662512468239146:omuauf_lfve&q=cars&callback=hndlr";
	for (var i = 0; i < response.items.length; i++) {
		var item = response.items[i];
		// in production code, item.htmlTitle should have the HTML entities escaped.
		document.getElementById("test").innerHTML += "<br>" + item.htmlTitle;
	}
}
