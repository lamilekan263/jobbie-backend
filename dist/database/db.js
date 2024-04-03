"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.database = void 0;
require('dotenv').config();
const mongoose_1 = __importDefault(require("mongoose"));
class Database {
    dbUrl = process.env.DB_URL || '';
    async connectDatabase() {
        try {
            const connectDb = await mongoose_1.default.connect(this.dbUrl);
            console.log(`database connected successfull ${connectDb.connection.host}`);
        }
        catch (error) {
            console.log('Error connecting to the database');
            console.log(error);
            setTimeout(this.connectDatabase, 5000);
        }
    }
}
exports.database = new Database();
//# sourceMappingURL=db.js.map