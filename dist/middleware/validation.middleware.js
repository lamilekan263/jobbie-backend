"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validationMiddleware = void 0;
const class_transformer_1 = require("class-transformer");
const class_validator_1 = require("class-validator");
const utils_1 = require("../utils");
const validationMiddleware = (type, value = 'body') => {
    return async (req, res, next) => {
        const validateError = await (0, class_validator_1.validate)((0, class_transformer_1.plainToClass)(type, req[value]));
        if (validateError.length > 0) {
            const message = validateError.map(error => error.constraints ? Object.values(error.constraints) : []).join(', ');
            next(new utils_1.ErrorHandler(message, 400));
        }
        {
            next();
        }
    };
};
exports.validationMiddleware = validationMiddleware;
//# sourceMappingURL=validation.middleware.js.map