const appendSeconds = document.querySelector("#seconds");
const appendTens = document.querySelector("#tens");

const btnStart = document.querySelector("#start");
const btnStop = document.querySelector("#stop");
const btnReset = document.querySelector("#reset");

let seconds = 0;
let tens = 0;
let interval;

btnStart.addEventListener("click", () => {
  interval = setInterval(timer, 10);
  // 중복 클릭 방지
  btnStart.setAttribute("disabled", true);
});

btnStop.addEventListener("click", () => {
  clearInterval(interval);
  btnStart.removeAttribute("disabled");
});

btnReset.addEventListener("click", () => {
  clearInterval(interval);
  btnStart.removeAttribute("disabled");

  seconds = 0;
  tens = 0;
  appendSeconds.textContent = 0;
  appendTens.textContent = 0;
});

function timer() {
  tens++;

  if (tens > 99) {
    // seconds 1 올리기
    seconds++;
    // appendSeconds 바인딩
    appendSeconds.textContent = seconds;
    // tens 0 초기화
    tens = 0;
    appendTens.textContent = 0;
  } else {
    appendTens.textContent = tens;
  }
}
