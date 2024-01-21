const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
let destination = urlParams.get('destination');
let hourLeaving = urlParams.get('hour')*1;

let minuteLeaving = urlParams.get('minute')*1;


if(destination == "" || destination == null) {
  destination = 'School';
}
if(hourLeaving == "" || hourLeaving == null) {
  hourLeaving = 8;
  console.log(hourLeaving)
}
if(minuteLeaving == "" || minuteLeaving == null) {
  minuteLeaving = 30;
}

//set url parameter or default departure time
departureTime()


//display departure time
function departureTime() {
  var now = new Date();
  var datetime = now.toLocaleString();
  let hourNow = now.getHours();
  let minuteNow = now.getMinutes();

  let remText = "Signalling Failure";

  let minutesLeaving = hourLeaving*60 + minuteLeaving;
  let minutesNow = hourNow*60 + minuteNow;

  let minutesDifference = minutesLeaving - minutesNow;

  if (minutesDifference < 0) {
    minutesDifference = minutesDifference + 24*60;
  }

  if (minutesDifference > 23*60) {
    let minuteDifference = 24*60 - minutesDifference;
    remText = "+" + minuteDifference + "m"
    updateURL('hour',String(hourLeaving))
  updateURL('minute',String(minuteLeaving))
  } else if (minutesDifference == 0 || minutesDifference == 24*60) {
    remText = "Leaving Now"
  } else {
    let hourDifference = Math.floor(minutesDifference/60)

    let minuteDifference = minutesDifference % 60;
 
    remText = hourDifference + "hr " + minuteDifference + "m"
  }




  document.getElementById("departs-rem").innerHTML = remText;

  



}

//display current time
function updateTime() {
  var now = new Date();
  var datetime = now.toLocaleString();
  let hourNow = now.getHours();
  if (hourNow > 12) {
    twelveHours = hourNow - 12;
  } else {
    twelveHours = hourNow;
  }
  let minuteNow = now.getMinutes();
  let secondNow = now.getSeconds();
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
  var element = document.getElementById("overlay");
  element.classList.add("show");
  var destination = document.getElementById("destoverlay");
  destination.classList.add("show");
}



//overlay hide
overlay.onclick = function() {
  destination = overlayDest.value;
  displayDest.innerHTML = destination;
  var element = document.getElementById("overlay");
  element.classList.remove("show");
  var service = document.getElementById("destoverlay");
  service.classList.remove("show");
  var departure = document.getElementById("departureoverlay");
  departure.classList.remove("show");
  var tasklist = document.querySelector(".listoverlay");
  tasklist.classList.remove("show"); 

  const parameters = {
    hour: hourLeaving,
    minute: minuteLeaving,
    destination: destination
  }

  console.log(parameters);

  updateURL(parameters);
  
  //updateURL('destination',destination)
  
}

//Departure time overlay
const departure = document.querySelector("#departs-rem");

departure.onclick = function() {
  var element = document.getElementById("overlay");
  element.classList.add("show");
  var overlaydeparture = document.getElementById("departureoverlay");
  overlaydeparture.classList.add("show");
}

function timePassed(time) {     
  let[hours, mins] = time.split(":");
  hourLeaving = hours*1;
  minuteLeaving = mins*1;
  departureTime();
}


//Create default list
var template = ["Breakfast","Teeth","Uniform","Lunch & Snacks","Hat","Library Books","Shoes","Sunscreen"];
var listString = "";
var toDo = template;
let toDoList = document.querySelector("#myList");
let overlaytodolist = document.querySelector(".items");

function createList(array) {
  toDoList.innerHTML = ""
  for (i=0; i < array.length; i++) {
    let li = document.createElement('li');
    li.innerText = array[i];
    toDoList.appendChild(li);
  }

  listString = array.join(",")
  overlaytodolist.innerHTML = listString
}

createList(toDo);


//Overlay for list
const tasklist = document.querySelector(".task-list");

tasklist.onclick = function() {
  var element = document.getElementById("overlay");
  element.classList.add("show");
  var items = document.getElementById("listoverlay");
  items.classList.add("show");
}

//accept stringlist, separate based on comma and add to toDo list, 
//then display on screen and overlay innerHTML
function listPassed(stringlist) {
  var stringarray = stringlist.split(",");
  toDo = stringarray;
  createList(toDo);
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
