const express = require("express");
const app = express();
app.use(express.json());
const mongoose = require("mongoose");
const user = require("./models/usermodel")

mongoose.connect("mongodb://127.0.0.1:27017/user")
.then(()=> console.log("database connected"))
.catch(err=> console.log(err));


app.listen(5000,()=>{
    console.log("server is running on port 5000");
})




app.get("/users",async(req,res)=>{
    try{
        const data = await user.find();
        res.json(data);
    }
   catch (err){
         res.status(500).json({message: err.message}) ;
    }
});



app.get("/users/:id",async(req,res)=>{
    try{
        const data = await user.findOne({trainee_id:req.params.id});
       

        if(!data){
            return res.status(400).json({message:"user not found"});
        }
         res.json(data);
    }

    catch(err){
         res.status(500).json({message:err.message});
    }
})