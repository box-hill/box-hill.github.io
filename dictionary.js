// dictionary.js

// http://browserify.org/ to bundle
// $ browserify dictionary.js -o bundle.js

function textGlossing(input){
  var Dictionary = require('japaneasy');
  var dict = new Dictionary({
    dictionary: "glossing"
  });

  dict(input).then(function(result){
    for (var i = 0; i < result.length; i++) {
  		var item = result[i];
      var n = item.pronunciation.indexOf("(");
      if(n === -1){
        n = 15; // take whole pronunciation
      }

      document.getElementById("string_hits").innerHTML += item.japanese + "<br>"
      + item.pronunciation.slice(0,n) +"<br>"+ item.english[0]+"<br>"+"<br>"; //
  	}
    console.log(result);
  });
}

//textGlossing();
