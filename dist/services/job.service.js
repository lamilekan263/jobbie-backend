"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.jobService = void 0;
const model_1 = require("../model");
const utils_1 = require("../utils");
class JobService {
    async addJob(details) {
        const job = await model_1.Job.create(details);
        return job;
    }
    async getJob(user, id) {
        const job = await model_1.Job.findOne({ _id: id, userId: user._id });
        if (!job)
            throw new utils_1.ErrorHandler('Job not found', 404);
        return job;
    }
    async getAllJobs(user) {
        const job = await model_1.Job.find({ userId: user._id });
        return job;
    }
    async deleteJob(user, id) {
        await this.getJob(user, id);
        const result = await model_1.Job.deleteOne({ _id: id, userId: user._id });
        if (result.deletedCount === 0)
            throw new utils_1.ErrorHandler('Error deleteing job', 500);
        return { message: 'Job deleted successfully' };
    }
    async editJob(body, id, user) {
        await this.getJob(user, id);
        const updateDetails = { ...body };
        const result = await model_1.Job.updateOne({ _id: id, userId: user._id }, { $set: updateDetails });
        if (result.modifiedCount === 0) {
            throw new utils_1.ErrorHandler('Job not update', 400);
        }
        const updateJob = await model_1.Job.findOne({ _id: id, userId: user._id });
        return updateJob;
    }
}
exports.jobService = new JobService();
//# sourceMappingURL=job.service.js.map