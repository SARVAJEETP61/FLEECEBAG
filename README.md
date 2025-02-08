# FLEECEBAG

**FLEECEBAG** is an e-commerce platform specializing in a variety of bags for both men and women. Built with a modern tech stack, it offers a seamless shopping experience, including product browsing, cart management, and secure checkout with Stripe integration.

## Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Installation](#installation)
- [Usage](#usage)
- [Project Structure](#project-structure)
- [API Endpoints](#api-endpoints)
- [Contributing](#contributing)
- [License](#license)

## Features

- **User Authentication**: Secure login and registration.
- **Product Catalog**: Browse various bag categories for men, women and others.
- **Product Details**: View detailed information about each product.
- **Product Offers**: Explore various offers and discounts on each product.
- **Shopping Cart**: Add, remove, and manage products in the cart.
- **Checkout Process**: Seamless checkout with Stripe payment integration.
- **Order Confirmation**: Receive confirmation upon successful payment.
- **Responsive Design**: Optimized for various devices.

## Tech Stack

- **Frontend**:
  - HTML
  - CSS
  - JavaScript

- **Backend**:
  - Node.js
  - Express.js

- **Database**:
  - MongoDB (Managed via MongoDB Compass)

- **Payment Gateway**:
  - Stripe

## Installation

1. **Clone the Repository**:

   ```bash
   git clone https://github.com/SARVAJEETP61/FLEECEBAG.git
   cd FLEECEBAG
   ```

2. **Install Dependencies**:

   ```bash
   npm install --force
   ```

3. **Set Up Environment Variables**:

   Create a `.env` file in the root directory and add the following variables:

   ```env
   PORT=3000
   MONGODB_URI=your_mongodb_connection_string
   STRIPE_SECRET_KEY=your_stripe_secret_key
   ```

   Replace `your_mongodb_connection_string` with your MongoDB URI and `your_stripe_secret_key` with your Stripe secret key.

4. **Start the Application**:

   ```bash
   node server.js
   ```

   The application will run at `http://localhost:8080`.

## Usage

1. **Home Page**:
   - Access the homepage to view featured products and navigate to men's and women's sections.

2. **Product Pages**:
   - Navigate to `/men` or `/women` to browse products.
   - Use buttons to navigate products page by category: Handbags, Laptop Bags, Travel Bags, Sling Bags, Messenger Bags.

3. **Product Details**:
   - Click on a product to view detailed information, including images, description, and price.
   - Options to "Add to Cart" or "Buy Now".

4. **Shopping Cart**:
   - View added products, adjust quantities, or remove items.
   - Proceed to checkout.

5. **Checkout**:
   - Enter shipping and payment details.
   - Complete payment via Stripe.
   - Upon successful payment, redirected to `success.html`.
   - If payment fails, redirected to `cancel.html`.

## Project Structure

```
FLEECEBAG/
├── public/
│   ├── images/
│   ├── styles/
|    └── views/
│   └── scripts/
├── controllers/
├── models/
├── routes/
├── .env
├── server.js
├── package.json
└── README.md
```

- `public/`: Contains static assets like images, stylesheets, and client-side scripts.
- `src/`:
  - `controllers/`: Handles request logic.
  - `models/`: Defines Mongoose schemas and models.
  - `routes/`: Defines application routes.
  - `views/`: Contains HTML templates.

## API Endpoints

- **User Authentication**:
  - `POST /api/register`: Register a new user.
  - `POST /api/login`: Authenticate a user.

- **Products**:
  - `GET /api/products`: Retrieve all products.
  - `GET /api/products/type`: Retrieve a specific product by it's type.

- **Cart**:
  - `POST /api/cart`: Add a product to the cart.
  - `GET /api/cart`: Retrieve user's cart items.
  - `DELETE /api/cart/:id`: Remove a product from the cart.

- **Checkout**:
  - `POST /api/checkout`: Process payment via Stripe.

## Contributing

Contributions are welcome! Please fork the repository and submit a pull request for review.

## License

This project is licensed under the MIT License.
