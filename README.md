# Project Overview

This project for Project Portfolio III utilizes the [Spotify Web API](https://developer.spotify.com/documentation/web-api/) to perform a global search for Artists, Albums, and Tracks. This project utilizes a React App frontend and an Express backend that keeps track of OAuth JSON web tokens. 

# Prerequisites

- NodeJS >= v16.13.0
- npm >= v8.1.0
- Brew >= v3.4.3 (if MacOS)
- MongoDB Community >= v5.4.0
- Chrome/Firefox/Safari/Edge >= Latest 2 major versions


# Getting Started

In order to setup the project we will need to setup our `.env` file. You can do this by making a copy of our `.env.dist` and naming it to `.env` using the following command.

	cp .env.dist .env 

Place all of your environment variables inside the .env file, then save. After you have done that you will need to install all of your `node_modules` using the following command. 

	npm install 

After yarn has finished installing all of your `node_modules` you can now run the project. You will need to open two different bash sessions. One for the frontend app and one for the backend Express application. 

**To Run React (frontend)**

	cd client
	npm run start

**To Run Express (backend)**

	cd server 
    cd run watch

# Links

The links to the project are as follows: 

- [http://localhost:3000](http://localhost:3000) - Link to the frontend (React) application. 
- [http://localhost:3001](http://localhost:3001) - Link to the backend (Express) API.
