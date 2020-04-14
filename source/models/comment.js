import mongoose from "mongoose";

const CommentSchema = new mongoose.Schema({
    text: { type: String, required: "You need to write something" },
    createdAt: { type: Date, default: Date.new },
    creator: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    //video: { type: mongoose.Schema.Types.ObjectId, ref: "Video" } // releation을 가지는 방법 두 가지. 첫째 방법.
});

const model = mongoose.model("Comment", CommentSchema);
export default model;