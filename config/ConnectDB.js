const mongoose = require ('mongoose');


function ConnectDB () {

    mongoose.connect(process.env.DATA_BASE)
    .then((conx)=> {
        console.log("data base is connected : " ,conx.connection.host)
    })
    .catch((err) => {
        console.log("data base is inconneted : " , err?.message || err )
    })

}


module.exports = ConnectDB ;