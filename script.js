const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
let destination = urlParams.get('destination');
let hourLeaving = urlParams.get('hour')*1;
let minuteLeaving = urlParams.get('minute')*1;
let listParams = urlParams.get('list');


if(destination == "" || destination == null) {
  destination = 'School';
}
if(hourLeaving == "" || hourLeaving == null) {
  hourLeaving = 10;
}
if(minuteLeaving == "" || minuteLeaving == null) {
  minuteLeaving = 30;
}

if(listParams == "" || listParams == null) {
  listParams = "Breakfast,Teeth,Uniform,Lunch & Snacks,Hat,Library Books,Shoes,Sunscreen";
}

//set time picker from default or url parameter

let hourString = ""
let minuteString = ""


if (hourLeaving < 10) {
  hourString = "0" + String(hourLeaving)
} else {
  hourString = String(hourLeaving)
}
if (minuteLeaving < 10) {
  minuteString = "0" + String(minuteLeaving)
} else {
  minuteString = String(minuteLeaving)
}

let timeString = hourString + ":" + minuteString;

document.getElementById("departure-time").value = timeString;
//console.log(document.getElementById("departure-time").value);


//set url parameter or default departure time
departureTime()


//display departure time
function departureTime() {
  const now = new Date();
  const datetime = now.toLocaleString();
  const hourNow = now.getHours();
  const minuteNow = now.getMinutes();

  let remText = "Signalling Failure";

  const minutesLeaving = hourLeaving*60 + minuteLeaving;
  const minutesNow = hourNow*60 + minuteNow;

  let minutesDifference = minutesLeaving - minutesNow;

  if (minutesDifference < 0) {
    minutesDifference = minutesDifference + 24*60;
  }

  if (minutesDifference > 23*60) {
    const minuteDifference = 24*60 - minutesDifference;
    remText = "+" + minuteDifference + "m"
    updateURL('hour',String(hourLeaving))
    updateURL('minute',String(minuteLeaving))
  } else if (minutesDifference == 0 || minutesDifference == 24*60) {
    remText = "Leaving Now"
  } else {
    const hourDifference = Math.floor(minutesDifference/60)

    const minuteDifference = minutesDifference % 60;
 
    remText = hourDifference + "hr " + minuteDifference + "m"
  }
  document.getElementById("departs-rem").innerHTML = remText;
}

//display current time
function updateTime() {
  const now = new Date();
  const datetime = now.toLocaleString();
  const hourNow = now.getHours();
  if (hourNow > 12) {
    twelveHours = hourNow - 12;
  } else {
    twelveHours = hourNow;
  }
  const minuteNow = now.getMinutes();
  const secondNow = now.getSeconds();
  // Insert date and time into HTML
  document.getElementById("datetime").innerHTML =
    twelveHours.toString() +
    ":" +
    minuteNow.toString().padStart(2, "0") +
    ":" +
    secondNow.toString().padStart(2, "0");
}

setInterval(updateTime, 1000); // Run updateTime() every second
//setInterval(departureTime, 1000); // Run updateTime() every second


// define the destination text and allow editing
const overlay = document.querySelector('.overlay');

//Destination overlay

const displayDest = document.querySelector(".dest-main");
const overlayDest = document.querySelector("#destination");

displayDest.innerHTML = destination
overlayDest.value = destination

displayDest.onclick = function() {
  const element = document.getElementById("overlay");
  element.classList.add("show");
  const destination = document.getElementById("destoverlay");
  destination.classList.add("show");
}



//overlay hide
overlay.onclick = function() {
  destination = overlayDest.value;
  displayDest.innerHTML = destination;
  const element = document.getElementById("overlay");
  element.classList.remove("show");
  const service = document.getElementById("destoverlay");
  service.classList.remove("show");
  const departure = document.getElementById("departureoverlay");
  departure.classList.remove("show");
  const tasklist = document.querySelector(".listoverlay");
  tasklist.classList.remove("show"); 


  let parameters = {
    hour: hourLeaving,
    minute: minuteLeaving,
    destination: destination,
    list: listParams
  } 




  updateURL(parameters);
  
  //updateURL('destination',destination)
  
}

//Departure time overlay
const departure = document.querySelector("#departs-rem");

departure.onclick = function() {
  const element = document.getElementById("overlay");
  element.classList.add("show");
  const overlaydeparture = document.getElementById("departureoverlay");
  overlaydeparture.classList.add("show");
}

function timePassed(time) {    
  let[hours, mins] = time.split(":");
  hourLeaving = hours*1;
  minuteLeaving = mins*1;
  departureTime();
}

function sendList(stringList) {
  listParams = stringList
  console.log(listParams)
}


//Create default list

function createList() {
  let toDo = listParams.split(",")
  let toDoList = document.querySelector("#myList");
  let overlaytodolist = document.querySelector(".items");
  toDoList.innerHTML = ""
  for (i=0; i < toDo.length; i++) {
    let li = document.createElement('li');
    li.innerText = toDo[i];
    toDoList.appendChild(li);
  }

  overlaytodolist.innerHTML = listParams
}

createList();


//Overlay for list
const tasklist = document.querySelector(".task-list");

tasklist.onclick = function() {
  const element = document.getElementById("overlay");
  element.classList.add("show");
  const items = document.getElementById("listoverlay");
  items.classList.add("show");
}

//accept stringlist, separate based on comma and add to toDo list, 
//then display on screen and overlay innerHTML
function listPassed(stringList) {
  listParams = stringList;
}

function updateURL(parameters) {
  const urlString = window.location;
  const url = new URL(urlString);

  // add parameters
  const newParams = parameters;
  Object.keys(newParams).forEach(key => {
    url.searchParams.set(key, newParams[key]);
  });

  window.location = url

  console.log(`${url}`)
}

//todo
//default departure time based on hourLeaving/minuteLeaving
//move hourLeaving/minuteLeaving to global dictionary 
