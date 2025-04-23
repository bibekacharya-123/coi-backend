const mongoose = require("mongoose");
const slugify = require("slugify");

const BlogPostSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    slug: { type: String, unique: true },
    summary: { type: String, required: true },
    content: { type: String, required: true },
    featuredImage: { type: String },
    author: { type: String,required: true },
    readTime: { type: Number, required: true },
  },
  { timestamps: true }
);

BlogPostSchema.pre("save", function (next) {
  this.slug = slugify(this.title, { lower: true, strict: true });
  next();
});

module.exports = mongoose.model("BlogPost", BlogPostSchema);
