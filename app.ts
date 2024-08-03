import { Request, Response, Express } from "express";
import express from 'express'
import { customErrorHandler, DefaultErrorHandler } from "./middleware/errorHandeller.js";
import env from "dotenv";
import dataSource from "./db/dbConfig.js";
import shopRoute from "./routes/shop.js"
import hotlineRoute from "./routes/hotline.js"
import productRoute from "./routes/product.js"
import categoryRoute from "./routes/category.js"

const app = express();
env.config();
const PORT = process.env.PORT || 5000;
app.use(express.json())

app.use("/shops", shopRoute);
app.use("/products",productRoute)
app.use("/hotlines", hotlineRoute);
app.use("/category", categoryRoute)

app.use(customErrorHandler)
app.use(DefaultErrorHandler)

dataSource.initialize().then(() => {
    console.log("connected to DB");
}).catch(err => {
    console.error('Failed to connect to DB: ' + err);
});

let Server = app.listen(PORT, () => {

    console.log(`Server is running on host :http://localhost:${PORT} `);
});

export default app;