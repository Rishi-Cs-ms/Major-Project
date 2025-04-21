const mongoose =require("mongoose");
const Schema=mongoose.Schema;
const Review = require("./review.js");
const { required } = require("joi");
const listingSchema=new Schema({
    title:{
        type: String,
        required: true,
    },
    description:String,
    image: {
        filename: { type: String, default: "listingimage" }, // Default filename
        url: { 
            type: String, 
            default: "https://yogananda.com.au/img/gurus_img/krishna-young.jpg",
            set: (v) => v.trim() === "" ? "https://yogananda.com.au/img/gurus_img/krishna-young.jpg" : v
        }
    },
    price:Number,
    location:String,
    country:String,
    reviews: [{
        type: Schema.Types.ObjectId,
        ref: "Review"
    }],
    owner: {
        type: Schema.Types.ObjectId,
        ref: "User"
    },
    geometry: {
        type: {
            type: String,
            enum: ["Point"],
            required: true
        },
        coordinates: {
            type: [Number],
            required: true
        }
    }
});
listingSchema.post("findOneAndDelete", async function (listing) {
    if (listing) {
        await Review.deleteMany({
            _id: { $in: listing.reviews }
        });
    }
});
const Listing = mongoose.model("Listing",listingSchema);
module.exports = Listing;