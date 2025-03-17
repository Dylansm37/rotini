<<<<<<< HEAD
# rotini
cpsc 362 group repo

# Cafeteria Ordering System

## Brief Summary
The Cafeteria Ordering System is designed to provide a seamless online ordering experience for cafeteria users. It allows users to browse the menu, add items to a shopping cart, process payments securely, and communicate through an integrated messaging system. The goal is to create an efficient and intuitive platform to enhance the cafeteria experience for both customers and staff.

---

## Table of Contents
1. [Features](#features)
2. [Technical Stack](#technical-stack)
3. [App Type & Scalability](#app-type--scalability)
4. [Integration & User Experience](#integration--user-experience)
5. [Setup Instructions](#setup-instructions)
6. [Contributors](#contributors)
7. [License](#license)

---

## Features

### Behavioral Functionalities
- **User-Friendly Interface**: Clean, responsive UI for easy navigation.
- **Login/Sign up Page**: Users can create an account and log in to access personalized features.
- **User Home Page**: View previous orders and reorder items.
- **Admin Page (Optional)**: Admins can manage the menu, update prices, and control inventory.
- **Menu Browsing**: Categorized menu items for easy selection.
- **Product Searching**: Search bar to find menu items by keywords.
- **Individual Product Page**: Add to cart, modify quantities, and select customization (portion size, dietary preferences).
- **Shopping Cart**: Add/remove items, update quantities, and persist cart items across sessions.
- **Payment Processing**: Secure payment transactions using the Stripe API.

---

## Technical Stack

### Front-End
- **Homepage UI**: React.js, HTML, CSS, JavaScript
- **Search Function**: React or Firebase Firestore
- **Shopping Cart Management**: React.js with Redux

### API
- **Payment Processing**: Stripe API
- **Order Management**: Flask or PHP
- **User Authentication & Database Operations**: Firebase Firestore API
- **Messaging & AI Features (Optional)**: Google Cloud API

### Back-End
- **NoSQL Database**: Firebase Firestore (for database & authentication)
- **SQL Database**: MySQL or Firebase Cloud SQL with MySQL support

### Technologies
- **Version Control**: GitHub
- **Project Management**: JIRA, Confluence

---

## App Type & Scalability
- **App Type**: Web Application for the Cafeteria Ordering System.
- **Scalability**: The system is designed to handle high traffic, capable of managing an entire campus' orders daily.

---

## Integration & User Experience

- **Credit System Integration**: Users can deposit money into their account and use it for cafeteria purchases.
- **Persistent Data Storage**: All user information and balances will be stored securely in the database.
- **User Experience**: The system aims to provide an intuitive, easy-to-use interface for both customers and cafeteria staff.

---

## Setup Instructions

### Prerequisites
1. **Node.js** and **npm** for running the front-end.
2. **Python** (for Flask back-end) or **PHP**.
3. **Stripe API Key** for payment processing.
4. **Firebase Firestore** account for authentication and database.

### Installation && Setup
1. Clone the repository to your local machine.
   ```bash
   git clone https://github.com/yourusername/cafeteria-ordering-system.git

2. Navigate to the project forder
```bash
cd cafeteria-ordering
```
3. Install dependencies
```bash
npm install
```
4. Start the frontend
```bash
npm start
```
5. Start the backend
**Flask**
```bash
python app.py
```


=======
# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can't go back!**

If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you're on your own.

You don't have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn't feel obligated to use this feature. However we understand that this tool wouldn't be useful if you couldn't customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `npm run build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)
>>>>>>> a8a6d59 (Initialize project using Create React App)
