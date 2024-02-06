import express from 'express'

// logging information in console 
import morgan from 'morgan';

// limited  request from a single ip address
import rateLimit from "express-rate-limit"

// security purpose to send the response with headers
import helmet from "helmet"

// sanitize the data that coming from the user
import mongoSanitize from 'express-mongo-sanitize'

// The bodyParser middleware is used for parsing incoming JSON and URL-encoded data in the request body.
import bodyParser from 'body-parser'

import cors from 'cors';

// Sanitize untrusted HTML (to prevent XSS) with a configuration specified by a Whitelist.
import xss from "xss"

import router from './routes/index.js';





const app = express();

app.use(
    cors({
        origin: "http://localhost:5173",
        methods: ["GET", "PATCH", "POST", "DELETE", "PUT"],
        credentials: true,
    })
);

app.use(express.json({ limit: "10mb" }));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(helmet());

if (process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'));
}

const limiter = rateLimit({
    max: 3000,
    windowMs: 60 * 60 * 1000, // In one hour
    message: "Too many Requests from this IP, please try again in an hour!",
});

app.use("/tawk", limiter);

app.use(express.urlencoded({ extended: true }))

app.use(mongoSanitize())

// app.use(xss())

app.use(router)

export default app;