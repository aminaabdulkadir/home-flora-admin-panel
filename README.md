# The Admin Panel of Home Flora E-Commerce.

### [Live Site](https://home-flora-admin-panel.herokuapp.com/)

![Admin Panel](https://i.postimg.cc/RF7NhrwM/admin-panel-home-2.png)

## Introduction
Home flora is an e-commerce application that sells variety collections of indoor/outdoor plants. 

Building an e-commerce app is a long and interesting journey where you get the chance to apply all your software development knowledge and constantly enhance it by solving the so many issues that you will run into through the process.

I love plants :herb: and dream to have my own garden, so I built Home Flora.

## Features
- Products and users information are stored and managed with MongoDB Atlas.
- The fronted part has been built with React library and React Styled Components.
- State managment is done with Redux toolkit.
- The Rest API has been built with Node.js, Express middleware, and MongoDB. 
- Authentication and authorization are done with JSON Web Token (JWT).
- The checkout process has been accomplished by integerating PayPal API.

## Using the Application
Browse the different categories and filter the products to show them according to the type, and size, and sort them by price and adding date. Select any product to visit its page and see its image and caring information. Add your chosen product(s) to the cart after creating an account. Checkout with your PayPal account, or add your credit card information. You will receive an email containing the order details and the tracking ID.

#### Authentication Information
Username: test

Password: test

## Running the Admin Panel Locally
1. Clone the project.
2. install dependencies by running (npm install or yarn install) in the command line/ terminal.
3. set the required environment variables: (PORT- MongoDB URL - JWT secret - paypal account credentials) 
4. start the backend by running (npm run start) in the API directory.
5. Start the fronted by running (npm run start) in the CLIENT directory.

## Dependencies
- Babel
- Webpack
- React
- React-DOM
- Styled Component
- Axios
- Redux.js
- React-router-dom
- Express.js
- Mongoose
- Json Web Token
- Crypto-js
- Cors
- Dotenv
- React-paypal-js
- Material-ui
- React-icons

