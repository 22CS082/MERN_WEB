const express = require('express')
const User = require("../models/user_model")
const bcrypt = require("bcrypt");


//home logic
const home = async (req, res) => {
    try {
        res
            .status(200)
            .send('welcome to my channel');

    } catch (error) {
        console.log(error);
    }
};

//registration logic

const register = async (req, res) => {
    try {
        console.log(req.body);
        const { username, email, phone, password } = req.body;
        const userExist = await User.findOne({ email });
        if (userExist) {
            return res.status(400).json({ msg: "email already exists" });


        }
        const userCreated = await User.create({ username, email, phone, password });
        res
            .status(201).json({
                msg: "registration successfully complated",
                token: await userCreated.generateToken(),
                userId: userCreated._id.toString(),
            });


    } catch (error) {
        res.status(500).json("internal server error");
    }
};


//login logic
const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const userExist = await User.findOne({ email });
        console.log(userExist);

        if (!userExist) {
            return res.status(400).json({ message: "Invalid Credentials" });
        }
        // const user = await bcrypt.compare(password, userExist.password);
        const user =await userExist.comparePassword(password);
        if (user) {
            res
                .status(200).json({
                    msg: "login successfully",
                    token: await userExist.generateToken(),
                    userId: userExist._id.toString(),
                });

        } else {
            res.status(401).json({ message: "invalid email or password" });
        }
    }
    catch (error) {
        res.status(500).json("internal server error");
    }
};


//to send user data-user logic

const user = async (req, res) => {
    try {
      const userData = req.user;
      console.log("Sending user data:", userData);
      return res.status(200).json({ userData });
    } catch (error) {
      console.error(`Error from the user route: ${error}`);
      res.status(500).json({ message: "Internal Server Error" });
    }
  };
  


module.exports = { home, register, login,user};

