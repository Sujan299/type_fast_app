const express = require("express");
const router = express.Router();
const {login, signup, google_login} = require("../controllers/loginController");
// validators 
const {loginSchema, signupSchema} = require("../validators/userValidation");
const userValidator = require("../middlewares/validationRequest");
router.post("/login",userValidator(loginSchema), login);
router.post("/signup",userValidator(signupSchema), signup);
// from frontend I will get only email from user in google_login
router.post("/google_login", google_login);
module.exports = router;