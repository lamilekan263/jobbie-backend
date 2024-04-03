import http from 'http';
import { app } from './app';
import { database } from './database/db';


const server = http.createServer(app);
(async function startServer() {
    server.listen(8000, async () => {
        console.log(`now running on port 8000`)
        await database.connectDatabase()
    })
})()
