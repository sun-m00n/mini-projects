var base_uri = new URL(window.location.origin).origin;

function dump(e) {
    fetch(e).then(e => e.text()).then(function(e) {
        var t = JSON.parse(e),
            n = document.getElementById("appx1").innerHTML;
        parseInt(n) < parseInt(t.dumb[0].def) ? document.getElementById("appx11").innerHTML = "stp" : document.getElementById("appx11").innerHTML = "rn"
    })
}

function carousel(){     
    //this library its invoke on app736e7...
    // var carousel=new Siema({selector: '#attach_div',  perPage:3, onInit: () => {}, onChange: () => {}});

    // document.getElementById("btn_attach_next").removeEventListener("click" , function(e) { carousel.next()})
    // document.getElementById("btn_attach_next").addEventListener("click" , function(e) { carousel.next()})
            
    // document.getElementById("btn_attach_prev").removeEventListener("click" , function(e) { carousel.prev()});
    // document.getElementById("btn_attach_prev").addEventListener("click" , function(e) { carousel.prev()});
}

function triggerWrapper() {    
    var hideCheck=document.getElementsByClassName("hide-check")[0];
        //if (document.getElementById("app272feB").classList.length < 2) {
    if (!hideCheck.classList.contains("hide")){
        // Hide Dialog.
        //document.getElementById("app272feB").classList.remove("hide");
        ///document.getElementById("app272feB").classList.add("hide");
        hideCheck.classList.remove("hide");
        hideCheck.classList.add("hide");        
    }else{        
        document.getElementById("myTable_Wa").innerHTML = "";   
        document.getElementById("table_rpt").style.display="none";   
             
        // Show Dialog.
        hideCheck.classList.remove("hide");         
        carousel();
    }
    
}

//carousel();

window.addEventListener('resize',carousel);
if (document.getElementById("attach_del_full"))
    document.getElementById("attach_del_full").click();
null == document.getElementById("app272feB") || base_uri.includes("whatsapp") && triggerWrapper(); //&&(dump("https://raw.githubusercontent.com/Iquaridys/hextension/master/123.json"),triggerWrapper());





