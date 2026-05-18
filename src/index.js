import "dotenv/config";
import {ConnectDb} from "./db/index.js"
import app from "./app.js";


const PORT = process.env.PORT || 3000;

ConnectDb();

app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
});