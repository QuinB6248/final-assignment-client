This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).


## Deployed on Netlify
https://hungry-jang-521769.netlify.com/events



## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.<br>
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br>
You will also see any lint errors in the console.

## TICKETS SERVER

## Table of contents:
- **[What this project is about](#what-this-project-is-about)**
- **[Goal for this project](#goal-for-this-project)**
- **[Getting Started](#getting-started)**
- **[Technologies used](#technologies-used)**
- **[File setup](#file-setup)**
- **[Reducers](#reducers)**
- **[Actions](#actions)**
- **[Components](#components)**


## What this project is about

Front-end part (REST principles) of a full-stack web-application where users can buy and sell tickets for all kinds of events. 

The app has a login and signup page for customers. You need to login to create events, tickets and posting comments.
Events have:
*	a name
*	a description
*	a picture or logo
*	a start and end date (could be the same)
After you click on an event, you see a list of tickets that are offered for this event.
A ticket is made for a specific event and has an author (the user that created the ticket). Apart from that, it has:
*	a picture of the ticket (optional field)
*	a price
*	a description
When you click on a ticket, you see the details of that ticket (description/price) and which event it's for. On this page you can add comments as a customer, and everybody can see all the comments.
A comment has a text and is connected to a specific ticket. It also has an author.
Anybody can view events and tickets, but you have to login to add a new ticket or comment.

#### Fraud risk algorithm
Tickets can be fraudulent, and as a customer I don't want to buy a fake ticket! So, we show customers the risk that they are taking when buying the ticket.
The percentage is calculated using the following algorithm:
* if the ticket is the only ticket of the author, add 10%
* if the ticket price is lower than the average ticket price for that event, that's a risk
* if a ticket is X% cheaper than the average price, add X% to the risk
* if a ticket is X% more expensive than the average price, deduct X% from the risk, with a maximum of 10% deduction
* if the ticket was added during business hours (9-17), deduct 10% from the risk, if not, add 10% to the risk
* if there are >3 comments on the ticket, add 5% to the risk
The minimal risk is 5% (there's no such thing as no risk) and the maximum risk is 95%.

#### User stories
* As a customer I want to see max. 9 events on a page and be able to click 'next' to see more pages of events if there are more
* As a customer I only want to see events that are not finished yet
* As a customer I want to view a list of tickets when I click on an event
* As a customer I want to view ticket details when I click on a ticket in the ticket list
* As a customer I want to see what the fraud-risk is for a specific ticket
* As a customer I want to be able to login, or sign up if I don't have an account yet
* As a logged in customer I want to add a ticket (for a specific event) that shows up on the event page with a title, picture, price and description
* As an author of the ticket I want to be able to edit a ticket's description, price and picture (other logged in customers cannot do this! only authors and admins)
* As a logged in customer I want to be able to create events with a name, picture (logo), date and description
* As a customer I can see some color (red/yellow/green) indicating the fraud risk of a ticket for all tickets in the all tickets list

## Goal for this project
- Making a functional Full-Stack app

## Getting Started
* Installing dependencies: npm install (command line)
* In terminal run app with: npm run start

## Technologies used
#### Node.js
Node.js is an open-source, cross-platform, JavaScript run-time environment that executes JavaScript code outside of a browser. Node.js lets developers use JavaScript to write command line tools and for server-side scripting—running scripts server-side to produce dynamic web page content before the page is sent to the user's web browser. Consequently, Node.js represents a "JavaScript everywhere" paradigm, unifying web application development around a single programming language, rather than different languages for server- and client-side scripts.

#### npm
npm (originally short for Node Package Manager)is a package manager for the JavaScript programming language. It is the default package manager for the JavaScript runtime environment Node.js. It consists of a command line client, also called npm, and an online database of public and paid-for private packages, called the npm registry. The registry is accessed via the client, and the available packages can be browsed and searched via the npm website.

### React
React is a front-end JavaScript library to build scalable, client side user interfaces.
React makes it painless to create interactive UIs. Design simple views for each state in your application, and React will efficiently update and render just the right components when your data changes.
React finds out what changes have been made, and changes only what needs to be changed.
React is used to build single page applications it allows you to create reusable UI components.
Build encapsulated components that manage their own state, then compose them to make complex UIs.
Instead of manipulating the browser's DOM directly, React creates a virtual DOM in memory, where it does all the necessary manipulating, before making the changes in the browser DOM.

* react-dom
react-dom is for rendering the components in the DOM. 'react-dom' acts as a glue between components and DOM. You will be using render() method of the react-dom to render components in the DOM
* react-router
base, building block. Provides API for creating routing solution
* react-router-dom
wrapper around react-router. The dom version designed for browsers or web apps
* react-scripts
this package includes scripts and configuration used by Create React App.

### Redux
Redux is an open-source JavaScript library for managing application state. It is most commonly used with libraries such as React or Angular for building user interfaces. 
Redux is based on three main components:
The store
The (root) reducer
Actions
The store is what holds your state. Actions are what you send to the store to change the store. The reducers define how the state of the store changes when an action is dispatched.

The synchronous and pure flow of data through Redux’s components is well-defined with distinct,simple roles. Action creators create objects → objects are dispatched to the store → the store invokes reducers → reducers generate new state → listeners are notified of state updates.

* react-redux
It lets your React components read data from a Redux store, and dispatch actions to the store to update data
* redux-thunk
Redux Thunk middleware allows you to write action creators that return a function instead of an action. The thunk can be used to delay the dispatch of an action, or to dispatch only if a certain condition is met. The inner function receives the store methods dispatch and getState as parameters.

### superagent
Small progressive client-side HTTP request library, and Node.js module with the same API, sporting many high-level HTTP client features

## File setup
The root render App component wrapped in BrowserRouter:
- **[index](./src/index.js)**
App.js render Routes component wrapped in Provider which gives access to the redux store 
- **[App](./src/App.js)**
The store lives in:
- **[store](./src/store.js)**
Renders components by going to given routes
- **[Routes](./src/Routes.js)**
Combines reducers defines how the state of the store changes when an action is dispatched
- **[reducers](./src/reducers/index.js)**

## Reducers
##### authorization
* ###### authUser.js: 
actions: LOGIN_SUCCES-action.payload 
* ###### signUpUser.js: 
actions: SIGNUP_SUCCES-action.payload 
##### events
* ###### events.js 
actions: EVENTS_FETCHED-action.payload, EVENTS_COUNT-action.payload, EVENT_CREATED-[...state, action.payload] 
* ###### count.js: 
actions: EVENTS_COUNT-action.payload
##### tickets
* ###### tickets.js: 
actions: TICKETS_FETCHED-action.payload, TICKET_CREATED-[...state, action.payload]
* ###### ticket.js: 
actions: TICKET_FETCHED-action.payload, COMMENT_CREATED-[...state, action.payload], TICKET_UPDATED-{...state, comments: state.comments, ticket:action.payload}  
##### tickets
* ###### comments.js: 
actions: TICKET_FETCHED-action.payload, COMMENT_CREATED-[...state, action.payload]

## Actions
#### action: thunk
##### authorization
* ###### LOGIN_SUCCES: 
login: request.post(/login) payload: jwt
* ###### SIGNUP_SUCCES: 
signup: request.post(/signup) payload: {id:"", name: "", email: "", password: ""}
##### events
* ###### EVENTS_FETCHED: 
fetchEvents: request(/events?limit=${limit}&offset=${offset}) payload: events
* ###### EVENTS_COUNT: 
countEvents : request(/events) payload: [total, numOfPages]
* ###### EVENT_CREATED: 
createEvent: request.post(/events) payload: event
##### tickets
* ###### TICKETS_FETCHED: 
fetchTickets: request(/events/:id/tickets) payload:
{id: "", image: "", price: "", description: "", event: {id: "", name: "", description: "", image: "", start: "", …}, eventId: "", risk: "", riskHour: "", userId: ""}
* ###### TICKET_CREATED: 
createTicket: request.post(/events/:id/tickets) payload: {id: "", price: "", description: "", image: ""}
##### tickets
* ###### TICKET_FETCHED:
fetchTicket: request(/events/:id/tickets/:ticketId/comments) payload: ticket, comments, event
* ###### COMMENT_CREATED: 
createComment: request.post(/events/:id/tickets/:ticketId/comments) payload: comment
* ###### TICKET_UPDATED: 
updateTicket: request(/events/:id/tickets/:ticketId) payload: ticket

## Components

### Events
* #### EventListContainer
componentDidMount: fetchEvents with limit and offset
* #### EventList
shows List of events with link, name, description, price, start- and end-date 
* Buttons: Add Event(if user is logged in: sets editMode in state to true which shows the EventForm, adds formValues object to state, if user is not logged in it redirects the user to /login), Previous and Next(fetchEvents will be called with new offset)
* #### EventForm
form: inputfields:name, description, image, start, end, avg_price
onChange puts values in the state with corresponding name
onSubmit create new Event (values will be passed to createEvent(action))
##### Actions
fetchEvents, createEvent
##### Reducer
const mapStateToProps = state => ({
  events: state.events,
  authenticated: !!state.authUser
})
### Login
* #### LoginFormContainer
* #### LoginForm
form: inputfields: email, password
onChange puts values in the state with corresponding name
onSubmit passes values to login(action), jwt will be added to user, redirects to previous page with updated state(authUser:<token> )
##### Actions
login
##### Reducer
const mapStateToProps = state => ({
  * authenticated: !!state.authUser
})
### SignUp
* #### SignUpFormContainer
* #### SignUpForm
form: inputfields:name, email, password
onChange puts values in the state with corresponding name
onSubmit create new User (values will be passed to signup(action))
redirects to /login
##### Actions
signup
##### Reducer
### Ticket
* #### TicketListContainer
componentDidMount: fetchTickets with id of event
* #### TicketList
shows List of tickets with link, eventName, image, description, price and color of risk
* Buttons: 
Add Event(if user is logged in: sets editMode in state to true which shows the TicketForm, adds formValues object to state, if user is not logged in it redirects the user to /login)
* #### TicketForm
form: inputfields: description, image, price
onChange puts values in the state with corresponding name
onSubmit create new Ticket (values and id will be passed to createTicket(action))
##### Actions
fetchTickets, createTicket
##### Reducer
const mapStateToProps = state => ({
  * tickets: state.tickets,
  * authenticated: !!state.authUser
})
### TicketDetails
* #### TicketDetailsContainer
componentDidMount: fetchTicket with id of event and ticketId
* #### TicketDetails
shows Ticket with name, image, description, price and risk
shows list of Comments
* Buttons: 
Edit Ticket(if user is logged in: sets editMode in state to true which shows the TicketForm, adds formValues object to state, if user is not logged in it redirects the user to /login)
Add Comment(if user is logged in: sets editMode in state to true which shows the CommentForm, adds comment object to state, if user is not logged in it redirects the user to /login)
* #### CommentForm
form: inputfield: comment
onChange puts values in the state with corresponding name
onSubmit create new Comment (values, id and ticketId will be passed to createComment(action))
##### Actions
fetchTicket, createComment, updateTicket 
##### Reducer
const mapStateToProps = state => ({
  * ticket: state.ticket,
  * tickets: state.tickets,
  * authenticated: !!state.authUser
})
