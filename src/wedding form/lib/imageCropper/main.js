const $ = (selector) => document.querySelector(selector)
function a(file, tag) {
    let i = $("img")
    // read file and to img tag
    let reader = new FileReader();
    reader.onload = function () {
        i.src = reader.result;

        // render img on canvas
        i.onload = () => {
            let c = $("canvas")
            let ctx = c.getContext("2d")
            c.width = i.width
            c.height = i.height

            ctx.drawImage(i, 0, 0)
            i.style.display = "none"
        }
    }
    reader.readAsDataURL(file);

    // document.body.innerHTML += `<div></div>`
}

function flipImage(image, ctx, flipH, flipV) {
    var scaleH = flipH ? -1 : 1, // Set horizontal scale to -1 if flip horizontal
        scaleV = flipV ? -1 : 1, // Set verical scale to -1 if flip vertical
        posX = flipH ? width * -1 : 0, // Set x position to -100% if flip horizontal 
        posY = flipV ? height * -1 : 0; // Set y position to -100% if flip vertical

    ctx.save(); // Save the current state
    ctx.scale(scaleH, scaleV); // Set scale to flip the image
    ctx.drawImage(img, posX, posY, width, height); // draw the image
    ctx.restore(); // Restore the last saved state
};

function flipNinjas() {
    var flipH = document.getElementById('horizontalCheckbox').checked,
        flipV = document.getElementById('verticalCheckbox').checked;

    flipImage(img, ctx, flipH, flipV);

    return false;
}

// flipButton.onclick = flipNinjas;



function InitialiseCropMyImage() {
    let input_tags = document.querySelectorAll(`input[type="file"]`)
    input_tags.forEach(tag => {
        tag.onchange = function (e) {
            file = e.target.files[0]
            if (file.type.includes("image"))
                a(file, e.target)
        }
    })
}
InitialiseCropMyImage()
