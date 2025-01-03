import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
dotenv.config()

import { connect } from './src/config/db.js'
import userRoute from './src/user/userRoute.js';

const app = express();
const port = process.env.PORT || 4000;

try {
    connect
}
catch (err) {
    console.log(err)
}

//Global middleware
// it applay for every request
app.use(express.json());
app.use(cors());
app.use( '/api/users',userRoute);
const reqLogger = (req, res, next) => {
    console.log(req.method, req.url, new Date().toISOString());
    next()
};
app.use(reqLogger);
app.get('/health', (req, res) => {
    res.send("hey! i am healthy!");
});

app.use((err, req, res, next) => {
    console.error(err.message);
    // console.log(err.stack)
    res.status(500).json({ message: err.message })
    next()
})
app.listen(port, () => {
    console.log(`server is running on port ${port}`);
});
