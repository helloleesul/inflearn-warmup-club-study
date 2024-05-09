const spreadSheetContainer = document.querySelector("#spreadsheet-container");
const exportBtn = document.querySelector("#export-btn");
const ROWS = 10;
const COLS = 10;
const spreadSheet = [];
const alphabet = [
  "A",
  "B",
  "C",
  "D",
  "E",
  "F",
  "G",
  "H",
  "I",
  "J",
  "K",
  "L",
  "M",
  "N",
  "O",
  "P",
  "Q",
  "R",
  "S",
  "T",
  "U",
  "V",
  "W",
  "X",
  "Y",
  "Z",
];

// 셀 클래스
class Cell {
  constructor(
    isHeader,
    disabled,
    data,
    row,
    column,
    rowName,
    columnName,
    active = false
  ) {
    this.isHeader = isHeader;
    this.disabled = disabled;
    this.data = data;
    this.row = row;
    this.column = column;
    this.rowName = rowName;
    this.columnName = columnName;
    this.active = active;
  }
}

// 스프레드시트 초기화
function initSpreadSheet() {
  for (let i = 0; i < ROWS; i++) {
    let rows = [];
    for (let j = 0; j < COLS; j++) {
      let cellData = "";
      let isHeader = false;
      let disabled = false;

      // 첫 번째 column에 숫자 넣어주기
      if (j === 0) {
        cellData = i;
        isHeader = true; // 첫 번째 column은 헤더
        disabled = true; // 첫 번째 column은 disabled
      }
      // 첫 번째 row에 숫자 넣어주기
      if (i === 0) {
        cellData = alphabet[j - 1];
        isHeader = true; // 첫 번째 row는 헤더
        disabled = true; // 첫 번째 row는 disabled
      }
      // 첫 번째 row의 undefined, 첫 번째 column의 0은 빈칸 넣어주기
      if (!cellData) cellData = "";

      const rowName = i;
      const columnName = alphabet[j - 1];

      // 셀 객체 생성하기
      const cell = new Cell(
        isHeader,
        disabled,
        cellData,
        i,
        j,
        rowName,
        columnName,
        false
      );
      // row에 셀 삽입하기
      rows.push(cell);
    }
    // 시트에 row들 삽입하기
    spreadSheet.push(rows);
  }
  // 시트 그리기
  drawSheet();
  // console.log("spreadSheet", spreadSheet);
}

// 엑셀 내보내기
exportBtn.addEventListener("click", (e) => {
  let csv = "";
  for (let i = 0; i < spreadSheet.length; i++) {
    if (i === 0) continue;
    csv +=
      spreadSheet[i]
        .filter((item) => !item.isHeader)
        .map((item) => item.data)
        .join(",") + "\r\n";
  }
  console.log("🚀 ~ exportBtn.addEventListener ~ csv:", csv);

  const csvObj = new Blob([csv]);
  const csvUrl = URL.createObjectURL(csvObj);
  console.log("🚀 ~ exportBtn.addEventListener ~ csvUrl:", csvUrl);

  const a = document.createElement("a");
  a.href = csvUrl;
  a.download = "sheet.csv";
  a.click();
});

// 스프레드시트 초기화 실행
initSpreadSheet();

// 시트 그리기
function drawSheet() {
  for (const row of spreadSheet) {
    // 시트의 row 요소 생성하기
    const rowContainerEl = document.createElement("div");
    rowContainerEl.className = "cell-row";
    for (const cell of row) {
      // 셀 요소 생성해서 row 요소에 삽입하기
      rowContainerEl.append(createCellEl(cell));
    }
    // 스프레드시트 요소에 row요소들 삽입하기
    spreadSheetContainer.append(rowContainerEl);
  }
}

// 셀 요소 생성하기
function createCellEl(cell) {
  const cellEl = document.createElement("input");
  cellEl.className = "cell";
  cellEl.id = `cell_${cell.row}${cell.column}`;
  cellEl.value = cell.data;
  cellEl.disabled = cell.disabled;

  if (cell.isHeader) cellEl.classList.add("header");

  cellEl.addEventListener("click", () => handleCellCick(cell));
  cellEl.addEventListener("change", (e) =>
    handleCellChange(e.target.value, cell)
  );

  return cellEl;
}

// 셀 클릭 이벤트
function handleCellCick(cell) {
  clearHeaderActiveStates();
  const rowHeader = spreadSheet[cell.row][0];
  const columnHeader = spreadSheet[0][cell.column];
  const rowHeaderEl = getElFromRowCol(rowHeader.row, rowHeader.column);
  const columnHeaderEl = getElFromRowCol(columnHeader.row, columnHeader.column);

  rowHeaderEl.classList.add("active");
  columnHeaderEl.classList.add("active");
  document.querySelector(
    "#cell-status"
  ).textContent = `${cell.columnName}${cell.rowName}`;
  // console.log(rowHeaderEl, columnHeaderEl);
}

// active 상태 초기화
function clearHeaderActiveStates() {
  const headers = document.querySelectorAll(".header");
  headers.forEach((header) => {
    header.classList.remove("active");
  });
}

// 셀 id 가져오기
function getElFromRowCol(row, col) {
  return document.querySelector(`#cell_${row}${col}`);
}

// 셀 입력 이벤트
function handleCellChange(data, cell) {
  cell.data = data;
}
