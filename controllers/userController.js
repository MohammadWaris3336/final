const userModel = require("../model/usermodel");
const bcrypt= require("bcrypt");
const jwt = require("jsonwebtoken");

const adduser = async (request, response) => {
  
    try {
      const user = new userModel(request.body);
      user.password = await bcrypt.hash(user.password,10);
      await user.save();
      response.send(user);
    } catch (error) {
      response.status(500).send(error);
    }
  };

  const signin = async (request, response) => {
    try {
      
      const body = new userModel(request.body);
      const token= jwt.sign({email: body.email}, "Private key", {expiresIn:"24h"} );
      const usercheck = await userModel.findOne({email:body.email});
      if (usercheck){
        const validpass = await bcrypt.compare(body.password, usercheck.password);
        if (validpass){
          response.status(200).send("Valid token: " + token)
          // response.cook
        }
        else{
          response.send("invalid password")
        }
      }
      else{
        response.send("Invalid User")
      }
      // await user.save();
      // response.send(user);
    } catch (error) {
      response.status(500).send(error);
    }
  };

  const user =  async (request, response) => {
      
      try {
        const users = await userModel.find({});
        response.send(users);
      } catch (error) {
        response.status(500).send(error);
      }
    };

    const user_id= async (request, response) => {
        
        try {
          const users = await userModel.find(request.params);
          response.send(users);
        } catch (error) {
          response.status(500).send(error);
        }
      };

    const patch = async (request, response) => {
        try {
          const users = await userModel.updateOne(request.params, { $set: request.body });
      
          response.send(users);
        } catch (error) {
          response.status(500).send(error);
        }
      };  

     const put = async (request, response) => {
        try {
          const users = await userModel.findByIdAndUpdate(request.params, { $set: request.body });
      
          response.send(users);
        } catch (error) {
          response.status(500).send(error);
        }
      }; 

      const del = async(request, response)=>{
        try{
        const user = await userModel.findByIdAndRemove(request.params);
        response.send("User Deleted");
        }
        catch(err){
          response.status(400).send(err.message);
        }
      } 


  module.exports={
    adduser,
    user,
    user_id,
    patch,
    put,
    signin,
    del
  }