import express from "express";
import cors from "cors";
import { connectDB } from "./config/connectDB.js";
import { route } from "./routes/main.route.js";
import categoryRoute from "./routes/category.routes.js";
import cartRoute from "./routes/cart.routes.js";

connectDB();

const app = express();

app.use(express.json())
app.use(cors())



const PORT = 8080;

app.use("/api",route)
app.use("/api/categories", categoryRoute);
app.use("/api/cart",cartRoute)


app.listen(PORT, ()=>{
    console.log(`server is running at http://localhost:${PORT}`)
});