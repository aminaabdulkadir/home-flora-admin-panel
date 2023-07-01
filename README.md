# The Admin Panel of Home Flora E-Commerce.


![Admin Panel](https://i.postimg.cc/RF7NhrwM/admin-panel-home-2.png)

## Introduction
This is the admin panel of the e-commerce application Home Flora.

Having a high-performance web admin panel tailored to specific business and user needs is crucial since it helps optimize the team's work, make it more efficient, and achieve tasks as fast as possible.

For that reason, building such an important website is interesting and challenging, so I built this project :trophy:

## Features
- Widgets that contain statistical data about the customers, orders, earnings, and balance.
- A chart that displays revenue month-over-month growth.
- Users page to manage customers' profiles, add new ones, edit their stats, and remove them.
- Single user page that displays editable user information and their spending over the last month.
- Products page to manage products' stock availability, add special discounts, edit product information, and add new products. 
- Single product page that displays editable product information and its selling performance over the last month.
- Orders and Delivery pages.
- Dark mode feature for more eyes rest and extended battery life.
- Images are stored in Firebase storage.
- Products and user information are stored and managed with MongoDB Atlas.
- The fronted part has been built with React library and Sass framework.
- State management is done with the Redux toolkit and Context API.
- The Rest API has been built with Node.js, Express middleware, and MongoDB. 
- Authentication and authorization are done with JSON Web Token (JWT).

## Using the Application
On the home page, you can view the many components each displaying different statistical data, scroll down to see information about the latest transactions.
Visit the users' page to add new users, view and edit the information of a specific user, and delete a user. Likewise, visit the products page to add a new product, view and edit the information of a specific product, and delete a product. To see the details of all orders, go to the orders page, and to the delivery page for delivery details. To switch to dark mode, click on the dark button down the sidebar or the toggle button in the navbar.

#### Authentication Information
Username: test

Password: test

## Running the Admin Panel Locally
1. Clone the project.
2. install dependencies by running (npm install or yarn install) in the command line/ terminal.
3. set the required environment variables: (PORT- MongoDB URL - JWT secret) 
4. start the backend by running (npm run start) in the API directory.
5. Start the fronted by running (npm run start) in the admin directory.

## Dependencies
- Babel
- Webpack
- React
- React-DOM
- Sass
- Axios
- Redux.js
- Context API
- Recharts
- React-router-dom
- Express.js
- Mongoose
- Json Web Token
- Crypto-js
- Cors
- Dotenv
- Material-ui
- Timeago.js
