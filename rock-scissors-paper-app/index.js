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
const counter = document.querySelector("#counter");
// 남은 횟수 기본값
const INIT_COUNTER = 10;
counter.innerText = INIT_COUNTER;

// 가위바위보 선택 버튼
const buttonGroup = document.querySelector("#buttons");
// 결과
const result = document.querySelector("#result");

// 랜덤으로 RULE[n]이 나오게 한다.
const RULE = { rock: "✊", scissors: "✌️", paper: "🖐️" };

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

// 버튼 그룹 이벤트 위임
buttonGroup.addEventListener("click", (event) => {
  if (event.target.tagName === "BUTTON") {
    if (counter.innerText > 0) {
      play(event.target.id);
      counter.innerText--;
    } else {
      if (confirm("다시 도전하시겠습니까?")) {
        // 남은 횟수 초기화
        counter.innerText = INIT_COUNTER;
        // 결과 초기화
        result.innerText = "";
        // 낸 가위바위보 이모지 초기와
        playerCurrentPlay.innerText = "";
        computerCurrentPlay.innerText = "";
        // 점수 초기화
        playerScore.innerText = 0;
        computerScore.innerText = 0;
      }
    }
  }
});
