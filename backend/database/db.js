import mongoose from "mongoose";
import User from "../model/Users.js";

export default async () => {
  // console.log(process.env.MONGO_URI);
  await mongoose
    .connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then((res) => {
      console.log("database connected");
    })
    .catch((err) => {
      console.log(`connection error for mongooose`, err);
    });

  await mongoose.connection.on("connected", async () => {
    try {
      const admin = await User.findOne({ isAdmin: true });
      if (!admin) {
        await User.create({
          fullname: process.env.FULL_NAME,
          email: process.env.ADMIN_EMAIL,
          isAdmin: true,
          password: process.env.ADMIN_PASSWORD,
        });
      }
    } catch (e) {
      console.log(e);
    }
  });
};
