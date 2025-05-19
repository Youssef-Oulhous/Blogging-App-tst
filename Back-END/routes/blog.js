const express = require('express');
const blogRouter = express.Router();
const authentication = require('../middleware/authentication');
const {CreateBlog ,GetAllPosts,DeletePost,deleteAll,getPostById} = require('../controllers/userControllers');


blogRouter.post('/',authentication,CreateBlog);
blogRouter.get('/',GetAllPosts);
blogRouter.get('/:id',getPostById)
blogRouter.delete('/:id',DeletePost);  
blogRouter.delete('/removePosts',deleteAll);


module.exports = blogRouter ;