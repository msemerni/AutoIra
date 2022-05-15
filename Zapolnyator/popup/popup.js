let isSafeCopyStorageValue = localStorage.getItem("isSafeCopyStorage");
if (isSafeCopyStorageValue === null) {
  localStorage.setItem("isSafeCopyStorage", "safe");
}

const copyBtn = document.getElementById("copyButton");
const pasteBtn = document.getElementById("pasteButton");
const helpButton = document.getElementById("helpButton");
const isSafeCopy = document.getElementById("isSafeCopy");
isSafeCopy.checked = Boolean(localStorage.getItem("isSafeCopyStorage"));

copyBtn.addEventListener("click", async () => {
  const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });

  if (isSafeCopy.checked) {
    chrome.scripting.executeScript({
      target: { tabId: tab.id },
      files: ['/popup/copyFromEditorSafe.js']
      // function: copyFromEditor
    });
  } else {
    chrome.scripting.executeScript({
      target: { tabId: tab.id },
      files: ['/popup/copyFromEditorUnsafe.js']
      // function: copyFromEditor
    });
  }

  window.close();
});

pasteBtn.addEventListener("click", async () => {
  const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
  chrome.scripting.executeScript({
    target: { tabId: tab.id },
    function: startScriptPaste
    // files: ['/popup/pasteToJira.js']
  });

  window.close();
});

helpButton.addEventListener("click", () => {
  alert(`
  1. Select Point in Venues Editor
     ('http://venues.placer.team:8080/...' or
     'http://staging-venues.placer.team:8080/...').
  2. Copy the data by clicking "Copy".
  3. Switch to Jira ('https://placer.atlassian.net/...').
  4. Paste the data to Jira by clicking "Paste".
    _____________________________________________
    Toggle "Check required tags" - check required tags
     and existence of values in Venues Editor:
     - name
     - address
     - category
     - opening hours
     - manually reviewed status
    _____________________________________________
     You must give browser permissions for "Clipboard";
  `);
});

isSafeCopy.addEventListener("click", () => {
  if (isSafeCopy.checked) {
    localStorage.setItem("isSafeCopyStorage", "safe");
  } else {
    localStorage.setItem("isSafeCopyStorage", "");
  }

  window.close();
});

const startScriptPaste = () => {
  const contextScript = document.createElement('script');
  contextScript.src = chrome.runtime.getURL('/popup/pasteToJira.js');
  contextScript.onload = function () {
    this.remove();
  };
  (document.head || document.documentElement).append(contextScript);
};
