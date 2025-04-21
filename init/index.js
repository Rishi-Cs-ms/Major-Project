const mongoose=require("mongoose");
const initdata=require("./data.js");
const Listing=require("../models/listing.js");

const MONGO_URL="mongodb://127.0.0.1:27017/wonderlust";

main()
    .then(()=>{
        console.log("Connected to DB");
    })
    .catch((err)=>{
        console.log("error is:",err);
    })

async function main() {
    await mongoose.connect(MONGO_URL);
}
const initDb=async()=>{
    await Listing.deleteMany({});
    initdata.data= initdata.data.map((obj)=> ({
        ...obj,
        owner:"67fe951556fca9c1b5ed47b7",
    }));
    await Listing.insertMany(initdata.data);
    console.log("Data Re Inserted")
}
initDb();