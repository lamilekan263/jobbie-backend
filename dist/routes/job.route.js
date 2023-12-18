"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.jobRouter = void 0;
const express_1 = require("express");
const controllers_1 = require("../controllers");
const middleware_1 = require("../middleware");
const dto_1 = require("../dto");
class JobRoute {
    constructor() {
        this.path = '/jobs';
        this.router = (0, express_1.Router)();
        this.jobController = new controllers_1.JobController();
        this.initializeRoutes();
    }
    initializeRoutes() {
        this.router.use(middleware_1.authenticate);
        this.router.post(`${this.path}/`, (0, middleware_1.validationMiddleware)(dto_1.CreateJobdto, 'body'), this.jobController.addJob);
        this.router.get(`${this.path}/`, this.jobController.getAllJob);
        this.router.get(`${this.path}/:id`, this.jobController.getSingleJob);
        this.router.patch(`${this.path}/:id`, (0, middleware_1.validationMiddleware)(dto_1.CreateJobdto, 'body'), this.jobController.editJob);
        this.router.delete(`${this.path}/:id`, this.jobController.deleteJob);
    }
    getRouter() {
        return this.router;
    }
}
const jobRoute = new JobRoute();
exports.jobRouter = jobRoute.getRouter();
//# sourceMappingURL=job.route.js.map