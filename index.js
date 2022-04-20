import { initializeApp } from "firebase/app";
import { doc, getDoc, getDocFromCache, getFirestore, setDoc, updateDoc } from 'firebase/firestore';
import { getAnalytics } from "firebase/analytics";
import { getAuth, createUserWithEmailAndPassword, onAuthStateChanged, updateProfile, sendPasswordResetEmail, signOut } from "firebase/auth";

const firebaseConfig = initializeApp({
  apiKey: "AIzaSyAfnxyM2o2uNrcunKE2ZocNep5HFc8PauU",
  authDomain: "gloss-d2259.firebaseapp.com",
  databaseURL: "https://gloss-d2259-default-rtdb.firebaseio.com",
  projectId: "gloss-d2259",
  storageBucket: "gloss-d2259.appspot.com",
  messagingSenderId: "182288273607",
  appId: "1:182288273607:web:9c94b8575519922dffaee2",
  measurementId: "G-QLYK7M8RG3"
});

const firestore = getFirestore();
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const reference = doc(firestore, 'value');
const authority = getAuth();
const user = authority.currentUser;

var newsButton = document.getElementById("getNews");
newsButton.onclick = function() {
  console.log("Going");
  test();
}


onAuthStateChanged(auth, (user) => {
  if (user) {
    const userRef = doc(db, "userData", user.displayName);
    const userData = await getDoc(userRef);
  }
})

document.getElementById("getNews").addEventListener("click", function() {
  console.log("Going");
  test();
});

function test() {
  document.getElementById("demo").innerHTML = "Please Work";
}

function CreateAccount(username, email, password, confirmPassword) {
  alert("create");
  if (!validPassword(password)) {
    return
  }
  else if (password !== confirmPassword) {
    alert("Error: The password boxes do not match");
    return
  }
  createUserWithEmailAndPassword(authority, email, password);
  user.displayName = username;
  await setDoc(doc(db, "userData", user.displayName), {
    commentCount: 0,
    rated: [],
    type: 0
  })
  window.location.href = "accountPage.html";
}


function validPassword(password) {
  if (password.length >= 8) {
    for (i = 0; i < password.length; i++) {
      if (password.charAt(i).isNaN()) {
        alert("Error: Your password contains an invalid password");
        return false;
      }
    }
    return true;
  }
  alert("Error: Your password must contain at least 8 characters long and contain at least 1 number.");
  return false;
}

function displayAccountInfo() {
  const ratedCount = lastIndexOf(userData.rated) + 1;
  document.getElementById("accountPageUsername").innerHTML = "Hello " + user.displayName;
  document.getElementById("accountPageCommentCount").innerHTML = "You made " + userData.commentCount + " comments.";
  document.getElementById("accountPageStoryVotedCount").innerHTML = "You have voted on " + (lastIndexOf(userData.rated) + 1) + " articles.";
  if (ratedCount > 0) {
    const votedList = "You have rated: ";
    for (i = 0; i < ratedCount; i++) {
      const ratedref = doc(db, "NewsList", userData.rated[i]);
      const ratedDisplay = await getDoc(ratedref);
      if (i == 0) {
        votedList = votedList + ratedDisplay.name + "(" + userData.rated[i] + ")";
      }
      else {
        votedList = votedList +  ", " + ratedDisplay.name + "(" + userData.rated[i] + ")";
      }
      
    }
    votedList = votedList + ".";
    document.getElementById("accountPageStoryVoted").innerHTML = votedList;
  }
  
}


function login(getEmail, getPassword) {
  alert("login");
  signInWithEmailAndPassword(auth, getEmail, getPassword);
}


function logout() {
  signOut(authority);
  window.location.href = "index.html";
}


function resetPassword() {
  sendPasswordResetEmail(authority, user.email);
  window.location.href = "index.html";
}


function addStory(storyName, publisher, link, ImpartialScore, ObjectScore, AccuracyScore, RelevencyScore) {
  await setDoc(doc(db, "NewsList", link), {
    name: storyName,
    publisher: publisher,
    ImpartialScore: ImpartialScore,
    ObjectScore: ObjectScore,
    AccuracyScore: AccuracyScore,
    RelevencyScore: RelevencyScore,
    ratingCount: 1
  })
  const checkRated = userData.rated.push(link);
  await updateDoc(userData, {
    rated: checkRated
  })
  window.location.href = "newsList.html";
}


function displayScores(link) {
   alert("display");
  const newsref = doc(db, "NewsList", link);
  const newsDisplay = await getDoc(newsref);
  window.location.href = "news.html";
  document.getElementById("linkGivenScores").innerHTML = newsDisplay.link;
  document.getElementById("Impartial").innerHTML = newsDisplay.ImpartialScore;
  document.getElementById("Object").innerHTML = newsDisplay.ObjectScore;
  document.getElementById("Accuracy").innerHTML = newsDisplay.AccuracyScore;
  document.getElementById("Relevency").innerHTML = newsDisplay.RelevencyScore;
}


function updateScores (link, user, NewImpartialScore, NewObjectScore, NewAccuracyScore, NewRelevencyScore) {
  if (NewImpartialScore > 10 || NewObjectScore > 10 || NewAccuracyScore > 10 || NewRelevencyScore > 10) {
    alert("Error: At least one score rated above the maximum score (Scores can only be between 1 and 10");
    return
  }
  else if (NewImpartialScore < 1 || NewObjectScore < 1 || NewAccuracyScore < 1 || NewRelevencyScore < 1) {
    alert("Error: At least one score rated below the minimum score (Scores can only be between 1 and 10");
    return
  }
  const checkRated = userData.rated;
  if (checkRated.includes(link)) {
    alert("Error: You have already submitted scores for this news article.")
    return
  }
  checkRated.push(link);
  const updates = doc(db, "NewsList", link);
  const updatedStory = await getDoc(updates);
  const oldCount = updatedStory.ratingCount;
  const newCount = oldCount + 1;
  const updatedImpartial = (((updatedStory.ImpartialScore * oldCount) + NewImpartialScore) / newCount);
  const updatedObject = (((updatedStory.ObjectScore * oldCount) + NewObjectScore) / newCount);
  const updatedAccuracy = (((updatedStory.AccuracyScore * oldCount) + NewAccuracyScore) / newCount);
  const updatedRelevency = (((updatedStory.RelevencyScore * oldCount) + NewRelevencyScore) / newCount);
  await updateDoc(updatedStory, {
    ImpartialScore: updatedImpartial,
    ObjectScore: updatedObject,
    AccuracyScore: updatedAccuracy,
    RelevencyScore: updatedRelevency,
    ratingCount: newCount
  })
  updateProfile(authority.currentUser, {
    rated: checkRated
  })
  document.getElementById("linkGivenScores").innerHTML = updatedStory.link;
  document.getElementById("Impartial").innerHTML = updatedStory.ImpartialScore;
  document.getElementById("Object").innerHTML = updatedStory.ObjectScore;
  document.getElementById("Accuracy").innerHTML = updatedStory.AccuracyScore;
  document.getElementById("Relevency").innerHTML = updatedStory.RelevencyScore;
  
}

export {test, CreateAccount, validPassword, displayAccountInfo, login, resetPassword, addStory, displayScores, updateScores };
