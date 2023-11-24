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
dotenv_1.default.config();
const setupServer = () => {
    const app = (0, express_1.default)();
    app.use(express_1.default.json());
    //DB接続
    try {
        mongoose_1.default.connect(process.env.MONGODB_URL || 'null');
        console.log('DBと接続中....');
    }
    catch (error) {
        console.log(error);
    }
    app.use('/api/v1', index_1.default);
    return app;
};
exports.setupServer = setupServer;
