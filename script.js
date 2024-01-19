const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
var destination = urlParams.get('destination');

if(destination === " " || destination == null) {
  destination = 'School';
}

let hourLeaving = 8;
let minuteLeaving = 30;

//display departure time
function departureTime() {
  var now = new Date();
  var datetime = now.toLocaleString();
  let hourNow = now.getHours();
  let minuteNow = now.getMinutes();

  let timeDifference = 0;
  let hourDifference = 0;
  let minuteDifference = 0;

  remText = "Signalling Failure";

  if (hourLeaving == hourNow) {
    if (minuteNow < minuteLeaving) {
      minuteDifference = minuteLeaving - minuteNow;
      remText = minuteDifference + "m";
    } else if (minuteNow <= (minuteLeaving + 10)  ) {
      remText = "Leaving Now";
    } else {
      minuteDifference = minuteNow - minuteLeaving;
      remText = "+" + Math.abs(minuteDifference) + "m";
    }
  } else if (hourLeaving < hourNow) {
    
    timeDifference = (24- hourNow + hourLeaving - 1)* 60 + (60-minuteNow + minuteLeaving );

    if (timeDifference <= 23*60) {
      hourDifference = Math.trunc(timeDifference/60);
      minuteDifference = timeDifference%60;
      if (minuteDifference == 0) {
        remText = hourDifference + "hr";
      } else {
        remText = hourDifference + "hr " + minuteDifference + "m";
      } 
    } else {
      minuteDifference = (60-minuteLeaving + minuteNow);
      remText = minuteDifference + "m";
    }
  } else if (hourLeaving > hourNow + 1) {
    console.log("hourleaving > hournow")

    minuteDifference = minuteLeaving + (60 - minuteNow)
    if (minuteDifference > 60) {
      hourDifference = hourLeaving - hourNow;
      minuteDifference = minuteDifference - 60;
      remText = hourDifference + "hr " + minuteDifference + "m";
    } else if (minuteDifference == 60) {
      hourDifference = hourLeaving - hourNow;
      remText = hourDifference + "hr "
    } else if (minuteDifference < 60) {
      hourDifference = hourLeaving - hourNow - 1;
      remText = hourDifference + "hr " + minuteDifference + "m";
    }
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
setInterval(departureTime, 1000); // Run updateTime() every second


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

  updateURL('destination',destination)
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

function updateURL(key,value) {
  const urlString = window.location;
  const url = new URL(urlString);

  url.searchParams.set(key, value);

  window.location = url

  console.log(`${url}`)
}


