const express = require('express');
const { register } = require('../controllers/auth_controllers');
const router = express.Router();
const authcontrollers=require("../controllers/auth_controllers");
const {signupSchema,loginSchema}=require("../validators/auth-validator");

const validate=require("../middlewares/validate-middlewares");
const authMiddleware=require("../middlewares/auth-middleware");


// router.get('/', (req, res) => {
//     res.status(200).send('welcome to my channel')
// });

router.route("/").get(authcontrollers.home);
router.route("/register")
      .post(validate(signupSchema),authcontrollers.register);

router.route("/login").post(validate(loginSchema),authcontrollers.login);
router.route("/user").get(authMiddleware,authcontrollers.user);
   

  module.exports=router;
  
