const
  log_elem = document.getElementById('log'),
  // image = document.createElement('img')
  image = document.querySelector('img'),
  canvas = document.querySelector('canvas'),
  context = canvas.getContext('2d')

function log(...str) {
  let string = ''
  log_elem.innerText = string
  for (let s of str) {
    log_elem.innerText += " " + s + ""
  }
}

function draw() {
  // const
  //   canvas = document.createElement('canvas'),
  //   context = canvas.getContext('2d')

  canvas.width = image.width
  canvas.height = image.height

  context.drawImage(
    image,
    0,
    0,
    image.width,
    image.height
  )

  var
    canvasImageData = context.getImageData(0, 0, canvas.width, canvas.height),
    dataLength = canvasImageData.data.length;

  for (let index = 0; index < dataLength; index += 4) {

    [
      canvasImageData.data[index],
      canvasImageData.data[index + 1],
      canvasImageData.data[index + 2],
    ]
      .every(function (item) {
        if (item > 180) {
          canvasImageData.data[index] = 255;
          canvasImageData.data[index + 1] = 255;
          canvasImageData.data[index + 2] = 255;
        }
      })

  }
  // console.log(preprocessImage(canvas))
  // context.putImageData(preprocessImage(canvas), 0, 0);
  context.putImageData(canvasImageData, 0, 0);

  extractText(canvas.toDataURL())
  // let src = preprocessImage(canvas.toDataURL())
  // extractText(image.src)
  // extractText(src)
}



function extractText(src) {
  Tesseract.recognize(
    src,
    'eng',
    { logger: m => log('loading') }
  )
    .then(result => {
      console.log(result)
      if (result.data.text.length < 1) log('unable to detect')
      else log_elem.innerHTML = result.data.text
    })
}

function recognize() {
  let fileInput = document.querySelector('input')
  if (!fileInput.files[0]) return

  let reader = new FileReader();

  reader.onload = function (e) {
    image
      .setAttribute('src', e.target.result);
    image.onload = () => draw()
  };

  reader.readAsDataURL(fileInput.files[0]);
}






