import express, { json, request, response } from "express";
import { PORT, mongoDBURL } from "./config.js";
import mongoose from "mongoose";
import booksRoute from "./routes/booksRoute.js";
import cors from "cors";
const app = express();

// Middleware for parsing request body
app.use(express.json());

//  Middleware for handling CORS Policy
// Option 1: allow all origins with default of cors(*)
app.use(cors());

// Option 2: allow custom origins

// app.use(
//   cors({
//     origin: "http://localhost:3000/",
//     methods: ["GET", "POST", "PUT", "DELETE"],
//     allowedHeaders: ["content-type"],
//   })
// );

app.get("/", (request, response) => {
  console.log(request);
  return response.status(234).send("Testing");
});

app.use("/books", booksRoute);

mongoose
  .connect(mongoDBURL)
  .then(() => {
    console.log("App Connected to database");
    app.listen(PORT, () => {
      console.log(`App is listening to port : ${PORT}`);
    });
  })
  .catch((error) => {
    console.log(error);
  });
