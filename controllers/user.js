const User = require("../models/user.js");

module.exports.renderSignupForm=(req,res)=>{
    res.render("users/signup.ejs");
}

module.exports.createUser=async(req,res)=>{
    try{
        let {username,email,password}=req.body;
        let newUser= new User({email,username});
        let registerdUser=await User.register(newUser,password);
        req.login(registerdUser,(err)=>{
            if(err){
                return next(err);
            }
            req.flash("success","Welcome to our site");
            res.redirect("/listings");
        });
       
    }
    catch(err){
        req.flash("error",err.message);
        res.redirect("/signup");
    }
}

module.exports.renderLoginForm=(req,res)=>{
    res.render("users/login.ejs");
}

module.exports.loginUser=async(req,res)=>{
    req.flash("success",`Welcome ${req.user.username}`);
    res.redirect(res.locals.redirectUrl || "/listings");
}

module.exports.logoutUser=(req,res)=>{
    req.logout((err)=> {
        if (err) { 
            return next(err); 
        }
        req.flash("success","Goodbye You are logged out");
        res.redirect("/listings");
      });
}