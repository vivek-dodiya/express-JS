import express from 'express';
const router = express.Router();
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import User from './userModel.js';
import { auth } from '../middleware/auth.js';


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
    const hashedPassword = await bcrypt.hash(password, 10);
    try {
        const user = await User.create({ name, email, password: hashedPassword });
        res.status(201).json({ user })
    } catch (err) {
        res.status(400).json({ msg: err.message })
    }
});


// /api/users/login
router.post('/login', async (req, res) => {
    const { email, password } = req.body;
    if (!email) {
        return res.status(400).json({ message: 'Email is required' });
    }
    if (!password) {
        return res.status(400).json({ message: 'Password is required' });
    }
    const user = await User.findOne({ email });
    if (!user) {
        return res.status(400).json({ message: 'Invalid email or password' });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
        return res.status(400).json({ message: 'Invalid email or password' });
    }
    const token = jwt.sign({ id: user._id }, process.env.SECRET_KEY);
    res.json({ token });
    // res.json({ user });
})

//  /api/users/:id
router.get('/:id', auth, async (req, res) => {
    const id = req.params.id;
    if (!id) {
        return res.status(400).json({ message: 'Id is required' });
    }
    try {
        const user = await User.findById(id, { password: false })
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.json(user);
    }
    catch (err) {
        res.status(400).json({ message: err.message })
    }
})

export default router