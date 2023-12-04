

const PortListen = () => {
    if ( process.env.NODE_ENV == "dev" )
      console.log('port is opend ' , process.env.PORT );
}


module.exports = PortListen;