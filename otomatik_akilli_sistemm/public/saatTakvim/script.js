const ring = new Audio("Alarm-ringtone.mp3");
ring.loop = true;

let alarmListArr = [];
const selectMenu = document.querySelectorAll("select");
const setAlarmBtn = document.querySelector("#btn-setAlarm");
let alarmCount = 0;
let alarmTime;
let alarmStarted = false;
let intervalId;

function updateClock() {
  var now = new Date();
  var dname = now.getDay(),
    mo = now.getMonth(),
    dnum = now.getDate(),
    yr = now.getFullYear(),
    hou = now.getHours(),
    min = now.getMinutes(),
    sec = now.getSeconds(),
    pe = "PM";

  if (hou == 0) {
    hou = 12;
  }

  if (hou > 12) {
    hou -= 12;
    pe = "PM";
  }

  Number.prototype.pad = function (digits) {
    for (var n = this.toString(); n.length < digits; n = 0 + n);
    return n;
  };

  var months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  var week = [
    "Sunday",
    "Monday",
    "Tusday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  var ids = [
    "dayName",
    "month",
    "dayNum",
    "year",
    "hour",
    "minutes",
    "seconds",
    "period",
  ];
  var values = [
    week[dname],
    months[mo],
    dnum.pad(2),
    yr,
    hou.pad(2),
    min.pad(2),
    sec.pad(2),
    pe,
  ];

  for (var i = 0; i < ids.length; i++) {
    document.getElementById(ids[i]).firstChild.nodeValue = values[i];
  }

  for (let i = 0; i < alarmListArr.length; i++) {
    if(alarmStarted){
      start();
    }
  }
}

function initClock() {
  updateClock();
  window.setInterval("updateClock()", 1000);
}

for (let i = 12; i > 0; i--) {
  i = i < 10 ? "0" + i : i;
  let option = `<option value="${i}">${i}</option>`;
  selectMenu[0].firstElementChild.insertAdjacentHTML("afterend", option);
}

for (let i = 59; i >= 0; i--) {
  i = i < 10 ? "0" + i : i;
  let option = `<option value="${i}">${i}</option>`;
  selectMenu[1].firstElementChild.insertAdjacentHTML("afterend", option);
}

for (let i = 59; i >= 0; i--) {
  i = i < 10 ? "0" + i : i;
  let option = `<option value="${i}">${i}</option>`;
  selectMenu[2].firstElementChild.insertAdjacentHTML("afterend", option);
}

for (let i = 2; i > 0; i--) {
  let ampm = i == 1 ? "AM" : "PM";
  let option = `<option value="${ampm}">${ampm}</option>`;
  selectMenu[3].firstElementChild.insertAdjacentHTML("afterend", option);
}

function setAlarm() {
  setAlarmHelper("Set Alarm 1");

}
function setAlarm2() {
  setAlarmHelper("Set Alarm 2");
}
function setAlarmHelper(alarmText) {
  
  if (alarmStarted) {
    alert("Please stop the alarms before setting new ones.");
    return;
  }
  if (alarmListArr.length >= 2) {
    alert("You can only set two alarms at a time. Please delete an existing alarm before setting a new one.");
    return;
  }
  document.querySelector("#alarm-h3").innerText = "Alarms";
  let time = `${selectMenu[0].value}:${selectMenu[1].value}:${selectMenu[2].value} ${selectMenu[3].value}`;
  let date = document.querySelector("#datePicker").value;

  if (
    time.includes("setHour") ||
    time.includes("setMinute") ||
    time.includes("setSeconds") ||
    time.includes("AM/PM") ||
    date === ""
  ) {
    alert("Please, Select Valid Input");
  } else {
    alarmCount++;
    document.querySelector(".alarmList").innerHTML += `
        <div class="alarmLog" id="alarm${alarmCount}">
            <span id="span${alarmCount}">${time}</span>
            <span style="margin-left: 10px;">${date}</span>
            <button class="btn-delete" id="${alarmCount}" onClick="deleteAlarm(this.id)">Delete</button>
        </div>`;
        let fullDateTime = new Date(`${date} ${selectMenu[0].value}:${selectMenu[1].value}:${selectMenu[2].value} ${selectMenu[3].value}`);

    alarmTime = `${selectMenu[0].value}:${selectMenu[1].value}:${selectMenu[2].value} ${selectMenu[3].value}`;
    alarmListArr.push(fullDateTime);
    alert(`Your ${alarmText} Set ${fullDateTime}.`);
    saveAlarmsToLocalStorage();

  }
}

