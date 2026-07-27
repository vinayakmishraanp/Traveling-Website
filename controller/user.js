
const User = require("../models/user");
const passport = require("passport");


module.exports.renderSignupForm=(req,res)=>{
    res.render("users/signup.ejs");
}


module.exports.signup=async(req,res,next)=>{
    try{
        let {username,email,password}=req.body;
   const newUser=new User({username,email});
   const resiteredUser=await User.register(newUser,password);
   console.log(resiteredUser);
   req.login(resiteredUser,(err)=>{
    if(err){
        return next(err);
    }
      req.flash("success","regitered successfully");
   res.redirect("/listings");
   });
    }
    catch(e){
        req.flash("error",e.message);
        res.redirect("/signup");
    }
  
}

module.exports.renderLoginForm=(req,res)=>{
res.render("users/login.ejs");
}

module.exports.login=async(req,res)=>{
req.flash("success","logged in successfully");
let redirectUrl=res.locals.redirectUrl || "/listings";
        res.redirect(redirectUrl);
}

module.exports.logout=(req,res,next)=>{
    req.logout((err)=>
    {
        if(err){
           return next(err);
        }
        req.flash("success","logged out successfully");
        res.redirect("/listings");
    })
}