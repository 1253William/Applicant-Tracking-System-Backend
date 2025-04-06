"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
async function connectDB() {
    try {
        if (!process.env.MONGO_URI) {
            throw new Error('No MongoDB URI provided');
        }
        await mongoose_1.default.connect(process.env.MONGO_URI);
        console.log('Connected to MongoDB');
    }
    catch (error) {
        console.error(`Error connecting to MongoDB: ${error}`);
        process.exit(1);
    }
}
exports.default = connectDB;
