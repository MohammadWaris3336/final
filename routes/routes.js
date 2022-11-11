const express = require("express");
const userModel = require("../model/usermodel");
const usercont = require("../controllers/userController");
const auth = require("../middleware/auth");
const app = express();


app.post("/add_user", usercont.adduser);

app.post("/sign-in", usercont.signin);

// app.post("/add_user", async (request, response) => {
//   try {
//     const user = new userModel(request.body);
//     await user.save();
//     response.send(user);
//   } catch (error) {
//     response.status(500).send(error);
//   }
// });

app.get("/users", auth, usercont.user);

// app.get("/users", async (request, response) => {
//   const users = await userModel.find({});
//   try {
//     response.send(users);
//   } catch (error) {
//     response.status(500).send(error);
//   }
// });

app.get("/users/:_id", usercont.user_id);

// app.get("/users/:_id", async (request, response) => {
//   const users = await userModel.find(request.params);
//   try {
//     response.send(users);
//   } catch (error) {
//     response.status(500).send(error);
//   }
// });

app.patch("/update/:_id", usercont.patch);

// app.patch("/update/:_id", async (request, response) => {
//   try {
//     const users = await userModel.updateOne(request.params, { $set: request.body });

//     response.send(users);
//   } catch (error) {
//     response.status(500).send(error);
//   }
// });

app.put("/update/:_id", usercont.put);

app.delete("/users/:_id", usercont.del);

// app.put("/update/:_id", async (request, response) => {
//   try {
//     const users = await userModel.findByIdAndUpdate(request.params, { $set: request.body });

//     response.send(users);
//   } catch (error) {
//     response.status(500).send(error);
//   }
// });

module.exports = app;