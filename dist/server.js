"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const http_1 = __importDefault(require("http"));
const app_1 = require("./app");
const db_1 = require("./database/db");
const server = http_1.default.createServer(app_1.app);
(async function startServer() {
    server.listen(8000, async () => {
        console.log(`now running on port 8000`);
        await db_1.database.connectDatabase();
    });
})();
//# sourceMappingURL=server.js.map