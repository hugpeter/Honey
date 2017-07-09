var mongoose = require("mongoose");
    
var OrderSchema = new mongoose.Schema({
       num2lbGlass: { type: Number, require: false, unique: false },
       num1lbGlass: { type: Number, require: false, unique: false },
       num1lbPlastic: { type: Number, require: false, unique: false },
       totalCost: {type: Number, require: true, unique: false },
       date: { type: Date, require: true, unique: false },
       customer: { type: String, require: true, unique: false},
       email: {type: String, require: true, unique: false},
       paid: {type: Boolean, require: false, unique: false},
       delivered: {type: Boolean, require: false, unique: false}
});

module.exports = mongoose.model("Order", OrderSchema);