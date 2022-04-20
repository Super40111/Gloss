import {test, CreateAccount, validPassword, displayAccountInfo, login, resetPassword, addStory, displayScores, updateScores } from 'index.js'



function test() {
  var checkScores = Document.GetElementById("news").value
  console.log("src Works");
  displayScores(checkScores);
}
