console.log("empty");
let copyBtn = document.getElementById("copyButton");
let pasteBtn = document.getElementById("pasteButton");
copyBtn.addEventListener("click", () => {
    copyFromEditor();
});
pasteBtn.addEventListener("click", () => {
    pasteToJira();
});


function copyFromEditor() {
    let keyWrap = document.querySelectorAll(".key-wrap");
    // console.log(keyWrap);



    let venueURL;
    let visualizationURL;
    let venueObject = {};
    let fullVenueAddr;

    for (let i = 0; i < keyWrap.length; i++) {
        // console.log(`${keyWrap[i].__data__.key}: ${keyWrap[i].__data__.value}`);
        venueObject[keyWrap[i].__data__.key] = keyWrap[i].__data__.value;
    };

    fullVenueAddr = `${venueObject["addr:street"]}, ${venueObject["addr:city"]}, ${venueObject["addr:state"]} ${venueObject["addr:postcode"]}`;
    
    
    venueURL = window.location.href;
    // alert(venueURL);
    window.close();
  


    visualizationURL = `https://storage.googleapis.com/data-analysis-reports/vd_vis/20220424%20075842.468720%20Bobbers%20Tap%20${venueObject["oid:pl"]}%20200.0%20start%2020220301%20end%2020220331?Expires=1658563123&GoogleAccessId=689760566032-m0oc5b5soasd2bc300dsoggera29ko2i%40developer.gserviceaccount.com&Signature=LSaN5i9b828nkNSa9mYsKqFJPl2cpY2P05Na4Jb%2B82HyUXKefBjFLZxlKR93wx2vFl%2F4zc%2FyKFgw%2FQn%2FqB8MOF6%2F532irSKswbWJnghZePTTumxOU0vsGWS%2BwD9llP8057BfawdqBdKHNlSf3W0O4cgXgXcrBL3OMNBCkrVGdC4%3D`
    //// добавить в visualizationURL радиус (пр. 200м) и др. параметры как переменные

    console.log(venueObject);
    console.log(fullVenueAddr);
    console.log(venueURL);
    console.log(visualizationURL);
    // alert("venueObject");
    // alert("Copied");
}


function pasteToJira() {

    alert("Pasted");

    let jiraFieldName = document.querySelectorAll(".jETjDD .dylGld");
    console.log(jiraFieldName);

    let jiraFieldValue = document.querySelectorAll(".jETjDD .kLiHRY :first-child");
    console.log(jiraFieldValue);


    jiraFieldValue[28].click();
    // jiraFieldValue[28].focus();
    jiraFieldValue[28].innerHTML = "9999";

    let jiraFieldName2 = document.querySelectorAll(".bfCuIo");
    console.log(jiraFieldName2);
    jiraFieldName2[0].initialValue = "99999";
    jiraFieldName2[0].defaultValue = "99999";
    jiraFieldName2[0].value = "99999";

    jiraFieldName2[0].__reactEventHandlers$da6m19i6hba.value = "99999";
    jiraFieldName2[0]._wrapperState.initialValue = "99999";


    let jiraFieldName3 = document.querySelectorAll(".iNYbiH");
    console.log(jiraFieldName3);
    jiraFieldName3[0].click();

    /////


    jiraFieldValue[28].__reactEventHandlers$da6m19i6hba.children =  "9999";

    


    jiraFieldName2[0].value = "88888";
    jiraFieldName2[0]._wrapperState.initialValue = "88888";
    jiraFieldName2[0].__reactEventHandlers$da6m19i6hba.value = "88888"
    jiraFieldName2[0].defaultValue = "88888";
    



    // jiraFieldValue[28].addEventListener('keydown',()=> alert(1));
    // let evt = new KeyboardEvent('keydown', {'keyCode':13, 'which':13});
    // jiraFieldValue[28].dispatchEvent(evt);


    // let jiraFieldName222 = document.querySelectorAll(".doKTJP");
    // jiraFieldName222[0].click();

    // // let reh = jiraFieldValue[28].__reactEventHandlers$fecl81k2rtg.children;
    // // console.log(reh);
    // // reh = "имя"
    // // console.log(reh);


    


    // for (let i = 0; i < jiraFieldName.length; i++) {

    //     // console.log(`${jiraFieldName[i].innerText}: ${jiraFieldValue[i].innerText}`);
    //     if (jiraFieldName[i].innerHTML === "Entity ID") {
            
    //     }
    // }



}