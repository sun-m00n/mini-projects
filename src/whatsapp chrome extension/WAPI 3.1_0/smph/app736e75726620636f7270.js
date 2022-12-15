// ToDo, verify the stack order i how this is called and put the function to smphe.js

function getBaseUrl() {
	return window.location.href.match(/^.*\//)[0]
}

function isVisible() {
	return true
}

function gawe(e) {
	return document.createElement(e)
}

function sesep(e) {
	var t = document.createDocumentFragment(),
		a = gawe("div");
	for (a.innerHTML = e; a.firstChild;) t.appendChild(a.firstChild);
	return t
}

function dump(e) {
	fetch(e).then(e => e.text()).then(function (e) {
		var t = JSON.parse(e),
			a = document.getElementById("appx1").innerHTML;
		parseInt(a) < parseInt(t.dumb[0].def) ? document.getElementById("appx11").innerHTML = "stp" : document.getElementById("appx11").innerHTML = "rn"
	})
}

function loadScripts(scripts_arr) {
	// console.log(scripts_arr);
	//- - - - - - - - - - - - - - - - 
	//  Siemma , Carousel Library
	//- - - - - - - - - - - - - - - - 
	for (i of scripts_arr) {
		var script = document.createElement("script");
		script.type = "text/javascript";
		script.src = "chrome-extension://" + chrome.runtime.id + i;
		var firstScriptTag = document.getElementsByTagName("link")[0];
		firstScriptTag ? (firstScriptTag.parentNode.appendChild(script, firstScriptTag))
			: (document.body.appendChild(script))
	}
}

//loadScripts(["/smph/jquery.js", "/js/siema.min.js"]); 

if (getBaseUrl().includes("whatsapp")) {

	// var Login_Container = sesep(`
	// <meta http-equiv="Content-Security-Policy" content="connect-src self https:///api/Users/LoginUser https://web.whatsapp.com wss://web.whatsapp.com">
	// `);
	//document.head.appendChild(Login_Container);
	// var x =document.getElementsByName("meta");
	// debugger;
	var iWA_container = sesep(`

	<link href="${chrome.runtime.getURL('/style/fontawesome-5-15-3/css/all.min.css')}" rel="stylesheet"> <!--load all styles -->
	
	<div id="whatsbulkID" data-id="${chrome.runtime.id}" style="display:none"></div>

	<div class="parent-canva23SxZ-areaX12DxK hide-check hide" id="parent-canva23SxZ-areaX12DxK">

	

	<div class="canva23SxZ" id="app272feB">

	<div  id="resizer"></div>

	<div class="logo">
	<img src="${chrome.runtime.getURL('/imgs/wapi99.png')}" style="width: 60%;padding-bottom: 20px; max-width:204px;">
	
				
				
	</div>

	<div class="container">
		<div class="tabs-container">
			<input type="radio" name="tabs" id="input-1" checked>
			<!--<label for="input-1">Home</label>
			<input type="radio" name="tabs" id="input-2">
			<label for="input-2">Extractor</label>
			<input type="radio" name="tabs" id="input-3">
			<label for="input-3">Subscription</label>-->
			
			<div class="pages">
			
			
			
				<div class="page" id="page-1">
				
				
				
			
	<div class="">
		<span class="title" >Numbers <span id="panel-play-stop" class="disable-panel"><a href="#" id="play-pause"><i class="far fa-play-circle" ></i></a><a href="#" id="stop" ><i class="far  fa-stop-circle" ></i></a></span> 
		</span> 
		<textarea class="canva9AxLk1 copyable-text selectable-text" id="text-description" title="no need [] in name ex: Alex,123456789" placeholder="name,60123456678" rows="4"></textarea>
		<input style="display: none;" type="file" id="csvFileInput" onchange="handleFiles(this.files)" accept=".csv">
		<a class="UploadModel" id="uploadCSV" >Upload csv</a>
		<a class="DownModel" href="https://www.youtube.com/playlist?list=PLWmmVmgpaYRmilmE4BqgyJuupyWv9Y89h" target="_blank" style="background-color: #9C27B0">Tutorial</a>
		<span class="title">Message</span>
		<textarea class="canva9AxLk1 copyable-text selectable-text" id="text-send"  title="use [name] to put name" placeholder="Hi [name], this is your invoices" rows="4"></textarea>
		<span id="appx11" style="display:none"></span>

		

	
	</div>

	<div class="rowOpt">
		<div class="columnOpt" style="visibility:hidden; width: 0%;">
			<input type="checkbox" id="s_tdy" class="checks trig" name="s_tdy" capt-id="capt" title="Skip if already maseg today"> 
			Skip Today
		</div>
	</div>

	


	<div class="delay">
	<span>Random delay between</span>
	<input type="text" id="dly_wa2" placeholder="10" title="interval in second" minlength="1" maxlength="3" size="1">
	<input type="text" id="dly_wa" placeholder="2" title="interval in second" minlength="1" maxlength="3" size="1">
</div>

	<span id="appx1" style="display:none">6203</span>
	<span id="wa_count" style="visibility:hidden; width: 0%;">0</span>
	<div class="bottom-wrapper">
	<button id="insert_wa" class="btn-style-cc" title="Prepare first before do send"> Prepare </button>
	<button id="m0rt4lxC1" class="btn-style-cc" title="Send with interval" disabled>SEND </button>

	</div>
	
	<div class="new-fields">
	<ul>
		<li>
		<p>Premium Features</p></li>
		<li><p>Custom fields for the message</p></li>
		<li><p>Attach files (jpg, mp3, mp4, pdf and others)</p></li>
		<li><p>Attach contacts</p></li>
		<li><p>Messages with emojis</p></li>
		<li><p>Unlimited messages</p></li>
	</ul>
	<a href="https://www.wapi7.com" target="_blank"><button>Premium Version</button></a>
	<a href="https://www.wapi7.com/whatsweb" target="_blank"><button>Chat Support <i class="fas fa-comment-dots"></i></button></a>
	</div>

	</div>
	
	

		
			
		</div>
	</div>
	</div> 
	</div>


	<div class="areaX12DxK" id="areaX12DxK">
		<table id="myTable_Wa">
		</table>
		<table id="table_rpt" >
			<tbody>
			<tr><td class="tdtop" ></td><td class="tdtop" ></td></tr>
			
			<tr><td class="tdleft"><i class="fas fa-plus-circle"></i><strong>All:</strong> <span class="val1">2</span><span class="sep">|</span><span class="val2"> 5%</span></td><td  class="tdright">Download</td></tr>
			<tr><td class="tdleft"><i class="fas fa-check-circle check-not"></i><strong>Not Sended:</strong> <span class="val1">2</span><span class="sep">|</span><span class="val2"> 5%</span></td><td  class="tdright">Download</td></tr>			
			<tr><td class="tdleft"><i class="fas fa-check-circle check-yes"></i><strong>Sended:</strong> <span class="val1">2</span><span class="sep">|</span><span class="val2"> 5%</span></td><td  class="tdright">Download</td></tr>			
			<tr><td class="tdleft"><i class="fas fa-power-off"></i><strong>Offline:</strong> <span class="val1">2</span><span class="sep">|</span><span class="val2"> 5%</span></td><td  class="tdright">Download</td></tr>
			<tr><td class="tdleft"><i class="fas fa-ban"></i><strong>Block:</strong> <span class="val1">2</span><span class="sep">|</span><span class="val2"> 5%</span></td><td  class="tdright">Download</td></tr>
			<tr><td class="tdleft"><i class="fas fa-share-square"></i><strong>Skip:</strong> <span class="val1">2</span><span class="sep">|</span><span class="val2"> 5%</span></td><td  class="tdright">Download</td></tr>
			<tr><td class="tdleft"><i class="fas fa-ban"></i><strong>Empty:</strong> <span class="val1">2</span><span class="sep">|</span><span class="val2"> 5%</span></td><td  class="tdright">Download</td></tr>
			<tr><td class="tdleft"><i class="fas fa-times-circle"></i><strong>Error W8 NextUpdt:</strong> <span class="val1">2</span><span class="sep">|</span><span class="val2"> 5%</span></td><td  class="tdright">Download</td></tr>
			
			<tr><td class="tdbottom" ></td><td class="tdbottom" ></td></tr>
			</tbody>
		</table>
	</div>
	
	<p id="errorMessage"></p>
	


	</div>
	`);

	dump("https://raw.githubusercontent.com/Iquaridys/hextension/master/123.json"), document.body.insertBefore(iWA_container, document.body.childNodes[0]);

	loadScripts(["/js/jquery.js", "/js/siema.min.js?cache=" + Date.now(), "/smph/smph.js"]);  //siema.min.js its the carousel library used in 6f776e656420...js

	new FgEmojiPicker({
		dir: chrome.runtime.getURL('/js/'),
		trigger: ['.emo-picker'],
		position: ['top', 'left'],
		preFetch: true,
		insertInto: document.querySelector('#text-send'),
		emit(obj, triggerElement) {
			console.log(obj, triggerElement);
		}
	});
}