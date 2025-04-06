import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import rootRouter from './routes/index.route';
import connectDB from './config/db';
import morgan from 'morgan';

// Connect to MongoDB
connectDB();

const app = express();

dotenv.config();

//Middlewares
app.use(express.json());
app.use(cors());
app.use(helmet());
app.use(cookieParser());
app.use(morgan("dev"));

//CORD 
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true, 
  })
);

// Routes
// app.use('/api/v1/candidates', candidateRoutes);
// app.use('/api/v1/jobs', jobRoutes);
app.use("/api/v1", rootRouter);

// app.use(rootRouter);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});