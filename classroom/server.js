const express = require('express');
const app= express();
const session = require('express-session');
const flash = require('connect-flash');
app.set("view engine","ejs");
const path=require("path");

app.set("views",path.join(__dirname,"views"));
const sessionOptions={
    secret:"mysecret",
    resave:false,
    saveUninitialized:true,
}

app.use(session(sessionOptions));
app.use(flash());

app.get("/register",(req,res)=>{
    let {name="anonymous"}=req.query;
    req.session.name=name;
    

    if( name==="anonymous"){
        req.flash("error","Please enter a name");
    }else{
        req.flash("success","Welcome to the site");
    }
    res.redirect("/hello");
});
app.get('/hello', (req, res) => {
    // res.send(`'Hello ' ${req.session.name}`);
    res.locals.successmsg=req.flash("success");
    res.locals.errormsg=req.flash("error");
    res.render("page.ejs",{name: req.session.name});
});


app.listen(3000, () => {
    console.log("Server is running on port 3000");
}
);