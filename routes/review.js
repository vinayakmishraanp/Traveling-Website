const express=require("express");
const router=express.Router({mergeParams:true});
const Listing=require("../models/listing.js");
const Review=require("../models/reviews.js");
const wrapAsync=require("../utils/wrapAsync.js");
const review=require('../models/reviews.js');
const {validationReview, isLoggedIn,isReviewAuthor}=require("../middleware.js");
const reviewController=require("../controller/reviews.js");



//review POST route
router.post("/",
    isLoggedIn,
    validationReview,wrapAsync(reviewController.createReview));

// delete review route
router.delete("/:reviewId"
    ,isLoggedIn
    ,isReviewAuthor
    ,wrapAsync(reviewController.destroyReview));

module.exports=router;