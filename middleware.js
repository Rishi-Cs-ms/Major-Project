const Listing=require("./models/listing");
const Review=require("./models/review.js");
const {listingShema,reviewSchema}=require("./schema.js");

const ExpressError=require("./utils/expressError.js");
module.exports.isLoggedIn=(req,res,next)=>{
    if(!req.isAuthenticated()){
        req.session.redirectUrl=req.originalUrl;
        req.flash("error","You must be signed in first");
        return res.redirect("/login");
    }
    next();
}

module.exports.saveRedirectUrl=(req,res,next)=>{
    if(req.session.redirectUrl){
        res.locals.redirectUrl=req.session.redirectUrl;
    }
    next();
}

module.exports.isOwner= async(req,res,next)=>{
    let {id}=req.params;
    let listing=await Listing.findById(id);
    if(!listing.owner._id.equals(req.user._id)){
        req.flash("error","You are not authorized to Edit this");
        return res.redirect(`/listings/${id}`);
    }
    next();
}

module.exports.isReviewAuthor= async(req,res,next)=>{
    let {reviewId,id}=req.params;
    let review=await Review.findById(reviewId);
    if(!review.author._id.equals(req.user._id)){
        req.flash("error","You are not authorized to Delete this Review");
        return res.redirect(`/listings/${id}`);
    }
    next();
}
module.exports.validateListing=(req,res,next)=>{
    let {error}= listingShema.validate(req.body);
    if(error){
        const msg= error.details.map((el)=>el.message).join(",");
        throw new ExpressError(msg,400);
    }else{
        next();
    }   
}
module.exports.validateReview=(req,res,next)=>{
    let {error}= reviewSchema.validate(req.body);
    if(error){
        const msg= error.details.map((el)=>el.message).join(",");
        throw new ExpressError(msg,400);
    }else{
        next();
    }   
}