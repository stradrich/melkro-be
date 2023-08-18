Before building this app, I've planned my thoughts on https://www.notion.so/Sigma-School-Final-Project-16e6471193344f18bc31603dabb04297?pvs=4

This includes the real world problem and business potential in the brief overview. I mainly center around the points below to build this app.

(a). Brief Overview
(b). Featured lists
(c). API routes and checklist & auth mechanism
(d). ERD and database structure & model  (this is to ease the later process, see step 3 below)
(e). Choosing Tech Stack
        (i). Programming Language: JavaScript

        JavaScript is the language you're using for the core logic of your application.
        
        (ii) Framework: Express.js ( it runs on node.js environment, meaning execute code outside of web browser)

       
        (iii). Tools:

        Beekeeper: Used to manage your SQL database.
        Insomnia: Used for testing your routes and APIs.
        Docker: Used to containerize your application and its dependencies.

                `docker ps  
                docker build -t twitter-clone-backend:1.0 . -f Dockerfile.dev 
                docker run -d -p 8080:8080 --name twitter-clone twitter-clone-backend:1.0
                docker image list  
                docker run --name= twitter-clone-backend-server -p 3306: 3306-e MYSQL_ROOT_PASSWORD=sigma12345 -d mysql:8.0   `
        
        (iv). Libraries:

        bcrypt and salt: For enhancing security through password hashing.
        dotenv: For managing environment variables.
        form-data: For working with form data.
        morgan: For logging HTTP requests and responses.
        mysql2 and sequelize: For database management and ORM (Object-Relational Mapping).
        
        (v). Services:

        Stripe: For payment processing.
        Websocket: For real-time messaging capabilities.
        Mailgun.js: For handling authentication-related email communication.
        Google Cloud Platform: For deployment and hosting your application.
        
        (vi) Middleware:
        jsonwebtoken: For managing JSON Web Tokens (JWT) used in authentication.

(f). Deployment Strategy

START BUILDING FROM SCRATCH...

1. Create the file structure below, understanding how it was built step by step will help you run this app with clarity and appreciation. 

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

If you are creating from scratch please go to step 2a, if not go to step 2b
2a. Create an express server and run:
npm init -y
npm install express

You should be able to 3 new files. 
(a). node_modules
(b). package-lock.json
(c). package.json

    TLDR; (you may skip this)
    An Express server refers to a web server framework for Node.js called "Express.js" or simply "Express." Express is one of the most popular and widely used frameworks for building web applications and APIs (Application Programming Interfaces) using Node.js.

    Express.js provides a set of features and tools that simplify the process of creating server-side applications. It abstracts many of the low-level details of handling HTTP requests and responses, making it easier for developers to define routes, handle middleware, manage sessions, and more. Here are some key concepts and features of Express:

    Routing: Express allows you to define routes for handling different types of HTTP requests (GET, POST, PUT, DELETE, etc.) and specify how the server should respond to each route. Routes are defined using route handlers, which are functions that are executed when a matching request comes in.

    Middleware: Express enables you to use middleware functions to perform tasks such as authentication, logging, data validation, and more. Middleware functions are executed in a specific order for each request, allowing you to process the request and response objects before they reach the final route handler.

    Request and Response: Express provides abstractions for handling HTTP requests and responses. You can access request parameters, query strings, request headers, and more using the request object. Similarly, you can set response status codes, headers, and send data using the response object.

    Template Engines: Express can work with various template engines (like EJS, Pug, Handlebars) to generate dynamic HTML content on the server-side and render it as static HTML before sending it to the client.

    Static Files: You can serve static files (like HTML, CSS, JavaScript) using the built-in middleware provided by Express. This is useful for serving client-side files that don't require server-side processing.

    Error Handling: Express allows you to define error-handling middleware to handle errors that occur during request processing. This ensures a consistent way to handle and respond to errors.


While creating from scratch, other dependencies such as morgan and bcrypt will come later in different main brunch folders (16 in total). 

If you are cloning this app from repo please go to step 2b
2b. Please run:
npm install 

This is to ensure we are using the same dependencies and version. This is to mitigate incompatibility when running or cloning this app. 


 
3. Environment Variables:
Create or update the necessary .env.development and .env.production files with appropriate environment variables for your development and production environments. This environment configuration file used to store sensitive information and configuration settings for your initial development and later production environment. These files will contain configuration settings like database connection information, API keys, and other settings specific to each environment. 

    TLDR; (you may skip this)
    DB_NAME: This variable likely stores the name of the database you'll be connecting to in your production environment. It corresponds to the database name you've set up in your Beekeeper table.

    DB_HOST: This variable specifies the host or server where your database is located. Common values might include "localhost" if the database is on the same server as your application, or an IP address or domain name if it's on a remote server. The actual value depends on your hosting infrastructure and how your database is set up. Need to change this during deployment! 

    DB_PORT: This variable defines the port number your database server is listening on. The value "3306" is the default port for MySQL databases. It should match the port you've configured for your Beekeeper table.

    DB_USER and DB_PASSWORD: These variables store the username and password credentials that your application uses to connect to the database. You should have created these when setting up your database. They provide secure access to your database.

    PORT: This variable defines the port number on which your application will listen for incoming requests. It's the port that your application server uses to communicate with the outside world. It's common to use values like "80" for HTTP or "443" for HTTPS. The choice of port depends on your server setup and security requirements.

    SECRET_KEY: This variable is likely used for encrypting sensitive data, such as user sessions or tokens. It's a random and secret value that adds a layer of security to your application. You should generate a strong secret key and keep it confidential. Use randomUUID() !

    MAILGUN_DOMAIN and MAILGUN_API_KEY: These variables likely store the credentials needed to interact with the Mailgun service for sending emails. You'd get these values from your Mailgun account when you set up the service for your application.

4. Database 
This is predefined in notion. It covers topics from above.
    (c). API routes and checklist & auth mechanism
    (d). ERD and database structure & model  (this is to ease the later process, see step 3 below)

5. Start the Application:
With all dependencies installed and environment variables set, you can start your backend application using the appropriate Docker files or directly if you're not using Docker. Here are the commands to start the development and production versions of your application:

For development: npm run dev
For production: npm run prod

6. Access Your Backend:
Once the application is up and running, you can access your backend by sending HTTP requests to the appropriate routes and endpoints defined in your route controllers (e.g., /bookings, /listings, etc.). Use insomnia to check if routes, authentication and database is working. 

7. Build frontend and merge it
