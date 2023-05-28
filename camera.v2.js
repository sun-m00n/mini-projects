const camera = document.getElementById('camera');
// For referance of parameter of getUserMedia: https://developer.mozilla.org/en-US/docs/Web/API/MediaDevices/getUserMedia
const params = { video: true, audio: true };

const err = (error) => console.log(error);
const callback = (stream) => {
  camera.srcObject =
    stream ||
    window.URL.createObjectURL(stream) ||
    window.webkitURL.createObjectURL(stream);
  camera.play();
};

// Get access to the camera!
if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia)
  navigator.mediaDevices.getUserMedia(params).then(callback);
// Legacy code below: getUserMedia
// Standard
else if (navigator.getUserMedia) navigator.getUserMedia(params, callback, err);
// WebKit-prefixed
else if (navigator.webkitGetUserMedia)
  navigator.webkitGetUserMedia(params, callback, err);
// Mozilla-prefixed
else if (navigator.mozGetUserMedia)
  navigator.mozGetUserMedia(params, callback, err);
