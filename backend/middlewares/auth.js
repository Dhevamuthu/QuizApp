const jwt= require("jsonwebtoken");

const auth=(req,res,next)=>{
    const token= req.header('Authorization').split(" ")[1];

    if(!token){
        return res.status(401).json({error: "No token, authorization denied"});
    }
    try{
        const decoded= jwt.verify(token,"secret key");
        console.log(decoded);
        req.user= decoded;
        console.log("fetched the product details");
        next();
    }catch(err){
        return res.status(401).json({error: "Invalid token"});
    }
};

module.exports= auth;

