# music-space-API

This repository contains the backend code for the music-space-API. 

The Music Space App is a platform that connects musicians from different level (amateurs, music major, music teachers, concert performers, recording artists), allowing them to share and discover practice, rehearsal, recording spaces in different cities. The app aims to foster collaboration, creativity, and community among musicians, making it easier for local and travelling musicians to find suitable spaces for rehearsals and collaborations. 

At the same time, local music centres or studios or conservatory can maximise their profit by renting out their unused space through The Music Space App. By listing their available rooms, studios or performance spaces on the platform, these establishments can tap into a broader network of musicians and music enthusiasts, effectively turning their under-utilised areas into profitable assets. 

## Table of Contents

- [Brief Overview](#brief-overview)
- [Tech Stack](#tech-stack)
- [Getting Started](#getting-started)
  - [Installation](#installation)
  - [Environment Variables](#environment-variables)
  - [Database Setup](#database-setup)
  - [Running the Application](#running-the-application)
- [API Routes](#api-routes)
- [Deployment Strategy](#deployment-strategy)
- [Contributing](#contributing)
- [License](#license)

## Brief Overview

TBC

## Tech Stack

- **Programming Language:** JavaScript
- **Framework:** Express.js
- **Tools:**
  - Beekeeper: SQL database management
  - Insomnia: API testing
  - Docker: Containerization
- **Libraries:**
  - bcrypt: Password hashing
  - dotenv: Environment variables
  - form-data: Form data handling
  - morgan: Logging
  - mysql2 and sequelize: Database management and ORM
  - jsonwebtoken: JSON Web Tokens for authentication
- **Services:**
  - Stripe: Payment processing
  - Stripe Webhook
  - RequestBin: Inspect, capture, and analyze HTTP requests, testing and debugging webhook implementations; provides a temporary URL that you can use as a webhook endpoint
  - Pipedream: Create workflow that listens for incoming webhook events, processes them, and performs various actions based on the data
  - Websocket: Real-time messaging
  - Mailgun.js: Email communication
  - Google Cloud Platform: Deployment and hosting

## Getting Started

### Installation

Clone the repository and install the dependencies:

```bash
git clone https://github.com/your-username/music-space-api.git
cd music-space-api
npm install
```

### Environment Variables

Create or update the `.env.development` and `.env.production` files with appropriate environment variables, including database connection information, API keys, and secret keys.

```env
DB_NAME=
DB_HOST=
DB_PORT=
DB_USER=
DB_PASSWORD=
PORT=
SECRET_KEY=
MAILGUN_DOMAIN=
MAILGUN_API_KEY=
STRIPE_PUBLISHABLE_KEY=
STRIPE_KEY=
CLIENT_URL=
STRIPE_WEBHOOK_SECRET=
```

### Database Setup

Ensure the necessary database configurations are in place based on the provided ERD and database structure.

### Running the Application

Start the development server:

```bash
npm run dev
```

For production deployment, use:

```bash
npm run prod
```

## Deployment Strategy

TBC

## Contributing

TBC

## Copyright

Copyright (c) 2023 Aldrich Pinso

## API Routes

```
Health
GET http://localhost:8080/
GET http://localhost:8080/music-space

Auth
POST http://localhost:8080/auth/register
POST http://localhost:8080/auth/verify
POST http://localhost:8080/auth/login

Listing
POST http://localhost:8080/listings/
GET http://localhost:8080/listings/
GET http://localhost:8080/listings/listing/:id
PUT http://localhost:8080/listings/listing/:id
DELETE http://localhost:8080/listings/listing/:id

Timeslot
POST http://localhost:8080/timeslot/timeslot
GET http://localhost:8080/timeslot/timeslot
GET http://localhost:8080/timeslot/timeslot/:id
PUT http://localhost:8080/timeslot/timeslot/:id
DELETE http://localhost:8080/timeslot/timeslot/:id

Booking
POST http://localhost:8080/bookings/bookings
GET http://localhost:8080/bookings/bookings
GET http://localhost:8080/bookings/bookings/:id
PUT http://localhost:8080/bookings/bookings/:id
DELETE http://localhost:8080/bookings/bookings/:id

Payment
POST http://localhost:8080/payment/payment
GET http://localhost:8080/payment/payment
GET http://localhost:8080/payment/payment/:id
PUT http://localhost:8080/payment/payment/:id
DELETE http://localhost:8080/payment/payment/:id

Stripe
GET http://localhost:8080/check-stripe
POST http://localhost:8080/stripe/create-checkout-session/ (add ons and no add ons)
POST http://localhost:8080/stripe/webhook

Reviews and Rating
POST http://localhost:8080/reviews-ratings//reviews-ratings
GET http://localhost:8080/reviews-ratings//reviews-ratings
GET http://localhost:8080/reviews-ratings//reviews-ratings/:id
PUT http://localhost:8080/reviews-ratings//reviews-ratings/:id
DELETE http://localhost:8080/reviews-ratings//reviews-ratings/:id

User
POST http://localhost:8080/users
GET http://localhost:8080/users/users
GET http://localhost:8080/users/:id
PUT http://localhost:8080/users/:id
DELETE http://localhost:8080/users/:id

```
## File Structure

```
.
├── configs 
│   └── db.config.js 
├── controllers
│   ├── auth.controller.js
│   ├── booking.controller.js
│   ├── listing.controller.js
│   ├── messaging.controller.js
│   ├── payment.controller.js
│   └── RnR.controller.js
│   └── user.controller.js
├── db
│   ├── migration.prod.sql 
│   └── migrations.dev.sql 
├── middlewares
│   └── auth.middleware.js 
├── models 
│   ├── Booking.js
│   ├── Listing.js
│   ├── Messaging.js
│   ├── Payment.js
│   └── RnR..js
│   └── User.js
├── node_modules
├── routes
│   ├── auth.routes.js
│   ├── booking.routes.js
│   ├── listing.routes.js
│   ├── messaging.routes.js
│   ├── payment.routes.js
│   └── RnR.routes.js
│   └── user.routes.js
├── utils
│   ├── bcrypt.util.js 
│   └── mailgun.util.js 
├── .dockerignore 
├── .env.development 
├── .env.production 
├── .gitignore 
├── Dockerfile.dev
├── Dockerfile.prod
├── index.js 
├── package-lock.json
└── package.json
```

