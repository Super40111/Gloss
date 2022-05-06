import * as React from "react"
import app from 'gatsby-plugin-firebase-v9.0'
import { signInWithEmailAndPassword, getAuth } from "firebase/auth"
import {getFirestore} from 'firebase/firestore';
//import {userAuthentication } from "gatsby-ssr"
//const user = userAuthentication();
// styles
const db = getFirestore(app);
const auth = getAuth(app);
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

class Login extends React.Component {
  state = {
    email: "",
    password: "",
  }
  handleInputChange = event => {
    const target = event.target;
    const value = target.value;
    const name = target.name;
    this.setState({
      [name]: value,
    })
  }
  handleSubmit = event => {
    event.preventDefault();
    alert(`Welcome ${this.state.email} ${this.state.password}!`);
    signInWithEmailAndPassword(auth, this.state.email, this.state.password)
    .then((userCredidential) => {
      const user = userCredidential.user;
    })
  }
  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <label>
          Email:
          <input
            type="text"
            name="email"
            value={this.state.email}
            onChange={this.handleInputChange}
          />
        </label> <br></br>
        <label>
          Password:
          <input
            type="text"
            name="password"
            value={this.state.password}
            onChange={this.handleInputChange}
          />
        </label> <br></br>
        <button type="submit">Submit</button>
      </form>
    )
  }
}

// markup
const loginPage = () => {
  return (
    <main style={pageStyles}>
      <title>Login</title>
      <h1 style={headingStyles}>
        Login
        <br />
      </h1>
      <p style={paragraphStyles}>
        Enter the following details to access your account:{" "}
      </p>
      <Login />
    </main>
  )
}

export default loginPage
