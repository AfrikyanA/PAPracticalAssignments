import User from '../model/user.js';

const handleError = (res, message, code = 500) => {
    console.error(message);
    res.status(code).json({ message: message });
};

export const createUser = async (req, res) => {
    const {name, email, age} = req.body;
    try {
        const newUser = new User({ name, email, age });
        await newUser.save();

        res.status(201).json({ message: 'User created successfully', user: newUser });
    }
    catch (err) {
        handleError(res, 'Failed to save user');
    }
};

export const getUsers = async (req, res) => {
    try{
        const users = await User.find();
        if (!users) {
            return handleError(res, 'Users not found', 404);
        }
        res.status(200).json({ users });
    }
    catch (err) {
        handleError(res, 'Failed to fetch users');
    }
};

export const getUserById = async (req,res) => {
    try{
        const user = await User.findById(req.params.id);
        if (!user) {
            return handleError(res, 'User not found', 404);
        }
        res.status(200).json({ user });
    }
    catch (err) {
        handleError(res, 'Error fetching user');
    }
};

export const deleteUserById = async (req, res) => {
    try {   
        const result = await User.findByIdAndDelete(req.params.id);
        if (!result) {
            return handleError(res, 'User not found', 404);
        }
        res.status(200).json({ message: 'User deleted successfully', result });
    }
    catch (err) {
        handleError(res, 'Error deleting user');
    }
};