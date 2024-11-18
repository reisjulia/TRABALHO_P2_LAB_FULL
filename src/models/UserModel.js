const User = require('../models/UserModel');
const bcrypt = require('bcrypt');

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    }
}, {
    timestamps: true, 
});

UserSchema.pre('save', async function(next) {
    if (!this.isModified('password')) {
        return next();
    }
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
});

UserSchema.methods.matchPassword = async function(enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
};



class UserRepository {
    async getAllUsers(){
        return await User.find()
    }
    async getUserByID(id){
        return await User.findOne(email)
    }
    async createUser(userData){
        const user = new User(userData);
        return await user.save()
    }

    
}

module.exports = new UserRepository();
