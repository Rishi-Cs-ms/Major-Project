const Listing = require("../models/listing.js");
const mbxGeocoding = require('@mapbox/mapbox-sdk/services/geocoding');
const mapboxToken = process.env.MAP_TOKEN;
const geocodingClient= mbxGeocoding({accessToken:mapboxToken});
module.exports.index = async(req,res)=>{
    const allListings = await Listing.find();
    res.render("listings/index.ejs",{allListings});
 }
 module.exports.renderNewForm = (req,res)=>{

    res.render("listings/new.ejs");
}
 module.exports.showListing = async(req,res)=>{
    let {id}=req.params;
    const listing = await Listing.findById(id)
    .populate({path:"reviews",
       populate:{
           path:"author",
       }}).populate("owner");
    if(!listing){
        req.flash("error","Listing not found");
        res.redirect("/listings");
    }
    res.render("listings/show.ejs",{listing});
}
 module.exports.createNewListing = async(req,res,next)=>{
    let response= await geocodingClient.forwardGeocode({
        query: req.body.listing.location,
        limit: 1
      })
        .send()
        
   
    let url=req.file.path;
    let filename=req.file.filename;
    req.body.listing.image={filename,url};
    const newListing=new Listing(req.body.listing);
    newListing.owner=req.user._id;

    newListing.geometry=response.body.features[0].geometry;
    let lis=await newListing.save();
    console.log(lis);
    req.flash("success","New listing created");
    res.redirect("/listings"); 
}
 module.exports.renderEditForm = async(req,res)=>{
      let {id}=req.params;
      const listing = await Listing.findById(id);
      let originalUrl=listing.image.url;
      originalUrl= originalUrl.replace("upload/","upload/h_300,w_250/");
      res.render("listings/edit.ejs",{listing,originalUrl});
  }

  module.exports.updateListing = async(req,res)=>{
    let {id}=req.params;

    if(typeof req.file!=="undefined"){
        let url=req.file.path; 
        let filename=req.file.filename;
        req.body.listing.image={filename,url};
    }
    await Listing.findByIdAndUpdate(id,{...req.body.listing});
    req.flash("success","Listing updated successfully");
    res.redirect(`/listings/${id}`);
}

module.exports.deleteListing = async(req,res)=>{
    let{id}=req.params;
    await Listing.findByIdAndDelete(id);
    req.flash("success","Listing deleted successfully");
    res.redirect("/listings");
}