const copyBtn = document.getElementById("copyButton");
const pasteBtn = document.getElementById("pasteButton");
// const myTextarea = document.getElementById("myTextarea");
// const pasteCodeBtn = document.getElementById("pasteCodeBtn");
// myTextarea.style.cssText = `
// opacity: 0;
// `;
// pasteCodeBtn.addEventListener("click", () => {
//   myTextarea.select();
//   document.execCommand("copy");
// });

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
    function: addBtn
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

const pasteToJira = async () => {
  try {
    if (window.location.hostname.indexOf("placer.atlassian") === -1) {
      throw new Error("Switch to Jira ('https://placer.atlassian.net/...')");
    }

    localStorage.removeItem("venueObject");

    const permission = await navigator.permissions.query({ name: 'clipboard-read' });

    if (permission.state === "denied") {
      throw new Error("Not allowed to read clipboard.");
    }
    else if (permission.state === 'prompt') {
      throw new Error("Allow permission for clipboard.");
    }

    navigator.clipboard.readText()
      .then(textInClipboard => {
        localStorage.setItem("venueObject", textInClipboard);

        let venueObject = localStorage.getItem("venueObject");
        // console.log(venueObject);
        ///////////////////////////////////////////////////////////////////////////
        const jiraFields = document.querySelectorAll(".gbXyYv");

        for (let i = 0; i < jiraFields.length; i++) {
          if (jiraFields[i].innerText.includes("Category")) {
            console.log("ЭТО КАТЕГОРИЯ");
            document.addEventListener('click', e => {
              console.log(">>>>>>>>>>>>>>");
              console.log(e.target);
              console.dir(e.target);
              console.log("<<<<<<<<<<<<<<");
            })

            let jiraFieldValueDiv = jiraFields[i].querySelector(".kLiHRY");
            jiraFieldValueDiv.click();

            let jiraFieldValueInput = document.querySelectorAll(".bfCuIo");
            jiraFieldValueInput[0].focus();
            jiraFieldValueInput[0].click();
            // jiraFieldValueInput[0].value = "55555"
            console.log(jiraFieldValueInput);

            const inputKeys = Object.keys(jiraFieldValueInput[0]);
            console.log(inputKeys);
          }
        }
        //////////////////////////////////////////////////////////////////////////
      })
      .catch((error) => {
        alert(`${error}\nPaste failed`);
        console.dir(error);
      });

  } catch (error) {
    alert(`${error}\nPaste failed!`);
    console.dir(error);
  }
};

        //////////////////////////////////////////////////////////////////////////
        //////////////////////////////////////////////////////////////////////////
        //////////////////////////////////////////////////////////////////////////
        //////////////////////////////////////////////////////////////////////////


function addBtn() {

  // let meta = document.createElement("meta");
  // document.head.append(meta);
/* <meta https-equiv="Content-Security-Policy" content="default-src *; style-src 'self' 'unsafe-inline'; script-src 'self' 'unsafe-inline' 'unsafe-eval' https://placer.atlassian.net"> */
//   let actualCode =`
// const jiraFields = document.querySelectorAll(".gbXyYv");
    
// for (let i = 0; i < jiraFields.length; i++) {

//   if (jiraFields[i].innerText.includes("Category")) {
//     console.log("ЭТО КАТЕГОРИЯ");

//     let jiraFieldValueDiv = jiraFields[i].querySelector(".kLiHRY");
//     jiraFieldValueDiv.click();
//     jiraFieldValueDiv.focus();
//     console.log(jiraFieldValueDiv);
    
//     let jiraFieldValueInput = document.querySelectorAll(".bfCuIo");
//     console.log(jiraFieldValueInput);
//     jiraFieldValueInput[0].click();
//     jiraFieldValueInput[0].focus();
//     setTimeout(function () {
//       let jiraFieldValueInput = document.querySelectorAll(".bfCuIo");
//       console.log(jiraFieldValueInput);
//       const inputKeys = Object.keys(jiraFieldValueInput[0]);
//       console.log(inputKeys);
//     }, 2000)
    
//   }
// }`

const s = document.createElement('script');
s.src = chrome.runtime.getURL('/popup/snowfall2020.js');
s.onload = function() {
    this.remove();
};
(document.head || document.documentElement).append(s);

  // const script = document.createElement('script');
  // script.textContent = actualCode;
  // (document.head || document.documentElement).append(script);
  // script.remove();

////////////////////////////////////////////////////////////////////////////////////////

  // let btn = document.createElement("button");
  // btn.innerText = "кнопка";
  // btn.style.cssText = `
  // position: absolute;
  // height: 50px;
  // width: 100px;
  // top: 50%;
  // left: 50%;
  // background: green;
  // `;
  // document.body.append(btn);

  // btn.addEventListener("click", (event) => {
  //   // setTimeout(function () {

  //     document.addEventListener('click', e => {
  //           console.log("=========");
  //           console.log(e.target);
  //           console.dir(e.target);
  //           console.log("=========");
  //         })
  //     console.log("$$$$$$$$$");
  //     console.log(event);
  //     console.log("$$$$$$$$$");
    
  // document.addEventListener('click', e => {
  //   console.log("=========");
  //   console.log(e.target);
  //   console.dir(e.target);
  //   console.log("=========");
  // })

  // const jiraFields = document.querySelectorAll(".gbXyYv");

  // for (let i = 0; i < jiraFields.length; i++) {

  //   if (jiraFields[i].innerText.includes("Category")) {
  //     console.log("ЭТО КАТЕГОРИЯ");

  //     let jiraFieldValueDiv = jiraFields[i].querySelector(".kLiHRY");
  //     jiraFieldValueDiv.click();
  //     jiraFieldValueDiv.focus();
  //     console.log(jiraFieldValueDiv);

  //     let jiraFieldValueInput = document.querySelectorAll(".bfCuIo");
  //     console.log(jiraFieldValueInput);
  //     jiraFieldValueInput[0].click();
  //     jiraFieldValueInput[0].focus();
  //     setTimeout(function () {
  //       let jiraFieldValueInput = document.querySelectorAll(".bfCuIo");
  //       console.log(jiraFieldValueInput);
  //       const inputKeys = Object.keys(jiraFieldValueInput[0]);
  //       console.log(inputKeys);
  //     }, 2000)

  //   }
  // }
  //     btn.remove();
    // },1000)

  // })
  };



document.addEventListener('click', e => {
  console.log("+++++++++");
  console.log(e.target);
  console.dir(e.target);
  console.log("++++++++++");
})


////////////////
let venueObject = JSON.parse(localStorage.getItem("venueObject"));
const filteredObject = {};
for (const key in venueObject) {
  console.log(`${key} = ${venueObject[key]}`);
  if (key === "name") {
    filteredObject[key] = venueObject[key];
  }
  if (key === "category:pl") {
    filteredObject[key] = venueObject[key];
  }
}
console.log(filteredObject);

// // // const jiraDiv = document.querySelector(".jETjDD");
// // // let myDiv = document.createElement("div");

// // // jiraDiv.append(myDiv);


// // // for (let i = 0; i < venueObjKey.length; i++) {
// // //   venueObject[venueObjKey[i].value] = venueObjValue[i].value;
// // // };
