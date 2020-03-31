import mongoose from "mongoose";


const VideoSchema = new mongoose.Schema( {
    fileUrl: { 
        type: String, 
        required: 'File URL is required',
    },
    title: { 
        type: String, 
        required: 'Title is required',
    },
    description: { 
        type: String, 
    },
    createdAt: {
        type: Date,
        default: Date.now // Date.now 는 함수. Date.now()는 함수를 실행한 것. 차이를 알아 두자.
    },
    comments: [{ // relation을 갖는 두번째 방법.
        type: mongoose.Schema.Types.ObjectId,
        ref: "Comment"
    }]
});

const model = mongoose.model("Video", VideoSchema);
export default model;