try {

	document.querySelector('#text-description').innerHTML=
    document.querySelector('#text-send').innerHTML="";
    //document.querySelector('#contact_text').innerHTML ="";
    
    var dev_mode=false;
    if (dev_mode){ //just remove ! to dev mode.
        document.querySelector('#text-description').innerHTML="двад жукжукймечáéíóú,+555555,Masculino,32 anos,soltero";
        document.querySelector('#text-send').innerHTML="hola [field1] tu tel es [field2] tu edad es [field4]";
        //document.querySelector('#contact_text').innerHTML ="Juan Perez,573005352504\nAntonio padilla,31189787667";
    }

    var wPro = {
        "csv_header" : undefined,

        "timer4loadmodules" : undefined, //defined in window.ready.

        "timerSend":undefined,

        "attach_index":-1, //index for pickup file
        "attach_files":[],
        "attach_index_caption":-1, //the current selected attach file

        "rpt_data":{},
    
        "formats": {
            "photo":["jpg","png","gif","bmp","webp","tiff","tif","xbm","jxl" , "svg", "svgz" , "ico","apng","avif","jfif","pjp","pjpeg","webp","jpeg"],
            "video":["mp4","avi","mpeg","wmv","m4v","flv","3gp","mkv","webm","mov"],
            "img":["raw","psd","ai","eps" ],
            "audio":["mp3","wav","ogg","midi","amr","aac","mp2","m4a","wma","flac","aac","m3u","alac","dsd"],
            "program":[ "html", "js", "py", "htm", "bat", "vb", "sh", "php", "css", "php3"  , "php4", "php3", 
                        "pl", "jsp","jspx", "xhtml", "jtml", "swf", "cfm" , "asp", "aspx", "axd", "asx", "asmx", 
                        "ashx","rb", "xml", "rss", "cgi" , "sass", "less", "hss", "ccss", "pcsss", "c", "cs", "kt", "exe","bat" ,"accdb", "sql"],
            "compress":[ "zip","rar","7z", "tar" , "gzip" , "bzip2", "wim", "xz", "iso","bin"],  
            "pdf":["pdf"],
            "word":["doc","docx"],
            "excel":["xls","xlsx","xlsxm", "csv" ],
            "powerpoint":["ppt","pptx"],
            "txt":['txt']
        },

        "m_pos":0, 

        "can_send":false,

        "panelWidth" : 386

    };
    
    // - - - - - - - - - - - - - - - 
    // UTILS
    // - - - - - - - - - - - - - - - 

    function getBaseUrl() {
        return window.location.href.match(/^.*\//)[0]
    }

    function getById(e) {
        return document.getElementById(e)
    }

    function getByClass(e) {
        return document.getElementsByClassName(e)
    }

    function getBySelector(e) {
        return document.querySelector(e)
    }

    function getByXpath(e) {
        return document.evaluate(e, document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue
    }

    function getContains(e, t) {
        var n = document.querySelectorAll(e);
        return Array.prototype.filter.call(n, function (e) {
            return RegExp(t).test(e.textContent)
        })
    }

    function gawe(e) {
        return document.createElement(e)
    }

    function escapeRegExp(e) {
        return e.replace(/([.*+?^=!:${}()|\[\]\/\\])/g, "\\$1")
    }

    function replaceAll(e, t, n) {
        return e.replace(new RegExp(escapeRegExp(t), "g"), n)
    }

    function sp_txt(e) {
        for (var t, n, l, i = new RegExp(/{([^{}]+?)}/), s = getById("" + e).value; null !== (t = i.exec(s));) n = t[1].split("|"), l = Math.floor(Math.random() * n.length), s = s.replace(t[0], n[l]);
        return s
    }

    function checkAppFull4LoadModules() {
        //(getBySelector("div.app") || getBySelector("div.two") || getBySelector("div.three") || getBySelector("div.pane-side")) && (loadModule(), initListener(), clearInterval(wPro.timer4loadmodules))
        (getBySelector("div.app") || getBySelector("div.two") || getBySelector("div.three") || getBySelector("div.pane-side")) && (loadModule(), clearInterval(wPro.timer4loadmodules))
    }

    function getDateTime(){
        var today = new Date();
        var date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate() + "_" +
            today.getHours()+'-'+today.getMinutes()+'-'+today.getSeconds();
        return date;
    }

    function gawe_wa(e, t) {        
        var  a = gawe("a");
        a.id = "xoxo"; 
        a.href = "http://wa.me/" + e + "?text=" + t ;
        //a.href = "https://web.whatsapp.com/send?phone=" + e + "&text=" + t + "&app_absent=0"
        document.body.appendChild(a);
        // //n.id = "xoxo", n.href = "https://wa.me/" + e + "?text=" + t, document.body.appendChild(n)
    }

    function dump() {
        return "rn" === getById("appx11").innerHTML
    }

    function genRand(min, max, decimalPlaces) {  
        var rand = Math.random()*(max-min) + min;
        var power = Math.pow(10, decimalPlaces);
        return Math.floor(rand*power) / power;
    }

    // - - - - - - - - - - - - - - - 
    // CSV READER FUNCTIONS
    // - - - - - - - - - - - - - - - 

    function handleFiles(files) {     
        // Check for the various File API support, this for csv fole
        if (window.FileReader) {
            // FileReader are supported.
            getAsText(files[0]);
        } else {
            alert('FileReader are not supported in this browser.');
        }
    }

    function getAsText(fileToRead) {        
        var reader = new FileReader();
        // Read file into memory as UTF-8      
        reader.readAsText(fileToRead);
        // Handle errors load
        reader.onload = loadHandler;
        reader.onerror = errorHandler;
    }

    function loadHandler(event) {
        var csv = event.target.result;
        csv=csv.replace(";", ",");
        csv = csv.split("\n")
        wPro.csv_header = (csv[0].toLowerCase().replaceAll(' ', '')).split(',')
        
        if (wPro.csv_header.length>=2){
            var invalidphone=/[^(\d*|\)|\(|\+\-)]/gmi;
            if (invalidphone.test(wPro.csv_header[1])){
                getById("text-description").value = csv.slice(1,).join("\n");
                return wPro.csv_header;
            }
        }

        // if (wPro.csv_header.length > 2) {
            // if (subStatus.match(/approved|complete/i) == null) {
                // wPro.csv_header.splice(2,)
                // document.querySelector('#errorMessage').innerText = "More than one column is only available for subscribers."
            // }
        // }

        getById("text-description").value = csv.join("\n");
        wPro.csv_header=undefined;
    }

    function processData(csv) {
        var allTextLines = csv.split(/\r\n|\n/);
        var lines = [];
        for (var i=0; i<allTextLines.length; i++) {
            var data = allTextLines[i].split(';');
                var tarr = [];
                for (var j=0; j<data.length; j++) {
                    tarr.push(data[j]);
                }
                lines.push(tarr);
                tarr.push('\n');
        }
        //getById("text-description").value = lines;
    }

    function errorHandler(evt) {
        if(evt.target.error.name == "NotReadableError") {
            alert("Can not read file !");
        }
    }

    // - - - - - - - - - - - - - - - 
    // WAPI MODULE INIT
    // - - - - - - - - - - - - - - - 

    function loadModule() {
		////window.Store.beta = webpackJsonp([], null, ["cgddafdgie"]);
		//if (!webpackChunkwhatsapp_web_client && !webpackJsonp) return;
        if (!window.Store||!window.Store.Msg) {
            (function () {
                function getStore(modules) {
                    let foundCount = 0;
                    let neededObjects = [
                        { id: "Store", conditions: (module) => (module.default && module.default.Chat && module.default.Msg) ? module.default : null},
                        { id: "Conn", conditions: (module) => (module.default && module.default.ref && module.default.refTTL) ? module.default : (module.Conn ? module.Conn : null)},
                        { id: "MediaCollection", conditions: (module) => (module.default && module.default.prototype && (module.default.prototype.processFiles !== undefined||module.default.prototype.processAttachments !== undefined)) ? module.default : null },
                        { id: "MediaProcess", conditions: (module) => (module.BLOB) ? module : null },
                        { id: "Archive", conditions: (module) => (module.setArchive) ? module : null },
                        { id: "Block", conditions: (module) => (module.blockContact && module.unblockContact) ? module : null },
                        { id: "ChatUtil", conditions: (module) => (module.sendClear) ? module : null },
                        { id: "GroupInvite", conditions: (module) => (module.sendQueryGroupInviteCode ) ? module : null },
                        { id: "Wap", conditions: (module) => (module.createGroup) ? module : null },
                        { id: "ServiceWorker", conditions: (module) => (module.default && module.default.killServiceWorker) ? module : null },
                        { id: "State", conditions: (module) => (module.STATE && module.STREAM) ? module : null },
                        { id: "_Presence", conditions: (module) => (module.setPresenceAvailable && module.setPresenceUnavailable) ? module : null },
                        { id: "WapDelete", conditions: (module) => (module.sendConversationDelete && module.sendConversationDelete.length == 2) ? module : null },
                        { id: 'FindChat', conditions: (module) => (module && module.findChat) ? module : null},				
                        { id: "WapQuery", conditions: (module) => (module.default && module.default.queryExist) ? module.default : null },				
                        { id: 'Perfil', conditions: (module) => module.__esModule === true && module.setPushname && !module.getComposeContents ? module : null},
                        { id: "CryptoLib", conditions: (module) => (module.decryptE2EMedia) ? module : null },
                        { id: "OpenChat", conditions: (module) => (module.default && module.default.prototype && module.default.prototype.openChat) ? module.default : null },
                        { id: "UserConstructor", conditions: (module) => (module.default && module.default.prototype && module.default.prototype.isServer && module.default.prototype.isUser) ? module.default : null },
                        { id: "SendTextMsgToChat", conditions: (module) => (module.sendTextMsgToChat) ? module.sendTextMsgToChat : null },
                        { id: "ReadSeen", conditions: (module) => (module.sendSeen) ? module : null },
                        { id: "sendDelete", conditions: (module) => (module.sendDelete) ? module.sendDelete : null },
                        { id: "addAndSendMsgToChat", conditions: (module) => (module.addAndSendMsgToChat) ? module.addAndSendMsgToChat : null },
                        { id: "sendMsgToChat", conditions: (module) => (module.sendMsgToChat) ? module.sendMsgToChat : null },
                        { id: "Catalog", conditions: (module) => (module.Catalog) ? module.Catalog : null },
                        { id: "bp", conditions: (module) => (module.default&&module.default.toString&&module.default.toString().includes('bp_unknown_version')) ? module.default : null },
                        { id: "MsgKey", conditions: (module) => (module.default&&module.default.toString&&module.default.toString().includes('MsgKey error: obj is null/undefined')) ? module.default : null },
                        { id: "Parser", conditions: (module) => (module.convertToTextWithoutSpecialEmojis) ? module.default : null },
                        { id: "Builders", conditions: (module) => (module.TemplateMessage && module.HydratedFourRowTemplate) ? module : null },
                        { id: "Me", conditions: (module) => (module.PLATFORMS && module.Conn) ? module.default : null },
                        { id: "CallUtils", conditions: (module) => (module.sendCallEnd && module.parseCall) ? module : null },
                        { id: "Identity", conditions: (module) => (module.queryIdentity && module.updateIdentity) ? module : null },
                        { id: "MyStatus", conditions: (module) => (module.getStatus && module.setMyStatus) ? module : null },                
                        { id: "ChatStates", conditions: (module) => (module.sendChatStatePaused && module.sendChatStateRecording && module.sendChatStateComposing) ? module : null },				
                        { id: "GroupActions", conditions: (module) => (module.sendExitGroup && module.localExitGroup) ? module : null },
                        { id: "Features", conditions: (module) => (module.FEATURE_CHANGE_EVENT && module.features) ? module : null },
                        { id: "MessageUtils", conditions: (module) => (module.storeMessages && module.appendMessage) ? module : null },
                        { id: "WebMessageInfo", conditions: (module) => (module.WebMessageInfo && module.WebFeatures) ? module.WebMessageInfo : null },
                        { id: "createMessageKey", conditions: (module) => (module.createMessageKey && module.createDeviceSentMessage) ? module.createMessageKey : null },
                        { id: "Participants", conditions: (module) => (module.addParticipants && module.removeParticipants && module.promoteParticipants && module.demoteParticipants) ? module : null },
                        { id: "WidFactory", conditions: (module) => (module.isWidlike && module.createWid && module.createWidFromWidLike) ? module : null },
                        { id: "Base", conditions: (module) => (module.setSubProtocol && module.binSend && module.actionNode) ? module : null },
                        { id: "Versions", conditions: (module) => (module.loadProtoVersions && module.default && module.default["15"] && module.default["16"] && module.default["17"]) ? module : null },
                        { id: "Sticker", conditions: (module) => (module.default && module.default.Sticker) ? module.default.Sticker : null },
                        { id: "MediaUpload", conditions: (module) => (module.default && module.default.mediaUpload) ? module.default : null },
                        { id: "UploadUtils", conditions: (module) => (module.default && module.default.encryptAndUpload) ? module.default : null },
                        { id: 'UserPrefs', conditions: (module) => (module.getMaybeMeUser ? module : null), },
                        { id: 'Vcard', conditions: (module) => (module.vcardFromContactModel ? module : null)}
                    ];
                    for (let idx in modules) {
                        if ((typeof modules[idx] === "object") && (modules[idx] !== null)) {
                            neededObjects.forEach((needObj) => {
                                if (!needObj.conditions || needObj.foundedModule)
                                    return;
                                let neededModule = needObj.conditions(modules[idx]);
                                if (neededModule !== null) {
                                    foundCount++;
                                    needObj.foundedModule = neededModule;
                                }
                    });
        
                            if (foundCount == neededObjects.length) {
                                break;
                            }
                        }
                    }
                let neededStore = neededObjects.find((needObj) => needObj.id === "Store");
                    window.Store = neededStore.foundedModule ? neededStore.foundedModule : {};
                    neededObjects.splice(neededObjects.indexOf(neededStore), 1);
                    neededObjects.forEach((needObj) => {
                        if (needObj.foundedModule) {
                            window.Store[needObj.id] = needObj.foundedModule;
                        }
                    });
                window.Store.Chat.modelClass.prototype.sendMessage = function (e) {
                window.Store.SendTextMsgToChat(this, ...arguments);
                }
                    return window.Store;
                }
                const parasite = `parasite${Date.now()}`
        
                if (typeof webpackJsonp === 'function') webpackJsonp([], {[parasite]: (x, y, z) => getStore(z)}, [parasite]); 
                else webpackChunkwhatsapp_web_client.push([[parasite], {}, function (o, e, t) {let modules = []; for (let idx in o.m) {modules.push(o(idx));}	getStore(modules);}]);
                
            })();
        }
    }

    window.getNewMessageId = function (chatId) {
        var newMsgId = Store.Msg._models[0].__x_id.clone();
        newMsgId.fromMe      = true;
        newMsgId.id          = window.getNewId().toUpperCase();
        newMsgId.remote      = chatId;
        newMsgId._serialized = `${newMsgId.fromMe}_${newMsgId.remote}_${newMsgId.id}`
        return newMsgId;
    };

    window.getNewId = function () {
        var text     = "";
        var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

        for (var i = 0; i < 20; i++)
            text += possible.charAt(Math.floor(Math.random() * possible.length));
        return text;
    };

    window.getChat = function (id, done) {
        id = typeof id == "string" ? id : id._serialized;
        const found = window.Store.Chat.get(id);
        found.sendMessage = (found.sendMessage) ? found.sendMessage : function () { return window.Store.sendMessage.apply(this, arguments); };
        if (done !== undefined) done(found);
        return found;
    }

    window.createBaseMsg = function (id, to) {
        return {
            t: parseInt(new Date().getTime() / 1000), //window.Store.GlobalUnixTime.globalUnixTime(),
            from: window.Store.Conn.wid,
            isNewMsg: !0,
            to: to,
            self: "out",
            type: "unknown",
            ack: 0,
            local: !0,
            id: id
        };
    };

    function setCanSend(v){
       wPro.can_send=(v==true);
    }

    getById("insert_wa").onclick = function () { //Prepare button
        debugger;
        initAndShowReportPanel(false);

        setCanSend(false);

        var e = getById("text-description").value; //its the number and name textbox
        var t = getById("text-send").value;  //the text textbox
        //var n = getById("capt").value;

        var textWasEmpty;

        if (textWasEmpty = ( t=="" || !t ) )
            t=encodeURIComponent(" "); //keep in mind this is a special white char. not just empty space.

        var l = false; //getById("s_img").checked;
        var i = ""; //getById("o_imgs").getAttribute("src");

        var s = dump();
        var r = getById("myTable_Wa");

        r.innerHTML = ""; 
        if (!(e = e.match(/(.*|\s);.+/gm), !s) && (null != e)) {    
                
            for (var a = 0; a < e.length; a++) e[a] = e[a]//.replace(/[^a-z\d\s,]+/gim, "");
                var o = [];
                if (!(r.innerHTML = "", !s)){
                    setCanSend(true);
                    for (a = 0; a < e.length; a++) {
                        o[a] = e[a].split(";");
                        if (o[a]<=1) {
                            setCanSend(false);
                            break;
                        } 
                        var d = r.insertRow(a),
                            c = replaceAll(o[a][1], " ", "");
                        d.insertCell(0).innerHTML = "" + o[a][0] || 0; 
                        d.insertCell(1).innerHTML = parseInt(c); 
                        d.insertCell(2).innerHTML = "waiting";
                    }
                    $("#wa_count").text(e.length), getById("m0rt4lxC1").disabled = !1;
                    ////r.innerHTML = "Prepared";
                    ////$("#wa_count").text(e.length), getById("m0rt4lxC1").disabled = !1
                }
                }
                e = getById("text-description").value;
                if (!(e = e.match(/(.*|\s),.+/gm), !s) && (null != e)) {
                     for (var a = 0; a < e.length; a++) e[a] = e[a]//.replace(/[^a-z\d\s,]+/gim, "");
                 var o = [];
                 if (!(r.innerHTML = "", !s)){
                     setCanSend(true);
                     for (a = 0; a < e.length; a++) {
                         o[a] = e[a].split(",");
                         if (o[a]<=1) {
                             setCanSend(false);
                             break;
                         } 
                         var d = r.insertRow(a),
                             c = replaceAll(o[a][1], " ", "");
                         d.insertCell(0).innerHTML = "" + o[a][0] || 0; 
                         d.insertCell(1).innerHTML = parseInt(c); 
                         d.insertCell(2).innerHTML = "waiting";
                     }
                     $("#wa_count").text(e.length), getById("m0rt4lxC1").disabled = !1;
                     ////r.innerHTML = "Prepared";
                     ////$("#wa_count").text(e.length), getById("m0rt4lxC1").disabled = !1
                 }
                 }
            if (wPro.can_send) return;
        //} 
        //// if (!s) return;
        r.innerHTML = " Error: check numbers, message "; 
        $("#wa_count").text(0); 
        getById("m0rt4lxC1").disabled =!0
    };
    
    function callbackFunction(xmlhttp) 
    {
        alert(xmlhttp.responseXML);
    };


    getById("m0rt4lxC1").onclick = function () {
       //console.log("dfghgjgkhg");
       debugger;
        if (!wPro.can_send){
           
        return;
        }
            

        activatePanelPlayStop( true ); 

        var e   =   getById("text-description").value;
        var t   =   getById("s_tdy").checked;

        //legacy options.
        var n   =   wPro.attach_files.length>0;  //getById("s_img").checked; 
        var l   =   n ? "proceed" : "";          //getById("o_imgs").getAttribute("src");
        
        var i1  =   parseInt(getById("dly_wa").value) || 5;
       var i2  =   parseInt(getById("dly_wa2").value) || 10;
        var i   =   parseInt(genRand(i1,i2,2));
        var s   =   getById("myTable_Wa");

        var r   =   [];
        var a   =   [];
        var o   =   [];
        var d   =   [];
        var c   =   dump();
        
        /*getById("m0rt4lxC1").disabled = 
        getById("s_tdy").disabled =  
        //getById("s_img").disabled = 
        //getById("getImgs").disabled = 
        getById("insert_wa").disabled = 
        getById("text-description").disabled = 
        getById("text-send").disabled = 
        getById("capt").disabled = 
         //getById("del").disabled = 
        getById("contact_text").disabled = !0;*/

        i < 5 && (i = 5);
        //debugger;
        if (e.indexOf(',') > -1) 
        { 
           for (var g = e.match(/(.*|\s),.+/gm), u = 0; u < g.length; u++) g[u] = g[u]//.replace(/[^a-z\d\s,]+/gim, "");
        }
        else{
            for (var g = e.match(/(.*|\s);.+/gm), u = 0; u < g.length; u++) g[u] = g[u]//.replace(/[^a-z\d\s,]+/gim, "");
        }
        
        for (u = 0; u < g.length; u++) {
            var p = sp_txt("text-send");
            var imgcaption = "";//sp_txt("capt"); 
            if (e.indexOf(',') > -1) 
            { 
            r[u] = g[u].split(",");
            }
            else{
                r[u] = g[u].split(";");
            }
            let m = "" + p
            let w = "" + imgcaption

            r[u].forEach((e,i)=>{
                if (i==0) {
                    m=m.replaceAll("[name]", ""+e)
                    imgcaption=imgcaption.replaceAll("[name]", ""+e)
                }
                else if (i==1) {
                    m=m.replaceAll("[number]", ""+e)
                    imgcaption=imgcaption.replaceAll("[number]", ""+e)
                }
                //else {
                m=m.replaceAll(`[field${i+1}]`, ""+e)
                imgcaption=imgcaption.replaceAll(`[field${i+1}]`, ""+e)
                
                //}
            })
            if (wPro.csv_header) {                
                wPro.csv_header.forEach((e, i) => {
                    var field_=`[${e.toLowerCase().trim().replace("\n","").replace("\r","")}]`
                    m = m.replaceAll(field_, "" + r[u][i])
                    imgcaption = imgcaption.replaceAll(field_, "" + r[u][i])
                    
                })
            } else {
                ////m = replaceAll("" + p, "[name]", "" + r[u][0]),
                ////w = replaceAll("" + f, "[name]", "" + r[u][0]);
                
            }
            //// var m = replaceAll("" + p, "[name]", "" + r[u][0]),
            ////     w = replaceAll("" + f, "[name]", "" + r[u][0]);
            
            a[u] = encodeURIComponent(m); // Message replaced and URI encoded 
            o[u] = w; // ??
            var y = replaceAll(r[u][1], " ", ""); //Phone not spaces
            d[u] = parseInt(y) || 0; //Phone as Int
        }

        //c , d , o , a

        c && function () {
            var e = d.length, r = 0;
            ! function c() {
                var u = d[r],
                    p = o[r];
                if (gawe_wa(d[r], a[r]), getById("xoxo").click(), r % 125 == 0) {
                    var f = i ;
                    $("#wa_count").text("pause +- 2 min then go")
                } else if (r % 50 == 0) f = i + 15;
                else if (r % 20 == 0) f = i + 8;
                else if (r % 5 == 0) f = i + 3;
                else f = i;

                setTimeout(
                    function () {
                        if ((e = getByClass("_1WZqU PNlAR")).length >= 1) 
                            e = e[0];
                        else if (!(e = getBySelector("div[data-animate-modal-popup='true'] div[role='button']"))) 
                            var e = !1;

                        if (1 === (i = getByClass("_1U1xa")).length) 
                            i = getByClass("_1U1xa")[0];
                        else if (i = getBySelector("span[data-icon='send']")) 
                            i.parentElement;
                        else var 
                            i = !1;
                        
                        if (t) {
                            var a = getByClass("_2et95 _1E1g0");
                            if (a.length >= 1)
                                if (2 === a.length) var o = a[0].innerText;
                                else o = a[a.length - 1].innerText;
                            else if (1 === getContains("span", "TODAY").length) o = "TODAY";
                            else o = "Go"
                        } else 
                            o = "Go";

                        if ((d = getByClass("_2r1fJ")).length >= 1) 
                            var d = !0;
                        else if (d = getBySelector("span[data-icon='ptt']")) 
                            d = !0;
                        else 
                            d = !1;
                        
                        if (getById("xoxo").remove(), e) 
                            e.click(), s.rows[r - 1].cells[2].innerHTML = "offline";
                        else if (i)
                            if (t)
                                if ("TODAY" === o) s.rows[r - 1].cells[2].innerHTML = "skip";
                                else if (n) {
                            if (l) try {                           
                               } catch (e) {}
                            if (i) i.click(), s.rows[r - 1].cells[2].innerHTML = "send";
                            else s.rows[r - 1].cells[2].innerHTML = "error: w8 next update"
                        } else {
                            if (i) i.click(), s.rows[r - 1].cells[2].innerHTML = "send";
                            else s.rows[r - 1].cells[2].innerHTML = "error: w8 next update"
                        } else if (n) {
                            if (l) try {
                               } catch (e) {}
                            if (i) i.click(), s.rows[r - 1].cells[2].innerHTML = "send";
                            else s.rows[r - 1].cells[2].innerHTML = "error: w8 next update"
                        } else {
                            if (i) i.click(), s.rows[r - 1].cells[2].innerHTML = "send";
                            else s.rows[r - 1].cells[2].innerHTML = "error: w8 next update"
                        } else if (!1 === i)
                            if (d)
                                if (t)
                                    if ("TODAY" === o) s.rows[r - 1].cells[2].innerHTML = "skip";
                                    else if (n) {
                            if (l) try {
                                s.rows[r - 1].cells[2].innerHTML = "send"
                            } catch (e) {}
                        } else s.rows[r - 1].cells[2].innerHTML = "Empty";
                        else if (n) {
                            if (l) try {
                                s.rows[r - 1].cells[2].innerHTML = "send"
                            } catch (e) {}
                        } else s.rows[r - 1].cells[2].innerHTML = "Empty";
                        else s.rows[r - 1].cells[2].innerHTML = "block";
                        else s.rows[r - 1].cells[2].innerHTML = "error: w8 next update";
                        
                        if (r>=s.rows.length){
                            activatePanelPlayStop(false);
                            initAndShowReportPanel(true);
                        }
                    }, 
                    2500);

                    $("#wa_count").text(r + 1 + " from " + g.length); 
                    r++; 

                    ////getById("getImgs").disabled  getById("s_img").disabled =

                    if ( wPro.timerSend ) { wPro.timerSend.dispose();  }
                    
                    e <= 1 && (getById("s_tdy").disabled = getById("insert_wa").disabled =  getById("text-description").disabled = getById("text-send").disabled =  getById("capt").disabled = !1); 
                    --e && ( wPro.timerSend = new wPro.Timer( c , f + "000" ) )
                                     
            }()
        }()
    };

    getById("uploadCSV").onclick = function () {
        //getById("DK").style.display="block";
        getById("csvFileInput").click();
    };

    function onChangeCaption(e){
        wPro.attach_index_caption!=-1 &&  
        ////wPro.attach_files[wPro.attach_index_caption] &&
        ////(wPro.attach_files[wPro.attach_index_caption].caption) &&
        (wPro.attach_files[wPro.attach_index_caption].caption=e.target.value);
    }

    function onRemoveAttachAtIndex(i) {
        getById("lbltxt_"+i).innerText="###";
        getById("attach_img_"+i).src="";

        setAttachIcon(i,"fa-plus-square" );

        setModeOnAttached(i, "sel_no_attach");

        var new_attach_files=[];

        var count=0;
        for (var ii=0; ii<wPro.attach_files.length;ii++)
            if (wPro.attach_files[ii] && ii!=i)
            ////if (wPro.attach_files[ii] && wPro.attach_files[ii].files!=undefined && ii!=i)
                new_attach_files[ii]=wPro.attach_files[ii];

        wPro.attach_files=new_attach_files;
        
        //updateAttachFileStatus(-1);
    }

    function setAttachIcon(i,mode,extraclass) {
        if (extraclass==undefined)
            extraclass="attach_i far fa-5x "
        getById("attach_i_"+i).setAttribute("class",extraclass + mode);
    }

    function setModeOnAttached(i, mode, extraclass ) {
        if (extraclass==undefined)
            extraclass="attach_div2 ";
        getByClass("attach_div2")[i].setAttribute("class",extraclass + mode);
    }

    function onPickAttachFile(files) {
        if (!(files || files.length>0))
            return;
        
        var num_slot_files=getByClass("attach_div2").length;
     
        var count=0; //name, size
        ////for (var i=wPro.attach_index; i<num_slot_files-wPro.attach_index && count<files.length   ;i++){
        for (var i=wPro.attach_index; i<num_slot_files && count<files.length   ;i++){
            if (wPro.attach_files[i]==undefined)
                wPro.attach_files[i]={"file":"","caption":""};
            var f = wPro.attach_files[i].file = files[count++];           
            putIconOrImg(f,i);
        }

        getById("attach_file_diag").value="";
        //updateAttachFileStatus(i-1);

        wPro.attach_index=-1;
    }

    function getFileInfo(n){
        var separator= n.indexOf('\\')>-1?"\\":"/";
        ////n=n.split(separator)
        var path = n.split(separator);
        var name = path.pop();
        var name=name.split(".");
        var ext=(name.pop()).toLowerCase();
        path=path.join(separator);

        return {"ext":ext, "path":path, "name":name[0] }
    }


    function putIconOrImg(f , i){ //file , index
        ////var name_ext=f.name.split(".");
        ////var ext=(name_ext.pop()).toLowerCase();
        ////var fullname = name = name_ext.join(".");
        var fi=getFileInfo(f.name);
        var ext=fi.ext;
        var fullname = name = (fi.name+"."+fi.ext);

        if (fullname.length>30)
            name=name.substr(0,30)+"...";
        getById("lbltxt_"+i).innerText=name;
            
        var format_class;

        if (wPro.formats["photo"].indexOf(ext)>-1){
            //Include the photo in preview.
            format_class="photo";
        } else if (wPro.formats["img"].indexOf(ext)>-1){
            format_class="fa-file-image";
        }else if (wPro.formats["video"].indexOf(ext)>-1){
            format_class="fa-file-video";
        }else if (wPro.formats["audio"].indexOf(ext)>-1){
            format_class="fa-file-audio";
        }else if (wPro.formats["program"].indexOf(ext)>-1){
            format_class="fa-file-code";
        }else if (wPro.formats["compress"].indexOf(ext)>-1){
            format_class="fa-file-archive";
        }else if (wPro.formats["pdf"].indexOf(ext)>-1){
            format_class="fa-file-pdf";
        }else if (wPro.formats["word"].indexOf(ext)>-1){
            format_class="fa-file-word";
        }else if (wPro.formats["excel"].indexOf(ext)>-1){
            format_class="fa-file-excel";
        }else if (wPro.formats["powerpoint"].indexOf(ext)>-1){
            format_class="fa-file-powerpoint";
        }else if (wPro.formats["txt"].indexOf(ext)>-1){
            format_class="fa-file-alt";
        } else {
            format_class="fa-question-circle";
        }
        if (format_class=="photo"){
            getById("attach_img_"+i).src=URL.createObjectURL(f);
            setModeOnAttached(i,"sel_attach_img" );      
               
        }else{
            setModeOnAttached(i,"sel_attach_not_img");
            setAttachIcon(i,format_class);
        }
    }

    function showReportPanel(show_){   
        document.getElementById("table_rpt").style.display = (show_==true) ? "table" : "none"; 
    }

    function getRptValueFromIndex(index){ 
        
        var row_rpt_name=(getById("tr_rpt_"+index).innerText.split(":")[0]); //.cells[0].split(":")[0]
        row_rpt_name=row_rpt_name.toLowerCase().replace(" ","").replace("-","").replace("_","");

        for (var key in wPro.rpt_data){
            if (key.toLowerCase().substr(0,3)==row_rpt_name.substr(0,3))
                return wPro.rpt_data[key];
        }
        return [];
    }

    function initAndShowReportPanel(show_){
        if (!show_) {
            wPro.rpt_data={"all":[],"not_send":[]};
        }
        else{
            var data_rows = getById("text-description").value.split("\n");
            var trs_rpt_res = document.querySelectorAll("#myTable_Wa tr");
            var len = trs_rpt_res.length ; 
            if (data_rows.length!=len){
                console.log("Data row inf != Row result"+ data_rows.length + "::" + len);
                len = Math.min( len , data_rows.length )
            }
            for (var i=0;i<len;i++) {
                var tr=trs_rpt_res[i];
                var res=tr.cells[2].textContent;
                if (wPro.rpt_data[res]==undefined) {
                    wPro.rpt_data[res]=[ data_rows[i] ];
                } else {
                    wPro.rpt_data[res].push(  data_rows[i] );
                }
                wPro.rpt_data["all"].push(data_rows[i]);
                if (res!="send")
                    wPro.rpt_data["not_send"].push(data_rows[i]);
            }
            tr_rpt=document.querySelectorAll("#table_rpt tr");
            for ( i=1; i<tr_rpt.length-1; i++ ){  //First and last row, this work just for decorative purpose, to add empty spaces
                tr=tr_rpt[i];
                var res=getRptValueFromIndex(i-1);    
                // console.dir(res)            ;
                if (res["length"]>0){
                    tr.style.display="table-row";
                    document.querySelector("#tr_rpt_"+(i-1) + " .val1").textContent = res["length"];
                    var pctg=(((res["length"]/len)*100)+"")
                    if (parseInt(pctg)<100) pctg=pctg.slice(0,2); 
                    document.querySelector("#tr_rpt_"+(i-1) + " .val2").textContent = pctg+"%";
                }else{
                    tr.style.display="none";
                }
            }
        }
        showReportPanel(show_); //this only hide or show the panel.
    }

    function onClickRptOption(e){
        var tr=e.currentTarget;
        if ((tr==undefined) || (!tr.id) )return;
        var numid=tr.id.split("_").pop();
        var data=getRptValueFromIndex(numid);
        var header=wPro.csv_header;
        if (Array.isArray(header))
            header=header.join(",");
        // missing the name, here
        var name = tr.innerText.split(":")[0] + "_" + getDateTime();
        var content=(header && header.trim()!="") ?header+"\n" + data.join("\n") : "" + data.join("\n") ;
        downloadRpt(content,name + ".csv" )
    }

    function downloadRpt(content="empty",filename="notset.txt", contentType="text/plain;charset=UTF-8"){
        var a = document.createElement('a');
        const file = new Blob([content], {type: contentType, encoding:"UTF-8",});
        
        a.href= URL.createObjectURL(file);
        a.download = filename;
        a.click();

        URL.revokeObjectURL(a.href);
    }
    
    function activatePanel(v, panel) {
        var activate_css = v ? "enable-panel" : "disable-panel";

        for (var i of ["enable-panel","disable-panel" ])
            getById(panel).classList.remove(i);
        
        getById(panel).classList.add(activate_css);
    }

    function activatePanelPlayStop(v) {
        activatePanel(v, "panel-play-stop" );

        //wPro.timerSend=undefined;

        var playpausei=getById("play-pause").getElementsByTagName("i")[0];   
        for (var i of ["fa-play-circle","fa-pause-circle" ])
            playpausei.classList.remove(i);
        if (v)
            playpausei.classList.add("fa-pause-circle");
        else
            playpausei.classList.add("fa-play-circle");
        
        if ( wPro.timerSend ) { wPro.timerSend.dispose(); }
    }

    function onStop(e) {
        activatePanelPlayStop(false);
        initAndShowReportPanel(true);
    }

    function onPlayPause(e) {
        var playpausei=getById("play-pause").getElementsByTagName("i")[0]; 
        
        var playpauseclass=playpausei.classList.contains("fa-play-circle")?"fa-pause-circle":"fa-play-circle" ;

        //if (playpauseclass=="fa-pause-circle")
        //else

        //for (var i=0;i<wPro.timers.length;i++)
            //wPro.timers[i][ playpauseclass=="fa-pause-circle" ? "pause" : "resume"  ];
        wPro.timerSend[playpauseclass=="fa-pause-circle" ? "resume" : "pause"]();
        
        for (var i of ["fa-play-circle","fa-pause-circle" ])
            playpausei.classList.remove(i);        
        playpausei.classList.add(playpauseclass) 
    }

    wPro.Timer = function(callback, delay) {

        var timerId, start, remaining = delay;
    
        this.pause = function() {            
            window.clearTimeout(timerId);
            timerId = null;
            remaining -= Date.now() - start;
        };
    
        this.resume = function() {            
            if (timerId) {
                return;
            }
            start = Date.now();
            window.clearTimeout(timerId);
            timerId = window.setTimeout(callback, remaining);
        };

        this.stop= function(){          
            window.clearTimeout(timerId);  
            callback=null;
            timerId, start, remaining,delay =0 
        }

        this.dispose= function(){
            this.stop();
       }

        this.resume();
    };

    function setWidthResizerPanel(v){
        var parent = document.getElementById("resizer").parentNode;  
        parent.style.width = v + "px";
        //sessionStorage.setItem(v);
    }

    function resizeDiv(e){
        var parent = document.getElementById("resizer").parentNode;     
        var dx = wPro.m_pos - e.x;
        wPro.m_pos = e.x;
        setWidthResizerPanel((parseInt(getComputedStyle(parent, '').width) + dx));
    }
    
    function ready(window_ready_fn) { //this function only verify that run the ready function until load.
        if (document.readyState != 'loading') {
            window_ready_fn();
        } else if (document.addEventListener) {
          document.addEventListener('DOMContentLoaded', window_ready_fn);
        } else {
          document.attachEvent('onreadystatechange', function() {
            if (document.readyState != 'loading')
            window_ready_fn(); 
          });
        }
    }
    window.ready(function() {	//send to the function ready this function.	
        
		var base_uri=new URL(window.location.origin).origin;		
        if(!base_uri.includes("whatsapp")) return;

        wPro.timer4loadmodules = setInterval( checkAppFull4LoadModules, 1e3 );
        //updateAttachFileStatus(-1);
        activatePanelPlayStop(false);

        getById("myTable_Wa").innerHTML = "";
        tr_rpt=document.querySelectorAll("#table_rpt tr");
        for ( i=1; i<tr_rpt.length-1; i++ ){  //dont add event to first and last row, this work just for decorative purposes
            tr=tr_rpt[i];
            tr.id="tr_rpt_"+(i-1);
            tr.addEventListener("click",onClickRptOption)
        }

        // RESIZE

        var resize_el = document.getElementById("resizer");
        
        resize_el.addEventListener("mousedown", function(e){
            wPro.m_pos = e.x;
            document.removeEventListener("mousemove", resizeDiv, false);
            document.addEventListener("mousemove", resizeDiv, false);
        }, false);

        document.addEventListener("mouseup", function(){
            document.removeEventListener("mousemove", resizeDiv, false);
        }, false);
        
        // PLAY-PAUSE

        getById("play-pause").addEventListener("click",onPlayPause);
        getById("stop").addEventListener("click",onStop);

        // LEGACY except where i use wPro.panelWidth

        if (getBaseUrl().includes("whatsapp")) {
            wPro.panelWidth = sessionStorage.getItem("wa_num")?sessionStorage.getItem("wa_num"):386;

            var e = sessionStorage.getItem("wa_num");
            var t = sessionStorage.getItem("wa_psn");
            var n = sessionStorage.getItem("wa_capt");
             e && ($("#text-description").val("" + e), $("#text-send").val("" + t), $("#capt").val("" + n), sessionStorage.setItem("wa_num", e), sessionStorage.setItem("wa_psn", t), sessionStorage.setItem("wa_capt", n), setWidthResizerPanel(wPro.panelWidth) )
        }
    });
    
    showReportPanel(false);
    
} catch(e) {
    console.error(e)
    //alert(e);
}


