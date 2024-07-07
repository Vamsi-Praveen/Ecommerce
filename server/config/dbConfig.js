import mongoose from "mongoose";
import logger from "../utils/logger";

const connectToDb = async () => {
    const mongo_uri = process.env.MONGO_DB_URI;

    try {
        const conn = await mongoose.connect(mongo_uri);
        logger.info(`DB Connected: ${conn.connection.host}`);
    } catch (error) {
        logger.error(`Error while connecting to DB : ${error.message}`)
    }
}

export default connectToDb;