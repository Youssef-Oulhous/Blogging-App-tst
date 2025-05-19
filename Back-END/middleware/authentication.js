const jwt = require('jsonwebtoken');
require('dotenv').config();
const JWT_SECRET = process.env.JWT_SECRET ;

const authentication = async (req,res,next) =>{
 
    //the middleware steps 
    // 1. Check if Authorization header exists
     // 2. Extract token from "Bearer <token>"
       // 3. Verify token using your JWT secret key
        // 4. Attach user info to request object
         // 5. Continue to the next middleware/controller

    try{

        const authen = req.headers.authorization;

        if(!authen || !authen.startsWith("Bearer ")) {
            return res.status(401).json({message:'Authorization , No token Provided .'})
        };

        const token = authen.split(" ")[1];
        const decoded = jwt.verify(token , JWT_SECRET);

        req.user = {
            id:decoded.userId,
            username:decoded.username
        };

        next();
         
    } catch (err) {
        res.status(500).json({ message: "Invalid or expired token." });
    }
};


module.exports = authentication ;