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

    alarmTime = `${selectMenu[0].value}:${selectMenu[1].value}:${selectMenu[2].value} ${selectMenu[3].value}`;
    alarmListArr.push(alarmTime);
    alert(`Your ${alarmText} Set ${alarmTime}.`);
  }
}

document.getElementById("btn-setAlarm").addEventListener("click", setAlarm);
document.getElementById("btn-setAlarm2").addEventListener("click", setAlarm2);
setAlarmBtn.addEventListener("click", setAlarm);


// ...

// ...

// ...

// ...
function test(){
  console.log("alarm started")
      
  console.log("Alarm ringing...");
  ring.load();
  ring.play();
  document.querySelector("#stopAlarm").style.visibility = "visible";
  setTimeout(() => {
    alarmStarted = false;
    stopAlarm();
    console.log('alarm stopped');
  }, 5000);
}
function start(){
  console.log("start started")
  var now = new Date();
    let hou = now.toLocaleString('en-US', {hour: '2-digit', minute: '2-digit', second:'2-digit', hour12: true});
    console.log(alarmListArr[1]);
    console.log(JSON.stringify(alarmListArr));
    console.log(hou)
//"01:16:00 PM"


  if (alarmListArr[1] === hou && alarmStarted) {
   test();
  }

}
function startAlarms() {
  if (alarmListArr.length===0) {
    console.log("Please set alarms before starting.");
    return;
  }
  if (alarmListArr.length < 2) {
    console.log("Please set at least two alarms to start.");
    return;
  }
alarmStarted = true;
console.log(alarmStarted);


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

function getTimeDifferenceInSeconds(time1, time2) {
  const time1Array = time1.split(":").map(Number);
  const time2Array = time2.split(":").map(Number);

  const seconds1 = time1Array[0] * 3600 + time1Array[1] * 60 + time1Array[2];
  const seconds2 = time2Array[0] * 3600 + time2Array[1] * 60 + time2Array[2];

  return Math.abs(seconds2 - seconds1);
}


function deleteAlarm(click_id) {
  var element = document.getElementById("alarm" + click_id);
  var deleteIndex = alarmListArr.indexOf(
    document.querySelector("#span" + click_id).innerText
  );
  alarmListArr.splice(deleteIndex, 1);
  element.remove();
  alert(`Your Alarm ${click_id} Delete.`);
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
          updateNavbarContent(); // Çıkış yapıldığında anında güncelleme yapma
        });

        dropdownContent.innerHTML = "";
        dropdownContent.appendChild(hesabimLink);
        dropdownContent.appendChild(logoutLink);
        if (logoutLink) {
            logoutLink.style.display = "block";
            logoutLink.style.marginTop = "5px";
        }
      } else {
        // Oturum açılmamışsa
        loginLink.innerHTML = `<i class="fas fa-user"></i> Giriş-Kayıt`;

        dropdownContent.innerHTML = `
                    <a class="dropdown-item" href="../login/index.html" styel="">Login</a>
                    <a class="dropdown-item" href="../login/index.html">Sign Up</a>
                `;
                
      }
    }
  }
});
