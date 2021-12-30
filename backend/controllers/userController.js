import asyncHandler from 'express-async-handler';
import generateToken from '../utils/generateToken.js'

import User from '../models/userModel.js'

//@desc auth user & get token
//@route Post /api/users
//@access private
//@access public

const authUser = asyncHandler(async (req, res) => {
    const {email, password} = req.body
    res.send({email,password})

    const user = await User.findOne({email})

    if(User && (User.matchPassword(password))) {
        res.json({
            _id: user.id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin,
            token:null
        })
    } else {
        res.status(401) //un authorized
        throw new Error('Invalid email or passward')
    }
})

const getUserProfile = asyncHandler(async(req, res) => {
    //res.send('success')
    const user= await User.findById(req.user._id)

    if(user){
        res.json({
            _id: user._id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin
        })
    } else{
        res.status(404)
        throw new Error('User not found')
    }
})

const registerUser= asyncHandler(async (req, res) => {
    const {name, email, password} = req.body

    const userExists = await User.findOne({email})

    if(userExists) {
        res.status(400) //bad request
        throw new Error('User already exists')
    }

    const user = await User.create({
        name,
        email, 
        password
    })

    if(user) {
        res.status(201).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin,
            token:generateToken(user._id)
        })
    } else {
        res.status(404)
        throw new Error('Invalid user data')
    }
})

export {authUser, getUserProfile, registerUser}