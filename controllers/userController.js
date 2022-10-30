const asyncHandler = require('express-async-handler')
const User = require('../models/userModel')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')


const register = asyncHandler(async (req, res) =>
{
    const { email, password } = req.body;
    if (!email || !password)
    {
        res.status(400)
        throw new Error('Please complete the registration form inputs.')
    }

    const userExist = await User.findOne({ email: email })
    if (userExist)
    {
        res.status(400)
        throw new Error('Email is already taken, please use unique email.')
    }

    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password, salt)

    const user = await User.create({
        email,
        password: hashedPassword
    })
    if (user)
    {
        res.status(200).json({
            _id: user.id,
            email: user.email,
            token: generateToken(user._id, user.email)
        })
    } else
    {
        res.status(400)
        throw new Error('Failed to register account.')
    }

});

const login = asyncHandler(async (req, res) =>
{
    const { email, password } = req.body;

    const user = await User.findOne({ email })
    if (user && (await bcrypt.compare(password, user.password)))
    {
        res.status(200)
            .json({
                _id: user.id,
                email: user.email,
                token: generateToken(user._id, user.email)
            })
    } else
    {
        res.status(400)
        throw new Error('Invalid credentials')
    }
})

const getUserData = asyncHandler(async (req, res) =>
{
    const { _id, email } = await User.findById(req.user.id)
    res.json({
        _id,
        email
    })
})

const generateToken = (id, email) =>
{
    return jwt.sign({ id, email }, process.env.JWT_SECRET, {
        expiresIn: '30d'
    })
}

module.exports = {
    register,
    login,
    getUserData
}