const wpmDisplay = document.querySelector("#wpm");
const cpmDisplay = document.querySelector("#cpm");
const errorsDisplay = document.querySelector("#errors");
const time = document.querySelector("#time");
const accuracyDisplay = document.querySelector("#accuracy");

const app = document.querySelector("#app");
const resultGroup = document.querySelectorAll(".result-group");

const guide = document.querySelector("#guide");
const typing = document.querySelector("#typing");

const TIME_COUNT = 20;
let seconds = TIME_COUNT;
let interval;

let focused = false;
let currentTyping = "";
let currentSentenceIndex = 0;

let errorCount = 0;
let wpmCount = 0;
let cpmCount = 0;

const gameText =
  "The quick brown fox jumps over the lazy dog. Sphinx of black quartz, judge my vow. Pack my box with five dozen liquor jugs.";
const sentences = gameText.split(/(?<=\. )/);
let visibleSentence = sentences[currentSentenceIndex];

initGame();

// 게임 초기화
function initGame() {
  // focus 초기화
  focused = false;
  // wpm, cpm 숨기기
  resultGroup.forEach((i) => {
    i.style.display = "none";
  });
  // wpm, cpm, errors, time, accuracy 초기화
  wpmDisplay.textContent = 0;
  cpmDisplay.textContent = 0;
  errorsDisplay.textContent = 0;
  time.textContent = TIME_COUNT;
  accuracyDisplay.textContent = 100;
  seconds = TIME_COUNT;
  currentSentenceIndex = 0;
  errorCount = 0;
  wpmCount = 0;
  cpmCount = 0;
  visibleSentence = sentences[currentSentenceIndex];
  // 안내문구
  guide.textContent = "아래를 클릭해서 게임을 시작하세요.";
  // typing 입력값 초기화
  typing.value = "";
  // typing 활성화
  typing.removeAttribute("disabled");
  // 리셋 버튼 삭제
  const resetEl = document.querySelector("#reset");
  resetEl?.remove();
}
// 타이핑 핸들러
function handleTyping(e) {
  currentTyping = e.target.value;

  if (currentTyping.length === visibleSentence.length) {
    errorCount = errorsDisplay.textContent;
    wpmCount = wpmDisplay.textContent;
    cpmCount = cpmDisplay.textContent;

    currentSentenceIndex++;

    if (currentSentenceIndex >= sentences.length) {
      return gameStop();
    }

    visibleSentence = sentences[currentSentenceIndex];
    typing.value = "";
    currentTyping = "";
  }

  // 입력에 따른 class
  let typedTextHTML = visibleSentence
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

  guide.innerHTML = typedTextHTML;

  updateStats();
}

// typing에 focus했을 때 게임시작
typing.addEventListener("focus", gameStart);
// typing 입력 이벤트
typing.addEventListener("input", handleTyping);

// cpm 계산
function calculateCPM(text) {
  const charactersTyped = text.trim().length;
  const cpm = (charactersTyped / TIME_COUNT) * 60;
  return cpm;
}
// wpm 계산
function calculateWPM(text) {
  const wordsTyped = text
    .trim()
    .split(/\s+/)
    .filter((word) => word !== "").length;
  const wpm = (wordsTyped / TIME_COUNT) * 60;
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

  wpmDisplay.innerText = (parseFloat(wpm) + parseFloat(wpmCount)).toFixed(2);
  cpmDisplay.innerText = (parseFloat(cpm) + parseFloat(cpmCount)).toFixed(2);
  errorsDisplay.innerText = errors + Number(errorCount);
  accuracyDisplay.innerText = accuracy.toFixed(0);
}

// 게임 시작
function gameStart() {
  if (!focused) {
    // focus 시작
    focused = true;
    // 메세지 출력
    guide.innerHTML = visibleSentence;
    // 타이머 시작
    interval = setInterval(timer, 1000);
  } else {
    // 이벤트 리스너 제거
    typing.removeEventListener("focus", gameStart);
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
  app.append(resetEl);
  // typing 비활성화
  typing.setAttribute("disabled", true);
  // wpm, cpm 노출
  resultGroup.forEach((i) => {
    i.style.display = "block";
  });
  // 안내문구
  guide.textContent = "새 게임을 시작하려면 다시 시작을 클릭하세요.";
  // 리셋 버튼 클릭 시, 게임 초기화
  resetEl.addEventListener("click", initGame);
}
// 타이머
function timer() {
  if (seconds <= 0) {
    gameStop();
  } else {
    seconds--;
    time.textContent = seconds;
  }
}
