try {
  // window.focus();
  if (window.location.hostname.indexOf("placer.atlassian") === -1) {
    throw new Error("Switch to Jira ('https://placer.atlassian.net/...')");
  }

  const permission = navigator.permissions.query({ name: 'clipboard-read' });
  
  if (permission.state === "denied") {
    throw new Error("Not allowed to read clipboard.");
  }
  else if (permission.state === 'prompt') {
    throw new Error("Allow permission for clipboard.");
  }

  navigator.clipboard.readText()
    .then(textInClipboard => {

      // const googleMapLink = {};
      // let venueObject = {};
      // localStorage.removeItem("venueObject");
      // localStorage.removeItem("googleMapLink");

      // if (textInClipboard.indexOf("https://goo.gl/maps/" === 0)) {
      //   // googleMapLink.googleMapLink = textInClipboard;
      //   localStorage.setItem("googleMapLink", textInClipboard);
      // } else if (textInClipboard.indexOf("{") === 0) {
      //   // venueObject = JSON.parse(textInClipboard);
        localStorage.setItem("venueObject", textInClipboard);
      // }

      const venueObject = JSON.parse(localStorage.getItem("venueObject"));
      const googleMapLink = JSON.parse(localStorage.getItem("googleMapLink"));
      console.log(venueObject);
      console.log(googleMapLink);
      ///////////////////////////////////////////////////////////////////////////
      const jiraFields = document.querySelectorAll(".gbXyYv");
      console.log(jiraFields);
      for (let i = 0; i < jiraFields.length; i++) {

        if (jiraFields[i].innerText.includes("Category")) {

          let val = venueObject["category:pl"];
          console.log("!!!!!!!");
          console.log(venueObject);
          console.log(val);
          console.log("!!!!!!!");

          let eventForOnChange = {
            target: {
              value: val,
              // validationMessage: "invalid..."
            }
          };


          let jiraFieldValueDiv = jiraFields[i].querySelector(".kLiHRY");
          jiraFieldValueDiv.click();

          let jiraFieldValueInput = document.querySelectorAll(".bfCuIo");
          jiraFieldValueInput[0].focus();
          jiraFieldValueInput[0].click();
          console.log(jiraFieldValueInput);

          const inputKeys = Object.keys(jiraFieldValueInput[0]);
          console.log(inputKeys);

          for (let i = 0; i < inputKeys.length; i++) {
            if (inputKeys[i].includes("reactEventHandler")) {
              console.log("@@@@@");
              console.log(inputKeys[i]);
              console.log("@@@@@");
              jiraFieldValueInput[0][inputKeys[i]].onChange(eventForOnChange);
            } else {
              console.log("Error: reactEventHandler not found");
            }
          }
          let hui = document.querySelector(".iNYbiH");
          hui.click();

        }
      //////////////////////////////////////////////////////////////////////////

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

