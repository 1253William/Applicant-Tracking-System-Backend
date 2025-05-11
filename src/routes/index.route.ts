import express from "express";
import authRouter from "./auth.route";
// import refreshRouter from "./refreshToken.route";
import candidateRouter from "./candidate.route";
import jobRouter from "./jobs.route";
import metricsRouter from "./metrics.route";

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

//jobs routes
rootRouter.use(jobRouter)

//metrics routes
rootRouter.use(metricsRouter)




export default rootRouter;