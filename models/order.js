var mongoose              = require("mongoose");
    
var OrderSchema = new mongoose.Schema({
       ordNbr: Number,
       amount: Number,
       date: Date,
       customer: String
});


module.exports = mongoose.model("Order", OrderSchema);