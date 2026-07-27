const express=require("express");
const router=express.Router();
const wrapAsync=require("../utils/wrapAsync.js");
const {listingSchema,reviewSchema}=require("../schema.js");
const Listing=require("../models/listing.js");
const methodOverride=require("method-override");
const ejsMate=require("ejs-mate");
const review = require("../models/reviews.js");
const {isLoggedIn,isAuthor,isOwner,validationLiting}=require("../middleware.js");
const multer=require("multer");
const {storage}=require("../cloudConfig.js");
const upload=multer({storage});

//new route
const listingController=require("../controller/listings.js");

router
 .route("/")
 .get(wrapAsync(listingController.index))
 .post(
    isLoggedIn,
    // validationLiting,
    upload.single("listing[image]"),
    wrapAsync(listingController.createListing)
);



router.get("/new",isLoggedIn,listingController.renderNewForm);


router
   .route("/:id")
   .get(wrapAsync(listingController.showListing))
  .put(
     isLoggedIn,
     isOwner,
      upload.single("listing[image]"),
     validationLiting,
     wrapAsync(listingController.updateListing))
  .delete(
    isLoggedIn,
    isOwner,
    wrapAsync(listingController.destroyListing));   


//edit route
router.get("/:id/edit",
    isLoggedIn,
    isOwner,
    wrapAsync(listingController.renderEditForm));


module.exports=router;