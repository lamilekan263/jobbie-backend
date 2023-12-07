import { CreateJobdto } from "../dto";
import { IUser } from "../interface";
import { Job } from "../model";
import { ErrorHandler } from "../utils";



class JobService {

    public async addJob(details: CreateJobdto) {
        const job = await Job.create(details);
        return job
    }

    public async getJob(user: IUser, id: string) {
        const job = await Job.findOne({ _id: id, userId: user._id });
        if (!job) throw new ErrorHandler('Job not found', 404)
        return job
    }

    public async getAllJobs(user: IUser) {
        const job = await Job.find({ userId: user._id });
        return job
    }


    public async deleteJob(user: IUser, id: string) {
        await this.getJob(user, id)
        const result = await Job.deleteOne({ _id: id, userId: user._id })
        if (result.deletedCount === 0) throw new ErrorHandler('Error deleteing job', 500);

        return { message: 'Job deleted successfully' }
    }


    public async editJob(body: CreateJobdto, id: string, user: IUser) {
        await this.getJob(user, id)

        const updateDetails = { ...body };

        const result = await Job.updateOne({ _id: id, userId: user._id }, { $set: updateDetails });

        if (result.modifiedCount === 0) {
            throw new ErrorHandler('Job not update', 400)
        }

        const updateJob = await Job.findOne({ _id: id, userId: user._id });
        return updateJob

    }
}


export const jobService = new JobService();

