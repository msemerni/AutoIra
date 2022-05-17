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

visualizationURL = `https://storage.googleapis.com/data-analysis-reports/vd_vis/20220424%20075842.468720%20Bobbers%20Tap%20${venueObject["oid:pl"]}%20200.0%20start%2020220301%20end%2020220331?Expires=1658563123&GoogleAccessId=689760566032-m0oc5b5soasd2bc300dsoggera29ko2i%40developer.gserviceaccount.com&Signature=LSaN5i9b828nkNSa9mYsKqFJPl2cpY2P05Na4Jb%2B82HyUXKefBjFLZxlKR93wx2vFl%2F4zc%2FyKFgw%2FQn%2FqB8MOF6%2F532irSKswbWJnghZePTTumxOU0vsGWS%2BwD9llP8057BfawdqBdKHNlSf3W0O4cgXgXcrBL3OMNBCkrVGdC4%3D`
//// добавить в visualizationURL радиус (пр. 200м) и др. параметры как переменные

console.log(venueObject);
console.log(fullVenueAddr);
console.log(venueURL);
console.log(visualizationURL);

///////////////////////////////////////////

let jiraFieldName = document.querySelectorAll(".etqEAJ>h2");
console.log(jiraFieldName);

let jiraFieldValue = document.querySelectorAll(".etqEAJ+div");
console.log(jiraFieldValue);

for (let i = 0; i < jiraFieldName.length; i++) {

    // console.log(`${jiraFieldName[i].innerText}: ${jiraFieldValue[i].innerText}`);
    if (jiraFieldName[i].innerHTML === "Entity ID") {
        jiraFieldValue[i].innerHTML = "это айди"
    }
}




///////////////////////////////////////////

// keyWrap.map ((data)=>{
//     console.log(data)
// })

// let map = new Map();
// map.set('banana', 1);
// for (let i = 0; i < keyWrap.length; i++) {
//     map.set(keyWrap[i].__data__, i);
// }

// console.log(map);

// keyWrap.forEach((value, key, map) => {
//     console.log(`${key}: ${value}`); // огурец: 500 и так далее
//   });

