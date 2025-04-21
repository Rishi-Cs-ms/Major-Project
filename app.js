if(process.env.NODE_ENV !== "production") {
    require('dotenv').config();
}


const express = require("express");
const app = express();
const mongoose = require("mongoose");
const path=require("path");
const methodOverride= require("method-override")
const ejsMate=require("ejs-mate");
app.use(express.urlencoded({extended : true}));
app.set("view engine","ejs");
app.set("views",path.join(__dirname,"views"));
const ExpressError=require("./utils/expressError.js");
const session = require("express-session");
const MongoStore = require('connect-mongo');
const flash = require("connect-flash");
const User = require("./models/user.js");

const passport = require("passport");
const LocalStrategy = require("passport-local");
const reviewRouts= require("./routes/review.js");
const listingRoutes= require("./routes/listing.js");
const userRoutes= require("./routes/user.js");

const ATLASDB_URL=process.env.ATLASDB_URL;
const store=MongoStore.create({
    mongoUrl:ATLASDB_URL,
    touchAfter:24*3600,
    crypto:{
        secret:process.env.SECRET,
    }
});
store.on("error",function(e){
    console.log("Session store error",e);
});
const sessionOptions={
    store,
    secret:process.env.SECRET,
    resave:false,
    saveUninitialized:true,
    cookie:{
        httpOnly:true,
        expires:Date.now()+7*24*60*60*1000,
        maxAge:7*24*60*60*1000,
        httpOnly:true,
    }
};

app.use(session(sessionOptions));
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

main()
    .then(()=>{
        console.log("connected To DB");
    })
    .catch((err)=>{
        console.log(err);
    });

app.engine('ejs',ejsMate);

app.use(express.static(path.join(__dirname,"/public")));
async function main(){
    await mongoose.connect(ATLASDB_URL)
}
app.listen(8080, () => {
    console.log("Server is running on port 8080");
});

app.use(methodOverride("_method"));
app.use(flash());
app.use((req,res,next)=>{
    res.locals.success=req.flash("success");
    res.locals.error=req.flash("error");
    res.locals.user=req.user;

    next();
});

app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use("/listings",listingRoutes);
app.use("/listings/:id/reviews",reviewRouts);
app.use("/",userRoutes);

app.all("*",(req,res,next)=>{
    next(new ExpressError("Page not found",404));
});
app.use((err,req,res,next)=>{
    let{status=500,message="Something went wrong"}=err; 
    res.status(status).render("error.ejs",{message});
    next();
});