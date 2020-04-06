// javascript는 웹 브라우저에 항상 있으므로, videoPlayer가 호출되는
// videoDetail page 이외에도 호출이되며, videoContainer가 null이 되는 경우가
// videoDetail page 이외에도 항상 존재하며, 브라우저는 null인 객체에 접근하게 되
// 므로 error를 발생시킨다. 따라서. videoContainer가 null인지 항상 검사해야 함.
const videoContainer = document.getElementById("jsVideoPlayer");
let videoPlayer, playButton;

function init() {
    videoPlayer = videoContainer.querySelector("video");
    playButton = videoContainer.querySelector("#jsPlayButton");

    playButton.addEventListener("click", () => {
        const iTag = playButton.querySelector(".fas");
        if (videoPlayer.paused) {
            videoPlayer.play();
            iTag.classList.remove("fa-play");
            iTag.classList.add("fa-pause");
        } else {
            iTag.classList.remove("fa-pause");
            iTag.classList.add("fa-play");
            videoPlayer.pause();
        }
    });
}

if (videoContainer) {
    init();
}