"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Users = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
const UserSchema = new mongoose_1.default.Schema({
    name: {
        type: String,
        required: [true, 'Invalid name'],
    },
    email: {
        type: String,
        required: [true, 'Invalid email address'],
        unique: true,
        validate: {
            validator: (val) => {
                return emailRegex.test(val);
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
UserSchema.pre('save', async function (next) {
    if (!this.isModified('password')) {
        next();
    }
    this.password = await bcryptjs_1.default.hash(this.password, 10);
    next();
});
UserSchema.methods.comparepassword = async function (enteredPassword) {
    return await bcryptjs_1.default.compare(enteredPassword, this.password);
};
exports.Users = mongoose_1.default.model('User', UserSchema);
//# sourceMappingURL=user.model.js.map