const Service = require("../models/service-model");

const services = async (req, res) => {
    try {
        const response = await Service.find();
        if (!response) {
            res.status(404).json({ msg: "No services found" });
            return;
        }
        console.log("Services found:", response); // Debugging line
        return res.status(200).json({ msg: response });
    } catch (error) {
        console.error(`services: ${error}`); // Changed to console.error for errors
        res.status(500).json({ msg: "Server error" }); // Added error response
    }
};

module.exports = services;
