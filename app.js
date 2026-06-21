const express=require('express');
const app=express();
const path=require('path');
const mongoose=require('mongoose');
const Listing=require('./models/listing.js');
const methodOverride=require("method-override");
const ejsMate=require("ejs-mate");

const MONGO_URL='mongodb://localhost:27017/apnaProjectDB';
main()
.then(()=>{
    console.log("connected to database");
}).catch((err)=>{

    console.log("error connecting to database",err);
}
);
async function main(){
    await mongoose.connect(MONGO_URL);

}




app.get('/',(req,res)=>{
    res.send('hey i listing hey bro you');
});
app.listen(8080,()=>{
    console.log('Server is running on port 8080');
});
app.set("view engine","ejs");
app.set("views",path.join(__dirname,"views"));
app.use(express.urlencoded({extended:true}));
app.use(methodOverride("_method"));
app.engine("ejs",ejsMate);
app.use(express.static(path.join(__dirname,"public")));

//index route
app.get("/listings",async(req,res)=>{
    const allListings=await Listing.find({});
    res.render("listings/index.ejs",{allListings});
});

//new route
app.get("/listings/new",(req,res)=>
{
res.render("listings/new.ejs");
});

//show route
app.get("/listings/:id",async(req,res)=>
{
    let {id}=req.params;
    const listing=await Listing.findById(id);
    res.render("listings/show.ejs",{listing});
});

//creat route
app.post("/listings",async(req,res)=>
{
// let {title,description,image,price,location,country}=req.body;
const newListing=new Listing(req.body.listing);
newListing.save();
res.redirect("/listings");
})

//edit route
app.get("/listings/:id/edit",async(req,res)=>{
    
    let {id}=req.params;
    const listing=await Listing.findById(id);
    res.render("listings/edit.ejs",{listing});
})

//update route
app.put("/listings/:id",async(req,res)=>{
    let {id}=req.params;
    await Listing.findByIdAndUpdate(id,{...req.body.listing});
     res.redirect(`/listings/${id}`);
})

//delete route
app.delete("/listings/:id",async(req,res)=>{
    let {id}=req.params;
    let deleteListing=await Listing.findByIdAndDelete(id);
    res.redirect("/listings");
    console.log(deleteLiting);
})















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