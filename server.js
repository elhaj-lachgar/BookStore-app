const express = require ('express');
const dotenv = require ('dotenv');


const app = express();
// configrition
dotenv.config({path:"config.env"});






const server = app.listen( process.env.PORT , (message) => {
    if ( process.env.NODE_ENV == "dev" )
      console.log('port is opend ' , process.env.PORT );
})


process.on('unhandledRejection' , (err) => {
    console.log(err);
    server.close(() => {
        console.log('server Shut Down')
        process.exit(1);
    })
})