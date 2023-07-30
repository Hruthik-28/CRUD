const { register, login } = require('../controllers/controller');
const emailValidator = require('email-validator');
const userModel = require('../model/schema.js');


const registerFieldValidator = async(req, res, next) => {
    const {name, email, password, confirmPassword} = req.body;
    console.log(name, email, password, confirmPassword);

    // for entering nothing
    if(!name || !email || !password || !confirmPassword){
        return res.status(400).json({
            success: false,
            message: "all input field is required"
        })
    }

    // email validation
    const validEmail = emailValidator.validate(email);
    if (!validEmail) {
        return res.status(400).json({
            success: false,
            message: "Please provide a valid email id"
        })
    }

    // for password matching
    if (password !== confirmPassword ) {
        return res.status(400).json({
            succes: false,
            message: "Password and Confirm password doesn't match"
        })
    }
    next();
}

const loginFieldValidator = async(req, res, next) => {
    const {email, password} = req.body;
    console.log(email, password);

    // for entering nothing
    if(!email || !password){
        return res.status(400).json({
            success: false,
            message: "all input field is required"
        })
    }
    next();
}

const updateFieldValidator = async(req, res, next) => {
    const {name, email, password, confirmPassword} = req.body;
    console.log(name, email, password, confirmPassword);

    // for entering nothing
    if(!name || !email || !password || !confirmPassword){
        return res.status(400).json({
            success: false,
            message: "all input field is required"
        })
    }

    // email validation
    const validEmail = emailValidator.validate(email);
    if (!validEmail) {
        return res.status(400).json({
            success: false,
            message: "Please provide a valid email id"
        })
    }

    // for password matching
    if (password !== confirmPassword ) {
        return res.status(400).json({
            succes: false,
            message: "Password and Confirm password doesn't match"
        })
    }
    next();
}

module.exports = {
    registerFieldValidator,
    loginFieldValidator,
    updateFieldValidator
}