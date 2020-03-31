import mongoose from "mongoose";
import dotenv from "dotenv"; // reason to use dotenv is for conciling secure informations.
dotenv.config(); // in .env file, can make your secure information. in this lecture, we use DB url.
// and have to add .env to .gitignore.

console.log (process.env.MONGODB_URL);

mongoose.connect (process.env.MONGODB_URL, 
                  {
                      useNewUrlParser: true,
                      useUnifiedTopology: true
                      //useFindAndModify: false
                  }
);

export const db = mongoose.connection;

db.once("open", ()=> console.log("Connected to DB"));
db.on("error", error =>console.log("Error to connect DB.\nError obj: " + error ));


/*export const videosDb = [
    {
        id: 3245123,
        title: 'Video awesome',
        description: 'this is something I fucked',
        views: 30,
        videoFile: "https://archive.org/download/BigBuckBunny_124/Content/big_buck_bunny_720p_surround.mp4",
        creator: {
            name: "lee",
            email: "pleed@naver.com",
            id: 121212
        }
    },
    {
        id: 324123,
        title: 'Video fucking good',
        description: 'this is something I fucked',
        views: 30,
        videoFile: "https://archive.org/download/BigBuckBunny_124/Content/big_buck_bunny_720p_surround.mp4",
        creator: {
            name: "lee",
            email: "pleed@naver.com",
            id: 121212
        }
    },
    {
        id: 324513,
        title: 'Video illegal',
        description: 'this is something I fucked',
        views: 30,
        videoFile: "https://archive.org/download/BigBuckBunny_124/Content/big_buck_bunny_720p_surround.mp4",
        creator: {
            name: "lee",
            email: "pleed@naver.com",
            id: 121212
        }
    },
    {
        id: 32451,
        title: 'Video akkk',
        description: 'this is something I fucked',
        views: 30,
        videoFile: "https://archive.org/download/BigBuckBunny_124/Content/big_buck_bunny_720p_surround.mp4",
        creator: {
            name: "lee",
            email: "pleed@naver.com",
            id: 121212
        }
    }
]
*/