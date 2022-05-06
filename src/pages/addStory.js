import * as React from "react"

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
const headingAccentStyles = {
  color: "#663399",
}
const paragraphStyles = {
  marginBottom: 48,
}
const codeStyles = {
  color: "#8A6534",
  padding: 4,
  backgroundColor: "#FFF4DB",
  fontSize: "1.25rem",
  borderRadius: 4,
}
const listStyles = {
  marginBottom: 96,
  paddingLeft: 0,
}
const listItemStyles = {
  fontWeight: 300,
  fontSize: 24,
  maxWidth: 560,
  marginBottom: 30,
}

const linkStyle = {
  color: "#8954A8",
  fontWeight: "bold",
  fontSize: 16,
  verticalAlign: "5%",
}

const docLinkStyle = {
  ...linkStyle,
  listStyleType: "none",
  marginBottom: 24,
}

const descriptionStyle = {
  color: "#232129",
  fontSize: 14,
  marginTop: 10,
  marginBottom: 0,
  lineHeight: 1.25,
}

const docLink = {
  text: "Documentation",
  url: "https://www.gatsbyjs.com/docs/",
  color: "#8954A8",
}

const badgeStyle = {
  color: "#fff",
  backgroundColor: "#088413",
  border: "1px solid #088413",
  fontSize: 11,
  fontWeight: "bold",
  letterSpacing: 1,
  borderRadius: 4,
  padding: "4px 6px",
  display: "inline-block",
  position: "relative",
  top: -2,
  marginLeft: 10,
  lineHeight: 1,
}

// data
const links = [
  {
    text: "Create Account",
    url: "/createAccount",
    description:
      "Create your Gloss Account.",
    color: "#E95800",
  },
  {
    text: "Log In",
    url: "/login",
    description:
      "Log into a Gloss Account.",
    color: "#1099A8",
  },
  {
    text: "Account Page",
    url: "/accountPage",
    description:
      "Log In to View Your Account Page",
    color: "#BC027F",
  },
  {
    text: "News List",
    url: "/newsList",
    description:
      "View news stories.",
    color: "#0D96F2",
  },
  {
    text: "Site News",
    url: "/siteNews",
    description:
      "View news about Gloss's development.",
    color: "#8EB814",
  },
  {
    text: "About Us",
    url: "/classes",
    badge: true,
    description:
      "Learn More About our Goals at Gloss",
    color: "#663399",
  },
  {
    text: "Add Story",
    url: "/addStory",
    description: "Add a Story to Gloss (Test Feature)",
    color: "#000FFF"
  }
]

// markup
const IndexPage = () => {
  return (
    <main style={pageStyles}>
      <title>Gloss</title>
      <h1 style={headingStyles}>
        Gloss 
        <br />
        <span style={headingAccentStyles}>— The Glossary for News Articles </span>
      </h1>
      <p style={paragraphStyles}>
        Edit <code style={codeStyles}>src/pages/index.js</code> to see this page
        update in real-time.{" "}
      </p>
      <ul style={listStyles}>
        {links.map(link => (
          <li key={link.url} style={{ ...listItemStyles, color: link.color }}>
            <span>
              <a
                style={linkStyle}
                href={`${link.url}?utm_source=starter&utm_medium=start-page&utm_campaign=minimal-starter`}
              >
                {link.text}
              </a>
              <p style={descriptionStyle}>{link.description}</p>
            </span>
          </li>
        ))}
      </ul>
    </main>
  )
}

export default IndexPage
