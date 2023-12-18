"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorMiddleware = void 0;
const errorMiddleware = (err, req, res, next) => {
    err.statusCode = err.statusCode || 500;
    err.message = err.message || 'Internal Server Error';
    return res.status(err.statusCode).json({
        success: false,
        message: err.message,
        errPath: err.path
    });
};
exports.errorMiddleware = errorMiddleware;
//# sourceMappingURL=error.js.map