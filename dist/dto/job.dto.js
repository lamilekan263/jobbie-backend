"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateJobdto = void 0;
const class_validator_1 = require("class-validator");
class CreateJobdto {
    company;
    role;
    description;
    // @IsDate({ message: 'Applied date must be a valid date' })
    appliedDate;
    // @IsIn(['interviewing', 'applied', 'hired', 'rejected', 'closed'])
    status;
    userId;
}
exports.CreateJobdto = CreateJobdto;
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)()
], CreateJobdto.prototype, "company", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)()
], CreateJobdto.prototype, "role", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)()
], CreateJobdto.prototype, "description", void 0);
__decorate([
    (0, class_validator_1.IsOptional)()
], CreateJobdto.prototype, "appliedDate", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)()
    // @IsIn(['interviewing', 'applied', 'hired', 'rejected', 'closed'])
], CreateJobdto.prototype, "status", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)()
], CreateJobdto.prototype, "userId", void 0);
//# sourceMappingURL=job.dto.js.map