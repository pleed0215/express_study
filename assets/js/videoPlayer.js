// javascript는 웹 브라우저에 항상 있으므로, videoPlayer가 호출되는
// videoDetail page 이외에도 호출이되며, videoContainer가 null이 되는 경우가
// videoDetail page 이외에도 항상 존재하며, 브라우저는 null인 객체에 접근하게 되
// 므로 error를 발생시킨다. 따라서. videoContainer가 null인지 항상 검사해야 함.
const videoContainer = document.getElementById("jsVideoPlayer");
let isFullscreen = false;
let videoPlayer, playButton, volumeButton, fullscreenButton;
let videoPlayerVolume;

function init() {
  videoPlayer = videoContainer.querySelector("video");
  playButton = videoContainer.querySelector("#jsPlayButton");
  volumeButton = videoContainer.querySelector("#jsVolumeButton");
  fullscreenButton = videoContainer.querySelector("#jsFullscreenButton");

  isFullscreen = false;

  videoPlayerVolume = videoPlayer.volume;

  playButton.addEventListener("click", () => {
    if (videoPlayer.paused) {
      videoPlayer.play();
      playButton.innerHTML = '<i class="fas fa-pause"></i>';
    } else {
      videoPlayer.pause();
      playButton.innerHTML = '<i class="fas fa-play"></i>';
    }
  });

  volumeButton.addEventListener("click", (e) => {
    if (!videoPlayer.muted) {
      //videoPlayerVolume = videoPlayer.volume;
      //videoPlayer.volume = 0;
      videoPlayer.muted = true;
      volumeButton.innerHTML = '<i class="fas fa-volume-mute"></i>';
    } else {
      console.log(videoPlayerVolume);
      //videoPlayer.volume = videoPlayerVolume;
      volumeButton.innerHTML = '<i class="fas fa-volume-up"></i>';
      videoPlayer.muted = false;
    }
  });

  fullscreenButton.addEventListener("click", (e) => {
    if (isFullscreen) {
      if (document.exitFullscreen) {
        document.exitFullscreen();
      } else if (document.mozCancelFullScreen) {
        /* Firefox */
        document.mozCancelFullScreen();
      } else if (document.webkitExitFullscreen) {
        /* Chrome, Safari and Opera */
        document.webkitExitFullscreen();
      } else if (document.msExitFullscreen) {
        /* IE/Edge */
        document.msExitFullscreen();
      }
      isFullscreen = false;
      fullscreenButton.innerHTML = '<i class="fas fa-expand"></i>';
    } else {
      if (videoContainer.requestFullscreen) {
        videoContainer.requestFullscreen();
      } else if (videoContainer.mozRequestFullScreen) {
        /* Firefox */
        videoContainer.mozRequestFullScreen();
      } else if (videoContainer.webkitRequestFullscreen) {
        /* Chrome, Safari and Opera */
        videoContainer.webkitRequestFullscreen();
      } else if (videoContainer.msRequestFullscreen) {
        /* IE/Edge */
        videoContainer.msRequestFullscreen();
      }
      videoPlayer.controls = false;
      isFullscreen = true;
      fullscreenButton.innerHTML = '<i class="fas fa-compress"></i>';
    }
  });
}

if (videoContainer) {
  init();
}
