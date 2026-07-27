const mongoose=require('mongoose');
const initdata=require("./data.js");
const Listing=require("../models/listing.js");
const { init } = require('../models/reviews.js');

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
// const initDB=async()=>{
//   await Listing.deleteMany({});
//   initdata.data=initdata.data.map((obj)=>({
//     ...obj,owner:"6a57ebc170a1f8f595ca5834"}));
//   await  Listing.insertMany(initdata.data);
//   console.log(initdata.data);
//   console.log("database initialized with sample data");
// };


const initDB = async () => {
  await Listing.deleteMany({});

  initdata.data = initdata.data.map((obj) => ({
    ...obj,
    owner: new mongoose.Types.ObjectId("6a57ebc170a1f8f595ca5834"),
  }));

  await Listing.insertMany(initdata.data);

  console.log("Database initialized");
};


initDB();
