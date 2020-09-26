// dictionary.js
// http://browserify.org/ to bundle
// $ browserify dictionary.js -o bundle.js
function dictionaryTest(){
  var Dictionary = require('japaneasy');
  var dict = new Dictionary({
    dictionary: "glossing"
  });

  dict('編著書に『学校に行かない君').then(function(result){
    console.log(result);
  });
}
dictionaryTest();
