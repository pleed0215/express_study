export const home = (req, res) => res.render ("home");
export const search = (req, res) => res.send("SEARCH");

export const videos = (req, res) => res.send("videos");
export const upload = (req, res) => res.send("videos/upload");
export const editVideo = (req, res) => res.send("videos/edit-video");
export const deleteVideo = (req, res) => res.send("vidoes/deleteVideo");
export const videoDetail = (req,res) => res.send("video/:id");