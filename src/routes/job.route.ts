
import { Router } from "express"
import { JobController } from "../controllers"
import { authenticate, validationMiddleware } from "../middleware"
import { CreateJobdto } from "../dto"

class JobRoute {

    private path = '/jobs'
    private router = Router()
    private jobController = new JobController()


    constructor() {
        this.initializeRoutes()
    }

    private initializeRoutes() {
        this.router.use(authenticate)
        this.router.post(`${this.path}/`, validationMiddleware(CreateJobdto, 'body'), this.jobController.addJob)
        this.router.get(`${this.path}/`, this.jobController.getAllJob)
        this.router.get(`${this.path}/:id`, this.jobController.getSingleJob)
        this.router.patch(`${this.path}/:id`, validationMiddleware(CreateJobdto, 'body'), this.jobController.editJob)
        this.router.delete(`${this.path}/:id`, this.jobController.deleteJob)

    }
    getRouter() {
        return this.router
    }
}

const jobRoute = new JobRoute();

export const jobRouter = jobRoute.getRouter()