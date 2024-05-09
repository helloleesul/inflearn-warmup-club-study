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

// 게임 텍스트
const gameText =
  "The quick brown fox jumps over the lazy dog. Sphinx of black quartz, judge my vow. Pack my box with five dozen liquor jugs.";
// '.'을 기준으로 배열화
const splitGameText = gameText.split(/(?<=\. )/);
// 현재 보여줄 텍스트 지정
let visibleGameText = splitGameText[currentGameTextIndex];

initGame();

// 게임 초기화
function initGame() {
  // isFocused
  isFocused = false;
  // wpm, cpm 숨기기
  perMinuteGroup.forEach((i) => {
    i.style.display = "none";
  });
  // wpm, cpm, errors, accuracy 초기화
  wpmDisplay.textContent = 0;
  cpmDisplay.textContent = 0;
  errorsDisplay.textContent = 0;
  accuracyDisplay.textContent = 100;
  errorCount = 0;
  wpmCount = 0;
  cpmCount = 0;
  // 타임 초기화
  timeDisplay.textContent = INIT_TIME;
  currentSeconds = INIT_TIME;
  // 게임 텍스트 index 초기화
  currentGameTextIndex = 0;
  visibleGameText = splitGameText[currentGameTextIndex];
  // 시작 전, 안내 메세지
  messageDisplay.textContent = "아래를 클릭해서 게임을 시작하세요.";
  // typingInput 초기화
  typingInput.value = "";
  // typingInput 활성화
  typingInput.removeAttribute("disabled");
  // 다시 시작 버튼 삭제
  const resetEl = document.querySelector("#reset");
  resetEl?.remove();
}

// 타이핑 핸들러
function handleTyping(e) {
  // 현재 타이핑 입력값
  currentTyping = e.target.value;
  // 현재 타이핑 글자 수와 보이는 텍스트 글자수가 같을 때
  if (currentTyping.length === visibleGameText.length) {
    // 요소 값을 전역 wpm, cpm, errors 값에 적용
    errorCount = errorsDisplay.textContent;
    wpmCount = wpmDisplay.textContent;
    cpmCount = cpmDisplay.textContent;
    // 다음 게임 텍스트
    currentGameTextIndex++;
    // 게임 텍스트가 마지막일 때 게임 종료
    if (currentGameTextIndex >= splitGameText.length) {
      return gameStop();
    }
    // 보이는 텍스트를 다음 텍스트로 적용
    visibleGameText = splitGameText[currentGameTextIndex];
    // typingInput, 현재 타이핑 입력값 초기화
    typingInput.value = "";
    currentTyping = "";
  }

  // 현재 타이핑에 따라 class 표시
  let typingGameText = visibleGameText
    .split("")
    .map((char, index) => {
      // 아직 입력하지 않은 값
      if (currentTyping[index] === undefined) {
        return `<span>${char}</span>`;
      } else {
        // 대소문자 구분
        const pattern = new RegExp("^" + currentTyping[index] + "$");
        if (pattern.test(char)) {
          return `<span class="correct">${char}</span>`;
        } else {
          return `<span class="incorrect">${char}</span>`;
        }
      }
    })
    .join("");

  // 화면에 표시
  messageDisplay.innerHTML = typingGameText;
  // 상태 업데이트
  updateStats();
}

// typing focus했을 때 게임시작
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
  // isFocused false일 떄
  if (!isFocused) {
    // isFocused true 설정
    isFocused = true;
    // 게임 텍스트 출력
    messageDisplay.innerHTML = visibleGameText;
    // 타이머 카운트 시작
    interval = setInterval(timer, 1000);
  } else {
    // isFocused true일 때 이벤트 리스너 제거
    typingInput.removeEventListener("focus", gameStart);
  }
}
// 게임 종료
function gameStop() {
  // 타이머 카운트 종료
  clearInterval(interval);
  // 다시 시작 버튼 생성
  const resetEl = document.createElement("button");
  resetEl.innerText = "다시 시작";
  resetEl.id = "reset";
  // 다시 시작 버튼 삽입
  container.append(resetEl);
  // typingInput 비활성화
  typingInput.setAttribute("disabled", true);
  // wpm, cpm 노출
  perMinuteGroup.forEach((i) => {
    i.style.display = "block";
  });
  // 종료 후, 안내 메세지
  messageDisplay.textContent = "새 게임을 시작하려면 다시 시작을 클릭하세요.";
  // 다시 시작 버튼 클릭 시, 게임 초기화
  resetEl.addEventListener("click", initGame);
}
// 타이머 카운트
function timer() {
  // 타임 끝나면 게임 종료
  if (currentSeconds <= 0) {
    gameStop();
  } else {
    // 타임 카운트
    currentSeconds--;
    // 타임 카운트 화면에 노출
    timeDisplay.textContent = currentSeconds;
  }
}
