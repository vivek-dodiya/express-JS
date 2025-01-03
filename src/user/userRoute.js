import express from 'express';
const router = express.Router();
import User from './userModel.js'


router.post('/', async (req, res) => {
    const { name, email, password } = req.body;
    if (!name) {
        return res.status(400).json({ message: 'Name is required' });
    }
    if (!email) {
        return res.status(400).json({ message: 'Email is required' });
    }
    if (!password) {
        return res.status(400).json({ message: 'Password is required' });
    }
    try {
        const user = await User.create({ name, email, password });
        res.status(201).json({ user })
    } catch (err) {
        res.status(400).json({ msg: err.message })
    }
})

export default router