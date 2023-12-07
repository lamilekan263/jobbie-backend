import { NextFunction, Request, Response } from "express";
import { CreateJobdto, CreateUserDto } from "../dto";
import { jobService } from "../services";
import { IUser } from "../interface";



export class JobController {

    public async addJob(req: Request, res: Response, next: NextFunction) {
        try {

            const userData: IUser = req.user

            const jobDetails = {
               company: '',
                userId: userData._id,
                role: '',
                description: '',
                appliedDate: null,
                status: "applied",
            }

            const job = await jobService.addJob(jobDetails)
            return res.status(201).json({
                success: true,
                job
            })
        } catch (error) {
            next(error)
        }
    }

    public async editJob(req: Request, res: Response, next: NextFunction) {
        try {
            const user = req.user;
            const { id } = req.params;
            const jobBody = req.body;
            const job = await jobService.editJob(jobBody, id, user);
            return res.status(200).json({
                success: true,
                job
            })
        } catch (error) {
            next(error)
        }
    }

    public async deleteJob(req: Request, res: Response, next: NextFunction) {
        try {
            const user: IUser = req.user;
            const { id } = req.params;

            const { message } = await jobService.deleteJob(user, id)
            return res.status(200).json({
                success: true,
                message
            })



        } catch (error) {
            next(error)
        }
    }

    public async getAllJob(req: Request, res: Response, next: NextFunction) {
        try {
            const user = req.user;

            const job = await jobService.getAllJobs(user)

            return res.status(200).json({
                success: true,
                job
            })

        } catch (error) {
            next(error)

        }
    }

    public async getSingleJob(req: Request, res: Response, next: NextFunction) {
        try {
            const user = req.user;
            const { id } = req.params

            const job = await jobService.getJob(user, id)
            return res.status(200).json({
                success: true,
                job
            })

        } catch (error) {
            next(error)
        }
    }
}



