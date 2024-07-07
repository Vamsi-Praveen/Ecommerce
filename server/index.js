import express from "express"
import cors from "cors"
import bodyParser from "body-parser"
import 'dotenv/config'
import errorHandler, { notFound } from "./middlewares/error";
import logger from "./utils/logger";
import connectToDb from "./config/dbConfig";

const app = express();

const PORT = process.env.PORT || 5000;

//middlewares
app.use(bodyParser.json());
app.use(cors());

//error middlwares
app.use(errorHandler);
app.use(notFound);

//default testing route
app.get('/', (req, res) => {
    return res.status(200).send({ message: 'API is up and running 🚀' });
})


app.listen(PORT, async () => {
    await connectToDb();
    logger.info(`Server is running on http://localhost:${PORT}`);
})

