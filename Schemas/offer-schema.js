const mongoose = require("mongoose");

const offerSchema = new mongoose.Schema({
  offer_id: String,
  offer_title: String,
  offer_description: String,
  offer_image: String,
  offer_sort_order: Number,
  content: [
    { item_id: String, quantity: Number},
    { item_id: String, quantity: Number },
  ],
  schedule: {
    days_of_week: Array,
    dates_of_month: Array,
    months_of_year: Array,
  },
  target: String,
  pricing: [
    { "currency": String, "cost": Number }, 
    {"currency": String, "cost": Number} 
  ],
    username:String,
});

const offer = mongoose.model("offer", offerSchema);

module.exports ={offer}
