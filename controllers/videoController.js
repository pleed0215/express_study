/* eslint-disable prettier/prettier */
import Video from "../models/video";
import routes from "../routes";

// export const home = (req, res) => {res.render ("home", {pageTitle: "Home", videosDb:videosDb}); // render의 첫번째 인자는 템플릿, 두번째 인자는 템플릿에 추가할 정보가 담긴 객체이다.
// getting db data version of home.
export const home = async (req, res) => {
  try {
    const videosDb = await Video.find({}).sort({ _id: -1 });
    res.render("home", { pageTitle: "home", videosDb });
  } catch (error) {
    console.log(error);
    res.render("home", { pageTitle: "home with Error", videosDb: [] });
  }
};

// in search, I learned "regular expression", and my code need to install JS regex(regular expressions) library.
export const search = async (req, res) => {
  const {
    query: { term: searchingBy }
  } = req; // totally new way.
  let videosDb = [];

  try {
    videosDb = await Video.find({
      title: { $regex: searchingBy, $options: "i" }
    });
  } catch (error) {
    console.log(error);
  }
  res.render("search", {
    pageTitle: "search",
    searchingBy,
    videosDb
  });
};

// handler for /videos
export const videos = async (req, res) => {
  const videosDb = await Video.find({});
  console.log(videosDb);
  res.render("videos", { pageTitle: "videos", videosDb });
};

// handlers for /vidoes/upload
export const getUpload = (req, res) =>
  res.render("upload", { pageTitle: "videos/upload" });
export const postUpload = async (req, res) => {
  // new way to get post information.
  // traditional JS can't understand this way.
  const {
    body: { title, description },
    file: { path }
  } = req;

  try {
    const newVideo = await Video.create({
      fileUrl: path,
      title,
      description
    });
    // TODO: Upload and save video.
    console.log(path, title, description);
    res.redirect(routes.videoDetail(newVideo._id));
  } catch (error) {
    console.log(error);
    res.redirect(routes.getUpload);
  }
};

/* get template에 데이터를 보내는 방법. 중요. */
export const getEditVideo = async (req, res) => {
  try {
    const {
      params: { id }
    } = req;
    const videoById = await Video.findById(id);
    res.render("editVideo", {
      pageTitle: `Edit ${videoById.title}`,
      video: videoById
    });
  } catch (error) {
    console.log(error);
    res.redirect(routes.home);
  }
};
export const postEditVideo = async (req, res) => {
  try {
    const {
      params: { id },
      body: { title, description }
    } = req;
    await Video.findByIdAndUpdate(
      id,
      { title, description },
      { useFindAndModify: true }
    );
    res.redirect(routes.videoDetail(id));
  } catch (error) {
    console.log(error);
    res.redirect(routes.home);
  }
};

export const deleteVideo = async (req, res) => {
  try {
    const {
      params: { id }
    } = req;
    await Video.findByIdAndRemove(id);
  } catch (error) {
    console.log(error);
  }
  res.redirect(routes.home);
};

export const videoDetail = async (req, res) => {
  try {
    const {
      params: { id } // paramemters. :id
    } = req;

    const videoById = await Video.findById(id);
    res.render("videoDetail", {
      pageTitle: `${videoById.title}`,
      video: videoById
    });
    console.log("after render");
  } catch (error) {
    console.log(error);
    res.redirect(routes.home);
  }
};
