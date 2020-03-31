import Video from "../models/Video";
import routes from "../routes";


//export const home = (req, res) => {res.render ("home", {pageTitle: "Home", videosDb:videosDb}); // render의 첫번째 인자는 템플릿, 두번째 인자는 템플릿에 추가할 정보가 담긴 객체이다.
// getting db data version of home.
export const home = async (req, res) => {
    try {
        const videosDb = await Video.find ({});
        console.log (videosDb);
        res.render ("home", {pageTitle: "home", videosDb: videosDb});
    }
    catch (error) {
        console.log (error);
        res.render ("home", {pageTitle: "home with Error", videosDb: []});
    }
};
export const search = (req, res) => {
    const { query: {term: searchingBy} } = req; // totally new way.
    res.render ("search", {pageTitle: "search", searchingBy: searchingBy, videosDb:videosDb});
}

// handler for /videos
export const videos = async(req, res) => {
    const videosDb = await Video.find ({});
    console.log (videosDb);
    res.render("videos", {pageTitle: "videos", videosDb: videosDb});
};

// handlers for /vidoes/upload
export const getUpload = (req, res) => res.render("upload", {pageTitle: "videos/upload"});
export const postUpload = async (req, res) => {
    // new way to get post information.
    // traditional JS can't understand this way.
    const {
        body: {
            title,
            description
        },
        file: {
            path
        }
    } = req;

    try {
        const newVideo = await Video.create ( {fileUrl: path, title: title, description: description} );
        // TODO: Upload and save video.
        console.log (path, title, description);
        res.redirect (routes.videoDetail(newVideo.id));
    }
    catch (error) {
        console.log (error);
        res.redirect (routes.getUpload);
    }
};


export const editVideo = (req, res) => res.render("editVideo", {pageTitle: "videos/:id/editVideo"});
export const deleteVideo = (req, res) => res.render ("deleteVideo", {pageTitle: "videos/:id/delete-video"});


export const videoDetail = async (req,res) => {

    try { 
        const {
            params: { id } // paramemters. :id
        } = req;
        
        console.log (id);
        const videoById = await Video.findById (id);

        //console.log (videoById);

        res.render("videoDetail", {pageTitle: `videos/${id}`, video: videoById});
    }
    catch (error) {
        console.log (error);
        res.redirect (routes.home);
    }
}