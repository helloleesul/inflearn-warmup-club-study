// 불러온 데이터
let fetchData;
// 메뉴 리스트 (ul)
const menuList = document.getElementById("menuList");

// 버튼 그룹
const buttonGroup = document.getElementById("buttons");

// 메뉴 불러오는 함수
loadMenu();
function loadMenu() {
  fetch("food-list.json")
    .then((response) => response.json())
    .then((menuData) => {
      fetchData = menuData;
      paintMenuList(fetchData);
    })
    .catch((error) => console.error("데이터 불러오기 오류:", error));
}

// 메뉴 그리는 함수
function paintMenuList(menuData) {
  let listItems = "";
  menuData.forEach((menu) => {
    listItems += `<li>
    <article>
        <section><img src=${menu.imageURL} /></section>
        <section>
            <div id="namePrice">
                <span id="name">${menu.name}</span>
                <span id="price">${menu.price.toLocaleString()}원</span>
            </div>
            <p>${menu.description}</p>
            <span id="type">${menu.type}</span>
        </section>
    </article>
    </li>`;
  });

  menuList.innerHTML = listItems;
}

// 메뉴 필터링
function filteredMenuList(buttonText) {
  const filteredData = fetchData.filter((data) => data.type === buttonText);
  if (buttonText === "All") paintMenuList(fetchData);
  else paintMenuList(filteredData);
}

// 버튼 그룹 이벤트 위임
buttonGroup.addEventListener("click", (event) => {
  if (event.target.tagName === "BUTTON") {
    filteredMenuList(event.target.innerText);
  }
});
