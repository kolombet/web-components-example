import RandomList from "./random-list";
import { Collection } from "./interfaces";

import express from "express";

// const e = express();

let isDone: boolean = false;
const lines = 42;
let userName = "12";
let res: number = lines + parseFloat(userName);

let canBeEmpty: null = null;
// let assignPrimitiveLater: string | number | boolean;
// assignPrimitiveLater = 'test';
// assignPrimitiveLater = {};

let emptyObject: Object = {};
let complexObject = { name: "Vasya", age: 30 };

let notSure: any = 4;
notSure = "maybe a string instead";
notSure = false;
let betterWay: number | string | boolean = 4;
betterWay = "test";
betterWay = true;

//Константы только для базовых типов
const numLivesForCat = 9;
//numLivesForCat = 1; // Error

const userTag = "user123";
// userTag = 'xxGladiatoRxx';

const complexConstObject = {
  balance: 100,
  currency: "usd",
};
complexConstObject.balance = 500; //никаких ошибок

// типизированные коллекции
let list: number[] = [1, 2, 3];
let genericList: Array<number> = [1, 2, 3];

// типизированные строки
let locale: "en" | "ru" | "ua";
// locale = 'es';

// locale = 'es';
// перечисления
enum UserRole {
  Admin = 0,
  User = 1,
  Guest = 2,
  Customer = 3,
}
// UserRole.Admin = 10;

const UserRoleObj = Object.freeze({
  Admin: 0,
  User: 1,
  Guest: 2,
  Customer: 3,
  Test: 5,
});
// debugger;
// UserRoleObj.Admin = 10;

let role = UserRole.Guest;
console.log(role);
let token = "asdjlfik123";
if (token) {
  if (token === "324jlikj") {
    role = UserRole.Admin;
  } else {
    role = UserRole.User;
  }
}

const checkRole = (role: UserRole): string => {
  switch (role) {
    case UserRole.Admin:
      console.log("welcome!");
      return "welcome";
    case UserRole.User:
      console.log("limited access");
      return "test";
    case UserRole.Guest:
      console.log("no access");
      return "hello";
    // default:
    //   return und;
  }
};
checkRole(UserRole.Customer);

function noReturnFromFunction(): void {
  console.log("эта функция ничего не возвращает");
  // return 'test';
}

// const message = 15 + noReturnFromFunction();
const message = "message: " + noReturnFromFunction();
console.log(typeof message);

let f1 = function (i: number) {
  return i * i;
};
let f2 = function (i: number) {
  return i * i;
};
let f3 = (i: number): number => {
  return i * i;
};
let f4 = (i: number) => {
  return i * i;
};
let f5 = (i: number) => i * i;
let f6 = (i: number) => i + i;

interface Person {
  name: string;
  age?: number;

  move(): void;
}

let p: Person = {
  name: "Bobby",
  move: () => {},
};
let validPerson: Person = {
  name: "Bobby",
  age: 42,
  move: () => {},
};

// let invalidPerson: Person = { name: "Bobby", age: true };

class PersonImpl implements Person {
  constructor(public name = "") {}
  move() {}
}

interface SearchFunc {
  (source: string, subString: string): boolean;
}

let mySearch: SearchFunc = function (src: string, sub: string) {
  return src.search(sub) !== -1;
};
const tau = () => {
  return 2 * Math.PI;
};

// const origin = new Point(0, 0);
class Point {
  x: number;

  constructor(x: number, public y: number = 0) {
    this.x = x;
  }

  dist(): number {
    return Math.sqrt(this.x * this.x + this.y * this.y);
  }
}

let p1 = new Point(10, 20);
let p2 = new Point(25); //y will be 0

// Наследование
class Point3D extends Point {
  constructor(x: number, y: number, public z: number = 0) {
    super(x, y);
  }

  // Перезапись метода
  dist(): number {
    let d = super.dist();
    return Math.sqrt(d * d + this.z * this.z);
  }
}

// Generics
// Classes
class Tuple<T1, T2> {
  constructor(public item1: T1, public item2: T2) {}
}

// Interfaces
interface Pair<T> {
  item1: T;
  item2: T;
}

// And functions
let pairToTuple = function <T>(p: Pair<T>) {
  return new Tuple(p.item1, p.item2);
};

let tuple = pairToTuple({ item1: "hello", item2: "world" });

let newName = "Tyrone";
let greeting = `Hi ${newName}, how are you?`;
let multiline = `
<h1>This</h1> 
<h2>is</h2> 
<br/>
<p>an example</p>
<span>of a multiline string</span>
`;

// Итераторы

// for..of
let arrayOfAnyType = [1, "string", false];
for (const val of arrayOfAnyType) {
  console.log(val); // 1, "string", false
}

let idList = [4, 5, 6];

// for..in
for (const i in idList) {
  console.log(i); // 0, 1, 2
}

// for..of
for (const i of idList) {
  console.log(i); // 4, 5, 6
}

let abc = {};
// abc.def = 123;
// abc.efg = 'hello world';

interface Foo {
  bar: number;
  baz: string;
}

let foo = {} as Foo; // преобразование типов
foo.bar = 123;
foo.baz = "hello world";

console.log("test");

function printToConsole() {}

class PointSimple {
  x: number;
  y: number;
}
const jsonStr = "{'x':'1', 'y':'2'}";
const parsed = JSON.parse(jsonStr) as PointSimple;
const res = parsed.x + parsed.y;

const points = new RandomList<Point>();
// points.add({x:1, y:2});
points.add(new Point(100, 100));
points.add(new Point(200, 150));
console.log(points.prettyPrint());

// function deleteA(text) {
//   return text && text.replace('a', '_');
// }
// const result = deleteA('You are awesome');
// console.log(result);
