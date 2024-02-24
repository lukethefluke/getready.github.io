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
parameters.set("via",urlParams.get('via'))

//If parameters values are non-existent, then add defaults.
function parameterDefaults(value,key) {
  if (value == "" || value == null) {
    switch(key) {     
      case "destination":
        parameters.set("destination","School");
        break;
      case "hour":
        parameters.set("hour","09");
        break;
      case "minute":
        parameters.set("minute","00");
        break;
      case "list":
        parameters.set("list","Breakfast,Teeth,Uniform,Lunch & Snacks,Hat,Library Books,Shoes,Sunscreen");
        break;
      case "via":
        parameters.set("via","via car");
        break;
    }
  } 
}

//run parameterDefaults to set URL parameters as default. 
parameters.forEach(parameterDefaults);

//Display destination parameter on load
const mainDest = document.getElementById("destmain");
const overlayDest = document.getElementById("destOverlayText");
mainDest.innerHTML = parameters.get("destination");
overlayDest.value = parameters.get("destination");

//DIsplay via parameter on load
const mainVia = document.getElementById("dest-via");
const overlayVia = document.getElementById("viaOverlayText");
mainVia.innerHTML = "via " +parameters.get("via");
overlayVia.value = parameters.get("via");

//Display list on load
createList()
let overlaytodolist = document.querySelector(".items");
overlaytodolist.innerHTML = parameters.get("list")

//overlay time value from parameters
const departureValue = document.getElementById("departure-time");
departureValue.value = parameters.get("hour") + ":" + parameters.get("minute");

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

  departsRem.innerHTML = textRem;
}

//Run updateTime and departureTime every second

setInterval(updateTime, 1000); // Run updateTime() every second
// //Get Remaining time info
setInterval(displayRem(remainingTime.get("totalMinutesDifference")), 1000); // Get RemDisplay info
setInterval(departureDisplay, 1000); // Display Rem info


// define the destination text and allow editing
const overlay = document.querySelector('.overlay');

//Clicking on destination will load the Destination overlay
mainDest.onclick = function() {
  const element = document.getElementById("overlay");
  element.classList.add("show");
  const destination = document.getElementById("destoverlay");
  destination.classList.add("show");
}

//Clicking on via will load the Via overlay
mainVia.onclick = function() {
  const element = document.getElementById("overlay");
  element.classList.add("show");
  const destination = document.getElementById("viaoverlay");
  destination.classList.add("show");
}

//Departure time overlay
const departure = document.querySelector("#departure-rem");
departure.onclick = function() {
  const element = document.getElementById("overlay");
  element.classList.add("show");
  const overlaydeparture = document.getElementById("departureoverlay");
  overlaydeparture.classList.add("show");
}

//overlay hide will update URL and the page will reload with the new parameters
overlay.onclick = function() { 
  const element = document.getElementById("overlay");
  element.classList.remove("show");
  const overlaydeparture = document.getElementById("departureoverlay");
  overlaydeparture.classList.remove("show");

  const destination = document.getElementById("destoverlay");
  destination.classList.remove("show");

  const items = document.getElementById("listoverlay");
  items.classList.remove("show");

  const via = document.getElementById("viaoverlay");
  via.classList.remove("show");

  //updates URL and triggers page refresh
  updateURL(parameters);
}

//update the destination when text is changed
function updateDestination(destination) {
  let newDestination = document.getElementById("destmain");
  newDestination.innerHTML = destination;
  parameters.set("destination",destination);
}

//update via when text is changed
function updateVia(via) {
  let newVia = document.getElementById("dest-via");
  newVia.innerHTML = "via " + via;
  parameters.set("via",via);
}

//Create list from parameters
function createList() {
  let toDo = parameters.get("list").split(",");
  let toDoList = document.querySelector("#myList");
  let overlaytodolist = document.querySelector(".items");
  toDoList.innerHTML = "";
  for (i=0; i < toDo.length; i++) {
    let li = document.createElement('li');
    li.innerText = toDo[i];
    toDoList.appendChild(li);
  }
}

//update the list
function updateList(value) {
  parameters.set("list",value);
}

//Overlay for list appears on click
const tasklist = document.querySelector(".task-list");
tasklist.onclick = function() {
  const element = document.getElementById("overlay");
  element.classList.add("show");
  const items = document.getElementById("listoverlay");
  items.classList.add("show");
}

function updateDepartureTime() {
  let newDepartureTime = document.getElementById("departure-time").value;
  let newDepartureTimes = newDepartureTime.split(":");
  parameters.set("hour",newDepartureTimes[0]);
  parameters.set("minute",newDepartureTimes[1]);
}

//define the url
const urlString = window.location;
const url = new URL(urlString);

//updates the url and refreshes the page with the new parameters
function updateURL() {
  parameters.forEach(addParameters);
  window.location = url
}

//adds any given paramater to the url
function addParameters(value,key) {
  url.searchParams.set(key, value);
}