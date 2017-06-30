var mongoose = require("mongoose");
    
var OrderSchema = new mongoose.Schema({
       orderID: { type: String, require: true, unique: true },
       num2lbGlass: { type: Number, require: false, unique: false },
       num1lbGlass: { type: Number, require: false, unique: false },
       num1lbPlastic: { type: Number, require: false, unique: false },
       totalCost: {type: Number, require: true, unique: false },
       date: { type: Date, require: true, unique: false },
       customer: { type: String, require: true, unique: false},
       email: {type: String, require: true, unique: false}
});

module.exports = mongoose.model("Order", OrderSchema);