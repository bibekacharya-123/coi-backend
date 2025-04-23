const express = require('express');
const upload = require('../config/multer');
const blogController = require('../controllers/blogController');

const router = express.Router();

router.post('/create', upload.single('featuredImage'), (req, res, next) => {
  blogController.createBlog(req, res).catch(next);
});

router.get('/', blogController.getAllBlogs);
router.get('/:id', blogController.getBlog);

router.get('/slug/:slug', blogController.getBlogBySlug);

router.put('/:id', upload.single('featuredImage'), (req, res, next) => {
  blogController.updateBlog(req, res).catch(next);
});

router.delete('/:id', blogController.deleteBlog);

module.exports = router;
