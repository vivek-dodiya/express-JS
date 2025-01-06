import express from 'express';
const router = express.Router();
import bcrypt from 'bcrypt';
import User from './userModel.js'

router.get('/', (req, res) => {
    res.send('Hello World');
});
// /create 
router.post('/create', async (req, res) => {
    const { name, email, password, age } = req.body;
    if (!name) {
        return res.status(400).send({ message: 'Name is required' });
    };
    if (!email) {
        return res.status(400).send({ message: 'Email is required' });
    };
    if (!password) {
        return res.status(400).send({ message: 'Password is required' });
    };
    if (!age) {
        return res.status(400).send({ message: 'Age is required' });
    };
    const hashedPassword = await bcrypt.hash(password, 10);
    try {
        const user = await User.create({ name, email, password: hashedPassword, age });
        res.send(user);
    } catch (err) {
        res.status(500).send({ message: 'Error creating user', err: err.message });
    }
});

//  /users (read)
router.get('/users', async (req, res) => {
    try {
        const users = await User.find();
        res.send(users);
    } catch (err) {
        res.status(500).send({ message: 'Error fetching users', err: err.message });
    }
})
//  /users/:id (read)
router.get('/users/:id', async (req, res) => {
    const id = req.params.id;
    try {
        const user = await User.findById(id);
        if (!user) {
            return res.status(404).send({ message: 'User not found' });
        }
        res.send(user);
    } catch (err) {
        res.status(500).send({ message: 'Error fetching user', err: err.message });
    }
});

// /users/:id (update)
router.patch('/users/:id', async (req, res) => {
    const id = req.params.id;
    const { name, email, password, age } = req.body;
    try {
        const user = await User.findByIdAndUpdate(id, { name, email, password, age }, {
            new
                : true
        });
        if (!user) {
            return res.status(404).send({ message: 'User not found' });
        }
        res.send(user);
    } catch (err) {
        res.status(500).send({ message: 'Error updating user', err: err.message });
    }
});

// /users/:id (delete)
router.delete('/users/:id', async (req, res) => {
    const id = req.params.id;
    try {
        const deleteUser = await User.findByIdAndDelete(id);
        res.send({ message: 'User deleted successfully', deleteUser });
    } catch (err) {
        res.status(500).send({ message: 'Error deleting user', err: err.message });
    }
});


export default router