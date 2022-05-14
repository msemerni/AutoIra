try {
  const currentURL = window.location.href;
  const workJiraURL = "https://placer.atlassian.net/";

  if (currentURL.indexOf(workJiraURL) === 0) {

    const permission = navigator.permissions.query({ name: 'clipboard-read' });

    if (permission.state === "denied") {
      throw new Error("Not allowed to read clipboard.\n");
    }
    else if (permission.state === 'prompt') {
      throw new Error("Allow permission for clipboard.\n");
    }

    navigator.clipboard.readText()
      .then(textInClipboard => {
        if (textInClipboard.indexOf("{") === 0 && textInClipboard.lastIndexOf("}") === textInClipboard.length - 1
          && textInClipboard.length > 2) {

          const venueObject = JSON.parse(textInClipboard);

          // keys from venueObject
          const venueEditorLink = "venueURL";
          const analyticsLink = "analyticsUrlCutted";
          const entityID = "oid:pl";
          const entityName = "name";
          const category = "category:pl";
          const address = "fullAddress";

          console.log(venueObject);
          console.log("%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%");

          const jiraFields = document.querySelectorAll(".gbXyYv");
          console.log(jiraFields);
          console.log("%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%");

          /////////////////////////////////////////////////////////////////////////////

          for (let i = 0; i < jiraFields.length; i++) {

            // if (jiraFields[i].innerText.indexOf("Venue Editor Link") === 0) {
            //   const tagValue = venueObject[venueEditorLink];
            //   pasteValuesToJiraFields(tagValue, i);
            // } else if (jiraFields[i].innerText.indexOf("Analytics Link") === 0) {
            //   const tagValue = venueObject[analyticsLink];
            //   pasteValuesToJiraFields(tagValue, i);
            // } else if (jiraFields[i].innerText.indexOf("Entity ID") === 0) {
            //   const tagValue = venueObject[entityID];
            //   pasteValuesToJiraFields(tagValue, i);
            // } else if (jiraFields[i].innerText.indexOf("Entity Name") === 0) {
            //   const tagValue = venueObject[entityName];
            //   pasteValuesToJiraFields(tagValue, i);
            // } else if (jiraFields[i].innerText.indexOf("Category") === 0) {
            //   const tagValue = venueObject[category];
            //   pasteValuesToJiraFields(tagValue, i);
            // } else if (jiraFields[i].innerText.indexOf("Address") === 0) {
            //   const tagValue = venueObject[address];
            //   pasteValuesToJiraFields(tagValue, i);
            // } 


            if (jiraFields[i].innerText.indexOf("Reason Undelivered") === 0) {
              const tagValue = "Indoor";
              pasteValuesToJiraFields2(tagValue, 13);
            }


          }



          function pasteValuesToJiraFields2(tagValue, jiraFieldindex) {
            const jiraFields = document.querySelectorAll(".gbXyYv");
            let eventForOnChange = {
              target: {
                value: tagValue,
                // validationMessage: "invalid..."
              }
            };

            let jiraFieldValueDiv = jiraFields[jiraFieldindex].querySelector(".kLiHRY");
            jiraFieldValueDiv.click();
            console.dir(jiraFieldValueDiv);
            // let jiraFieldValueInput2 = document.querySelectorAll(".css-wrm96b-option");
            let jiraFieldValueInput2 = document.querySelectorAll(".cspqsP");
            jiraFieldValueInput2[16].click();
            console.dir(jiraFieldValueInput2);

            // .cspqsP
            // .css-wrm96b-option
            
           


          }
          





          function pasteValuesToJiraFields(tagValue, jiraFieldindex) {
            let eventForOnChange = {
              target: {
                value: tagValue,
                // validationMessage: "invalid..."
              }
            };


            let jiraFieldValueDiv = jiraFields[jiraFieldindex].querySelector(".kLiHRY");
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
        } else {
          throw new Error(`Not an object in clipboard\n`);
        }


        //////////////////////////////////////////////////////////////////////////
      })
      .catch((error) => {
        alert(`${error}\nPaste failed`);
        console.dir(error);
      });

  } else {
    throw new Error(`Switch to Jira\n(${workJiraURL})`);
  }

} catch (error) {
  alert(`${error}\nPaste failed!`);
  console.dir(error);
}

