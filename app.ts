import express, {Express} from "express";
import router from "./src/index";
import dotenv from "dotenv";
import path from "path"

dotenv.config()

const app: Express = express();
const port: number = parseInt(process.env.PORT as string) || 3001
app.use(express.urlencoded({extended: false}))

app.use(express.json());
app.use(express.static(path.join(__dirname, "../public")))
app.use("/", router)
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);

})
