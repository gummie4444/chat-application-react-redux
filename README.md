# chat-application-react-redux

Basic chat appliaction using redux, react, socket.io and mongoose

* WHAT YOU CAN DO:
  * See who is online
  * Get "notification" on the bottom of the page if a user has added you to a channel or has joined the channel you are   currently in
  * Send messages to channels
  * Create channels with one/multiple people
  * Send Private messages
  * Send images

## What you need to run this
* MongoDB
* Node
* Npm

## Innstalation

1. Start by creating a database folder and runing mongoDB in there
```
mkdir db
mongod --dbpath=./db
```

2. Now instal npm packages
```
npm install
```

3. Run the application and it should run on localhost:3000 (redux-dev-tools are enabled be default hide by using ctrl+h)
```
npm start
```

## NEXT TODO:
* Customize user
* Delete channels
* Admins 
* Channel settings / info 
* Better notification when you have recheved a new message 
* Aaaaand alot more
## What I used to help me make this:

* https://github.com/raineroviir/react-redux-socketio-chat
* https://github.com/reactjs/react-redux
* http://stackoverflow.com/
* https://scotch.io/tutorials/build-a-restful-api-using-node-and-express-4
