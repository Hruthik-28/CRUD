const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const JWT = require('jsonwebtoken');

const userSchema = mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Name is required'],
        minLength: [5, 'name must be atleast 5 characters'],
        maxLength: [25, 'name must less than 50 characters'],
        trim: true,
    },
    email: {
        type: String,
        required: [true, 'email is required'],
        unique: true,
        lowercase: true
    },
    password: {
        type: String,
        minLength: [8,'password must be atleast 8 characters'],
        required: true
    }
}, {
    timestamps: true
});

userSchema.pre("save", async function(next) {
    if (!this.isModified('password')) {
        return next();
    }
    this.password = await bcrypt.hash(this.password, 10)
    return next();
})

userSchema.methods = {
    jwtToken() {
        return JWT.sign(
            {id: this.id, email: this.email},
            process.env.SECRET,
            {expiresIn: '24h'}
        )
    }
}


const userModel = mongoose.model('user', userSchema);
module.exports = userModel;