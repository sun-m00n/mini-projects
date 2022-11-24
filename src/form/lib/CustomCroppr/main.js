'use strict'
let CustomCroppr = {
    $: {
        img: "",
        croppr: "",
        current_input_tag: "",
        // previous_input_tag: ""
    },
    init: function (a = { input, crop: undefined, view: undefined }) {

        let { input, crop, view } = a
        input.onchange = function (e) {
            let file = e.target.files[0]
            if (file.type.includes("image")) {
                CustomCroppr.$.current_input_tag = e.target
                e.target.setAttribute("data-of-cropped-image", null)
                CustomCroppr.editor.open()
            }
        }
        if (crop) crop.onclick = function () {
            CustomCroppr.$.current_input_tag = input
            CustomCroppr.editor.open()
        }
        if (view) view.onclick = function () {
            CustomCroppr.$.current_input_tag = input
            CustomCroppr.viewer.open()
        }
        // initialise croppr btns
        let btns = document.querySelectorAll("#croppr_editor_head button")
        btns[0].onclick = CustomCroppr.editor.close
        btns[1].onclick = CustomCroppr.editor.crop
        document.querySelector("#croppr_viewer button").onclick = CustomCroppr.viewer.close
    },
    window: {
        open: function () { document.querySelector("#croppr_window").classList.add("open") },
        close: function () { document.querySelector("#croppr_window").classList.remove("open") }
    },
    editor: {
        open: function () {

            let file = CustomCroppr.$.current_input_tag.files[0]
            if (!file) return
            // read image file
            let reader = new FileReader()
            reader.readAsDataURL(file)
            reader.onload = function () {
                document.querySelector("#croppr_editor_body").innerHTML = `<img id="croppr_editor_body_img" src>`
                document.querySelector("#croppr_editor_body_img").src = reader.result;

                CustomCroppr.$.img = document.querySelector("#croppr_editor_body_img")
                CustomCroppr.$.img.onload = function () {
                    CustomCroppr.$.croppr = new Croppr(CustomCroppr.$.img, { startSize: [15, 15, '%'] });

                    CustomCroppr.window.open()
                    document.querySelector("#croppr_editor").classList.add("open")
                    // document.querySelector("#croppr")
                }
            }
        },
        load: function () {
            if (CustomCroppr.$.img) {
                CustomCroppr.window.open()
                document.querySelector("#croppr_editor").classList.add("open")
            }
        },
        crop: function () {
            let r = CustomCroppr.$.croppr.getValue()
            if (!r) return

            let canvas = document.createElement("canvas"), ctx = canvas.getContext("2d")

            canvas.width = r.width
            canvas.height = r.height
            // ctx.drawImage(source, 0, 0, source.width, source.height, cropprValue.x, cropprValue.y, cropprValue.x + cropprValue.width, cropprValue.y + cropprValue.height)
            ctx.drawImage(
                CustomCroppr.$.img,
                r.x, r.y, r.width, r.height,
                0, 0, r.width, r.height
            )

            CustomCroppr.$.current_input_tag.setAttribute("data-of-cropped-image", canvas.toDataURL("image/jpeg"))
            CustomCroppr.editor.close()
        },
        close: function () {
            CustomCroppr.window.close()
            document.querySelector("#croppr_editor").classList.remove("open")
        }
    },
    viewer: {
        open: function () {
            let image_data = CustomCroppr.$.current_input_tag.getAttribute("data-of-cropped-image")
            if (image_data == null || !image_data) return
            else {
                document.querySelector("#croppr_viewer_img").src = image_data

                CustomCroppr.window.open()
                document.querySelector("#croppr_viewer").classList.add("open")
            }
        },
        close: function () {
            document.querySelector("#croppr_viewer").classList.remove("open")
            CustomCroppr.window.close()
        }
    }
}
