const passwordValue = document.querySelector("#passwordValue");
const passwordInput = document.querySelector("#passwordInput");
const passwordForm = document.querySelector("#passwordForm");
const copyBtn = document.querySelector("#copyBtn");

const numbers = document.querySelector("#numbers");
const lowercase = document.querySelector("#lowercase");
const uppercase = document.querySelector("#uppercase");
const symbols = document.querySelector("#symbols");

const min = document.querySelector("#min");
const max = document.querySelector("#max");

const MIN = 5;
const MAX = 70;

passwordInput.setAttribute("min", MIN);
passwordInput.setAttribute("max", MAX);
min.textContent = MIN;
max.textContent = MAX;

// 비밀번호 generator
function* passwordGenerator(
  length,
  includeNumbers,
  includeLowercase,
  includeUppercase,
  includeSymbols
) {
  let charset = "";
  if (includeNumbers) charset += "0123456789";
  if (includeLowercase) charset += "abcdefghijklmnopqrstuvwxyz";
  if (includeUppercase) charset += "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  if (includeSymbols) charset += "!@#$%^&*";

  while (length <= MAX && length >= MIN) {
    let password = "";
    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * charset.length);
      password += charset[randomIndex];
    }
    yield password;
  }
}

passwordForm.addEventListener("submit", (e) => {
  e.preventDefault();
  if (!passwordInput.value) return alert("문자 길이를 입력해주세요!");
  if (
    !numbers.checked &&
    !lowercase.checked &&
    !uppercase.checked &&
    !symbols.checked
  )
    return alert("포함할 문자를 1개 이상 선택해주세요!");

  // 선택한 설정
  const length = Number(passwordInput.value); // 비밀번호 길이
  const includeNumbers = numbers.checked; // 숫자 포함 여부
  const includeLowercase = lowercase.checked; // 소문자 포함 여부
  const includeUppercase = uppercase.checked; // 대문자 포함 여부
  const includeSymbols = symbols.checked; // 특수문자 포함 여부

  const generator = passwordGenerator(
    length,
    includeNumbers,
    includeLowercase,
    includeUppercase,
    includeSymbols
  );

  // 비밀번호 생성 함수 호출
  const newPassword = generator.next().value;
  // 새로운 비밀번호 바인딩
  passwordValue.textContent = newPassword;
});

// 복사하기
copyBtn.addEventListener("click", () => {
  if (!passwordValue.textContent) return;

  navigator.clipboard.writeText(passwordValue.textContent).then(() => {
    alert("비밀번호가 복사되었습니다!");
  });
});
