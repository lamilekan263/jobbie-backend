import { IsDate, IsIn, IsOptional, IsString } from "class-validator"

export class CreateJobdto {
    @IsString()
    @IsOptional()
    public company: string

    @IsString()
    @IsOptional()
    role: string

    @IsString()
    @IsOptional()
    description: string

    // @IsDate({ message: 'Applied date must be a valid date' })
    @IsOptional()
    appliedDate: Date | null

    @IsString()
    @IsOptional()
    // @IsIn(['interviewing', 'applied', 'hired', 'rejected', 'closed'])
    status: string

    @IsString()
    @IsOptional()
    userId: any
}