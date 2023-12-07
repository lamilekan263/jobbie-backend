import mongoose, { Schema, Model, Document } from 'mongoose';

interface IJobDoc extends Document {
    company: string,
    role: string,
    description: string,
    appliedDate: Date,
    status: 'interviewing' | 'applied' | 'hired' | 'rejected' | 'closed',
    userId: any
}


const JobSchema: Schema<IJobDoc> = new mongoose.Schema({
    company: {
        type: String
    },
    userId: {
        type: mongoose.Schema.ObjectId,
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


export const Job: Model<IJobDoc> = mongoose.model('Job', JobSchema) 