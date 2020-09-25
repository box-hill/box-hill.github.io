// myscripts.js

// google custom search api documentation:
// https://developers.google.com/custom-search/v1/overview

// example :
// https://stackoverflow.com/questions/11274056/using-google-search-api-from-the-browser

// triggerring search not on load
// https://stackoverflow.com/questions/16040889/google-custom-search-api-in-a-js-file

// google custom search api key:
//var api_key = "AIzaSyBwOe5N5d275f_9-XYFfLMrcnm5xgqVJUY";
//var api_key = "AIzaSyCUMupOrK0nmg2uA8ez9XfA2_7aEEadAXg";
var api_key = "AIzaSyAezBsTrs0hsvsWZCCJy9Pgglb60weY7wM";
// var api_key = "AIzaSyD1WLbCjGmDWklizpFthwy0mUM3kApvlNE";
// var api_key = "AIzaSyClsHenpG1e5CwZc78z7Kdc4szOkv5Xei4";
// var api_key = "AIzaSyAcZ_kuyOBcPykg7KbdOKfBRqJhdf56HlQ";


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

// detect enter in submission form
document.getElementById("search_input").addEventListener("keydown", function(event) {
	if (event.keyCode === 13) {
		console.log("enter detected")
		event.preventDefault(); // Cancel the default action, if needed
		document.getElementById("searchButton").click(); // Trigger the button element with a click
	}
});

// just leaving for debugging
function getData(){
	src="https://www.googleapis.com/customsearch/v1?key=AIzaSyAezBsTrs0hsvsWZCCJy9Pgglb60weY7wM&cx=22519e5637b61b1c8&q=\"カメラから色を\"&callback=hndlr";
	console.log("getData executed")
}

// search for exact string
function stringHandler(response) {
	// check if search limit reached
	if(response.hasOwnProperty('error')){
		alert('Api key search limit reached.')
		console.log('limit reached');
		return;
	}

	document.getElementById("string_hits").innerHTML += "<br>" + response.queries.request[0].totalResults;
	console.log('string hits = ' + response.queries.request[0].totalResults);

	document.getElementById("example_sentences").innerHTML = ""; // erase previous
	for (var i = 0; i < response.items.length; i++) {
		var item = response.items[i];
		console.log(item);

		document.getElementById("example_sentences").innerHTML +=  item.htmlSnippet + "<br>"; // grab sentence snippet
		document.getElementById("example_sentences").innerHTML += "URL = " + item.htmlFormattedUrl +"<br>"+"<br>"; //  grab url link
	}
	//document.getElementById("example_sentences").innerHTML += "<br>" + response.queries.request[0].totalResults;
}

// general search for key words
function generalHandler(response) {

	if(response.hasOwnProperty('error')){
		alert('Api key search limit reached.')
		console.log('limit reached');
		return;
	}
	document.getElementById("general_hits").innerHTML += "<br>" + response.queries.request[0].totalResults;
	console.log(response.queries.request[0].totalResults);
	console.log('general hits = ' + response.queries.request[0].totalResults);
}


function triggerSearch(){
  //var query = document.getElementById("query").value;
	//var query = document.getElementById("query").innerHTML;
	if(document.getElementById("search_input").value.length === 0){
		alert('Input some text!'); // will make this not an alert msg later
		return false; // stops function and returns
	}
	// check input for correctvalues
	general_query = document.getElementById("search_input").value;
	string_query = "\"" + document.getElementById("search_input").value + "\"";
	//query_input =  document.getElementById("search_input").value;
	//query_input = 'try';
	console.log("query input is " + general_query);
	console.log(document.getElementById("search_input"));

  var JSElement = document.createElement('script');  // what does this do?
	JSElement.src = "https://www.googleapis.com/customsearch/v1?key=" + api_key + "&cx=" + cse_id + "&q=" + string_query +"&callback=stringHandler";
	document.getElementsByTagName('head')[0].appendChild(JSElement);

	// var JSElement = document.createElement('script');
	// JSElement.src = "https://www.googleapis.com/customsearch/v1?key=" + api_key + "&cx=" + cse_id + "&q=" + general_query +"&callback=generalHandler";
  // document.getElementsByTagName('head')[0].appendChild(JSElement);

	console.log("triggersearch executed")
}
