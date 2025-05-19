const mongoose = require('mongoose');
const User = require('../models/user');
const Blog = require('../models/blog');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
require('dotenv').config();
const JWT_SECRET = process.env.JWT_SECRET ;



const register = async(req,res) => {
    try{

        const {name , email , password} = req.body ;
        const checkUser = await User.findOne({email});
        if(checkUser) return res.status(400).json({message:'the user is already exist'});

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password , salt);

        

        const user = new User({
            name,
            email,
            password:hashedPassword
        });

        const token = jwt.sign(
            {userId : user._id,name:user.name},
            JWT_SECRET,
            {expiresIn : '7d'}
        );


        await user.save();

        res.status(201).json({message : ' the user registered successfully ',token, userId: user._id})


    } catch (err) {
        res.status(500).json({message : err});
    }
}


const login = async(req,res) => {
    try{

        const {email,password} = req.body ;

        const checkUser = await User.findOne({email});
        if(!checkUser) return res.status(404).json({message: 'the user not found'});

        const isMatch = await bcrypt.compare(password , checkUser.password);
        if(!isMatch) return res.status(400).json({message : 'the password is not correct !'});

        const token = jwt.sign(
            {userId : checkUser._id , name:checkUser.name},
            JWT_SECRET,
            {expiresIn : '7d'}
        );

        res.status(200).json({message : `welcome back ${checkUser.name}`,token, userId : checkUser._id});

    } catch (err){
        res.status(500).json({message : err});
    }
}


const GetUsers = async (req, res) => {
    try {
        const users = await User.find();

        if (users.length === 0) {
            return res.status(404).json({ message: "No users found." });
        }

        res.status(200).json(users);

    } catch (err) {
        res.status(500).json({ message: err.message || "Server error" });
    }
};


const CreateBlog = async(req,res) => {
    try{

        const {title,body,tags} = req.body ;

        if(!title || !body ) return res.status(400).json({message : ' the title and the body are required '});

        const user = await User.findById(req.user.id);

        if(!user) res.status(404).json({message : 'the user not found'});

        const creatBlog = new Blog({
            title,
            body,
            author:user.id,
            tags:tags || [] 

        });

        const savedBlog = await creatBlog.save();

        return res.status(201).json({
            message:'the blog created successfully' ,
            blogPost : savedBlog
        });

    } catch(err){
        res.status(500).json({message : err});
    }
};



const GetAllPosts = async (req,res) => {

    const { tag, search } = req.query;
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;   // this for limit the posts on the page 

    try{
        
        const query = {} ;

        if(tag) {
            query.tags = tag ;          //this for encludes the tags on the posts if they are 
        };
        if(search) {
            query.$or = [                       //this for allow the user to search for posts , it check the tilte or the content have the same ele the user is looking for .

                { title: { $regex: search, $options: 'i' } },
                { content: { $regex: search, $options: 'i' } }


            ]
        };

        const skip = (page - 1) * limit;           // we are doing this little calcul to know how much posts we should skip to not show all the database posts , the pages present the page where the user are 
        const total = await Blog.countDocuments(query);  // this for count all the posts that are on the database that match the certain filter , and if there's no filter it gives the total of all the database posts


        const posts = await Blog.find(query)         //this to search for the posts that match the query filter data , and if !query it shows all posts 
        .populate('author','username')
        .sort({createdAt : -1})
        .skip(skip)
        .limit(parseInt(limit));


        const formattedPosts = posts.map(post => ({          //this is the posts form that the user gonna recive 
            _id : post._id,
            title : post.title,
            excerpt:post.body.split(' ').slice(0,100).join(' ') + '...',
            author : post.author.username,
            tags:post.tags,
            createdAt: post.createdAt,
            likesCount : post.likes.length
        }));

        res.status(200).json({
            currentPage: parseInt(page),
            totalPages:Math.ceil(total/limit),
            totalPosts:total,
            posts:formattedPosts,
        })

    } catch (err) {
        res.status(500).json({message : err});
    }
}


const getPostById = async(req,res) =>{

    try{
    const {id} = req.params;
    const findPost = await Blog.findById(id);

    if(!findPost) return res.status(404).json({message:'Post not found !'})

    res.status(200).json(findPost);

    } catch(err){
        res.status(500).json({message : err.message});
    }
}


const DeletePost = async(req,res) => {

    const {id} = req.params ;

    try{
        const deletedPost = await Blog.findByIdAndDelete(id);

        if (!deletedPost) {
            return res.status(404).json({ message: "Post not found" });
          }
        res.status(200).json({message:'the post has been deleted'})

    } catch (err){
        console.error(err);
        res.status(500).json({message:'something went wrong'})
    }
}

const deleteAll = async (req, res) => {
    try {
      const result = await Blog.deleteMany({});
  
      if (result.deletedCount === 0) {
        return res.status(404).json({ message: 'No posts found to delete.' });
      }
  
      res.status(200).json({ message: 'All blog posts have been deleted.' });
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Something went wrong.' });
    }
  };



module.exports = {
    register ,
    login,
    GetUsers,
    CreateBlog ,
    GetAllPosts,
    DeletePost,
    deleteAll,
    getPostById
}