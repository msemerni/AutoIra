// alert("EEEEE");
// alert(window.location.href);

try {
    if (window.location.hostname.indexOf("placer.atlassian") === -1) {
      throw new Error("Switch to Jira ('https://placer.atlassian.net/...')");
    }

    // localStorage.removeItem("venueObject");

    const permission = navigator.permissions.query({ name: 'clipboard-read' });

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
        console.log(venueObject);
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



          const event = {
          target: {
            value: "venueObject.Категория",
            // validationMessage: "invalid..."
          }
        };

        const inputKeys = Object.keys(jiraFieldValueInput[0]);
        console.log(inputKeys);
        jiraFieldValueInput[0].__reactEventHandlers$i8b2z244fsk.onChange(event);

        // for (let i = 0; i < inputKeys.length; i++) {
        //   if (inputKeys[i].includes("reactEventHandler")) {
        //     jiraFieldValueInput[0][inputKeys[i]].onChange(event);
        //     jiraFieldValueInput[0].__reactEventHandlers$sdu4ldbhtgs.onChange(event);
        //   } else {
        //     console.log("Error: reactEventHandler not found");
        //   }
        // }

          }
        }


console.log(venueObject);
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
