"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Job = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const JobSchema = new mongoose_1.default.Schema({
    company: {
        type: String
    },
    userId: {
        type: mongoose_1.default.Schema.ObjectId,
        ref: 'User',
        required: true
    },
    role: {
        type: String
    },
    description: {
        type: String
    },
    appliedDate: {
        type: Date
    },
    status: {
        type: String,
        enum: ['interviewing', 'applied', 'hired', 'rejected', 'closed'],
        default: 'applied'
    }
});
exports.Job = mongoose_1.default.model('Job', JobSchema);
//# sourceMappingURL=job.model.js.map