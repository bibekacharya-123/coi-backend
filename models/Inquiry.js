const mongoose = require("mongoose");

const InquirySchema = new mongoose.Schema(
  {
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true },
    phonenumber: { type: String, required: true },
    message: { type: String, required: true },
    subject: { type: String, required: true },
    inquiry_Type: {
      type: String,
      enum: [
        "General Inquiry",
        "Services Information",
        "Opportunities",
        "Partnership",
        "others",
      ],
      required: true,
    },
    status: {
      type: String,
      enum: ["Pending", "In Progress", "Resolved"],
      default: "Pending",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Inquiry", InquirySchema);
