const express= require("express");
const router=express.Router();
const wrapAsync= require("../utils/wrapasync.js");
const multer  = require('multer')
const{storage}=require("../cloudConfig.js");
const {cloudinary}=require("../cloudConfig.js");
const upload = multer({ storage })

const {isLoggedIn,isOwner,validateListing}=require("../middleware.js");
const listijngController=require("../controllers/listing.js");
router.get("/new",isLoggedIn,listijngController.renderNewForm);

router.route("/")
    .get(wrapAsync(listijngController.index))
    .post(isLoggedIn,upload.single('listing[image][url]'),validateListing,wrapAsync (listijngController.createNewListing));
    
router.route("/:id")
    .get(wrapAsync(listijngController.showListing))
    .put(isLoggedIn,isOwner,upload.single('listing[image][url]'),wrapAsync (listijngController.updateListing))
    .delete(isLoggedIn,isOwner,wrapAsync (listijngController.deleteListing));

//Edit listing
router.get("/:id/edit",isLoggedIn,isOwner,wrapAsync(listijngController.renderEditForm))

module.exports=router;