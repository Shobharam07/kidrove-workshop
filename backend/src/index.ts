import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import mongoose from "mongoose";
import { enquiryRouter } from "./routes/enquiry.js";

dotenv.config();

const app = express();
const port = Number(process.env.PORT ?? 7000);
const clientOrigin = process.env.CLIENT_ORIGIN ?? "http://localhost:5173";
const mongoUri = process.env.MONGODB_URI;

app.use(
  cors({
    origin: clientOrigin,
    methods: ["GET", "POST"],
    allowedHeaders: ["Content-Type"]
  })
);
app.use(express.json());

app.get("/health", (_request, response) => {
  response.json({ ok: true });
});

app.use("/api/enquiry", enquiryRouter);

app.use((error: Error, _request: express.Request, response: express.Response, _next: express.NextFunction) => {
  console.error(error);
  response.status(500).json({
    success: false,
    message: "Something went wrong. Please try again later."
  });
});

async function startServer() {
  if (mongoUri) {
    await mongoose.connect(mongoUri);
    console.log("Connected to MongoDB.");
  } else {
    console.log("MONGODB_URI not configured. Enquiries will be logged only.");
  }

  app.listen(port, () => {
    console.log(`Kidrove enquiry API running at http://localhost:${port}`);
  });
}

startServer().catch((error) => {
  console.error("Failed to start server:", error);
  process.exit(1);
});
