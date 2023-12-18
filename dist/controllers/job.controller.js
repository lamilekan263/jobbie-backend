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
exports.JobController = void 0;
const services_1 = require("../services");
class JobController {
    addJob(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
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
                const job = yield services_1.jobService.addJob(jobDetails);
                return res.status(201).json({
                    success: true,
                    job
                });
            }
            catch (error) {
                next(error);
            }
        });
    }
    editJob(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const user = req.user;
                const { id } = req.params;
                const jobBody = req.body;
                const job = yield services_1.jobService.editJob(jobBody, id, user);
                return res.status(200).json({
                    success: true,
                    job
                });
            }
            catch (error) {
                next(error);
            }
        });
    }
    deleteJob(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const user = req.user;
                const { id } = req.params;
                const { message } = yield services_1.jobService.deleteJob(user, id);
                return res.status(200).json({
                    success: true,
                    message
                });
            }
            catch (error) {
                next(error);
            }
        });
    }
    getAllJob(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const user = req.user;
                const job = yield services_1.jobService.getAllJobs(user);
                return res.status(200).json({
                    success: true,
                    job
                });
            }
            catch (error) {
                next(error);
            }
        });
    }
    getSingleJob(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const user = req.user;
                const { id } = req.params;
                const job = yield services_1.jobService.getJob(user, id);
                return res.status(200).json({
                    success: true,
                    job
                });
            }
            catch (error) {
                next(error);
            }
        });
    }
}
exports.JobController = JobController;
//# sourceMappingURL=job.controller.js.map