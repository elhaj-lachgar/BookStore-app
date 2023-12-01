const express = require ('express');
const dotenv = require ('dotenv');
const ConnectDB = require ('./config/ConnectDB');
const UndefindRoute = require ('./middleware/UndefindRoute');
const ErrorRoute = require ('./middleware/ErrorRoute');
const UserRoute = require ('./api/UserRoute');
const AuthRoute = require ('./api/AuthRoute');
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

app.all('*' , UndefindRoute );

app.use(ErrorRoute);


const server = app.listen( process.env.PORT , () => {
    if ( process.env.NODE_ENV == "dev" )
      console.log('port is opend ' , process.env.PORT );
});


process.on('unhandledRejection' , (err) => {
    console.log(err);
    server.close(() => {
        console.log('server Shut Down')
        process.exit(1);
    })
});