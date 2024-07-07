import mongoose from "mongoose";
import bcrypt from "bcrypt"

const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    phoneNumber: {
        type: String,
        required: true,
        maxLength: 10
    },
    cartItems: {
        type: [{}],
        default: []
    },
    addresses: {
        type: [{}],
        default: []
    },
    wishList: {
        type: [{}],
        default: []
    }
}, { collection: 'users', timestamps: true })

//encrypting password
userSchema.pre('save', async () => {
    if (!this.isModified("password")) {
        next();
    }
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
})

//comparing passwords
userSchema.methods.checkPassword = async function (password) {
    return bcrypt.compare(password, this.password);
}

const User = mongoose.model('User', userSchema);

export default User;
