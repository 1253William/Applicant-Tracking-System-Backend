import express from "express";
import authRouter from "./auth.route";
// import refreshRouter from "./refreshToken.route";
import candidateRouter from "./candidate.route";
// import productRoutes from "./routes/products";

const rootRouter = express.Router();

//Health Check
rootRouter.get("/health", (req, res) => {
  res.send("API Health Check is running...");
  console.log("API Health Check is running...");
});

//authentication routes
rootRouter.use('/auth',authRouter);

//candidates routes
rootRouter.use(candidateRouter);




export default rootRouter;