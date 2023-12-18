"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.app = void 0;
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const middleware_1 = require("./middleware");
const routes_1 = require("./routes");
exports.app = (0, express_1.default)();
exports.app.use(express_1.default.json({ limit: '5mb' }));
exports.app.use((0, cors_1.default)());
exports.app.get('/', (req, res) => {
    res.send('jobs-api');
});
exports.app.use('/api/v1', routes_1.AuthRouter);
exports.app.use('/api/v1', routes_1.jobRouter);
exports.app.use('/test', (req, res, next) => {
    res.status(200).send('testing');
});
exports.app.use('*', (req, res, next) => {
    const err = new Error(`route ${req.originalUrl} does not exist`);
    err.statusCode = 404;
    next(err);
});
exports.app.use(middleware_1.errorMiddleware);
//# sourceMappingURL=app.js.map