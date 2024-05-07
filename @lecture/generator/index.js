function* sayNumber() {
  yield 1;
  yield 2;
  yield 3;
}
// 제너레이터 함수의 반환이 제너레이터
const numbers = sayNumber();
console.log(numbers.next());
console.log(numbers.next());
console.log(numbers.next());
console.log(numbers.next());

function* generatorFunction() {
  yield 1;
}
const generator = generatorFunction();
// generator = generator[Symbol.iterator]();
console.log("🚀 ~ generator.next():", generator.next());

function* createIds() {
  let index = 1;
  while (true) {
    yield index++;
  }
}

const ids = createIds();
console.log(ids.next().value);
console.log(ids.next().value);
console.log(ids.next().value);
console.log(ids.return(10));

function* funcFunction() {
  yield* [1, 2, 3, 4];
}
const func = funcFunction();
for (const n of func) {
  console.log("yield*", n);
}
