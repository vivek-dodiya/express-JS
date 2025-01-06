import mongoose from "mongoose";

const connect = mongoose.connect('mongodb://localhost:27017/CRUD_WITH_EXPRESS',
    {
        useNewUrlParser: true,
        useUnifiedTopology: true
    }
).then(()=>{
    console.log("Connected to MongoDB");
}).catch(()=>{
    console.log("Error connecting to MongoDB");
})
export  {connect};