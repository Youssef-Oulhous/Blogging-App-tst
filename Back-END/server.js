const express = require('express');
const app = express();
const Port = 5500 ;
const connectDB = require('./config/db');
const authRoutes = require('./routes/auth');
const blogRouter = require('./routes/blog');
const cors = require('cors');




connectDB()


app.use(cors());
app.use(express.json());



app.get('/',(req,res)=>{
    res.end('Blogging App')
});

app.use('/api/auth',authRoutes)
app.use('/api/posts',blogRouter)



app.listen(Port , () => {
    console.log(`this server is running on Port ${Port}`);
})