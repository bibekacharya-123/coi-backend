const mongoose = require("mongoose");
const BlogPost = require("../models/BlogPost");
const fs = require("fs");

// Create Blog
exports.createBlog = async (req, res) => {
  try {
    const { title, summary, content, author, readTime } = req.body;
    const featuredImage = req.file ? req.file.path : "";
    console.log("Author from request body:", req.body.author);

   

    const newBlogPost = new BlogPost({
      title,
      summary,
      content,
      featuredImage,
      author,
      readTime,
    });

    await newBlogPost.save();
    res.status(201).json(newBlogPost);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update Blog
exports.updateBlog = async (req, res) => {
  try {
    const { title, summary, content, author, readTime } = req.body;
    const blog = await BlogPost.findById(req.params.id);

    if (!blog) return res.status(404).json({ message: "Blog not found" });

    // Delete old image if new image is uploaded
    if (req.file && blog.featuredImage) {
      fs.unlinkSync(blog.featuredImage);
    }



    const updatedData = {
      title,
      summary,
      content,
      author,
      readTime,
    };

    if (req.file) updatedData.featuredImage = req.file.path;

    const updatedBlog = await BlogPost.findByIdAndUpdate(
      req.params.id,
      updatedData,
      { new: true }
    );
    res.json(updatedBlog);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Delete Blog
exports.deleteBlog = async (req, res) => {
  try {
    const blog = await BlogPost.findById(req.params.id);

    if (!blog) return res.status(404).json({ message: "Blog not found" });

    // Delete associated image file
    if (blog.featuredImage) fs.unlinkSync(blog.featuredImage);

    await BlogPost.findByIdAndDelete(req.params.id);

    res.json({ message: "Blog deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


//get blog 
exports.getBlog = async (req, res) => {
  try {
    const blog = await BlogPost.findById(req.params.id);
    if (!blog) return res.status(404).json({ message: "Blog not found" });
    res.json(blog);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

//get all blogs
exports.getAllBlogs = async (req, res) => {
  try {
    const blogs = await BlogPost.find().sort({ createdAt: -1 });
    res.json(blogs);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getBlogBySlug = async (req, res) => {
  try {
    const {slug}=req.params;
    if (!slug) {
      return res.status(400).json({ message: "Slug is required" });
    }
    const blog = await BlogPost.findOne({ slug });
    if (!blog) return res.status(404).json({ message: "Blog not found" });
    res.json(blog);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}
