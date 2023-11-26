"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.setupServer = void 0;
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
const dotenv_1 = __importDefault(require("dotenv"));
const index_1 = __importDefault(require("./routes/index"));
const cors_1 = __importDefault(require("cors"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const passport_1 = __importDefault(require("passport"));
const express_session_1 = __importDefault(require("express-session"));
dotenv_1.default.config();
const setupServer = () => {
    const app = (0, express_1.default)();
    app.use((0, cors_1.default)({
        origin: 'http://localhost:5173',
        credentials: true,
    }));
    app.use((0, cookie_parser_1.default)());
    app.use(express_1.default.json());
    app.use(express_1.default.urlencoded({ extended: true }));
    app.use((0, express_session_1.default)({
        secret: 'your-secret-key2',
        resave: false,
        // saveUninitialized: true,
        // rolling: false,
        // cookie: { maxAge: 5000 },
    }));
    app.use(passport_1.default.initialize());
    app.use(passport_1.default.session());
    //DB接続
    try {
        mongoose_1.default.connect(process.env.MONGODB_URL || 'null');
        console.log('DBと接続中....');
    }
    catch (error) {
        console.log(error);
    }
    app.use(express_1.default.static('./dist/dist'));
    app.use('/api/v1', index_1.default);
    return app;
};
exports.setupServer = setupServer;
