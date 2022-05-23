let hoursText = document.querySelector(".OqCZI div[aria-label]").ariaLabel;
// console.log(hoursText);
let hoursTextArr = hoursText.split(";");
// console.log(hoursTextArr);
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
// let arrFromObj = [hoursTextObj];
// console.log(arrFromObj);

let keysArray = [];
let valueArray = [];

// // value = hoursTextObj[key]; // значение ключа key


// if (hoursTextObj.hasOwnProperty("mo")) {
//   keysArray.push("mo");
//   valueArray.push(hoursTextObj["mo"]);
// }
// if (hoursTextObj.hasOwnProperty("tu")) {
//   keysArray.push("tu");
//   valueArray.push(hoursTextObj["tu"]);
// }
// if (hoursTextObj.hasOwnProperty("we")) {
//   keysArray.push("we");
//   valueArray.push(hoursTextObj["we"]);
// }
// if (hoursTextObj.hasOwnProperty("th")) {
//   keysArray.push("th");
//   valueArray.push(hoursTextObj["th"]);
// }
// if (hoursTextObj.hasOwnProperty("fr")) {
//   keysArray.push("fr");
//   valueArray.push(hoursTextObj["fr"]);
// }
// if (hoursTextObj.hasOwnProperty("sa")) {
//   keysArray.push("sa");
//   valueArray.push(hoursTextObj["sa"]);
// }
// if (hoursTextObj.hasOwnProperty("su")) {
//   keysArray.push("su");
//   valueArray.push(hoursTextObj["su"]);
// }

// let result = `${keysArray[0]}`;
// for (let i = 0; i < valueArray.length; i++) {
//   if (valueArray[i] === valueArray[i+1]) {
//     result += `${keysArray[i+1]}`
//   } 

// }


console.log(result);
console.log(keysArray);
console.log(valueArray);



console.log(Object.keys(hoursTextObj).length);

for (const key in hoursTextObj) {
  if (Object.hasOwnProperty.call(hoursTextObj, key)) {
    const value = hoursTextObj[key];
    console.log(key, value);
  }
}


  /////////////////////////////////////////////////////////
  // https://g.page/woodchucksfurniture?share
  // https://goo.gl/maps/1AHE6PgRJFHMs6qf9
  // https://g.page/fblinen?share
  // https://goo.gl/maps/4tAEVykgZ5P8nCko9
  // https://goo.gl/maps/TvXXvzugCrzm3qPt6



  function E(){
    this.blur();
    var r=[],o=[];
    var e=utilOpeningHoursToString(utilFixTimeOverlapping(p.filter(function(t,e){var n=" (Row ".concat(e+1,")");
    return!!(t.day||t.time.start||t.time.end)&&utilIsValidOperatingHourData(t,function(e){r.push(e+n),f.add(t.id)},function(e){o.push(e+n),g.add(t.id)})}),function(e){r.push(e)})),t={"opening_hours:pl":e};
    o.length||r.length?(s.container().call(n,o,r,e,L),S()):L(t)}

