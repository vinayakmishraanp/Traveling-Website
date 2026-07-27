const Listing=require("../models/listing.js");
const review=require("../models/reviews.js");

module.exports.createReview=async(req,res)=>
{
let listing=await Listing.findById(req.params.id);
let newReview=new review(req.body.review);
newReview.author=req.user._id;

listing.reviews.push(newReview);

await listing.save();
await newReview.save();

console.log("new review added");
req.flash("success","New review created");
res.redirect(`/listings/${listing._id}`);
}

module.exports.destroyReview=async(req,res)=>{
let {id,reviewId}=req.params;
await Listing.findByIdAndUpdate(id,{$pull:{reviews:reviewId}});
await review.findByIdAndDelete(reviewId);
req.flash("success","review deleted");
res.redirect(`/listings/${id}`);
}