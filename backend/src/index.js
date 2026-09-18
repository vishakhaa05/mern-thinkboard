import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";
import cors from "cors"

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({
    path: path.resolve(__dirname, "../.env")
});

console.log("MONGO_URI loaded:", !!process.env.MONGO_URI);

import express from "express";
import notesRoutes from "./routes/notesRoutes.js";
import { connectDb } from "./config/db.js";
import rateLimiter from "./middlewere/ratelimiter.js";

const app = express();

app.use(express.json());
app.use(rateLimiter);
app.use(
    cors({
      origin: (origin, callback) => {
        if (!origin || origin.includes("vercel.app") || origin.includes("localhost")) {
          callback(null, true);
        } else {
          callback(new Error("Not allowed by CORS"));
        }
      },
    })
);
app.use((req,res,next)=>{
    console.log(`Req method is ${req.method} & req url is ${req.url}`);
    next()
})

app.use("/api/notes", notesRoutes);

connectDb();

const PORT = process.env.PORT || 5001;

app.listen(PORT, () => {
    console.log(`Server started on PORT: ${PORT}`);
});