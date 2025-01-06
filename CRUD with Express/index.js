import express from 'express';
const app = express();
import  {connect}  from './db.js';
import router from './Roure.js';

try{
    connect()
}catch{
    console.log('Error connecting to database');
}
app.use(express.json());
app.use('/',router)

app.listen(3000, ()=>{
    console.log('Server is running on port 3000');
})