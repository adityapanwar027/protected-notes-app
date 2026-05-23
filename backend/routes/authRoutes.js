const express = require("express"); 
const routes = express.Router(); 

const { signupUser, loginUser } = require("../controllers/authController"); 

routes.post("/signup", signupUser); 
routes.post("/login", loginUser); 

module.exports = routes;