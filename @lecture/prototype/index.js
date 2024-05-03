const user = {
  name: "John",
  age: 45,
};

console.log(user.name); // John
console.log(user.hasOwnProperty("email")); // false
console.log(user); // [[Prototype]]: Object
/**
 * hasOwnProperty은 어디서 온걸까?
 */

// Constructor Function 생성자 함수
function Person(name, email, birthday) {
  this.name = name;
  this.email = email;
  this.birthday = new Date(birthday);
  //   this.calculateAge = function () {
  //     const diff = Date.now() - this.birthday.getTime();
  //     const ageDate = new Date(diff);
  //     return Math.abs(ageDate.getUTCFullYear() - 1970);
  //   };
}

// 재사용할 수 있는 메소드를 Person.prototype으로 설정해 메모리 절약하기
Person.prototype.calculateAge = function () {
  const diff = Date.now() - this.birthday.getTime();
  const ageDate = new Date(diff);
  return Math.abs(ageDate.getUTCFullYear() - 1970);
};

const john = new Person("john", "john@abc.com", "7-10-91");
const han = new Person("han", "han@abc.com", "2-8-91");

/**
 * john, han의 프로토타입은 Person이고, Person의 프로토타입은 Object
 */
// [[Prototype]]: Object constructor: f Person(name, email, birthday)
console.log(john);
console.log(han);

// Object.create()을 사용해 Person.prototype 만들기
function Person2(name, email, birthday) {
  let person = Object.create(personsPrototype);
  person.name = name;
  person.email = email;
  person.birthday = new Date(birthday);
  return person;
}

const personsPrototype = {
  calculateAge() {
    const diff = Date.now() - this.birthday.getTime();
    const ageDate = new Date(diff);
    return Math.abs(ageDate.getUTCFullYear() - 1970);
  },
};

const han2 = new Person2("han", "han@abc.com", "2-8-91");
console.log(han2);
