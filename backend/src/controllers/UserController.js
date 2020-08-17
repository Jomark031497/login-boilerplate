const User = require('../models/UserModel');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const { registerValidation, loginValidation } = require('../validations/userValidation');

//REGISTER USER
const registerUser = async( req, res ) => {
    const { username, password } = req.body;
    try{
        //validate
        const { error } = registerValidation(req.body);
        if( error ) return res.status(400).json({ msg: error.details[0].message });

        const userExists = await User.findOne({ username });
        if (userExists) return res.status(400).json({ msg: 'Username already taken' });

        // hash the password
        const salt = await bcrypt.genSalt(10);
        const hashPassword = await bcrypt.hash(password, salt);

        const newUser = new User({
            username,
            password: hashPassword,
        });

        await newUser.save();
        res.json({ msg: 'User registered successfully'});

        
    }catch(err){
        res.status(400).json({msg: err})
    }
};

const loginUser = async(req, res) => {
    const { username, password } = req.body;
    try{
         //validate
         const { error } = loginValidation(req.body);
         if( error ) return res.status(400).json({ msg: error.details[0].message });

        const user = await User.findOne({ username });
        if(!user) return res.status(400).json({ msg: 'Username not found'});

        const validPassword = await bcrypt.compare(password, user.password);
        if (!validPassword) return res.status(400).json({ msg: 'Invalid Password'});

        const token = jwt.sign({
            id: user._id,
        }, process.env.JWT_TOKEN);

        res.json({ token, user: {
            id: user._id,
            username: user.username
        }})

    }catch(err){
        res.status(400).json({msg: err})
    }
}

module.exports = {
    registerUser,
    loginUser,
}