document.getElementById("btn-setAlarm").addEventListener("click", setAlarm);
document.getElementById("btn-setAlarm2").addEventListener("click", setAlarm2);
setAlarmBtn.addEventListener("click", setAlarm);


function test() {
  console.log("alarm started");
  console.log("Alarm ringing...");
  ring.load();
  ring.play();
  document.querySelector("#stopAlarm").style.visibility = "visible";
}

let currentAlarmIndex = 0;
//........
let firstAlarmOccurred = false;

function start() {
  console.log("start started");
  var now = new Date();
  let currentDateTime = now.getTime();

  console.log("Current Date and Time:", now);
  console.log("Alarm List:", JSON.stringify(alarmListArr));

  if (!firstAlarmOccurred) {
    let firstAlarmTime = alarmListArr[currentAlarmIndex].getTime();

    if (currentDateTime > firstAlarmTime) {
      firstAlarmOccurred = true;
    }
  } else if (alarmListArr.length > currentAlarmIndex + 1) {
    let secondAlarmTime = alarmListArr[currentAlarmIndex + 1].getTime();

    if (currentDateTime > secondAlarmTime) {
      test();
      currentAlarmIndex++; 
      firstAlarmOccurred = false; 
    }
  }
}





function startAlarms() {
  if (alarmListArr.length < 2) {
    console.log("Please set at least two alarms to start.");
    return;
  }
  alarmStarted = true;
  currentAlarmIndex = 0;
  start();
}





function getTimeDifferenceInSeconds(time1, time2) {
  const time1Array = time1.split(":").map(Number);
  const time2Array = time2.split(":").map(Number);

  const seconds1 = time1Array[0] * 3600 + time1Array[1] * 60 + time1Array[2];
  const seconds2 = time2Array[0] * 3600 + time2Array[1] * 60 + time2Array[2];

  return Math.abs(seconds2 - seconds1);
}




const startButton = document.getElementById("startButton");
startButton.addEventListener("click", function () {
  if (alarmListArr.length >= 2) {
    alarmStarted = true; 
    startAlarms();
  } else {
    alert("Please set at least two alarms to start.");
  }
});


startButton.addEventListener("click", startAlarms);


function deleteAlarm(click_id) {
  const element = document.getElementById("alarm" + click_id);

  if (element) {
    const deleteIndex = click_id - 1; 

    if (deleteIndex >= 0 && deleteIndex < alarmListArr.length) {
      alarmListArr.splice(deleteIndex, 1);
      element.remove();
      updateAlarmListUI();
      alert(`Your Alarm ${click_id} Deleted.`);
      saveAlarmsToLocalStorage();
    } else {
      alert("Invalid index for alarm deletion.");
    }
  } else {
    alert(`Element not found for ID: "alarm${click_id}"`);
  }
}




function stopAlarm() {
  ring.pause();
  document.querySelector("#stopAlarm").style.visibility = "hidden";
}



let hr = document.querySelector("#hr");
let mn = document.querySelector("#mn");
let sc = document.querySelector("#sc");

