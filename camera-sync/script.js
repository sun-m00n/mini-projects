const $ = (selector) => document.querySelector(selector);

const video = $("video#camera");
// const startCameraBtn = $("button#startCamera");
// const saveImageBtn = $("button#saveImage");
// const startRecordingBtn = $("button#startRecording");
// const saveRecordingBtn = $("button#saveRecording");


let timers = [];
const currentScreenId = `screen-${getScreenId()}`;


function setScreenDetails() {
  currentScreenId && window.localStorage.setItem(
    currentScreenId,
    JSON.stringify({
      screenX: window.screenX,
      screenY: window.screenY,
      screenWidth: window.screen.availWidth,
      screenHeight: window.screen.availHeight,
      width: window.outerWidth,
      height: window.innerHeight,
      updated: Date.now(),
    })
  );
}
function getAllScreens() {
  return Object.keys(window.localStorage)
    .filter((key) => key.startsWith("screen-"))
    .map((key) => [key, JSON.parse(window.localStorage.getItem(key))]);
}
function getScreenId() {
  return (
    Object.keys(window.localStorage)
      .filter((key) => key.startsWith("screen-"))
      .map((key) => parseInt(key.replace("screen-", "")))
      .sort((a, b) => a - b)
      .at(-1) + 1 || 1
  );
}
function removeScreen() {
  currentScreenId && window.localStorage.removeItem(currentScreenId);
}
function removeOldScreens() {
  for (const [screenId, screen] of getAllScreens()) {
    if (Date.now() - screen.updated > 1000) {
      window.localStorage.removeItem(screenId);
    }
  }
}
function updateScreenPosition() {
  video?.setAttribute("style", `transform: translate(-${window.screenX}px, -${window.screenY}px)`);
}


/* function syncDom() {
  if (window.localStorage.getItem("start-btn") === "clicked") {
    startCamera()
  }
} */


function startCamera() {
  navigator.mediaDevices
    .getUserMedia({ video: true })
    .then((stream) => {
      if (video) {
        // startCameraBtn.style.opacity = 0;
        // startCameraBtn.style.zIndex = -9;

        video.width = window.screen.availWidth;
        video.height = window.screen.availHeight;
        video.srcObject = stream;
        video.play();

        timers.push(...[
          setInterval(setScreenDetails, 10),
          setInterval(removeOldScreens, 100),
          setInterval(updateScreenPosition, 10)
        ])

        // window.localStorage.setItem("start-btn", "clicked")
        window.addEventListener("beforeunload", function onUnload() {
          // window.localStorage.removeItem("start-btn")
          removeScreen()
        })
      }
    })
    .catch((err) => {
      console.error(err);
      alert(`${err}`);
    });
}
// function saveImage() {}
// function startRecording() {
//   $("button#startRecording").disabled = true;
//   $("button#saveRecording").disabled = false;
// }
// function saveVideo() {}

// startCameraBtn.onclick = startCamera
startCamera()

/* function init() {
  timers.push(setInterval(syncDom, 10))
}
init() */
