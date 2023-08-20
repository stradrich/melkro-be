# music-space-API

This repository contains the backend code for the music-space-API. The project aims to address a real-world problem while exploring the business potential in creating an application.

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
```

### Database Setup

Ensure the necessary database configurations are in place based on the provided ERD(https://www.notion.so/Sigma-School-Final-Project-16e6471193344f18bc31603dabb04297?pvs=4) and database structure.

### Running the Application

Start the development server:

```bash
npm run dev
```

For production deployment, use:

```bash
npm run prod
```

## API Routes

TBC

## Deployment Strategy

TBC

## Contributing

TBC

## Copyright

Copyright (c) 2023 Aldrich Pinso


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


