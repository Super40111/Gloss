#### Welcome to Gloss

### How to Use

In order to properly use this site, you simply must go to https://super40111.github.io/Gloss/. It is not recommended to clone the repository yourself and run it through the command line without any additional application because it will not work.

### Download

Right now the github pages landing page is not working correctly and is redirecting to this page. The project does work locally though. In order to run the project for yourself, you must do the following

1.
Install Node.js so you can run npm install.

2.
Navigate using the terminal to where you want to install the file and run the following commands:

npm install gatsby

3.
Run the following command to generate a base site:

gatsby new

Name the project and file to whatever you want and 

4.
Run these commands to install the required imports needed for Gloss to function:

npm install gatsby-plugin-firebase-v9.0
npm install react

5.
Clone this repository into another place on your computer.

6. 
Replace the contents of the Gatsby project file with the contents of the cloned repository.

7.
Using the terminal, navigate to the gatsby project folder and run:

gatsby develop

Then go to http://localhost:8000/

### Using Gloss

You should be viewing the main page of Gloss. There is only the viewing and voting sections implemented currently. To navigate to those, do the following:

1.
Click on the newsList link.

2.
At this point you can do 2 different things:

If you want to view the scores of an article, you must fill out the link section with the link of an existing article, leave all other boxes blank, and then hit submit to get the data for that article.

If you want to vote for an article, you must fill out the link section with the link of an existing article, fill out the other boxes with your desired ratings, and then hit submit to get the data for that article.