setInterval(() => {
  let day = new Date();
  let hh = day.getHours() * 30;
  let mm = day.getMinutes() * 6;
  let ss = day.getSeconds() * 6;

  hr.style.transform = `rotateZ(${hh + mm / 12}deg)`;
  mn.style.transform = `rotateZ(${mm}deg)`;
  sc.style.transform = `rotateZ(${ss}deg)`;

  let h = new Date().getHours();
  let m = new Date().getMinutes();
  let s = new Date().getSeconds();

  let am = h >= 12 ? "PM" : "AM";


  if (h > 12) {
    h = h - 12;
  }


  h = h < 10 ? "0" + h : h;
  m = m < 10 ? "0" + m : m;
  s = s < 10 ? "0" + s : s;

  yhours.innerHTML = h;
  yminutes.innerHTML = m;
  yseconds.innerHTML = s;
  yampm.innerHTML = am;
  // console.log("ssdf")
});

document.addEventListener("DOMContentLoaded", function () {
  loadAlarmsFromLocalStorage();
  updateAlarmListUI();
  updateClock();
  initClock();
  updateNavbarContent();
  function updateNavbarContent() {
    const authUsername = localStorage.getItem("auth");

    const loginLink = document.querySelector(
      ".navbar .nav-link.dropdown-toggle"
    );
    const dropdownContent = document.querySelector(".navbar .dropdown-menu");

    if (loginLink && dropdownContent) {
      if (authUsername) {
        // Oturum açılmışsa
        loginLink.innerHTML = `<i class="fas fa-user"></i> ${authUsername}`;

        const hesabimLink = document.createElement("a");
        hesabimLink.href = "#";
        hesabimLink.textContent = "Hesabım";

        const logoutLink = document.createElement("a");
        logoutLink.href = "index.html";
        logoutLink.id = "logout-link";
        logoutLink.textContent = "Çıkış Yap";

        logoutLink.addEventListener("click", function () {
          localStorage.removeItem("auth");
          updateNavbarContent(); 
        });

        dropdownContent.innerHTML = "";
        dropdownContent.appendChild(hesabimLink);
        dropdownContent.appendChild(logoutLink);
        if (logoutLink) {
            logoutLink.style.display = "block";
            logoutLink.style.marginTop = "5px";
        }
      } else {
        loginLink.innerHTML = `<i class="fas fa-user"></i> Giriş-Kayıt`;

        dropdownContent.innerHTML = `
                    <a class="dropdown-item" href="../login/index.html" styel="">Login</a>
                    <a class="dropdown-item" href="../login/index.html">Sign Up</a>
                `;
                
      }
    }
  }
});



function loadAlarmsFromLocalStorage() {
  const storedAlarms = localStorage.getItem("alarms");
  if (storedAlarms) {
    alarmListArr = JSON.parse(storedAlarms);
  }
}
function saveAlarmsToLocalStorage() {
  localStorage.setItem("alarms", JSON.stringify(alarmListArr));
}

function updateAlarmListUI() {
  document.querySelector(".alarmList").innerHTML = "";
  for (let i = 0; i < alarmListArr.length; i++) {
    const formattedTime = formatTime(new Date(alarmListArr[i]));
    const formattedDate = formatDate(new Date(alarmListArr[i]));
    document.querySelector(".alarmList").innerHTML += `
        <div class="alarmLog" id="alarm${i + 1}">
            <span>${formattedTime}</span>
            <br/>
            <span>&nbsp;&nbsp;${formattedDate}</span> 
            <button class="btn-delete" id="${i + 1}" onClick="deleteAlarm(${i + 1})">Delete</button>
        </div>`;
  }
}

function formatTime(date) {
  let hours = date.getHours();
  let minutes = date.getMinutes();
  let seconds = date.getSeconds();
  let ampm = hours >= 12 ? 'PM' : 'AM';

  hours = hours % 12;
  hours = hours ? hours : 12; 
  minutes = minutes < 10 ? '0' + minutes : minutes;
  seconds = seconds < 10 ? '0' + seconds : seconds;

  return `${hours}:${minutes}:${seconds} ${ampm}`;
}

function formatDate(date) {
  const year = date.getFullYear();
  const month = date.getMonth() + 1; 
  const day = date.getDate();

  return `${year}-${month < 10 ? '0' : ''}${month}-${day < 10 ? '0' : ''}${day}`;
}

