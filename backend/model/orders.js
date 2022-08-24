import mongoose from "mongoose";

let postSchema  = new  mongoose.Schema({
   postId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "Post",
   },
   title: { 
      type: String, 
      required: true, 
   },
   image: { 
      type: String, 
      required: true
   },
   total: {
      type: Number,
      required:true
   },
   amount: {
      type: Number,
      required:true
   }
}, {timestamps:true})

const OrderSchema = new mongoose.Schema(
   {
      userId: { type: String, required: true },
      email: { type: String, required: true },
      post: [postSchema],
      address: { type: Object, required: true },
      country: { type: String, required: true },
      state: { type: String, required: true },
      phoneNo: { type: String, required: true },
      amount: { type: Number, required: true },
      city: { type: String, required: true },
      status: { type: String, default: "pending", required: true },
      zip_code: { type: String, required: true },
      fullname: { type: String, required: true },
      reference: { type: Object, required: true },
   },
   { timestamps: true }
);

const Order = mongoose.model("Order", OrderSchema);

export default Order;
