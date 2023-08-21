.
├── configs 
│   └── db.config.js ✅ 09/08/2023
├── controllers
│   ├──  websocket 
│   │    └── websocket.controller.js ✅ 18/08/2023 🛠 (need to implement logic on client side because it resides on the frontend side more)  
│   ├── auth.controller.js ✅ 14/08/2023
│   ├── booking.controller.js
│   ├── listing.controller.js
│   ├── messaging.controller.js ✅ 21/08/2023 
│   ├── payment.controller.js ✅ 20/08/2023 🛠
│   └── RnR.controller.js
│   └── user.controller.js ✅ 17/08/2023 🛠
├── db
│   ├── migration.prod.sql ✅ 09/08/2023
│   └── migrations.dev.sql ✅ 09/08/2023
├── middlewares
│   └── auth.middleware.js ✅ 10/08/2023
├── models 
│   ├── Booking.js ✅ 10/08/2023
│   ├── Listing.js ✅ 10/08/2023
│   ├── Messaging.js ✅ 10/08/2023 (Implement Websocket 🧱) 
│   ├── Payment.js  ✅ 11/08/2023 (Implement stripe 🧱)
│   └── RnR..js ✅ 11/08/2023
│   └── User.js ✅ 11/08/2023
├── node_modules
├── routes
│   ├── auth.routes.js ✅ 14/08/2023 🛠
│   ├── booking.routes.js
│   ├── listing.routes.js
│   ├── messaging.routes.js ✅ 20/08/2023 🛠
│   ├── payment.routes.js ✅ 20/08/2023 🛠
│   └── RnR.routes.js
│   └── user.routes.js ✅ 18/08/2023 🛠
│   └── websocket.routes.js ✅ 18/08/2023 🛠
├── utils
│   ├── bcrypt.util.js ✅ 09/08/2023
│   └── mailgun.util.js ✅ 09/08/2023
├── .dockerignore ✅ 09/08/2023
├── .env.development 🧱
├── .env.production 🧱
├── .gitignore ✅ 08/08/2023
├── Dockerfile.dev
├── Dockerfile.prod
├── index.js ✅ 10/08/2023
├── package-lock.json
└── package.json ✅ 10/08/2023