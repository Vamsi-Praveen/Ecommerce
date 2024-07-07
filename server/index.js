import express from "express"
import cors from "cors"
import bodyParser from "body-parser"
import 'dotenv/config'
import cookieParser from "cookie-parser"
import errorHandler, { notFound } from "./middlewares/error.js";
import logger from "./utils/logger.js";
import connectToDb from "./config/dbConfig.js";
import userRouter from "./routes/user.js";

const app = express();

const PORT = process.env.PORT || 5000;

//middlewares
app.use(bodyParser.json());
app.use(cors());
app.use(cookieParser());


//default testing route
app.get('/', (req, res) => {
    return res.status(200).send({ message: 'API is up and running 🚀' });
})

//routes
app.use('/api/v1/user', userRouter)

//error middlwares
app.use(errorHandler);
app.use(notFound);

app.listen(PORT, async () => {
    await connectToDb();
    logger.info(`Server is running on http://localhost:${PORT}`);
})

