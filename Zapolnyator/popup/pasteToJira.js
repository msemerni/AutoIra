try {
  const currentURL = window.location.href;
  const workJiraURL = "https://placer.atlassian.net/";

  if (currentURL.indexOf(workJiraURL) === 0) {

    const permission = navigator.permissions.query({ name: 'clipboard-read' });

    if (permission.state === "denied") {
      throw new Error("Not allowed to read clipboard.\n");
    } else if (permission.state === 'prompt') {
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

          // paste values to Jira fields
          const jiraFields = document.querySelectorAll(".gbXyYv");

          for (let i = 0; i < jiraFields.length; i++) {
            if (jiraFields[i].innerText.indexOf("Venue Editor Link") === 0) {
              const tagValue = venueObject[venueEditorLink];
              pasteValuesToJiraFields(tagValue, i);
            } else if (jiraFields[i].innerText.indexOf("Analytics Link") === 0) {
              const tagValue = venueObject[analyticsLink];
              pasteValuesToJiraFields(tagValue, i);
            } else if (jiraFields[i].innerText.indexOf("Entity ID") === 0) {
              const tagValue = venueObject[entityID];
              pasteValuesToJiraFields(tagValue, i);
            } else if (jiraFields[i].innerText.indexOf("Entity Name") === 0) {
              const tagValue = venueObject[entityName];
              pasteValuesToJiraFields(tagValue, i);
            } else if (jiraFields[i].innerText.indexOf("Category") === 0) {
              const tagValue = venueObject[category];
              pasteValuesToJiraFields(tagValue, i);
            } else if (jiraFields[i].innerText.indexOf("Address") === 0) {
              const tagValue = venueObject[address];
              pasteValuesToJiraFields(tagValue, i);
            }
          }

          function pasteValuesToJiraFields(tagValue, jiraFieldindex) {
            const eventForOnChange = {
              target: {
                value: tagValue,
                // validationMessage: "invalid..."
              }
            };
            const jiraFieldValueDiv = jiraFields[jiraFieldindex].querySelector(".kLiHRY");
            jiraFieldValueDiv.click();
            const jiraFieldValueInput = document.querySelectorAll(".bfCuIo");
            jiraFieldValueInput[0].click();
            const inputKeys = Object.keys(jiraFieldValueInput[0]);
            const reactEventHandler = inputKeys.find(prop => prop.indexOf("__reactEventHandlers") === 0);

            if (reactEventHandler) {
              jiraFieldValueInput[0][reactEventHandler].onChange(eventForOnChange);
            } else {
              throw new Error(`__reactEventHandlers not found\n`);
            }

            const shlyapa = document.querySelector(".iNYbiH");
            shlyapa.click();
          }

        } else {
          throw new Error(`Not an object in clipboard\n`);
        }
      })
      .catch((error) => {
        alert(`${error}\nPaste failed`);
      });

  } else {
    throw new Error(`Switch to Jira\n(${workJiraURL})`);
  }

} catch (error) {
  alert(`${error}\nPaste failed!`);
}
