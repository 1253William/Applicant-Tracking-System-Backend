import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import rootRouter from './routes/index.route';
import connectDB from './config/db';
import morgan from 'morgan';
import swaggerUi from "swagger-ui-express";
import swaggerSpec from "./config/swagger";

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
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

//CORS
// app.use(
//   cors({
//     origin: ["http://localhost:5173", "http://localhost:5174", "exp://192.168.43.167:8081"],
//     credentials: true, 
//   })
// );

app.use(
  cors({
    origin: (_origin, callback) => callback(null, true),
    credentials: true,
  })
);

// Routes
// app.use('/api/v1/candidates', candidateRoutes);
// app.use('/api/v1/jobs', jobRoutes);
app.use("/api/v1", rootRouter);

// app.use(rootRouter);

// const PORT = process.env.PORT || 5000;
const PORT = parseInt(process.env.PORT as string, 10) || 5000;

// app.listen(PORT, () => {
//   console.log(`Server is running on port ${PORT}`);
// });

app.listen(PORT, "0.0.0.0", () => {
  console.log(`Server is running at http://0.0.0.0:${PORT}`);
});