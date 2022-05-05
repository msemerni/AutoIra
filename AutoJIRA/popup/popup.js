const copyBtn = document.getElementById("copyButton");
const pasteBtn = document.getElementById("pasteButton");

// When the button is clicked, inject copyFromEditor, pasteToJira into current page
copyBtn.addEventListener("click", async () => {
  let [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
console.log([tab]);
  chrome.scripting.executeScript({
    target: { tabId: tab.id },
    function: copyFromEditor,
    // file: 'snowfall2020.js'
  });
});

pasteBtn.addEventListener("click", async () => {
  let [tab] = await chrome.tabs.query({ active: true, currentWindow: true });

  chrome.scripting.executeScript({
    target: { tabId: tab.id },
    function: pasteToJira,
    // file: 'snowfall2020.js'
  });
});


// The body of these functions will be execuetd as a content script inside the
// current page
const copyFromEditor = () => {
  const venueObjKey =  document.querySelectorAll(".tag-list .key-wrap>input" );
  const venueObjValue =  document.querySelectorAll(".tag-list .value-wrap>input" );

  console.log(venueObjKey);
  console.log(venueObjValue);

  let venueObject = {};

  for (let i = 0; i < venueObjValue.length; i++) {
    venueObject[venueObjKey[i].value] = venueObjValue[i].value;
  };
  console.log(venueObject);
  // localStorage.setItem("venueObj", JSON.stringify(venueObject));
  //return venueObject;

  /////// COPY
  const editorDiv = document.querySelector(".sep-top");
  const bufferDivCopy = document.createElement("textarea");
  const venueObjectJSON = JSON.stringify(venueObject);
  bufferDivCopy.innerHTML = venueObjectJSON;
  editorDiv.append(bufferDivCopy);
  bufferDivCopy.select();
  document.execCommand("copy");
}

const pasteToJira = async () => {
  try {
    console.log("pasted venueObject to Jira");
    // console.log(venueObject);
    const permission = await navigator.permissions.query({ name: 'clipboard-read' });
    console.log(permission);

    permission.onchange = (e) => {
      console.log(e);

    }
  
    if (permission.state === 'denied') {
      throw new Error('Not allowed to read clipboard.');
    }
      navigator.clipboard.readText()
        .then(text => {
          const jiraDiv = document.querySelector(".cGzqVy");
          const bufferDivPaste = document.createElement("textarea");
          bufferDivPaste.className = "bufferDivPaste";
          bufferDivPaste.value = text;
          jiraDiv.append(bufferDivPaste);
          bufferDivPaste.focus();
          alert(text);
          console.log(text);
        })
        .catch(err => {
          console.dir(err);
        });
  } catch (error) {
    console.log(error);
  }
 

};
  /////// PASTE

  




//////////////////////////////////////////////

// // const jiraFields = document.querySelectorAll(".gbXyYv");
// // console.log(jiraFields);

// // const jiraFieldsContainer = document.querySelector(".cGzqVy");
// // console.log(jiraFieldsContainer);

// // for (let i = 0; i < jiraFields.length; i++) {
// //   console.log(jiraFields[i].innerText);

// //   if (jiraFields[i].innerText.includes("Category")) {
// //     console.log(jiraFields[i]);
// //     console.log("ЭТО КАТЕГОРИЯ");

// //     let jiraFieldValue = jiraFields[i].querySelector(".kLiHRY");
// //     console.log(jiraFieldValue);

// //     let key = jiraFields[i].querySelector(":first-child").innerText;
// //     let val = jiraFieldValue.querySelector(":first-child").innerText;
// //     console.log(`Значение поля ${key} = ${val}`);


// //     let machineEvent = new Event("click",
// //       { bubbles: true })
// //     jiraFieldValue.dispatchEvent(machineEvent)
// //     jiraFieldValue.onclick = someFunc;

// //     jiraFieldValue.click();


// //     function someFunc() {

// //       console.log("someFunc");
// //     }

// //     let jiraFieldValueInput = document.querySelectorAll(".bfCuIo");
// //   }
// // }



