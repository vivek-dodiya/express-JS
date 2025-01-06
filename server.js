import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import helmet from 'helmet';
dotenv.config();

import { connect } from './src/config/db.js'
import userRoute from './src/user/userRoute.js';

const app = express();
const port = process.env.PORT || 4000;

try {
    await connect
}
catch (err) {
    console.error('Database connection failed:', err)
    process.exit(1)
}
const reqLogger = (req, res, next) => {
    console.log(req.method, req.url, new Date().toISOString());
    next()
};

// Global middleware
// it applies for every request
app.use(express.json());
app.use(cors());
app.use(helmet())
app.use(reqLogger);
app.use('/static',express.static('./public'))

app.get('/health', (req, res) => {
    res.send("Hey! I'm healthy!");
});

app.use( '/api/users',userRoute);


app.use((err, req, res, next) => {
    console.error(err.message);
    // console.log(err.stack)
    res.status(500).json({ message: err.message })
    next()
});

app.listen(port, () => {
    console.log(`server is running on port ${port}`);
});
