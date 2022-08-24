import Mongoose from "mongoose";


const postSchema = new Mongoose.Schema(
   {
      userId: {
         type: Mongoose.Schema.Types.ObjectId,
         ref: User,
         required: true,
      },
      image: { type: String},
      title: { type: String, required: true},
      body: { type: String, required: true },
      amount: { type: Number, required: true },
      requirement: { type: String, required: true },
   },
   { timestamps: true }
);

const postModel = Mongoose.model("Post", postSchema);
export default postModel;
