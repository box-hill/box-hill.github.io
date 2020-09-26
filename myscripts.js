// myscripts.js

// google custom search api documentation:
// https://developers.google.com/custom-search/v1/overview

// example :
// https://stackoverflow.com/questions/11274056/using-google-search-api-from-the-browser

// triggerring search not on load
// https://stackoverflow.com/questions/16040889/google-custom-search-api-in-a-js-file

// google custom search api key:
var api_key = "AIzaSyBwOe5N5d275f_9-XYFfLMrcnm5xgqVJUY";
//var api_key = "AIzaSyCUMupOrK0nmg2uA8ez9XfA2_7aEEadAXg";
//var api_key = "AIzaSyAezBsTrs0hsvsWZCCJy9Pgglb60weY7wM";
// var api_key = "AIzaSyD1WLbCjGmDWklizpFthwy0mUM3kApvlNE";
// var api_key = "AIzaSyClsHenpG1e5CwZc78z7Kdc4szOkv5Xei4";
// var api_key = "AIzaSyAcZ_kuyOBcPykg7KbdOKfBRqJhdf56HlQ";


// To create cse_id:
// https://programmablesearchengine.google.com/about/
// To modify:
// https://developers.google.com/custom-search/docs/element#supported_attributes
var cse_id = "22519e5637b61b1c8"; // Custom Search Engine ID should correspond to quotation searches, currently just a random one
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
	src="https://www.googleapis.com/customsearch/v1?key=AIzaSyAezBsTrs0hsvsWZCCJy9Pgglb60weY7wM&cx=22519e5637b61b1c8&q=\"私はちょうど\"&callback=hndlr";
	console.log("getData executed")
}


// search for exact string and display sentence
function stringHandler(response) {
	// check if search limit reached
	if(response.hasOwnProperty('error')){
		alert('Api key search limit reached.')
		console.log('limit reached');
		return; // exit function
	}

	if(response.queries.request[0].totalResults === 0){
		alert('No results could be found!');
	}
	else{
		document.getElementById("string_hits").innerHTML = response.queries.request[0].totalResults;
	}


	document.getElementById("example_sentences").innerHTML = ""; // erase previous
	for (var i = 0; i < response.items.length; i++) {
		var item = response.items[i];
		//console.log(item);

		sentenceParser(item.snippet, item.title);
		console.log(item.snippet);
		document.getElementById("example_sentences").innerHTML += "Source = " + item.formattedUrl +"<br>"+"<br>"; //  grab url link
	}
	//document.getElementById("example_sentences").innerHTML += "<br>" + response.queries.request[0].totalResults;
}

// takes htmlSnippet from response and extracts sentence (based on known source?)
function sentenceParser(sentence, title){

	//news articles will return 2019年12月2日 ...  at the start
	// https://www.w3schools.com/JSREF/jsref_slice_string.asp
	var n = sentence.search("日 ...") // search for date stamp

	if(n > 0 && n < 15){
		sentence = sentence.slice(n+5); // remove timestamp from string
	}
	// remove all commas and spaces
	sentence = sentence.replace(/、/g,'');
	sentence = sentence.replace(/,/g,'');
	sentence = sentence.replace(/ /g,'');
	sentence = sentence.replace(/\n/g,'');

	title = title.replace(/、/g,'');
	title = title.replace(/,/g,'');
	title = title.replace(/ /g,'');
	title = title.replace(/\n/g,'');

	// search for start of Phrase
	n = sentence.search(query_input);
	if(n === -1){
		// no phrases can be found, sometimes means that there is a , in the phrase
		alert('cannot find phrase in sentence, using title! I will still display title');
		console.log('cant find phrase! Will try title');
		sentence = "TITLE: " + title;
		n = sentence.search(query_input);
		if(n === -1){
			console.log('still cant find in title, exitting without printing');
			return;
		}

		//return;
	}


	// search for start of sentence
	var start_index = 0;
	var start_markers = [".", ";", "。", "…", "？","|","｜","！","!","→"];

	for (i=0;i<start_markers.length;i++) {
		// check if new start index occurs after start index
		if(sentence.lastIndexOf(start_markers[i], n) > start_index){
				start_index = sentence.lastIndexOf(start_markers[i], n); // take the bigger start
				start_index++;
		}
	}

	console.log("start index =  "  + start_index);
	// search for end of sentence
	var end_index = sentence.length;
	var n_end;
	var start_search = query_input.length + n; // index after phrase ends
	console.log("start search =  "  + start_search);

	var end_markers = [".", ";", "。", "…", "？","|","｜","！","!","→"];

	for (i=0;i<end_markers.length;i++) {
		n_end = sentence.indexOf(end_markers[i], start_search);
		if( (n_end > 0) && (n_end < end_index)){
				end_index = n_end + 1; // take the earlier finish
		}
	}
	if(end_index < 1) end_index = sentence.length;

	sentence = sentence.slice(start_index,end_index); // grab sentence from start to end_index

	// make search phrase bold
	// CODE FOR MAKING STRING BOLD

	//sentence = sentence.trim();

	// display sentence
	document.getElementById("example_sentences").innerHTML +=  sentence + "<br>"; // grab sentence snippet
}

function triggerSearch(){
  //var query = document.getElementById("query").value;
	//var query = document.getElementById("query").innerHTML;
	if(document.getElementById("search_input").value.length === 0){
		alert('Input some text!'); // will make this not an alert msg later
		return false; // stops function and returns
	}
	// check input for correctvalues, should have no . 。 ;
	query_input = document.getElementById("search_input").value;
	string_query = "\"" + document.getElementById("search_input").value + "\"";
	//query_input =  document.getElementById("search_input").value;
	//query_input = 'try';

  var JSElement = document.createElement('script');  // what does this do?
	JSElement.src = "https://www.googleapis.com/customsearch/v1?key=" + api_key + "&cx=" + cse_id + "&q=" + string_query +"&callback=stringHandler";
	document.getElementsByTagName('head')[0].appendChild(JSElement);

	console.log("triggersearch executed")
}
