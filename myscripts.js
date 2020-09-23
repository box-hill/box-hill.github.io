// myscripts.js

// google custom search api documentation:
// https://developers.google.com/custom-search/v1/overview

// example :
// https://stackoverflow.com/questions/11274056/using-google-search-api-from-the-browser

// triggerring search not on load
// https://stackoverflow.com/questions/16040889/google-custom-search-api-in-a-js-file

// google custom search api key:
var api_key = "AIzaSyBwOe5N5d275f_9-XYFfLMrcnm5xgqVJUY";
var cse_id = "017576662512468239146:omuauf_lfve"; // Custom Search Engine ID should correspond to quotation searches, currently just a random one
var query_input = "cars"; // query input


function getData(){
	src="https://www.googleapis.com/customsearch/v1?key=AIzaSyBwOe5N5d275f_9-XYFfLMrcnm5xgqVJUY&cx=017576662512468239146:omuauf_lfve&q=cars&callback=hndlr";
	console.log("getData executed")
}


function errorCode(){
// add error codes and switch case
	alert('Error 1');
}

function hndlr(response) {
	//src = "https://www.googleapis.com/customsearch/v1?key=AIzaSyBwOe5N5d275f_9-XYFfLMrcnm5xgqVJUY&cx=017576662512468239146:omuauf_lfve&q=cars&callback=hndlr";
	for (var i = 0; i < response.items.length; i++) {
		var item = response.items[i];
		// in production code, item.htmlTitle should have the HTML entities escaped.
		document.getElementById("query").innerHTML += "<br>" + item.htmlTitle;
	}
	console.log("hndlr executed")
}

function triggerSearch(){
  //var query = document.getElementById("query").value;
	//var query = document.getElementById("query").innerHTML;
  var JSElement = document.createElement('script');  // what does this do?
  JSElement.src = "https://www.googleapis.com/customsearch/v1?key=" + api_key + "&cx=" + cse_id + "&q=" + query_input +"&callback=hndlr";
  document.getElementsByTagName('head')[0].appendChild(JSElement);
	console.log("triggersearch executed")
}

//triggerSearch();
