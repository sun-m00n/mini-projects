document.onclick = function (e) {
    console.log(1)
}

window.onclick = function (event) {
    var myBox = document.getElementById('my-box');

    if (event.target.contains(myBox) && event.target !== myBox) {
        console.log(false);
    } else {
        console.log(true);
    }
}
