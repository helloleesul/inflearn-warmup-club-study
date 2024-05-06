const bookForm = document.querySelector("#bookForm");
const bookName = document.querySelector("#bookName");
const bookAuthor = document.querySelector("#bookAuthor");
const submitBtn = document.querySelector("#submitBtn");

const listBody = document.querySelector("#listBody");
const alertDiv = document.querySelector("#alert");

// 현재 저장 값
let inputName = "";
let inputAuthor = "";

submitBtn.setAttribute("disabled", true);

// input에 따라 form submit 제어
function inputHandle() {
  !bookName.value || !bookAuthor.value
    ? submitBtn.setAttribute("disabled", true)
    : submitBtn.removeAttribute("disabled");
}

bookName.addEventListener("input", inputHandle);
bookAuthor.addEventListener("input", inputHandle);

bookForm.addEventListener("submit", (e) => {
  e.preventDefault();
  // 현재 작성 값 저장
  inputName = bookName.value;
  inputAuthor = bookAuthor.value;
  // input value 초기화
  bookName.value = "";
  bookAuthor.value = "";
  submitBtn.setAttribute("disabled", true);

  const newList = document.createElement("li");
  newList.innerHTML = `
  <span>${inputName}</span>
  <span>${inputAuthor}</span>
  <span class="delete"><button>삭제</button></span>`;
  listBody.appendChild(newList);
  // 추가 알림
  const newAlert = document.createElement("p");
  newAlert.setAttribute("class", "add");
  newAlert.innerHTML = "책이 추가되었습니다.";
  alertDiv.appendChild(newAlert);
  setTimeout(() => {
    alertDiv.removeChild(alertDiv.firstChild);
  }, 3000);
});

// 리스트 이벤트 위임
listBody.addEventListener("click", (event) => {
  if (event.target.tagName === "BUTTON") {
    listBody.removeChild(event.target.parentElement.parentElement);
    // 삭제 알림
    const newAlert = document.createElement("p");
    newAlert.setAttribute("class", "remove");
    newAlert.innerHTML = "책이 삭제되었습니다.";
    alertDiv.appendChild(newAlert);
    setTimeout(() => {
      alertDiv.removeChild(alertDiv.firstChild);
    }, 3000);
  }
});
