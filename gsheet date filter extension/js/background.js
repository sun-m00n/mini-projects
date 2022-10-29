// Initialize the extension
chrome.runtime.onInstalled.addListener(() => {
    chrome.contextMenus.create({
        "id": "sampleContextMenu",
        "title": "Sample Context Menu",
        "contexts": ["selection"]
    });
    chrome.alert("hii")
});
console.log(chrome)