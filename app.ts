import express, {Express} from "express";
import router from "./src/index";
import dotenv from "dotenv";

dotenv.config()

const app: Express = express();
const port = 3000

app.use(express.json());
app.use("/", router)
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);

})
