const express = require ('express');
const dotenv = require ('dotenv');
const ConnectDB = require ('./config/ConnectDB');
const UndefindRoute = require ('./middleware/UndefindRoute');
const ErrorRoute = require ('./middleware/ErrorRoute');


const app = express();
// configrition
dotenv.config({path:"config.env"});

ConnectDB();

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