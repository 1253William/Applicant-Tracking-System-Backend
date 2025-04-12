import mongoose, { Schema, Document, Model } from "mongoose";

export type Job = Document & {
    title: string;
    department: string;
    status: 'opened' | 'closed';
    type: 'full-time' | 'part-time';
    applicationStages:  [{ type: String }], // e.g., ['Applied', 'Phone Screen', 'Interview', 'Offer', 'Hired']
}

const JobRoleSchema: Schema<Job> = new Schema({
    title: {
        type: String,
        required: true
    },
    department: {
        type: String,
        required: true
    },
    status: {
        type: String,
        enum: ['opened', 'closed'],
        default: 'opened'
    },
    type: {
        type: String,
        enum: ['full-time', 'part-time'],
        required: true
    },
    applicationStages: [{ type: String }]
},
{
    timestamps: true
}
)

const JobModel: Model<Job> = mongoose.model<Job>('JobRole', JobRoleSchema);

export default JobModel;