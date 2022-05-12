try {
  const currentURL = window.location.href;
  const venueObject = {};

  //// copy from Venue Editor
  if (currentURL.indexOf("http://venues.placer.") === 0 || currentURL.indexOf("http://staging-venues.placer.") === 0) {

    const venueObjKey = document.querySelectorAll(".tag-list .key-wrap>input");
    const venueObjValue = document.querySelectorAll(".tag-list .value-wrap>input");

    for (let i = 0; i < venueObjKey.length; i++) {

      if (([venueObjKey[i].value] == "name" && !venueObjValue[0].value) ||
        ([venueObjKey[i].value] == "addr:city" && !venueObjValue[i].value) ||
        ([venueObjKey[i].value] == "addr:postcode" && !venueObjValue[i].value) ||
        ([venueObjKey[i].value] == "addr:state" && !venueObjValue[i].value) ||
        ([venueObjKey[i].value] == "addr:street" && !venueObjValue[i].value) ||
        ([venueObjKey[i].value] == "category:pl" && !venueObjValue[i].value) ||
        ([venueObjKey[i].value] == "opening_hours:pl" && !venueObjValue[i].value) ||
        ([venueObjKey[i].value] == "manually_reviewed_status:pl" && !venueObjValue[i].value)) {
        throw new Error("Value in required tag is empty");
      }
      venueObject[venueObjKey[i].value] = venueObjValue[i].value;
    };

    const zoomToSelectionBtn = document.querySelector(".zoom-to-selection-control>.disabled");

    if (!venueObject["oid:pl"] || zoomToSelectionBtn !== null) {
      throw new Error("Pick a point first");
    }

    if (!venueObject.hasOwnProperty("name") || !venueObject.hasOwnProperty("addr:city") || !venueObject.hasOwnProperty("addr:postcode") ||
      !venueObject.hasOwnProperty("addr:state") || !venueObject.hasOwnProperty("addr:street") || !venueObject.hasOwnProperty("category:pl") ||
      !venueObject.hasOwnProperty("opening_hours:pl") || !venueObject.hasOwnProperty("manually_reviewed_status:pl")) {
      throw new Error("Venue has missing required tag");
    }

    venueObject.fullAddress = `${venueObject["addr:street"]}, ${venueObject["addr:city"]}, ${venueObject["addr:state"]} ${venueObject["addr:postcode"]}`;
    venueObject.analyticsUrlCutted = venueObject["analytics:url:pl"].substring(0, venueObject["analytics:url:pl"].indexOf("?"));
    venueObject.venueURL = currentURL;

    //// copy from Google Maps
  } else if (currentURL.indexOf("https://www.google.com/maps/") === 0) {

    if (currentURL.indexOf("https://www.google.com/maps/place/") === -1) {
      throw new Error("Pick a point first");
    }

    const shareBtn = document.querySelector("button[data-value='Share']");
    shareBtn.click();
    shareBtn.click();
    console.dir(shareBtn);

    const shareBtnLinkInput = this.find("#modal-dialog");
    console.dir(this);
    console.dir(shareBtnLinkInput);
    // venueObject.googleMapLink = shareBtnLinkInput.value;

  } else {
    throw new Error("Switch to Venue Editor\n('http://venues.placer.team:8080/...' or\n'http://staging-venues.placer.team:8080/...') or\nGoogle Maps ('https://www.google.com/maps/...')");
  }

  //// Copy venueObject to Clipboard
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


} catch (error) {
  alert(`${error}\nCopy failed!`);
  console.dir(error);
}
