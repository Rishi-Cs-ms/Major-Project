const express= require("express");
const router=express.Router({mergeParams:true});

const wrapAsync= require("../utils/wrapasync.js");
const {validateReview, isLoggedIn}=require("../middleware.js");
const {isReviewAuthor}=require("../middleware.js");
const reviewController=require("../controllers/review.js");

//review route
router.post("/",isLoggedIn,validateReview,wrapAsync(reviewController.createReview));
//Delete review
router.delete("/:reviewId",isLoggedIn,isReviewAuthor,wrapAsync(reviewController.deleteReview));

module.exports=router;