const express = require ('express');
const dotenv = require ('dotenv');
const ConnectDB = require ('./config/ConnectDB');
const UndefindRoute = require ('./middleware/UndefindRoute');
const ErrorRoute = require ('./middleware/ErrorRoute');
const UserRoute = require ('./api/UserRoute');
const AuthRoute = require ('./api/AuthRoute');
const BookRoute = require ('./api/BookRoute');
const CartRoute = require ('./api/CartRoute');
const PortListen = require ('./config/PortListen');
const unhandledRejection = require ('./config/UnhandledRejection');
const cors = require ("cors");
const app = express();

// configrition
dotenv.config({path:"config.env"});
ConnectDB();

// middleware
app.use(cors());

app.use(express.json());

app.use("/api/v1/user" , UserRoute);
app.use("/api/v1/auth" , AuthRoute);
app.use("/api/v1/book" , BookRoute);
app.use("/api/v1/cart" , CartRoute);

app.all('*' , UndefindRoute );

app.use(ErrorRoute);


const server = app.listen( process.env.PORT , PortListen );


process.on('unhandledRejection' ,(err) => unhandledRejection(err , server ));