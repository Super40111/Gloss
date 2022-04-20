import {CreateAccount, validPassword, displayAccountInfo, login, resetPassword, addStory, displayScores, updateScores } from 'index.js';

var element = document.getElementById("getNews");
element.onclick = function(event) {
  console.log("K");
}

function test() {
  var checkScores = Document.GetElementById("news").value
  console.log("src Works");
  displayScores(checkScores);
}
