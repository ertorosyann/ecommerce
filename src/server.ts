import  express, {Express, Request, Response}  from "express";
import { PORT } from "./secrets";
import rootRouter from "./routes/rootRotes";
import { PrismaClient } from "@prisma/client";
import { errorMiddlewere } from "./middlewares/errors";
import { SignupSchema } from "./schema/users";

const app = express();
app.use(express.json());

app.use('/api', rootRouter)

export const prismaClient = new PrismaClient({
    log: ['query']
}).$extends({
    result:{
        address:{
            formattedAddress:{
               needs:{
                    lineOne:true,
                    lineTwo:true,
                    city: true,
                    country: true,
                    pincode: true
               },
               compute: (addr: { lineOne: string, lineTwo: string | null, city: string, country: string, pincode: string }) => {
                return `${addr.lineOne}${addr.lineTwo ? `, ${addr.lineTwo}` : ''}, ${addr.city}, ${addr.country}-${addr.pincode}`;
                }
            }
        }
    }
})

app.use(errorMiddlewere)

app.listen(PORT, () => { console.log(`App Working locallhost://${PORT}`)})