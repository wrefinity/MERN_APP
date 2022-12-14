import Mongoose from "mongoose";

const commentSchema = new Mongoose.Schema(
   {
      userId: {
         type: Mongoose.Schema.Types.ObjectId,
         ref: User,
         required: true,
      },
      image: { type: String},
      content: { type: String, required: true },
      replies: { type: Array, default:[]},
      reactions: { type: Object, default:{}},
      title: {type: String},
      date: {type: String},
   },
   { timestamps: true }
);

const commentModel = Mongoose.model("Post", commentSchema);
export default commentModel;
