chrome.runtime.onInstalled.addListener(() => {
  console.log("Extension Installed!");
});

chrome.runtime.onMessage.addListener(async (message, _sender, sendResponse) => {
  if (message.action === "readClipboard") {
    try {
      const text = await navigator.clipboard.readText();
      sendResponse({ success: true, text });
    } catch (err) {
      sendResponse({ success: false, error: err instanceof Error ? err.message : "Unknown error" });
    }
  }
  return true; 
});
