"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.JobController = void 0;
const services_1 = require("../services");
class JobController {
    async addJob(req, res, next) {
        try {
            const userData = req.user;
            const jobDetails = {
                company: '',
                userId: userData._id,
                role: '',
                description: '',
                appliedDate: null,
                status: "applied",
            };
            const job = await services_1.jobService.addJob(jobDetails);
            return res.status(201).json({
                success: true,
                job
            });
        }
        catch (error) {
            next(error);
        }
    }
    async editJob(req, res, next) {
        try {
            const user = req.user;
            const { id } = req.params;
            const jobBody = req.body;
            const job = await services_1.jobService.editJob(jobBody, id, user);
            return res.status(200).json({
                success: true,
                job
            });
        }
        catch (error) {
            next(error);
        }
    }
    async deleteJob(req, res, next) {
        try {
            const user = req.user;
            const { id } = req.params;
            const { message } = await services_1.jobService.deleteJob(user, id);
            return res.status(200).json({
                success: true,
                message
            });
        }
        catch (error) {
            next(error);
        }
    }
    async getAllJob(req, res, next) {
        try {
            const user = req.user;
            const job = await services_1.jobService.getAllJobs(user);
            return res.status(200).json({
                success: true,
                job
            });
        }
        catch (error) {
            next(error);
        }
    }
    async getSingleJob(req, res, next) {
        try {
            const user = req.user;
            const { id } = req.params;
            const job = await services_1.jobService.getJob(user, id);
            return res.status(200).json({
                success: true,
                job
            });
        }
        catch (error) {
            next(error);
        }
    }
}
exports.JobController = JobController;
//# sourceMappingURL=job.controller.js.map