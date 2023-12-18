"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.jobService = void 0;
const model_1 = require("../model");
const utils_1 = require("../utils");
class JobService {
    addJob(details) {
        return __awaiter(this, void 0, void 0, function* () {
            const job = yield model_1.Job.create(details);
            return job;
        });
    }
    getJob(user, id) {
        return __awaiter(this, void 0, void 0, function* () {
            const job = yield model_1.Job.findOne({ _id: id, userId: user._id });
            if (!job)
                throw new utils_1.ErrorHandler('Job not found', 404);
            return job;
        });
    }
    getAllJobs(user) {
        return __awaiter(this, void 0, void 0, function* () {
            const job = yield model_1.Job.find({ userId: user._id });
            return job;
        });
    }
    deleteJob(user, id) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.getJob(user, id);
            const result = yield model_1.Job.deleteOne({ _id: id, userId: user._id });
            if (result.deletedCount === 0)
                throw new utils_1.ErrorHandler('Error deleteing job', 500);
            return { message: 'Job deleted successfully' };
        });
    }
    editJob(body, id, user) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.getJob(user, id);
            const updateDetails = Object.assign({}, body);
            const result = yield model_1.Job.updateOne({ _id: id, userId: user._id }, { $set: updateDetails });
            if (result.modifiedCount === 0) {
                throw new utils_1.ErrorHandler('Job not update', 400);
            }
            const updateJob = yield model_1.Job.findOne({ _id: id, userId: user._id });
            return updateJob;
        });
    }
}
exports.jobService = new JobService();
//# sourceMappingURL=job.service.js.map