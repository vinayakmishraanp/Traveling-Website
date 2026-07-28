const Listing=require("../models/listing.js");
const maptiler = require("../utils/maptiler");

module.exports.index = async (req, res) => {
    const { category, location } = req.query;

    let filter = {};

    if (category) {
        filter.category = category;
    }

    if (location) {
        filter.location = {
            $regex: location,
            $options: "i", // Case-insensitive
        };
    }

    const allListings = await Listing.find(filter);

    res.render("listings/index", {
        allListings,
        category,
        location,
    });
};

module.exports.renderNewForm=(req,res)=>{   
res.render("listings/new");
}

module.exports.showListing=async(req,res)=>{
    let {id}=req.params;
    const listing=await Listing.findById(id)
    .populate({path:"reviews",
        populate:"author"
    })
    .populate("owner");
    if(!listing){
        req.flash("error","Listing you requested for does not exist!");
        return res.redirect("/listings");
    }
    console.log(listing);
    res.render("listings/show.ejs",{listing});
}

module.exports.createListing = async (req, res, next) => {
    let url = req.file.path;
    let filename = req.file.filename;

    // Convert location to coordinates
    const response = await maptiler.geocoding.forward(
        req.body.listing.location,
        { limit: 1 }
    );
    console.log(JSON.stringify(response.features[0], null, 2));
    const newListing = new Listing(req.body.listing);

    newListing.owner = req.user._id;
    newListing.image = { url, filename };

    // Save geometry from geocoding
    if (response.features.length > 0) {
        newListing.geometry = response.features[0].geometry;
    }

  let savedListings= await newListing.save();
  console.log(savedListings);
    req.flash("success", "New listing created");
    res.redirect("/listings");
};

module.exports.renderEditForm=async(req,res)=>{
        let {id}=req.params;
        const listing=await Listing.findById(id);
        if(!listing){
            req.flash("error","Listing you requested for does not exist!");
            return res.redirect("/listings");
        }
    //    let originalImage= listing.image.url;
    //    originalImageUrl=originalImage.replace("/upload/","/upload/w_30");
   
    //    console.log(originalImage);
    //    console.log(originalImageUrl);
        res.render("listings/edit.ejs",{listing});
    }


module.exports.updateListing = async (req, res) => {
    const { id } = req.params;

    // Geocode the updated location
    const response = await maptiler.geocoding.forward(
        req.body.listing.location,
        { limit: 1 }
    );

    // Update geometry if a location was found
    if (response.features.length > 0) {
        req.body.listing.geometry = response.features[0].geometry;
    }

    // Update the listing
    let listing = await Listing.findByIdAndUpdate(
        id,
        req.body.listing,
        {
            new: true,
            runValidators: true,
        }
    );

    // Update image if a new one was uploaded
    if (typeof req.file !== "undefined") {
        let url = req.file.path;
        let filename = req.file.filename;
        listing.image = { url, filename };
        await listing.save();
    }

    req.flash("success", "Listing Updated");
    res.redirect(`/listings/${id}`);
};

module.exports.destroyListing=async(req,res)=>{
    let {id}=req.params;
    let deleteListing=await Listing.findByIdAndDelete(id);
    req.flash("success","Listing deleted");
    res.redirect("/listings");
    
    console.log(deleteListing);
}