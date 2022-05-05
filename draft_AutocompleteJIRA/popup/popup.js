console.log("Я консоль лог");
let copyBtn = document.getElementById("copyButton");
let pasteBtn = document.getElementById("pasteButton");
copyBtn.addEventListener("click", () => {
  // copyFromEditor();
  console.log("button-copy");
});
pasteBtn.addEventListener("click", () => {
  pasteToJira();
});


let tabID;
chrome.tabs.onActivated.addListener(function (activeInfo) {
  tabID = activeInfo.tabId; // my code
  chrome.tabs.get(activeInfo.tabId, function (tab) {
    y = tab.url;
    console.log("you are here: " + y);
    console.log(tab);
    chrome.windows.get(tab.windowId, function (win) {
      console.log(win); // THIS IS THE WINDOW OBJECT

      chrome.tabs.executeScript(
        //// ПРОВЕРКА: тут надо проверку на какой вкладке находишься. в зависимости от этого
        //// выполнять тот или другой метод (копи или пасте)
        // tabs[0].id,
        tab.tabID,
        // { code: 'console.log("KONSOLE ${tabID}")' }
        {
          file: "./content_scripts/end.js",
        }
      );

    });

    // chrome.tabs.query({ active: true, currentWindow: true }, tabs => {
    //     chrome.tabs.executeScript(
    //         tabs[0].id,
    //         { code: 'var s = document.documentElement.outerHTML; chrome.runtime.sendMessage({action: "getSource", source: s});' }
    //     );
    // });




  });
});

// chrome.tabs.onUpdated.addListener((tabId, change, tab) => {
//     if (tab.active && change.url) {
//         console.log("you are here: " + change.url);
//     }
// }); 


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
  alert(venueURL);
  // window.close();

  //// visualizationURL = `https://storage.googleapis.com/data-analysis-reports/vd_vis/20220424%20075842.468720%20Bobbers%20Tap%20${venueObject["oid:pl"]}%20200.0%20start%2020220301%20end%2020220331?Expires=1658563123&GoogleAccessId=689760566032-m0oc5b5soasd2bc300dsoggera29ko2i%40developer.gserviceaccount.com&Signature=LSaN5i9b828nkNSa9mYsKqFJPl2cpY2P05Na4Jb%2B82HyUXKefBjFLZxlKR93wx2vFl%2F4zc%2FyKFgw%2FQn%2FqB8MOF6%2F532irSKswbWJnghZePTTumxOU0vsGWS%2BwD9llP8057BfawdqBdKHNlSf3W0O4cgXgXcrBL3OMNBCkrVGdC4%3D`
  ////// добавить в visualizationURL радиус (пр. 200м) и др. параметры как переменные

  console.log(venueObject);
  console.log(fullVenueAddr);
  console.log(venueURL);
}

function pasteToJira() {

  alert("Pasted");

  document.addEventListener('click', e => {
    console.log("**************");
    console.log(e.target);
    console.log("++++++++++++++");
  })
  // document.addEventListener('click', e => {
  //     console.log(e.currentTarget);
  // })
  //////

  const jiraFields = document.querySelectorAll(".gbXyYv");
  console.log(jiraFields);

  const jiraFieldsContainer = document.querySelector(".cGzqVy");
  console.log(jiraFieldsContainer);

  for (let i = 0; i < jiraFields.length; i++) {
    console.log(jiraFields[i].innerText);

    if (jiraFields[i].innerText.includes("Category")) {
      console.log(jiraFields[i]);
      console.log("ЭТО КАТЕГОРИЯ");

      let jiraFieldValue = jiraFields[i].querySelector(".kLiHRY");
      console.log(jiraFieldValue);

      let key = jiraFields[i].querySelector(":first-child").innerText;
      let val = jiraFieldValue.querySelector(":first-child").innerText;
      console.log(`Значение поля ${key} = ${val}`);

      jiraFieldValue.click();

      // let jiraFieldValueInput = document.querySelector(".bfCuIo");
      // console.log(`Категория: ${jiraFieldValueInput.value}`);
      // jiraFieldValueInput.click();


      setTimeout(function () {
        let jiraFieldValueInput = document.querySelectorAll(".bfCuIo");
        console.log(jiraFieldValueInput);
        jiraFieldValueInput[0].click();
        // jiraFieldValueInput[0].classList = "focus-visible";
        jiraFieldValueInput[0].focus();
        // jiraFieldValueInput[0].value = "888";

        const event = {
          target: {
            value: "9999",
            // validationMessage: "invalid..."
          }
        };

        // jiraFieldValueInput[0].__reactEventHandlers$idst5qaunsh.onChange(event);
        jiraFieldValueInput[0]. __reactEventHandlers$heoklt2ukj.onChange(event);

        jiraFieldValueInput[0].focus();
      }, 2000)

      // this.onChange = t => { const { type: n } = this.props; 
      // let a; if ("number" === n) "" === t.target.value ? a = null : (a = Number(t.target.value), this.setState({ displayValue: t.target.value })); 
      // else if ("object" === n) 
      // try { a = JSON.parse(t.target.value) } 
      // catch (e) { a = t.target.value } 
      // else a = t.target.value; "url" === n && this.setState({ showValidationMessage: !1, invalidMessage: t.target.validationMessage }), this.props.onChange(a) }

      let jiraFieldValueBtnApply = document.querySelector(".iNYbiH");
      // let jiraFieldValueBtn = document.querySelectorAll(".doKTJP");

      setTimeout(function () {
        jiraFieldValueBtnApply.click();
      }, 4000)

      // console.log(jiraFieldValueInput);
      // console.log(jiraFieldValueInput[0]);
      // console.log(jiraFieldValueBtnApply);
      // console.log(jiraFieldValueBtn);

      // jiraFieldValueInput.value = "777";
      // // jiraFieldsContainer.click();
      // class="EditButton-sc-1v6bv8a-0 doKTJP".click(); // ?????
    }
  }

}