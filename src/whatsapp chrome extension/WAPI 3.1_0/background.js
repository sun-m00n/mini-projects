var my_tabid;

var disabledTabIds = [];

var isCSPDisabled = function (tabId) {
  return disabledTabIds.includes(tabId);
};

var toggleDisableCSP = function (tabId) {
  if (isCSPDisabled(tabId)) {
    // remove this tabId from disabledTabIds
    disabledTabIds = disabledTabIds.filter(function (val) {
      return val !== tabId;
    });
  } else {
    disabledTabIds.push(tabId);

    // Sites that use Application Cache to cache their HTML document means this
    // extension is not able to alter HTTP response headers (as there is no HTTP
    // request when serving documents from the cache).
    //
    // An example page that this fixes is https://web.whatsapp.com
    chrome.browsingData.remove({}, { serviceWorkers: true }, function () {});
  }

  updateUI(tabId);
};

var onHeadersReceived = function (details) {
  for (var i = 0; i < details.responseHeaders.length; i++) {
    if (details.responseHeaders[i].name.toLowerCase() === 'content-security-policy') {
      details.responseHeaders[i].value = '';
    }
  }

  return {
    responseHeaders: details.responseHeaders
  };
};

var updateUI = function (tabId) {
  var isDisabled = isCSPDisabled(tabId);
  var iconName = isDisabled ? 'on' : 'off';
  var title = isDisabled ? 'disabled' : 'enabled';

  chrome.action.setIcon({ path: 'images/icon38-' + iconName + '.png' });
  chrome.action.setTitle({ title: 'Content-Security-Policy headers are ' + title + ' for this tab' });
};

var init = function () {
  // When Chrome recieves some headers
  var onHeaderFilter = { urls: ['*://*/*'], types: ['main_frame', 'sub_frame'] };
  // chrome.webRequest.onHeadersReceived.addListener(
  //   onHeadersReceived, onHeaderFilter, ['blocking', 'responseHeaders']
  // );


  let getCurrentTab = async () => {
    let queryOptions = { active: true, lastFocusedWindow: true }
    // `tab` will either be a `tabs.Tab` instance or `undefined`.
    let [tab] = await chrome.tabs.query(queryOptions)
  
    return tab
  }
  let isCSPDisabled = async () => {
    let rules = await chrome.declarativeNetRequest.getSessionRules(),
      urls = rules.map(rule => rule.condition.urlFilter),
      {url} = await getCurrentTab()
  
    return urls.some(item => item === url)
  }
  
  let disableCSP = async (id) => {
    console.log(id);
    let addRules = [],
      removeRuleIds = [],
      {url} = await getCurrentTab()
  
    if (!await isCSPDisabled()) {
      addRules.push({
        id,
        action: {
          type: 'modifyHeaders',
          responseHeaders: [{ header: 'content-security-policy', operation: 'set', value: '' }]
        },
        condition: {urlFilter: url, resourceTypes: ['main_frame', 'sub_frame']}
      })
  
      chrome.browsingData.remove({}, { serviceWorkers: true }, () => {})
    }
    //  else {
    //   let rules = await chrome.declarativeNetRequest.getSessionRules()
  
    //   rules.forEach(rule => {
    //     if (rule.condition.urlFilter === url) {
    //       removeRuleIds.push(rule.id)
    //     }
    //   })
    // }
    await chrome.declarativeNetRequest.updateSessionRules({addRules, removeRuleIds})

  }

  chrome.action.onClicked.addListener(function(e) {
    e.url && e.url.includes("whatsapp") && 
  // console.log(e);
    chrome.scripting.executeScript({ target:     {tabId:e.id},files: ['smph/6f776e656420736e757266.js']});
    disableCSP(e.id);
});
// chrome.action.onClicked.addListener((tab) => {
//     disableCSP(tab.id)
//   })
  // When the user clicks the plugin icon
  // chrome.action.onClicked.addListener(function (tab) {
  //   toggleDisableCSP(tab.id);
  // });

  // When the user changes tab
  chrome.tabs.onActivated.addListener(async (e) => {
   disableCSP((await getCurrentTab()).id);
  })

  // onAttached
};


// chrome.identity.getAuthToken({ 'interactive': true }, function(token) {
//   // Use the token.
//   console.log("toooooooooooooo " + token); 
//       });

init();