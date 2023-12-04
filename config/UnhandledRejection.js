
const unhandledRejection = (err ,server) => {
    console.log(err);
    server.close(() => {
        console.log('server Shut Down')
        process.exit(1);
    })
}


module.exports  =  unhandledRejection