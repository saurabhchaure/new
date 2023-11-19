const date = new Date();
const getApiData = async (url) => {
  const response = await fetch(url);
  const data = await response.json();
  return data;
};

const mainActivity = document.querySelector("#main-activity");
const subActivity = document.querySelector("#sub-activity");
const clientSelect = document.querySelector("#client");
const setDate = document.querySelector(".date");
const activityTimer = document.querySelector(".activity-timer");

setDate.innerHTML = "Date & Time : " + new Date().toLocaleString();

setInterval(() => {
  setDate.innerHTML = "Date & Time : " + new Date().toLocaleString();
}, 1000);

const data = async (url) => {
  const res = getApiData(url).then((res) => {
    // Main Activity
    for (activity of res[0].main_activities) {
      const option = document.createElement("option");
      option.innerHTML = activity;
      option.value = activity;
      mainActivity.appendChild(option);
    }

    // Sub Activity
    mainActivity.addEventListener("change", () => {
      while (subActivity.firstChild) {
        subActivity.removeChild(subActivity.firstChild);
      }
      const option = document.createElement("option");
      option.innerHTML = "Please choose Sub Activity";
      option.value = "";
      subActivity.appendChild(option);
      if (mainActivity.value) {
        subActivity.removeAttribute("disabled");

        console.log(mainActivity.value);
        for (activity of res[0].sub_activities[mainActivity.value]) {
          const option = document.createElement("option");
          option.innerHTML = activity;
          option.value = activity;
          subActivity.appendChild(option);
        }
      } else {
        subActivity.setAttribute("disabled", "disabled");
      }
    });

    // Client
    for (client of res[0].clients) {
      const option = document.createElement("option");
      option.innerHTML = client;
      option.value = client;
      clientSelect.appendChild(option);
    }
  });
};

data("http://localhost:8080/config.json");

console.log(date.getHours(), date.getMinutes(), date.getSeconds());

// START

const startBtn = document.querySelector(".start-btn");

function timeCounter(dateArr) {
  let totalTime = 0;
  for (let i = 0; i < dateArr.end.length; i++) {
    totalTime += dateArr.end[i] - dateArr.start[i];
  }

  return totalTime;
}

function timer(timeArr) {
  let latestStartDate = new Date(timeArr.start[0]);
  let letestEndDate = new Date(timeArr.start[0]);

  if (timeArr.start.length >= 1) {
    latestStartDate = new Date(timeArr.start[timeArr.start.length - 1]);
  }
  if (timeArr.end.length >= 1) {
    letestEndDate = new Date(timeArr.end[timeArr.end.length - 1]);
    console.log(letestEndDate);
  }

  const prevTime = timeCounter(timeArr);

  const setTimer = setInterval(() => {
    let timerDate = new Date();
    let newDate = new Date(timerDate - latestStartDate + prevTime);
    activityTimer.innerHTML =
      newDate.getHours() -
      5 +
      " : " +
      (newDate.getMinutes() - 30) +
      " : " +
      newDate.getSeconds();
  }, 1000);
  return setTimer;
}

let timerId = 0;
let timerDate = 0;
let timeArray = {
  start: [],
  end: [],
};

startBtn.addEventListener("click", () => {
  if (startBtn.innerHTML === "Start") {
    timerDate = new Date();
    timeArray.start.push(timerDate);
    startBtn.innerHTML = "Pause";
    timerId = timer(timeArray);
  } else {
    startBtn.innerHTML = "Start";
    timerDate = new Date();
    timeArray.end.push(timerDate);
    clearInterval(timerId);
  }
  console.log(timeArray);
});
