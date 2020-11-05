# Interview Scheduler
Scheduler is a React single page application. The purpose for this app was to learn React and build a mock appointment booker. This project was built for educational purposes, as part of Lighthouse Labs Web Development curriculum. 

In this specific case, the Interveiw Scheduler allows users to book and update interviews that they can set up with a school's instructors.

This project uses React, Webpack, Babel, Express, Postgres, Axios, Storybook, Cypress, and Jest. 

### Application UI
#### A user can book an interview and choose their interviewer
!["Screenshot gif of user booking an interview"](https://github.com/avvaikethees/scheduler/blob/master/docs/Scheduler_creatingAppointment%20(1).gif?raw=true)
#### A user can edit their interview and change their interviewer
!["Screenshot gif of user editing an interview"](https://github.com/avvaikethees/scheduler/blob/master/docs/Scheduler_EditAppt(2).gif?raw=true)
#### A user can delete their interview from the schedule 
!["Screenshot gif of user deleting an interview"](https://github.com/avvaikethees/scheduler/blob/master/docs/Scheduler_DeleteAppt(2).gif?raw=true)

## Setup

Install dependencies with `npm install`.

Visit http://localhost:8000 in the browser

## Connecting to the API
Fork and clone the scheduler-api into a new directory and follow the database setup instructions. 

Add http://localhost:8001 as a proxy in package.json

Run the API server in a new terminal with npm start. View the API at http://localhost:8001/api/*


## Running Webpack Development Server

```sh
npm start
```

## Running Jest Test Framework

```sh
npm test
```

## Running Storybook Visual Testbed

```sh
npm run storybook
```


