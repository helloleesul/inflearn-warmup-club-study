const question = document.querySelector("#question");
const quizOption = document.querySelector("#quizOption");

// 현재 퀴즈 문제
let turn = 0;
// 결과
let result = false;

// 퀴즈 데이터 불러오는 함수
window.onload = function () {
  loadQuiz();
};
function loadQuiz() {
  fetch("quiz.json")
    .then((response) => response.json())
    .then((quizData) => {
      // 퀴즈 그리기
      paintQuiz(quizData);
      // 답변 선택 이벤트 함수
      quizOption.addEventListener("change", (event) =>
        processQuiz(event, quizData)
      );
    })
    .catch((error) => console.error("데이터 불러오기 오류:", error));
}

// Next, Restart 버튼 생성, 삭제 함수
function handleStepBtn() {
  const createStepBtn = document.createElement("button");
  const stepBtn = document.querySelector("#stepBtn");

  // 정답을 맞췄을 때
  if (result) {
    // 버튼 요소 생성
    return document
      .querySelector("article")
      .appendChild(createStepBtn)
      .setAttribute("id", "stepBtn");
  } else {
    // 버튼 요소가 있다면 삭제
    return stepBtn && document.querySelector("#stepBtn").remove();
  }
}

// 퀴즈 풀기
function processQuiz(event, data) {
  const question = data[turn].question.replace(/\s/g, "");
  // 정답
  const answer = new Function(
    "return " +
      [...question].map((q) => (q === "×" ? "*" : q === "÷" ? "/" : q)).join("")
  );

  // 정답을 맞췄을 때 (className)
  document.querySelectorAll("label").forEach((opt) => {
    opt.className = "false";
    if (Number(opt.htmlFor) === answer()) {
      opt.className = "true";
    }
  });
  // 정답을 맞췄을 때 (result)
  if (Number(event.target.id) === answer()) {
    document.body.className = "true";
    result = true;
  } else {
    document.body.className = "false";
    result = false;
  }
  // result값에 따른 버튼 요소 생성, 삭제 함수
  handleStepBtn();

  if (result) {
    const stepBtn = document.querySelector("#stepBtn");
    // 마지막 문제가 아닐 때
    if (turn < data.length - 1) {
      stepBtn.textContent = "Next";
      stepBtn.addEventListener("click", () => {
        turn++;
        paintQuiz(data);
      });
    } else {
      stepBtn.textContent = "Restart";
      stepBtn.addEventListener("click", () => {
        turn = 0;
        paintQuiz(data);
      });
    }
  }
}

// 퀴즈 그리기
function paintQuiz(data) {
  result = false;
  // result값에 따른 버튼 요소 생성, 삭제 함수
  handleStepBtn();
  let options = "";

  document.body.className = "";
  question.textContent = `${data[turn].question} ?`;
  data[turn].options.forEach((opt) => {
    options += `<div>
        <input type="radio" id="${opt}" name="quizOption" value="${opt}" />
        <label for="${opt}">${opt}</label>
        </div>
        `;
  });
  quizOption.innerHTML = options;
}
