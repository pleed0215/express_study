import { videosDb } from "../db";

export const home = (req, res) => res.render ("home", {pageTitle: "Home", videosDb:videosDb}); // render의 첫번째 인자는 템플릿, 두번째 인자는 템플릿에 추가할 정보가 담긴 객체이다.
export const search = (req, res) => {
    const { query: {term: searchingBy} } = req; // totally new way.
    res.render ("search", {pageTitle: "search", searchingBy: searchingBy});
}


export const videos = (req, res) => res.render("videos", {pageTitle: "videos", videosDb: videosDb});
export const upload = (req, res) => res.render("upload", {pageTitle: "videos/upload"});
export const editVideo = (req, res) => res.render("editVideo", {pageTitle: "videos/:id/editVideo"});
export const deleteVideo = (req, res) => res.render ("deleteVideo", {pageTitle: "videos/:id/delete-video"});
export const videoDetail = (req,res) => res.render("videoDetail", {pageTitle: "videos/:id"});