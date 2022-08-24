import mongoose from "mongoose";
import bcrypt from "bcrypt";

const userSchema = new mongoose.Schema(
   {
      email: {
         type: String,
         lowercase: true,
         unique: true,
         required: true,
         trim: true,
      },
      fullname: {
         type: String,
         required: true,
         trim: true,
      },
      password: {
         type: String,
         minlength: 6,
         require: true,
      },
      isAdmin: {
         type: Boolean,
         default: false,
      },
      image: { type: String },
      username: { type: String },
   },
   { timestamps: true }
);

userSchema.pre("save", async function (next) {
   const salt = await bcrypt.genSalt();
   if (this.password)
      this.password = await bcrypt.hash(this.password, salt);
   next();
});

userSchema.statics.compareDetails = async function (email, password) {
   const user = await this.findOne({ email });
   if (user) {
      const checkPass = await bcrypt.compare(password, user.password);
      if (checkPass) {
         return user;
      } else {
         throw Error("invalid password");
      }
   }
   throw Error("invalid email");
};

const User = mongoose.model("User", userSchema);
export default User;
