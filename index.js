const express = require("express");
const app = express();
app.use(express.json());
const mongoose = require("mongoose");
const user = require("./models/usermodel");


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


app.post("/users/new",async(req,res)=>{

    try{
      const data = req.body;
      const lastuser =  await user.findOne().sort({trainee_id:-1});
      let newid = 1;
      if(lastuser){
           newid = lastuser.trainee_id + 1;
      }
     
       
         
      const newuser = new user({...data,trainee_id:newid});

        await newuser.save();
        res.json("user added successfuly")

    }
    catch(err){
         res.status(500).json({message:err.message});
    }
})

app.put("/users/:id",async(req,res)=>{
    try{
        const id = Number(req.params.id);
        const data = req.body;
        data.trainee_id = id;

        const updateuser = await user.findOneAndUpdate({trainee_id:id},data,{returnDocument: "after",runValidators:true});
         
      if(!updateuser){
        return res.status(404).json({ message: "User not found" });
      }

       res.json({message: "User updated successfully"});


    }
     catch(err){
         res.status(500).json({message:err.message});
    }

})


app.patch("/users/:id",async(req,res)=>{
    try{
        const id = Number(req.params.id);
        const data = req.body;
        const updateuser = await user.findOneAndUpdate({trainee_id:id},{ $set: data },{returnDocument:"after"});
        if(!updateuser){
            res.status(404).json("user not found");
        }
        res.json("details updated");

    }
    catch(err){
         res.status(500).json({message:err.message});
    }
})

app.delete("/users/:id",async(req,res)=>{
    try{
        const id = Number(req.params.id);
        const deleteduser = await user.findOneAndDelete({trainee_id:id});

        if(!deleteduser){
            res.status(404).json("user not found");
        }

        res.json("user deleted");
    }
    catch(err){
         res.status(500).json({message:err.message});
    }
})