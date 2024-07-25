const User = require("../models/user_model");
const Contact = require("../models/contact-model");

const getAllUsers = async (req, res, next) => {
    try {
        const users = await User.find({}, { password: 0 });
        if (!users || users.length === 0) {
            return res.status(404).json({ message: "No users found!" });
        }
        return res.status(200).json(users);
    } catch (error) {
        next(error);
    }
};

const getUserById = async (req, res, next) => {
    try {
        const id = req.params.id;
        const data = await User.findOne({ _id: id }, { password: 0 });
        return res.status(200).json(data);
    } catch (error) {
        next(error);
    }
};

const updateUserById = async (req, res, next) => {
    try {
        const id = req.params.id;
        const updatedUserData = req.body;
        const updatedData = await User.updateOne(
            { _id: id },
            { $set: updatedUserData }
        );
        return res.status(200).json(updatedData);
    } catch (error) {
        next(error);
    }
};
// delete user
const deleteUserById = async (req, res, next) => {
    try {
        const id = req.params.id;
        await User.deleteOne({ _id: id });
        return res.status(200).json({ message: "User deleted successfully!" });
    } catch (error) {
        next(error);
    }
};


const getAllContacts = async (req, res, next) => {
    try {
        const contacts = await Contact.find();
        if (!contacts || contacts.length === 0) {
            return res.status(404).json({ message: "No contacts found!" });
        }
        return res.status(200).json(contacts);
    } catch (error) {
        next(error);
    }
};
//delete contact
const deleteContactById = async (req, res, next) => {
    try {
        const id = req.params.id;
        await Contact.deleteOne({ _id: id });
        return res.status(200).json({ message: "contact deleted successfully!" });
    } catch (error) {
        next(error);
    }
};

module.exports = { getAllUsers, getAllContacts, deleteUserById, getUserById, updateUserById,deleteContactById };
