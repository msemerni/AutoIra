try {
  const currentURL = window.location.href;
  const workVEURL = "http://venues.placer.team:8080/";
  const learnVEURL = "http://staging-venues.placer.team:8080/";
  const venueObject = {};
  const oId = "oid:pl";
  const addrCity = "addr:city";
  const addrPostcode = "addr:postcode";
  const addrState = "addr:state";
  const addrStreet = "addr:street";
  const analyticsUrl = "analytics:url:pl";

  //// copy tags from Venues Editor to venueObject
  if (currentURL.indexOf(workVEURL) === 0 || currentURL.indexOf(learnVEURL) === 0) {

    const venueObjKey = document.querySelectorAll(".tag-list .key-wrap>input");
    const venueObjValue = document.querySelectorAll(".tag-list .value-wrap>input");

    for (let i = 0; i < venueObjKey.length; i++) {
      venueObject[venueObjKey[i].value] = venueObjValue[i].value;
    };

    const zoomToSelectionBtn = document.querySelector(".zoom-to-selection-control>.disabled");

    if (!venueObject[oId] || zoomToSelectionBtn) {
      copyToClipboard({});
      throw new Error("Pick a point first\n");
    }

    venueObject.fullAddress = `${venueObject[addrStreet]}, ${venueObject[addrCity]}, ${venueObject[addrState]} ${venueObject[addrPostcode]}`;
    try {
      venueObject.analyticsUrlCutted = venueObject[analyticsUrl].substring(0, venueObject[analyticsUrl].indexOf("?"));
    } catch {
      alert(`Missing/wrong ${analyticsUrl}`);
    }
    venueObject.venueURL = currentURL;

  } else {
    throw new Error(`Switch to Venues Editor\n(${workVEURL} or\n${learnVEURL})\n`);
  }

  copyToClipboard(venueObject);

} catch (error) {
  alert(`${error}\nCopy failed!`);
}

//// Copy venueObject to Clipboard
function copyToClipboard(venueObject) {
  const bufferDivCopy = document.createElement("textarea");
  bufferDivCopy.id = "bufferDivCopy";
  bufferDivCopy.style.cssText = `
      position: absolute;
      top: -99999px;
      left: -99999px;
      z-index: -99999;
      opacity: 0;
      `;
  bufferDivCopy.innerHTML = JSON.stringify(venueObject);
  document.body.append(bufferDivCopy);
  bufferDivCopy.select();
  document.execCommand("copy");
  bufferDivCopy.remove();
}
