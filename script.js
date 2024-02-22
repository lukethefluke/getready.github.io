//Create map instance from URL parameters
let parameters = new Map();

//URL parameters captured on window load
const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);

//set key value pairs in parameters mapping from URL
parameters.set("destination", urlParams.get('destination'));
parameters.set("hour", urlParams.get('hour'));
parameters.set("minute", urlParams.get('minute'));
parameters.set("list", urlParams.get('list'));

//If parameters values are non-existent, then add defaults.
function parameterDefaults(value,key) {
  if (value == "" || value == null) {
    switch(key) {     
      case "destination":
        parameters.set("destination","school");
        break;
      case "hour":
        parameters.set("hour","09");
        break;
      case "minute":
        parameters.set("minute","10");
        break;
      case "list":
        parameters.set("list","Breakfast,Teeth,Uniform,Lunch & Snacks,Hat,Library Books,Shoes,Sunscreen");
        break;
    }
  } 
}

//run parameterDefaults to set URL parameters as default. The page will effectively reload the first time it is opened
parameters.forEach(parameterDefaults);

//Display destination parameter on load
const displayDest = document.querySelector(".dest-main");
const overlayDest = document.querySelector("#destination");
displayDest.innerHTML = parameters.get("destination");

//Update and display current time
function updateTime() {
  let now = new Date();
  let hourNow = now.getHours();
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

    getRem(parameters.get("hour"),parameters.get("minute"));
    displayRem(remainingTime.get("totalMinutesDifference"));
    departureDisplay();
}

//Create map instance for remaining time, Delay may be "Scheduled","Now" or "Delayed"
let remainingTime = new Map();

//getRem will return time difference in minutes, as well as the level of delay
function getRem(hourLeaving,minuteLeaving) {
  const now = new Date();
  const hourNow = now.getHours();
  const minuteNow = now.getMinutes();

  const totalTimeLeaving = hourLeaving*60 + minuteLeaving*1;
  const totalTimeNow = hourNow*60 + minuteNow*1;
  totalMinutesDifference = totalTimeLeaving - totalTimeNow;

  if (totalMinutesDifference > 0) {
    remainingTime.set("Delay","Departing");
  } else if (totalMinutesDifference == 0) {
    remainingTime.set("Delay","DepartingNow");
  } else if (totalMinutesDifference > -60) {
    remainingTime.set("Delay","Delayed");
  } else {
    remainingTime.set("Delay","Departing");
  totalMinutesDifference = String(totalMinutesDifference*1 + 24*60);
  }

  remainingTime.set("totalMinutesDifference", Math.abs(totalMinutesDifference));
  //console.log(remainingTime)  
}



//departureInfo contains leaving information that will be modified and displayed by function departureDisplay
let departureInfo = new Map();

//displayRem will return a string of the remaining time information (new Departure Time)
function displayRem(remainingMinutes) {

  const now = new Date();
  const hourNow = now.getHours();
  const minuteNow = now.getMinutes();


  if (remainingTime.get("Delay") == "DepartingNow") {
    departureInfo.set("Guide","Departing");
    departureInfo.set("departureHours","Now");
    departureInfo.set("departureMinutes","");
  } else if (remainingTime.get("Delay") == "Departing") {
    departureInfo.set("Guide","Departing");
    departureInfo.set("departureHours",String(Math.round(remainingMinutes/60)));
    departureInfo.set("departureMinutes",String(Math.round(remainingMinutes%60)));
  } else if (remainingTime.get("Delay") == "Delay") {
    if (remainingTime > 59 ) {
      remainingTime = 24*60 - remainingTime;
      departureInfo.set("Guide","Departing");
      departureInfo.set("departureHours",toString(Math.round(remainingMinutes/60)));
      departureInfo.set("departureMinutes",toString(Math.round(remainingMinutes%60)));
    } else {
      departureInfo.set("Guide","Delayed");
      departureInfo.set("departureHours",toString(Math.round(remainingMinutes/60)));
      departureInfo.set("departureMinutes",toString(Math.round(remainingMinutes%60)));
    }
  }
}

//get value of two departure info elements, and populate from info in displayRem
function departureDisplay() {
  let departsText = document.getElementById("departure-text");
  let departsRem = document.getElementById("departure-rem");
  departsText.innerHTML = departureInfo.get("Guide");

  let departureHours = departureInfo.get("departureHours");
  let departureMinutes = departureInfo.get("departureMinutes");

  let textRem = "";
  console.log(departureInfo.get("departureHours"));

  //Display departsRem propery
  if (!isNaN(departureInfo.get("departureHours")*1)) {
    
    if (departureInfo.get("Guide") =="Departing") {
      if (departureHours == 0) {
        textRem = departureMinutes + "m";
      } else if (departureMinutes == 0) {
        textRem = departureHours + "hr";
      } else {
        textRem = departureHours + "hr " + departureMinutes + "m";
      }
    } else if (departureInfo.get("Guide") =="Delayed") {
      textRem = "+" + departureMinutes + "m";
    }
  }
  //console.log(departureInfo.get("Guide"));

  departsRem.innerHTML = textRem;
}

//Run updateTime and departureTime every second

setInterval(updateTime, 1000); // Run updateTime() every second
// // Get Remaining time info
//setInterval(displayRem(remainingTime.get("totalMinutesDifference")), 1000); // Get RemDisplay info
//setInterval(, 1000); // Display Rem info


// define the destination text and allow editing
const overlay = document.querySelector('.overlay');

//Clicking on destination will load the Destination overlay
displayDest.onclick = function() {
  const element = document.getElementById("overlay");
  element.classList.add("show");
  const destination = document.getElementById("destoverlay");
  destination.classList.add("show");
}

//overlay hide will update URL and the page will reload with the new parameters
overlay.onclick = function() { 
  updateURL(parameters);
}

//Departure time overlay
const departure = document.querySelector("#departure-rem");
departure.onclick = function() {
  const element = document.getElementById("overlay");
  element.classList.add("show");
  const overlaydeparture = document.getElementById("departureoverlay");
  overlaydeparture.classList.add("show");
}

function sendList(stringList) {
  listParams = stringList
}


//Create list from parameters

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


//Overlay for list appears on click
const tasklist = document.querySelector(".task-list");
tasklist.onclick = function() {
  const element = document.getElementById("overlay");
  element.classList.add("show");
  const items = document.getElementById("listoverlay");
  items.classList.add("show");
}

//update the URL. THis will cause the page to reload
function updateURL(parameters) {
  const urlString = window.location;
  const url = new URL(urlString);

  // add parameters
  const newParams = parameters;
  Object.keys(newParams).forEach(key => {
    url.searchParams.set(key, newParams[key]);
  });
  window.location = url
}
