const wpmDisplay = document.querySelector("#wpm");
const cpmDisplay = document.querySelector("#cpm");
const errorsDisplay = document.querySelector("#errors");
const timeDisplay = document.querySelector("#time");
const accuracyDisplay = document.querySelector("#accuracy");

const container = document.querySelector("#app");
const perMinuteGroup = document.querySelectorAll(".result-group");

const messageDisplay = document.querySelector("#guide");
const typingInput = document.querySelector("#typing");

const INIT_TIME = 20;
let currentSeconds = INIT_TIME;
let interval;

let isFocused = false;
let currentTyping = "";
let currentGameTextIndex = 0;

let errorCount = 0;
let wpmCount = 0;
let cpmCount = 0;

const gameText =
  "The quick brown fox jumps over the lazy dog. Sphinx of black quartz, judge my vow. Pack my box with five dozen liquor jugs.";
const splitGameText = gameText.split(/(?<=\. )/);
let visibleGameText = splitGameText[currentGameTextIndex];

initGame();

// 게임 초기화
function initGame() {
  // focus 초기화
  isFocused = false;
  // wpm, cpm 숨기기
  perMinuteGroup.forEach((i) => {
    i.style.display = "none";
  });
  // wpm, cpm, errors, time, accuracy 초기화
  wpmDisplay.textContent = 0;
  cpmDisplay.textContent = 0;
  errorsDisplay.textContent = 0;
  timeDisplay.textContent = INIT_TIME;
  accuracyDisplay.textContent = 100;
  currentSeconds = INIT_TIME;
  currentGameTextIndex = 0;
  errorCount = 0;
  wpmCount = 0;
  cpmCount = 0;
  visibleGameText = splitGameText[currentGameTextIndex];
  // 안내문구
  messageDisplay.textContent = "아래를 클릭해서 게임을 시작하세요.";
  // typing 입력값 초기화
  typingInput.value = "";
  // typing 활성화
  typingInput.removeAttribute("disabled");
  // 리셋 버튼 삭제
  const resetEl = document.querySelector("#reset");
  resetEl?.remove();
}
// 타이핑 핸들러
function handleTyping(e) {
  currentTyping = e.target.value;

  if (currentTyping.length === visibleGameText.length) {
    errorCount = errorsDisplay.textContent;
    wpmCount = wpmDisplay.textContent;
    cpmCount = cpmDisplay.textContent;

    currentGameTextIndex++;

    if (currentGameTextIndex >= splitGameText.length) {
      return gameStop();
    }

    visibleGameText = splitGameText[currentGameTextIndex];
    typingInput.value = "";
    currentTyping = "";
  }

  // 입력에 따른 class
  let typingGameText = visibleGameText
    .split("")
    .map((char, index) => {
      if (currentTyping[index] === undefined) {
        return `<span>${char}</span>`;
      } else {
        const pattern = new RegExp("^" + currentTyping[index] + "$");
        if (pattern.test(char)) {
          return `<span class="correct">${char}</span>`;
        } else {
          return `<span class="incorrect">${char}</span>`;
        }
      }
    })
    .join("");

  messageDisplay.innerHTML = typingGameText;

  updateStats();
}

// typing에 focus했을 때 게임시작
typingInput.addEventListener("focus", gameStart);
// typing 입력 이벤트
typingInput.addEventListener("input", handleTyping);

// cpm 계산
function calculateCPM(text) {
  const charactersTyped = text.trim().length;
  const cpm = (charactersTyped / INIT_TIME) * 60;
  return cpm;
}
// wpm 계산
function calculateWPM(text) {
  const wordsTyped = text
    .trim()
    .split(/\s+/)
    .filter((word) => word !== "").length;
  const wpm = (wordsTyped / INIT_TIME) * 60;
  return wpm;
}
// 정확도 계산
function calculateAccuracy(text, errors) {
  return 100 - (errors / text.length) * 100;
}
// 상태 업데이트
function updateStats() {
  const wpm = calculateWPM(currentTyping);
  const cpm = calculateCPM(currentTyping);
  const errors = document.querySelectorAll(".incorrect").length;
  const accuracy = calculateAccuracy(gameText, errors + Number(errorCount));

  wpmDisplay.innerText = (Number(wpm) + Number(wpmCount)).toFixed(2);
  cpmDisplay.innerText = (Number(cpm) + Number(cpmCount)).toFixed(2);
  errorsDisplay.innerText = errors + Number(errorCount);
  accuracyDisplay.innerText = accuracy.toFixed(0);
}

// 게임 시작
function gameStart() {
  if (!isFocused) {
    // focus 시작
    isFocused = true;
    // 메세지 출력
    messageDisplay.innerHTML = visibleGameText;
    // 타이머 시작
    interval = setInterval(timer, 1000);
  } else {
    // 이벤트 리스너 제거
    typingInput.removeEventListener("focus", gameStart);
  }
}
// 게임 종료
function gameStop() {
  // 타이머 끝
  clearInterval(interval);
  // 리셋 버튼 생성
  const resetEl = document.createElement("button");
  resetEl.innerText = "다시 시작";
  resetEl.id = "reset";
  // 리셋 버튼 삽입
  container.append(resetEl);
  // typing 비활성화
  typingInput.setAttribute("disabled", true);
  // wpm, cpm 노출
  perMinuteGroup.forEach((i) => {
    i.style.display = "block";
  });
  // 안내문구
  messageDisplay.textContent = "새 게임을 시작하려면 다시 시작을 클릭하세요.";
  // 리셋 버튼 클릭 시, 게임 초기화
  resetEl.addEventListener("click", initGame);
}
// 타이머
function timer() {
  if (currentSeconds <= 0) {
    gameStop();
  } else {
    currentSeconds--;
    timeDisplay.textContent = currentSeconds;
  }
}
