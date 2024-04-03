require('dotenv').config();

import mongoose from "mongoose";



class Database {

    private dbUrl = process.env.DB_URL || ''

    async connectDatabase() {
        try {
            const connectDb = await mongoose.connect(this.dbUrl);
            console.log(`database connected successfull ${connectDb.connection.host}`)
        } catch (error) {
            console.log('Error connecting to the database')
            console.log(error)
            setTimeout(this.connectDatabase, 5000)
        }
    }
}


export const database = new Database();

