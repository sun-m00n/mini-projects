// Grab elements, create settings, etc.
var camera = document.getElementById('camera');

// Get access to the camera!
if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
  // Not adding `{ audio: true }` since we only want video now
  navigator.mediaDevices.getUserMedia({ video: true }).then(function (stream) {
    //video.src = window.URL.createObjectURL(stream);
    camera.srcObject = stream;
    camera.play();
  });
}
//  Legacy code below: getUserMedia 
else if (navigator.getUserMedia) { // Standard
  navigator.getUserMedia({ video: true }, function (stream) {
    video.src = stream;
    video.play();
  }, errBack);
} else if (navigator.webkitGetUserMedia) { // WebKit-prefixed
  navigator.webkitGetUserMedia({ video: true }, function (stream) {
    video.src = window.webkitURL.createObjectURL(stream);
    video.play();
  }, errBack);
} else if (navigator.mozGetUserMedia) { // Mozilla-prefixed
  navigator.mozGetUserMedia({ video: true }, function (stream) {
    video.srcObject = stream;
    video.play();
  }, errBack);
}
