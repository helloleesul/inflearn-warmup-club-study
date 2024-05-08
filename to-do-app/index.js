const list = document.querySelector("#todo-list");
const createBtn = document.querySelector("#create-btn");

// 투두리스트 데이터
let todos = [];

// 새로운 투두 추가하기 버튼 이벤트
createBtn.addEventListener("click", createNewTodo);

// 새로운 투두 추가하기 함수
function createNewTodo() {
  const item = {
    id: new Date().getTime(),
    text: "",
    complete: false,
  };
  // 새 투두 데이터를 투두리스트에 추가
  todos = [item, ...todos];
  // 새 투두 데이터를 투두 요소 생성 함수 실행
  /**
   * createTodoItem를 실행한 후에 createTodoItem안의 이벤트 함수가 작동되는 이유는 클로저 때문
   */
  const { itemEl, inputEl } = createTodoItem(item);
  // 리스트 요소에 새 투두요소 추가
  list.prepend(itemEl);
  // 투두 요소 disabled 비활성화
  inputEl.removeAttribute("disabled");
  // 투두 요소 입력 focus
  inputEl.focus();
  // 로컬스토리지에 저장
  saveToLocalstorage();
}

// 새 투두 데이터를 투두 요소 생성 함수
function createTodoItem(item) {
  // 투두 요소 생성
  const itemEl = document.createElement("div");
  // 투두 요소 class 추가
  itemEl.classList.add("item");

  // 체크박스 요소 생성
  const checkboxEl = document.createElement("input");
  checkboxEl.type = "checkbox";
  // 투두 데이터 complete를 체크박스 요소 체크유무에 적용
  checkboxEl.checked = item.complete;
  // 투두 데이터 complete가 true라면 투두 요소에 class 추가
  if (item.complete) {
    itemEl.classList.add("complete");
  }

  // 입력 요소 생성
  const inputEl = document.createElement("input");
  inputEl.type = "text";
  // 투두 데이터 text를 입력 요소 값에 적용
  inputEl.value = item.text;
  // 입력 요소 disabled 활성화
  inputEl.setAttribute("disabled", true);

  // 액션 그룹 요소 생성
  const actionsEl = document.createElement("div");
  // 액션 그룹 요소 class 추가
  actionsEl.classList.add("actions");

  // 수정 버튼 요소 생성
  const editBtnEl = document.createElement("button");
  // 수정 버튼 요소 class 추가
  editBtnEl.classList.add("edit-btn");
  // 수정 버튼 요소 text 설정
  editBtnEl.innerText = "수정";

  // 삭제 버튼 요소 생성
  const removeBtnEl = document.createElement("button");
  // 삭제 버튼 요소 class 추가
  removeBtnEl.classList.add("remove-btn");
  // 삭제 버튼 요소 text 설정
  removeBtnEl.innerText = "삭제";

  // 액션 요소에 수정, 삭제 버튼 요소 삽입
  actionsEl.append(editBtnEl, removeBtnEl);
  // 투두 요소에 체크박스, 입력, 액션 요소 삽입
  itemEl.append(checkboxEl, inputEl, actionsEl);

  // 입력 input 이벤트 함수
  inputEl.addEventListener("input", () => {
    // 입력 요소의 값을 투두 데이터 text에 적용
    item.text = inputEl.value;
  });
  // 입력 blur 이벤트 함수
  inputEl.addEventListener("blur", () => {
    // 입력 요소 disabled 활성화
    inputEl.setAttribute("disabled", true);
    // 로컬스토리지에 저장
    saveToLocalstorage();
  });
  // 수정 클릭 이벤트 함수
  editBtnEl.addEventListener("click", () => {
    // 입력 요소 disabled 비활성화
    inputEl.removeAttribute("disabled");
    // 입력 요소 focus
    inputEl.focus();
  });
  // 삭제 클릭 이벤트 함수
  removeBtnEl.addEventListener("click", () => {
    // 투두리스트 데이터에서 투두데이터의 id와 같은 객체를 제외한 배열 반환
    todos = todos.filter((t) => t.id !== item.id);
    // 투두 요소 삭제
    /**
     * 해당 투두 아이템의 itemEl인지 인식할 수 있는 이유는 이벤트버블링 때문
     */
    itemEl.remove();
    // 로컬스토리지에 저장
    saveToLocalstorage();
  });
  // 체크박스 이벤트 함수
  checkboxEl.addEventListener("change", () => {
    // 체크박스요소의 체크유무를 투두 데이터 complete에 적용
    item.complete = checkboxEl.checked;
    // 투두 데이터 complete 값에 따른 class
    if (item.complete) {
      itemEl.classList.add("complete");
    } else {
      itemEl.classList.remove("complete");
    }
    // 로컬스토리지에 저장
    saveToLocalstorage();
  });
  // 투두 요소, 입력 요소 반환
  return { itemEl, inputEl };
}

// 투두 그려주기 함수
function displayTodos() {
  // 로컬스토리지 데이터 불러오기 함수 실행
  loadFromLocalstorage();
  // 바인딩
  for (const todo of todos) {
    const { itemEl } = createTodoItem(todo);
    list.append(itemEl);
  }
}
// 투두 그려주기 함수 실행
displayTodos();

// todos를 로컬스토리지에 저장
function saveToLocalstorage() {
  // todos를 문자로 변경
  const data = JSON.stringify(todos);
  // 로컬스토리지에 저장
  localStorage.setItem("todos", data);
}

// 로컬스토리지 데이터 불러오기 함수
function loadFromLocalstorage() {
  // 로컬스토리지 데이터 불러오기
  const data = localStorage.getItem("todos");
  // 로컬스터리지 데이터가 있다면 todos를 obj로 변경
  if (data) todos = JSON.parse(data);
}
