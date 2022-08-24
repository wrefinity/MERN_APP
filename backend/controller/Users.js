import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import mongoose from "mongoose";
import { response } from "express";

import User from "../model/Users.js";

const maxAge = 3 * 60 * 60 * 24;

const tokenGenerator = (id, isAdmin) => {
   return jwt.sign({ id: id, isAdmin: isAdmin }, process.env.PROJECT_SECRET, {
      expiresIn: maxAge,
   });
};

const errorHandler = (error) => {
   const errObj = { email: "", password: "" };
   if (error.message == "invalid email") errObj.email = "email not registered";
   if (error.message == "invalid password")
      errObj.password = "incorrect password";
   return errObj;
};

export const deleteUsers = async (req, res) => {
   const { id } = req.params;

   if (!mongoose.Types.ObjectId.isValid(id))
      return res.status(404).send(`No user with id: ${id}`);
   try {
      await User.findByIdAndDelete(id);
      res.status(200).json({ message: "user deleted" });
   } catch (er) {
      return res.status(500).json({ message: er.message });
   }
};

export const updateUser = async (req, res) => {
   const { id } = req.params;
   if (!mongoose.Types.ObjectId.isValid(id))
      return res.status(404).send(`No user with id: ${id}`);

   try {
      const updatedUser = await User.findByIdAndUpdate(
         id,
         { $set: req.body },
         { new: true }
      );
      res.status(200).json(updatedUser);
   } catch (er) {
      console.log(er);
      return res.status(500).json({ message: er.message });
   }
};

//getUsers
export const getUsers = async (req, res) => {
   try {
      const users = await User.find({ isAdmin: false });
      res.status(200).json(users);
   } catch (er) {
      console.log(er);
      return res.status(500).json({ message: er.message });
   }
};

export const getUser = async (req, res) => {
   const { id } = req.params;

   if (!mongoose.Types.ObjectId.isValid(id))
      return res.status(404).send(`No user with id: ${id}`);
   try {
      const userx = await User.findById(id);
      const { password, ...users } = userx._doc;
      res.status(200).json(users);
   } catch (er) {
      return res.status(500).json({ message: er.message });
   }
};
//users statistics
export const userStats = async (req, res) => {
   const date = new Date();
   const lastYr = new Date(date.setFullYear(date.getFullYear - 1));
   try {
      const stats = User.aggregate([
         { $match: { createdAt: { $gte: lastYr } } },
         { $project: { $month: "$createdAt" } },
         { $group: { _id: "$month", total: { $sum: 1 } } },
      ]);
      return res.status(200).json(stats);
   } catch (er) {
      res.status(500).json({ message: er.message });
   }
};

//login section
export const login_post = async (req, res) => {
   try {
      const userx = await User.compareDetails(
         req.body.email,
         req.body.password
      );
      const token = tokenGenerator(userx._id, userx.isAdmin);
      res.cookie("authentication", token, {
         httpOnly: true,
         maxAge: 1000 * maxAge,
      });
      const {password, ...user } = userx._doc;
      res.status(200).json({ ...user, token });
   } catch (er) {
      // const error = errorHandler(er)
      res.status(201).json({ message: er.message });
   }
};
export const login_get = async (req, res) => {
   const email = process.env.ADMIN_EMAIL;
   const password = process.env.ADMIN_PASSWORD;
   const role = process.env.ADMIN_ROLE;

   try {
      const userFind = await User.findOne({ email });
      if (!userFind) {
         const user = await User.create({
            email,
            password,
            role,
         });

      } 
   } catch (er) {
   }
};
export const logout = (req, res) => {
   res.cookie("authentication", "", { maxAge: 1 });
   res.redirect("/");
};

//    registration sections
export const regPost = async (req, res) => {
   const email = req.body.email;
   try {
      const userFind = await User.findOne({ email });
      if (!userFind) {
         const user = await User.create(req.body);
         if (user) return res.status(200).json({ user });
         return res
            .status(201)
            .json({ message: "Oop something went wrong !!!" });
      } else {
         return res.status(202).json({ message: "user exits" });
      }
   } catch (er) {
      console.log(er);
      res.status(210).json({ message: er.message });
   }
};

// Change password section
export const changePassword = async (req, res) => {
   const { oldPassword, newPassword, id } = req.body;
   try {
      const user = await User.findById(id);
      if (user) {
         const checkPassword = await bcrypt.compare(oldPassword, user.password);
         if (checkPassword) {
            const salt = await bcrypt.genSalt();
            const hashedPassword = await bcrypt.hash(newPassword, salt);
            if (hashedPassword) {
               const update = await User.findOneAndUpdate(
                  { _id: user._id },
                  { password: hashedPassword },
                  { new: true }
               );
               res.status(200);
            }
         } else {
            res.status(201).send("Incorrect password");
         }
      } else {
         res.status(202).send("Invalid User");
      }
   } catch (er) {
      res.status(210).send(er.message);
   }
};

export const changeImage = async (req, res) => {
   const { image } = req.body;
   const { id } = req.user;
   try {
      const updatedUser = await User.findByIdAndUpdate(
         id,
         { $set: { image } },
         { new: true }
      );
      res.status(200).send(updatedUser);
   } catch (err) {
      console.log(err);
      res.status(210).send(err.message);
   }
};
