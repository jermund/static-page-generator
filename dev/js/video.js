window.onload = function() {

  var video = document.getElementById("videoPlayer");
  var mobileVideo = document.getElementById("mobileVideoPlayer");
  var background = document.getElementById("videoBackground");

  var muteButton = document.getElementById("muteButton");
  var playButton = document.getElementById("playButton");

  muteButton.addEventListener("click", function() {
    if (video.muted === false) {
        video.muted = true;
    } else {
      video.muted = false;
    }
  });

  playButton.addEventListener("click", function() {
    if (mobileVideo.paused === true) {

      background.style.display = "none";
      playButton.style.visibility = "hidden";

      mobileVideo.play();
    } else {
      mobileVideo.pause();
    }
  });
}
