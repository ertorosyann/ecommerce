import  express, {Express, Request, Response}  from "express";
import { PORT } from "./secrets";
import rootRouter from "./routes";
import { PrismaClient } from "@prisma/client";
import { errorMiddlewere } from "./middlewares/errors";
import { SignupSchema } from "./schema/users";

const app = express();
app.use(express.json());

app.use('/api', rootRouter)

export const prismaClient = new PrismaClient({
    log: ['query']
})

app.use(errorMiddlewere)

app.listen(PORT, () => { console.log(`App Working locallhost://${PORT}`)})