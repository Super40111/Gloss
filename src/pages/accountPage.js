import * as React from "react"
import app from "gatsby-plugin-firebase-v9.0"
import { getAuth } from "firebase/auth"
import { collection, getFirestore, doc, setDocs, getDocs, query, where, QuerySnapshot } from "firebase/firestore"

const auth = getAuth(app);
const db = getFirestore(app);
const news = collection(db, "NewsList");
var docRef = '';
var docSnap = '';
var viewingStory = false;
var currentStory = "";
var currentStoryData;
var currentUserData;
// styles
const pageStyles = {
  color: "#232129",
  padding: 96,
  fontFamily: "-apple-system, Roboto, sans-serif, serif",
}
const headingStyles = {
  marginTop: 0,
  marginBottom: 64,
  maxWidth: 320,
}
const paragraphStyles = {
  marginBottom: 48,
}

class CheckForm extends React.Component {
  state = {
    link: "",
    impartial: "",
    object: "",
    accuracy: "",
    relevency: ""
  }
  handleInputChange = event => {
    const target = event.target;
    const value = target.value;
    const name = target.name;
    this.setState({
      [name]: value,
    })
  }
  handleSubmitLink = async event => {
    event.preventDefault();
    if (this.state.link == "") {
      alert('Error: Link Section is empty');
      return
    }
    currentStory = this.state.link;
    const docQuery = query(news, where("link", "==", this.state.link))
    docSnap = await getDocs(docQuery);
    // if (!docSnap.exists()) {
    //   alert("Error: Story does not exist");
    //   return
    // }
    docSnap.forEach((doc) => {
      currentStoryData = doc.data();
      console.log(currentStoryData.name)
    });
    if (Number.isInteger(this.state.impartial) && Number.isInteger(this.state.object)  && Number.isInteger(this.state.accuracy)  && Number.isInteger(this.state.relevency) ) {
      updateScores(this.state.link, this.state.impartial, this.state.object, this.state.accuracy, this.state.relevency, currentStoryData.ratingCount);
    }
    else if (this.state.impartial == "" && this.state.object == "" && this.state.accuracy == "" && this.state.relevency == ""){
      alert("News Link: " + currentStoryData.link + 
      "\nStory Name:" + currentStoryData.name + 
      "\nPublisher: " + currentStoryData.publisher + 
      "\nAccuracy Score: " + currentStoryData.AccuracyScore + 
      "\nImparial Score: " + currentStoryData.ImpartialScore + 
      "\nObject Score: " + currentStoryData.ObjectScore + 
      "\nRelevency Score: " + currentStoryData.RelevencyScore + 
      "\nRating Count: " + currentStoryData.ratingCount);
    }
    else {
      alert('Error: Voting Section is Incomplete');
    }
    currentStoryData = "";
  }
  render() {
    return (
      <form onSubmit={this.handleSubmitLink}>
        Link:
          <input
            type="text"
            name="link"
            value={this.state.link}
            onChange={this.handleInputChange}
          /> <br />
        Rate Impartial Score:  <input
            type="text"
            name="impartial"
            value={this.state.impartial}
            onChange={this.handleInputChange}
          /> <br />
        Rate Object Score: <input
            type="text"
            name="object"
            value={this.state.object}
            onChange={this.handleInputChange}
          /> <br />
        Rate Accuracy Score: <input
            type="text"
            name="accuracy"
            value={this.state.accuracy}
            onChange={this.handleInputChange}
          /> <br />
        Rate Relevency Score: <input
            type="text"
            name="relevency"
            value={this.state.relevency}
            onChange={this.handleInputChange}
          />
        <button type="submit">Submit</button> <br />

      </form>
      
    )
  }
}

async function updateScores(link, impartial, object, accuracy, relevency, voteTotal) {
  var newVoteTotal = voteTotal + 1;
  var newImpartial = ((currentStoryData.ImpartialScore * voteTotal) + impartial) / newVoteTotal
  var newObject = ((currentStoryData.ObjectScore * voteTotal) + object) / newVoteTotal
  var newAccuracy = ((currentStoryData.AccuracyScore * voteTotal) + accuracy) / newVoteTotal
  var newRelevency = ((currentStoryData.RelevencyScore * voteTotal) + relevency) / newVoteTotal
  await setDocs(doc(db, "NewsList", link), {
    ImpartialScore: newImpartial,
    ObjectScore: newObject,
    AccuracyScore: newAccuracy,
    RelevencyScore: newRelevency,
    ratingCount: newVoteTotal
  });
}

// markup
const ScorePage = () => {
  return (
    <main style={pageStyles}>
      <title>View Story</title>
      <h1 style={headingStyles}>
      View Stories
      <br />
      </h1>
      <p style={paragraphStyles}>
      Enter a link to the story who's score you want to rate:{" "}
      </p>
      <CheckForm />

      
      </main>
    )
}

export default ScorePage