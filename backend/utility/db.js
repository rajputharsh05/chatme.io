const mongoose = require('mongoose')


const uri = "mongodb+srv://hs7992476139:KOSgem8tijMk0Nws@cluster0.whwoemb.mongodb.net/?retryWrites=true&w=majority";


async function connect()
{
    await mongoose.connect(uri).then(()=>{
        console.log("Connected to db")
    });
}


module.exports = {
    connect,
}