const player = document.querySelector("#player");
// 플레이어 점수
const playerScore = player.querySelector(".score");
// 플러이어가 낸 가위바위보 이모지
const playerCurrentPlay = player.querySelector(".currentPlay");

const computer = document.querySelector("#computer");
// 컴퓨터 점수
const computerScore = computer.querySelector(".score");
// 컴퓨터가 낸 가위바위보 이모지
const computerCurrentPlay = computer.querySelector(".currentPlay");

// 남은 횟수
const counterGroup = document.querySelector("#counterGroup");
const counter = document.querySelector("#counter");
// 남은 횟수 기본값
const INIT_COUNTER = 10;
counter.innerText = INIT_COUNTER;

const action = document.querySelector("h3#action");

// 가위바위보 선택 버튼
const buttonGroup = document.querySelector("#buttons");
// 결과
const result = document.querySelector("#result");

// 랜덤으로 RULE[n]이 나오게 한다.
const RULE = { rock: "✊", scissors: "✌️", paper: "🖐️" };

// 게임 시작
function play(playerPlay) {
  // 컴퓨터 랜덤 값 (0~2)
  let computerRandom = Math.floor(Math.random() * 3);
  // 승리
  let winner;

  const PLAYER_WIN = () => {
    return playerScore.innerText++, (winner = "플레이어");
  };
  const COMPUTER_WIN = () => {
    return computerScore.innerText++, (winner = "컴퓨터");
  };

  // 컴퓨터의 가위바위보
  const computerPlay = Object.keys(RULE)[computerRandom];

  // 노출될 가위바위보 이모지
  playerCurrentPlay.innerText = RULE[playerPlay];
  computerCurrentPlay.innerText = RULE[computerPlay];

  switch (playerPlay) {
    case "rock":
      computerPlay === "scissors" && PLAYER_WIN();
      computerPlay === "paper" && COMPUTER_WIN();
      break;
    case "scissors":
      computerPlay === "paper" && PLAYER_WIN();
      computerPlay === "rock" && COMPUTER_WIN();
      break;
    case "paper":
      computerPlay === "rock" && PLAYER_WIN();
      computerPlay === "scissors" && COMPUTER_WIN();
      break;
  }

  if (playerPlay === computerPlay) {
    result.innerText = "무승부";
  } else {
    result.innerText = `${winner} 승리 🏆`;
  }
}
// 게임 종료
function ending() {
  let resultMessage;
  // 가위바위보 선택 버튼 숨기기
  buttonGroup.style.display = "none";
  // 남은 횟수 숨기기
  counterGroup.style.display = "none";
  action.innerText = "게임 종료!";

  if (playerScore.innerText > computerScore.innerText) {
    resultMessage = "게임에서 이겼습니다! 🥳";
  } else if (playerScore.innerText < computerScore.innerText) {
    resultMessage = "게임에서 졌습니다.. 😢";
  } else resultMessage = "게임에서 비겼습니다. 😵‍💫";

  result.innerHTML = `${resultMessage}<button id="replay" onclick="init()">다시 도전하기</button>`;
}
// 초기화
function init() {
  // 가위바위보 선택 버튼 노출
  buttonGroup.style.display = "flex";
  // 남은 횟수 노출
  counterGroup.style.display = "block";
  action.innerText = "선택하기";
  // 남은 횟수 초기화
  counter.innerText = INIT_COUNTER;
  // 결과 초기화
  result.innerText = "";
  // 낸 가위바위보 이모지 숨기기
  playerCurrentPlay.style.display = "none";
  computerCurrentPlay.style.display = "none";
  // 점수 초기화
  playerScore.innerText = 0;
  computerScore.innerText = 0;
}

// 버튼 그룹 이벤트 위임
buttonGroup.addEventListener("click", (event) => {
  if (event.target.tagName === "BUTTON") {
    // 낸 가위바위보 이모지 노출
    playerCurrentPlay.style.display = "inline-block";
    computerCurrentPlay.style.display = "inline-block";
    if (counter.innerText > 1) {
      play(event.target.id);
      counter.innerText--;
    } else ending();
  }
});
