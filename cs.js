
var key = "AIzaSyBwOe5N5d275f_9-XYFfLMrcnm5xgqVJUY";
var id = "017576662512468239146:omuauf_lfve"; // Custom Search Engine ID should correspond to quotation searches, currently just a random one
var q = "cars"; // query input


function hndlr(response) {
  console.log(response);                 // a way to see your results
}

function triggersearch(){
  var query=document.getElementById("query").value;
  var JSElement = document.createElement('script');
  JSElement.src = `https://www.googleapis.com/customsearch/v1?key=${key}&cx=${id}&q=${q}`+query+'&callback=hndlr'; // needs fixing
  document.getElementsByTagName('head')[0].appendChild(JSElement);
}

triggersearch();
