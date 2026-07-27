if (process.env.NODE_ENV != "production") {
    require("dotenv").config();
}


const express=require('express');
const app=express();
const path=require('path');
const mongoose=require('mongoose');
const Listing=require('./models/listing.js');
const methodOverride=require("method-override");
const ejsMate=require("ejs-mate");
const Session=require("express-session");
const { MongoStore } = require("connect-mongo");
const Flash=require("connect-flash");
const passport=require("passport");
const LocalStrategy=require("passport-local");
const wrapAsync=require("./utils/wrapAsync.js");
const ExpressError=require("./utils/ExpressError.js");
const {listingSchema,reviewSchema}=require("./schema.js");
const review=require('./models/reviews.js');

const listingsRouter=require("./routes/listing.js");
const reviewsRouter=require("./routes/review.js");
const userRouter=require("./routes/user.js");


const User=require("./models/user.js");

const dns=require("dns");
dns.setServers(["8.8.8.8","1.1.1.1"]);

require("dotenv").config();


const dbUrl=process.env.ATLASDB_URL;

main()
.then(()=>{
    console.log("connected to database");
}).catch((err)=>{

    console.log("error connecting to database",err);
});

async function main(){
    await mongoose.connect(dbUrl);

}


app.set("view engine","ejs");
app.set("views",path.join(__dirname,"views"));
app.use(express.urlencoded({extended:true}));

app.use(methodOverride("_method"));
app.engine("ejs",ejsMate);
app.use(express.static(path.join(__dirname,"public")));


const store= MongoStore.create({
    mongoUrl:dbUrl,
    touchAfter:24*60*60,
    crypto:{
        secret:process.env.SECRET
    },
    touchAfter:24*60*60,
});
store.on("error",()=>{
    console.log("ERROR in mongo session store",err);
})

const sessionOptions={
    store,
    secret:process.env.SECRET,
    resave:false,
    saveUninitialized:true,
    cookie:{
        expiresAfter:Date.now()+7*24*60*60*1000,
        maxAge:7*24*60*60*1000,
        httpOnly:true
    }
}


// router.get("/", async (req, res) => {
//     const { category } = req.query;

//     let allListings;

//     if (category) {
//         allListings = await Listing.find({ category: category });
//     } else {
//         allListings = await Listing.find({});
//     }

//     res.render("listings/index", { allListings, category });
// });


app.use(Session(sessionOptions));
app.use(Flash());

app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use((req,res,next)=>{
    res.locals.success=req.flash("success");
    res.locals.error=req.flash("error");
    res.locals.currUser=req.user;
    next();
});

// home route
// app.get('/',(req,res)=>{
//     res.send('hey i listing hey bro you');
// });





app.use("/listings",listingsRouter);
app.use("/listings/:id/reviews",reviewsRouter);
app.use("/",userRouter);
//index route

//creat route



// for page not found
app.all("*",(req,res,next)=>{
   next(new ExpressError(404,"page not found!")); 
})

// error handler
app.use((err,req,res,next)=>{
    let {statusCode=500,message="something went wrong"}=err;
    res.status(statusCode).render("error.ejs",{message});
    // res.status(statusCode).send(message);
});

//Start Server
app.listen(8080,()=>{
    console.log('Server is running on port 8080');
});










// app.get("/testlistng",async(req,res)=>{
//     let sampleListing=new Listing({
//         title:'sample listing',
//         description:'by the branch',
//         Location:'goa',
//         Country:'india',
//         price:1200,
       
//     });
//     await sampleListing.save();
//     console.log('sample listing saved in database');
//     res.send("successfull saved in dadtabase")
// });