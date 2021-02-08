import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';

import User from '../models/user.js';

export const register = async (req, res) => {
    const { username, password } = req.body;

    try {
        // check user already registered
        const existingUser = await User.findOne({ username });

        if (existingUser) {
            return res.status(400).json({ message: 'User already exist.' });
        }

        const hashedPassword = await bcrypt.hash(password, 12);

        const result = await User.create({ username, password: hashedPassword });

        const token = jwt.sign({ email: result.email, id: result._id }, process.env.SECRET, { expiresIn: "1h" });

        res.status(200).json({ result, token });

        // after that go to middlewares folder in auth.js
    } catch (error) {
        res.status(500).json({ message: 'Something went wrong' });
    }
}

export const login = async (req, res, next) => {
    const { username, password } = req.body;

    try {
        const existingUser = await User.findOne({ username });

        if (!existingUser) {
            return res.status(404).json({ message: "User Doesn't exist." });
        }

        const isPasswordCorrect = await bcrypt.compare(password, existingUser.password);

        if (!isPasswordCorrect) {
            return res.status(400).json({ message: 'Invalid Credntials.' });
        }

        const token = jwt.sign({ username: existingUser.username, id: existingUser._id }, process.env.SECRET, { expiresIn: "1h" });

        res.status(200).json({ result: existingUser, token });
    } catch (error) {
        res.status(500).json({ message: 'Something went wrong.' });
    }
} 