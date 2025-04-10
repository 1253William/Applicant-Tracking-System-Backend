import mongoose, { Schema, Document, Model } from 'mongoose';

export type User = Document & {
    fullName: string;
    email: string;
    password: string;
    role: 'Recruiter' | 'Applicant';
    companyName?: string;
    companyEmail?: string;
    isAccountDeleted?: boolean;
    createdAt?: Date;
    updatedAt?: Date;
}

const UserSchema: Schema<User> = new Schema(
    {
        fullName: {
            type: String,
            required: true,
            trim: true
        },
        email: {
            type: String,
            required: true,
            unique: true,
            trim: true,
            lowercase: true
        },
        password: {
            type: String,
            required: true,
            minlength: [6, 'Password must be at least 6 characters long'],
            select: false, 
        },
        role: {
            type: String,
            enum: ['Recruiter', 'Applicant'],
            default: 'Applicant',
        },
        companyName: {
            type: String,
            trim: true,
        },
        companyEmail: {
            type: String,
            trim: true,
            lowercase: true,
            match: [/.+@.+\..+/, 'Please enter a valid company email address'],
        },
        isAccountDeleted: {
            type: Boolean,
            default: false,
        },
    },
    {
        timestamps: true,
    }

)

const UserModel: Model<User> = mongoose.model<User>('User', UserSchema);

export default UserModel;
