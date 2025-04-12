import mongoose, { Schema, Document, Model} from "mongoose";

export type applicationJourney = Document & {
    candidate: mongoose.Types.ObjectId;
    jobRole: mongoose.Types.ObjectId;
    currentStage: string;
    status: 'in-pipeline' | 'hired' | 'rejected';
    isActive: boolean;
} 

const applicationJourneySchema: Schema<applicationJourney> = new Schema({
    candidate: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true 
    },
    jobRole: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'JobRole',
        required: true
    },
    currentStage: {
        type: String,
        required: true
    }, // e.g., 'Interview'
    status: {
        type: String,
        enum: ['in-pipeline', 'hired', 'rejected'],
        default: 'in-pipeline'
    },
  isActive: { type: Boolean, default: true }, // toggle status
},
    {
        timestamps: true
    }
)

const applicationJourneyModel: Model<applicationJourney> = mongoose.model<applicationJourney>('applicationJourney', applicationJourneySchema);

export default applicationJourneyModel;