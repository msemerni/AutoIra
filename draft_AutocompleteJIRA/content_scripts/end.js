console.log("1");
console.log(window.location.href);

venueObject = {};

if (window.location.href.includes("http://venues.placer.team")) {
    console.log("Это венью эдитор");
    copyFromEditor();

}

if (window.location.href.includes("https://placer.atlassian.net/browse")) {
    console.log("Это Джира");
    pasteToJira();
}

function copyFromEditor() {
    const venueObjKey =  document.querySelectorAll(".tag-list .key-wrap>input" );
    const venueObjValue =  document.querySelectorAll(".tag-list .value-wrap>input" );
  
    console.log(venueObjKey);
    console.log(venueObjValue);
  
    for (let i = 0; i < venueObjValue.length; i++) {
      venueObject[venueObjKey[i].value] = venueObjValue[i].value;
    };
    console.log(venueObject);
    // localStorage.setItem("venueObj", JSON.stringify(venueObject));
    //return venueObject;
  }
  
  function pasteToJira() {
    console.log("pasted to Jira");
    console.log(venueObject);
  }
  