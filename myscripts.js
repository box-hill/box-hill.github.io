// myscripts.js

// google custom search api documentation:
// https://developers.google.com/custom-search/v1/overview

// example :
// https://stackoverflow.com/questions/11274056/using-google-search-api-from-the-browser

// triggerring search not on load
// https://stackoverflow.com/questions/16040889/google-custom-search-api-in-a-js-file

// google custom search api key:
//var api_key = "AIzaSyBwOe5N5d275f_9-XYFfLMrcnm5xgqVJUY";
var api_key = "AIzaSyCUMupOrK0nmg2uA8ez9XfA2_7aEEadAXg";

// To create cse_id:
// https://programmablesearchengine.google.com/about/
// To modify??
// https://developers.google.com/custom-search/docs/element#supported_attributes
//<script async src="https://cse.google.com/cse.js?cx=22519e5637b61b1c8"></script> <div class="gcse-search"></div>
//
//var cse_id = "017576662512468239146:omuauf_lfve"; // Custom Search Engine ID should correspond to quotation searches, currently just a random one
var cse_id = "22519e5637b61b1c8";
//var query_input = "\"cars\""; // query input
var query_input;


//doesnt work
function getData(){
	src="https://www.googleapis.com/customsearch/v1?key=AIzaSyCUMupOrK0nmg2uA8ez9XfA2_7aEEadAXg&cx=22519e5637b61b1c8&q=\"学校を行かない\"&callback=hndlr";
	console.log("getData executed")
}


function errorCode(){
// add error codes and switch case
	alert('Error 1');
}

function stringHandler(response) {
	//src = "https://www.googleapis.com/customsearch/v1?key=AIzaSyBwOe5N5d275f_9-XYFfLMrcnm5xgqVJUY&cx=017576662512468239146:omuauf_lfve&q=cars&callback=hndlr";
	// for (var i = 0; i < response.items.length; i++) {
	// 	var item = response.items[i];
	// 	console.log(item);
	// 	// in production code, item.htmlTitle should have the HTML entities escaped.
	// 	document.getElementById("query").innerHTML += "<br>" + item.htmlTitle;
	// }
	var item = response.queries;
	document.getElementById("string_hits").innerHTML += "<br>" + item.request[0].totalResults;;
	console.log(item.request[0].totalResults);
	console.log("hndlr executed")
}

function generalHandler(response) {
	var item = response.queries;
	document.getElementById("general_hits").innerHTML += "<br>" + item.request[0].totalResults;;
	console.log(item.request[0].totalResults);
	console.log("hndlr executed")
}


function triggerSearch(){
  //var query = document.getElementById("query").value;
	//var query = document.getElementById("query").innerHTML;

	general_query = document.getElementById("search_input").value;
	string_query = "\"" + document.getElementById("search_input").value + "\"";
	//query_input =  document.getElementById("search_input").value;
	//query_input = 'try';
	console.log("query input is " + query_input);
	console.log(document.getElementById("search_input"));

  var JSElement = document.createElement('script');  // what does this do?
	JSElement.src = "https://www.googleapis.com/customsearch/v1?key=" + api_key + "&cx=" + cse_id + "&q=" + string_query +"&callback=stringHandler";
	document.getElementsByTagName('head')[0].appendChild(JSElement);

	var JSElement = document.createElement('script');
	JSElement.src = "https://www.googleapis.com/customsearch/v1?key=" + api_key + "&cx=" + cse_id + "&q=" + general_query +"&callback=generalHandler";
  document.getElementsByTagName('head')[0].appendChild(JSElement);

	console.log("triggersearch executed")
}
