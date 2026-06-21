const mongoose=require('mongoose');
const initdata=require("./data.js");
const Listing=require("../listing.js");

const MONGO_URL='mongodb://localhost:27017/apnaProjectDB';

main()
.then(()=>{
    console.log("connected to database");
})
.catch((err)=>{
    console.log("error connecting to databse",err);
});
async function main()
{
    await mongoose.connect(MONGO_URL);
}
const initDB=async()=>{
  await Listing.deleteMany({});
  await  Listing.insertMany(initdata.data);
  console.log("database initialized with sample data");
};
initDB();
