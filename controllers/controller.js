const userModel = require('../model/schema.js');
const bcrypt = require('bcrypt');
const cookieParser = require('cookie-parser');

const register = async(req, res) => {

    // error handling register
    try {
        const userInfo = userModel(req.body);
        const user = await userInfo.save();

        return res.status(200).json({
            success: true,
            message: "User Registered Successfully",
            data: user
        })
    } catch (error) {
        if (error.code === 11000) {
            return res.status(400).json({
                success: false,
                message: "Account already exists with provided user id"
            })
        }
        return res.status(400).json({
            success: false,
            message: error.message
        })
    }
}

const login = async(req, res) => {
    // error handling login
    try {
        const {email, password} = req.body;
        //finding email in DB
        const user = await userModel.findOne({email}).select('+password');

        if (!user || !(await bcrypt.compare(password, user.password)) ) {
            return res.status(400).json({
                success: false,
                message: "Invalid credentials"
            })
        }
 
        const token = user.jwtToken();
        user.password = undefined;

        cookieOption = {
            maxAge: 24 * 60 * 60 * 1000,//to millisec
            httpOnly: true//cookie cant be accessed from client (js) side
        }

        res.cookie('token', token, cookieOption);
        res.status(200).json({
            success: true,
            message: "User Login successfull",
            data: user
        })


    } catch (error) {
        return res.status(400).json({
            success: false,
            message: error.message
        })
    }



}

const getUser = async(req, res) => {
    const userId = req.user.id;
    // const one = console.log(token);

    try {
        const user = await userModel.findById(userId);
        return res.status(200).json({
            success: true,
            data: user
        })
    } catch (error) {
        return res.status(400).json({
            success: false,
            message: error.message
        })
    }
}

const updateUser = async(req, res) => {
    const userId = req.user.id;
    const updateData = req.body;

    try {
        await bcrypt.hash(updateData.password, 10, async(err, hashedPasswored) => {
            if (err) {
                return res.status(400).json({
                    success: false,
                    message: err.message
                })
            }else{
                updateData.password = hashedPasswored;
                const updatedUser = await userModel.findByIdAndUpdate(userId, updateData);
                return res.status(200).json({
                    success: true,
                    message: "user updated successfully",
                    data: updatedUser
                })
            }
        });
        
    } catch (error) {
        return res.status(400).json({
            success: false,
            message: error.message
        })
    }
}

const logout = async(req, res) => {
    try {
        const cookieOption = {
            expires: new Date(),
            httpOnly: true
        }

        res.cookie("token", null, cookieOption);
        return res.status(200).json({
            success: true,
            message: "Logout successfull"
        })
    } catch (error) {
        return res.status(400).json({
            success: false,
            message: error.message
        })
    }
}

const deleteUser = async(req, res) => {
    try {
        const userId = req.user.id;
        const userInfo = await userModel.findByIdAndDelete(userId);
        return res.status(200).json({
            success: true,
            message: "User Deleted Successfully"
        })
    } catch (error) {
        return res.status(400).json({
            success: true,
            message: error.message
        })
    }
}




module.exports = {
    register,
    login,
    getUser,
    updateUser,
    logout,
    deleteUser
}