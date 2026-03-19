const mongoose = require("mongoose");


const userstr = new mongoose.Schema(
    // this is fieldsobject controls the rules for fields 
{
name: {
        type:String,
        required:true
        },
age:   {
        type:Number,
        required:true
       },
trainee_id:{
    type:Number,
    required:true
}       

},
// this is optionsobject controls the behaviour
{
    strict:true,
    collection:"interns"
}

);

const use = mongoose.model("user",userstr);
module.exports = use;