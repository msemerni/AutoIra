let hoursText = document.querySelector(".OqCZI div[aria-label]").ariaLabel;
// console.log(hoursText);
let hoursTextArr = hoursText.split(";");
console.log(hoursTextArr);
let hoursTextObj = {};

for (let i = 0; i < hoursTextArr.length; i++) {
  let textHours = hoursTextArr[i];
  // console.log(textHours);
  let textHoursReversed = hoursTextArr[i].split("").reverse().join("");
  // console.log(textHoursReversed);
  //// parse day
  let dayParsed = textHours.slice(0, textHours.indexOf(",")).match(/[A-Za-z]/g);
  dayParsed = dayParsed.join(",").replaceAll(",","").slice(0, 2).toLowerCase();
  //// parse hours
  let firstDigitInd = textHours.indexOf(textHours.match(/[0-9]/));
  let lastDigitInd = textHoursReversed.indexOf(textHoursReversed.match(/[0-9]/));
  let hoursParsed = textHours.substring(firstDigitInd, textHours.length - lastDigitInd + 2);

  hoursTextObj[dayParsed] = hoursParsed.replaceAll("to", "-").replaceAll(" ", "");
}
console.log(hoursTextObj);

for (const key in hoursTextObj) {
  if (Object.hasOwnProperty.call(hoursTextObj, key)) {
    const element = hoursTextObj[key];
    console.log(key, element);
  }
}

  // hoursTextObj[hoursTextArr[i].slice(0, hoursTextArr[i].indexOf(",").hoursTextArr[i].match(/\D/))] = 
  // hoursTextArr[i].slice(hoursTextArr[i].indexOf(hoursTextArr[i].match(/\d+/)));


  // https://g.page/woodchucksfurniture?share
  // https://goo.gl/maps/1AHE6PgRJFHMs6qf9