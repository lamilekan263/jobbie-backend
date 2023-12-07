import mongoose, { Schema, Document, Model } from 'mongoose'
import bcrypt from 'bcryptjs';



interface IUserDoc extends Document {
    name: string,
    email: string,
    password: string,
    comparepassword: (enteredPassword: string) => Promise<Boolean>
}

const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;

const UserSchema: Schema<IUserDoc> = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Invalid name'],
    },
    email: {
        type: String,
        required: [true, 'Invalid email address'],
        unique: true,
        validate: {
            validator: (val: string) => {
                return emailRegex.test(val)
            },
            message: 'Invalid email address'
        }
    },

    password: {
        type: String,
        required: [true, 'Invalid Password'],
        select: false
    },
});

UserSchema.pre<IUserDoc>('save', async function (next): Promise<void> {
    if (!this.isModified('password')) {
        next()
    }
    this.password = await bcrypt.hash(this.password, 10);
    next()
});


UserSchema.methods.comparepassword = async function (enteredPassword: string) {
    return await bcrypt.compare(enteredPassword, this.password)
}

export const Users: Model<IUserDoc> = mongoose.model('User', UserSchema)