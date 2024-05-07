function makeIterator(numbers) {
  let nextIndex = 0;

  return {
    next: function () {
      return nextIndex < numbers.length
        ? { value: numbers[nextIndex++], done: false }
        : { value: undefined, done: true };
    },
  };
}

const numbersArr = [1, 2, 3];
// const numbersIterator = makeIterator(numbersArr);

// Symbol.iterator를 이용하면 반복가능한 값을 반복기로 생성 가능
const numbersIterator = numbersArr[Symbol.iterator]();
console.log(numbersIterator.next());
console.log(numbersIterator.next());
console.log(numbersIterator.next());
console.log(numbersIterator.next());

const numbersIterable = [1, 2, 3];
const numbersNotIterable = { a: 1, b: 2, c: 3 };
console.log(typeof numbersIterable);
console.log(typeof numbersNotIterable);

for (const n of numbersIterable) {
  console.log(n);
}
// 에러 발생: 객체는 iterable 하지 않음
// for (const n of numbersNotIterable) {
//   console.log(n);
// }

console.log(numbersIterable[Symbol.iterator]());
// 에러 발생: 객체는 iterable 하지 않음
// console.log(numbersNotIterable[Symbol.iterator]());

const set = new Set([1, 2, 3, 4]);
console.log("🚀 ~ set:", set);
console.log(set[Symbol.iterator]());
console.log(set[Symbol.iterator]().next());

const map = new Map([
  ["a", 1],
  ["b", 2],
  ["c", 3],
]);
console.log("🚀 ~ map:", map);
console.log(map[Symbol.iterator]());
console.log(map[Symbol.iterator]().next());
// set, map도 iterable
