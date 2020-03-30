import { videosDb } from "../db";
import routes from "../routes";

export const home = (req, res) => res.render ("home", {pageTitle: "Home", videosDb:videosDb}); // render의 첫번째 인자는 템플릿, 두번째 인자는 템플릿에 추가할 정보가 담긴 객체이다.
export const search = (req, res) => {
    const { query: {term: searchingBy} } = req; // totally new way.
    res.render ("search", {pageTitle: "search", searchingBy: searchingBy, videosDb:videosDb});
}


// handler for /videos
export const videos = (req, res) => res.render("videos", {pageTitle: "videos", videosDb: videosDb});

// handlers for /vidoes/upload
export const getUpload = (req, res) => res.render("upload", {pageTitle: "videos/upload"});
export const postUpload = (req, res) => {
    const {
        body: {
            videofile,
            title,
            description
        }
    } = req;
    // TODO: Upload and save video.
    console.log (req.body);
    res.redirect (routes.videoDetail(3245123));
};


export const editVideo = (req, res) => res.render("editVideo", {pageTitle: "videos/:id/editVideo"});
export const deleteVideo = (req, res) => res.render ("deleteVideo", {pageTitle: "videos/:id/delete-video"});
export const videoDetail = (req,res) => res.render("videoDetail", {pageTitle: "videos/:id"});