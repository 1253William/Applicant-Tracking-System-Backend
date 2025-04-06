"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const auth_route_1 = __importDefault(require("./auth.route"));
// import refreshRouter from "./refreshToken.route";
// import userRouter from "./user.route";
// import productRoutes from "./routes/products";
const rootRouter = express_1.default.Router();
//Health Check
rootRouter.get("/health", (req, res) => {
    res.send("API Health Check is running...");
    console.log("API Health Check is running...");
});
//authentication routes
rootRouter.use('/auth', auth_route_1.default);
//refresh token routes
// rootRouter.use(refreshRouter);
//user routes
// rootRouter.use(userRouter);
exports.default = rootRouter;
