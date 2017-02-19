window.onload = function() {

  var video = document.getElementById("video");
  var muteButton = document.getElementById("muteButton");

  muteButton.addEventListener("click", function() {
    if (video.muted === false) {
        video.muted = true;
    } else {
      video.muted = false;
    }
  });
}
