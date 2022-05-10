const copyBtn = document.getElementById("copyButton");
const pasteBtn = document.getElementById("pasteButton");

copyBtn.addEventListener("click", async () => {
  const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });

  chrome.scripting.executeScript({
    target: { tabId: tab.id },
    function: copyFromEditor
  });

  window.close();
});

pasteBtn.addEventListener("click", async () => {
  const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });

  chrome.scripting.executeScript({
    target: { tabId: tab.id },
    function: startScript
    // files: ['/popup/snowfall2020.js']
  });

  window.close();
});

const copyFromEditor = async () => {
  try {
    if (window.location.hostname.indexOf("venues.placer") === -1) {
      throw new Error("Switch to Venue Editor\n('http://venues.placer.team:8080/...' or\n'http://staging-venues.placer.team:8080/...')");
    }

    const venueObjKey = document.querySelectorAll(".tag-list .key-wrap>input");
    const venueObjValue = document.querySelectorAll(".tag-list .value-wrap>input");

    let venueObject = {};

    for (let i = 0; i < venueObjKey.length; i++) {
      venueObject[venueObjKey[i].value] = venueObjValue[i].value;
    };

    const zoomToSelectionBtn = document.querySelector(".zoom-to-selection-control>.disabled");

    if (!venueObject["oid:pl"] || zoomToSelectionBtn !== null) {
      throw new Error("First choose Placer Venue");
    }

    // console.log(venueObject);
    const bufferDivCopy = document.createElement("textarea");
    bufferDivCopy.id = "bufferDivCopy";
    bufferDivCopy.style.cssText = `
    position: absolute;
    height: 300px;
    width: 200px;
    top: -99999px;
    left: -99999px;
    z-index: -99999;
    opacity: 0;
    `;
    const venueObjectJSON = JSON.stringify(venueObject);
    bufferDivCopy.innerHTML = venueObjectJSON;
    document.body.append(bufferDivCopy);
    bufferDivCopy.select();
    document.execCommand("copy");
    bufferDivCopy.remove();
  } catch (error) {
    alert(`${error}\nCopy failed!`);
    console.dir(error);
  }
}

const startScript = async () => {
  const s = document.createElement('script');
  s.src = chrome.runtime.getURL('/popup/snowfall2020.js');
  s.onload = function () {
    this.remove();
  };
  (document.head || document.documentElement).append(s);
};
