// prototype chain
const testArray = [1, 2, 3];
testArray.push(4);
console.log("testArray", testArray); // [1, 2, 3, 4]
console.log(Array.prototype);

const testArray2 = [1, 2, 3];
Array.prototype.push = function (x) {
  return "pushed value: " + x;
};
console.log("testArray2.push", testArray2.push(4));
console.log("testArray2", testArray2);

// class
class Person {
  constructor(name, email, birthday) {
    this.name = name;
    this.email = email;
    this.birthday = new Date(birthday);
  }

  // Person.prototype에 등록되는 메소드
  introduce() {
    return `Hello my name is ${this.name}`;
  }

  // class Person에 등록되는 메소드 [[Prototype]] -> constructor -> multipleNumbers
  static multipleNumbers(x, y) {
    return x * y;
  }
}

console.log(Person.multipleNumbers(2, 9));
const haha = new Person("haha", "hoho", 1 - 2);
console.log("haha", haha);

// sub class
class Person2 {
  constructor(name, email) {
    this.name = name;
    this.email = email;
  }

  introduce() {
    return `Hello my name is ${this.name}`;
  }
}

class Client extends Person2 {
  constructor(name, email, phone, address) {
    super(name, email);

    this.phone = phone;
    this.address = address;
  }
}

const john = new Client("john", "john@abc.com", "010-000-1111", "서울");
console.log(john);
console.log(john.introduce());
