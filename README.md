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
cd cafeteria-ordering

3. Install dependencies
npm install

4. Start the frontend
npm start

5. Start the backend
**Flask**
python app.py



