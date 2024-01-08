//display departure time
function departureTime(hourLeaving,minuteLeaving) {
  hourLeaving = hourLeaving*1
  minuteLeaving = minuteLeaving*1
  

  var now = new Date();
  var datetime = now.toLocaleString();
  let hourNow = now.getHours();
  let minuteNow = now.getMinutes();

  remText = "";
  if (hourLeaving - hourNow > 2) {
    hourLeaving += 24
  }

  if (hourLeaving > hourNow) {
    if (minuteLeaving + (60 - minuteNow) > 60) {
      remText =
        (hourLeaving - hourNow).toString() +
        "h " +
        (minuteLeaving - minuteNow ).toString() +
        "m";
    } else if (minuteLeaving + minuteNow == 60) {
      remText = (hourLeaving - hourNow).toString() + "h ";
    } else { 
      if (hourLeaving - hourNow == 1) {
        remText = (minuteLeaving + 60 - minuteNow).toString() +
        "m";
      } else {
        remText =
        (hourLeaving - hourNow - 1).toString() +
        "h " +
        (minuteLeaving + 60 - minuteNow).toString() +
        "m";
      }
      
    }
  } else if (hourLeaving == hourNow) {
    if (minuteLeaving > minuteNow) {
      remText = (minuteLeaving - minuteNow).toString() + "m";    
    } else if (minuteLeaving == minuteNow) {
      remText = "Now";
    } else if (minuteLeaving < minuteNow) {
      remText = "+ " + (minuteNow - minuteLeaving).toString() + "m";
    
    }
  } else if (hourLeaving < hourNow) {
    if (minuteLeaving + minuteNow > 60) {
      remText =
        (hourLeaving - hourNow).toString() +
        "h " +
        (minuteLeaving + minuteNow - 60).toString() +
        "m";
    } else if (minuteLeaving + minuteNow == 60) {
      remText = (hourLeaving - hourNow).toString() + "h ";
    } else {
      remText =
        (hourLeaving - hourNow - 1).toString() +
        "h " +
        (minuteLeaving + minuteNow).toString() +
        "m";
    }
  }

document.getElementById("departs-rem").innerHTML = remText;
}

//set departure time
departureTime(10,30)

//display current time
function updateTime() {
  var now = new Date();
  var datetime = now.toLocaleString();
  let hourNow = now.getHours();
  if (hourNow > 12) {
    twelveHours = hourNow - 12
  } else {
    twelveHours = hourNow
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

// define the destination text and allow editing
const overlay = document.querySelector('.overlay')

//Destination overlay
var destination = "School"

const displayDest = document.querySelector(".dest-main");
const overlayDest = document.querySelector("#destination");

displayDest.innerHTML = destination
overlayDest.value = destination

displayDest.onclick = function() {
  var element = document.getElementById("overlay");
  element.classList.add("show");
  var destination = document.getElementById("destoverlay")
  destination.classList.add("show")
}

//overlay hide
overlay.onclick = function() {
  displayDest.innerHTML = overlayDest.value
  var element = document.getElementById("overlay");
  element.classList.remove("show");
  var service = document.getElementById("destoverlay");
  service.classList.remove("show");
  var departure = document.getElementById("departureoverlay");
  departure.classList.remove("show");
  var tasklist = document.querySelector(".listoverlay")
  tasklist.classList.remove("show");
  
}

//Departure time overlay
const departure = document.querySelector("#departs-rem");

departure.onclick = function() {
  var element = document.getElementById("overlay");
  element.classList.add("show")
  var overlaydeparture = document.getElementById("departureoverlay")
  overlaydeparture.classList.add("show")
}

function timePassed(time) {                
  let[hours, mins] = time.split(":");
  hourLeaving = hours;
  minuteLeaving = mins;
  departureTime(hours,mins);
}


//Create default list
var template = ["Breakfast","Teeth","Uniform","Lunch & Snacks","Hat","Library Books","Shoes","Sunscreen"]
var listString = ""
var toDo = template
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
const tasklist = document.querySelector(".task-list")

tasklist.onclick = function() {
  var element = document.getElementById("overlay");
  element.classList.add("show")
  var items = document.getElementById("listoverlay")
  items.classList.add("show")
}

//accept stringlist, separate based on comma and add to toDo list, 
//then display on screen and overlay innerHTML
function listPassed(stringlist) {
  var stringarray = stringlist.split(",");
  toDo = stringarray;
  createList(toDo);
}


