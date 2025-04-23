const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const path = require("path");
const morgan = require("morgan");
const helmet = require("helmet");
const compression = require("compression");
const connectDB = require("./config/db"); // MongoDB connection

// Load environment variables
dotenv.config();

// Validate required environment variables
if (!process.env.MONGO_URI) {
  console.error("❌ MONGO_URI is missing in the .env file");
  process.exit(1);
}

// Validate JWT environment variables
if (!process.env.JWT_SECRET) {
  console.error("❌ JWT_SECRET is missing in the .env file");
  process.exit(1);
}

const app = express();

// Connect to MongoDB
connectDB();

// Middleware
app.use(express.json()); // Parse JSON requests
app.use(helmet()); // Secure HTTP headers
app.use(compression()); // Compress response bodies
app.use(cors({})); // Enable CORS
app.use(morgan("dev")); // Logging middleware

// Serve static files for uploaded images
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// Routes

const inquiryRoutes = require("./routes/inquiryRoutes");
const faqRoutes = require("./routes/faqRoutes");
const blogRoutes = require("./routes/blogRoutes");
const donationRoutes = require("./routes/donationRoutes");
const membershipRoutes = require("./routes/membershipRoutes");
const ambassadorRoutes = require("./routes/ambassadorRoutes");
const authRoutes = require("./routes/authRoutes");

app.use("/api/inquiries", inquiryRoutes);
app.use("/api/faqs", faqRoutes);
app.use("/api/blogs", blogRoutes);
app.use("/api/donations", donationRoutes);
app.use("/api/memberships", membershipRoutes);
app.use("/api/ambassadors", ambassadorRoutes);
app.use("/api/auth", authRoutes);

// Health check endpoint
app.get("/health", (req, res) => {
  res.status(200).json({ status: "ok", message: "Server is running" });
});

// 404 Error Handling for Undefined Routes
app.use((req, res) => {
  res.status(404).json({ success: false, message: "Route not found" });
});

// Global Error Handling Middleware
app.use((err, req, res, next) => {
  console.error(`❌ Error: ${err.message}`);
  res
    .status(err.statusCode || 500)
    .json({ success: false, message: err.message || "Server Error" });
});

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
