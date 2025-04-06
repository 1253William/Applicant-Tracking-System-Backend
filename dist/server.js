"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const helmet_1 = __importDefault(require("helmet"));
const dotenv_1 = __importDefault(require("dotenv"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const index_route_1 = __importDefault(require("./routes/index.route"));
const db_1 = __importDefault(require("./config/db"));
const morgan_1 = __importDefault(require("morgan"));
// Connect to MongoDB
(0, db_1.default)();
const app = (0, express_1.default)();
dotenv_1.default.config();
//Middlewares
app.use(express_1.default.json());
app.use((0, cors_1.default)());
app.use((0, helmet_1.default)());
app.use((0, cookie_parser_1.default)());
app.use((0, morgan_1.default)("dev"));
//CORD 
app.use((0, cors_1.default)({
    origin: "http://localhost:5173",
    credentials: true,
}));
// Routes
// app.use('/api/v1/candidates', candidateRoutes);
// app.use('/api/v1/jobs', jobRoutes);
app.use("/api/v1", index_route_1.default);
// app.use(rootRouter);
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
