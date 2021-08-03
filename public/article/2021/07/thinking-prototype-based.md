# 面向对象的实现

> [维基百科分为两种](https://zh.wikipedia.org/wiki/基于对象语言)
>
> [周爱民在 《JavaScript语言精髓与编程实践（第3版）》 3.2 JavaScript的原型继承 章节中分为了三种](https://weread.qq.com/web/reader/bd73243071e43421bd7c139kc81322c012c81e728d9d180): 一个对象系统的继承特性有三种实现方案，包括基于类（class-based）、基于原型（prototype-based）和基于元类（metaclass-based）。

- 基于类
- 基于原型
- 基于元类

## 基于原型

> 讨论的是 Javascript

基于原型的面向对象语言的基本规则为：

1. 所有的数据都是对象。
2. 要获得一个新对象，需要从另外一个对象克隆出来。
3. 对象会记住它的原型。
4. 对象无法完成的操作，会委托给原型来完成。

这就是**原型链**的所有内容。

## Javascript 中所有数据都。。。基本上是对象

JavaScript 的类型分为：

- 基本类型（primitives）
  - null
  - undefined
  - boolean
  - number
  - string
  - symbol
  - bigint
- 对象类型
  - object

**变量没有类型，值才有类型。**所以 `typeof`、`instanceof` 的执行目标都是**值**，而不是变量。

字符串是不可更改的。



### `prototype` 、 `__proto__` 和 `Object.getPrototypeOf` 以及不得不提的 `constructor`

- `constructor`: **构造函数**：创建和初始化对象的**函数对象** ，按照约定俗成，是首字母大写的函数（以和普通函数区分）。构造函数的 `prototype` 属性是用来实现继承和共享属性的对象。
- `prototype`: **原型属性**：为其他对象**提供共享属性的属性**(当通过 `new` 运算符构建新对象时，新对象的原型会通过构造函数的 `prototype`来构建属性)。每一个函数对象（ `Function` ）都有一个 `prototype` 属性，并且*只有*函数对象有 `prototype` 属性，因为 `prototype` 本身就是定义在 `Function` 对象下的属性。
- `__proto__(即 [[Prototype]])` 指向**构造函数的原型对象** 。
- `Object.getPrototypeOf` : 给定**对象的原型**。如果没有继承属性，则返回 `null` 。



`prototype` 是用于定义属性、方法的，因为除了这种方式去定义，没有其他办法访问到 `[[Prototype]]` ，除非使用非标准的 `__proto__` 和 `ES6+` 的 `Object.getPrototypeOf`。

```javascript
// __proto__ 和 Object.getPrototypeOf 等价
Object.getPrototypeOf(()=>{}) === (()=>{}).__proto__ // true
```



```javascript
const A = function(){}
const a = new A()

// 执行结果

// A 的 prototype 和 __proto__ 
typeof A // "function"
A.prototype // {constructor: ƒ}
A.__proto__ // ƒ () { [native code] }

// a 的 prototype 和 __proto__ 
typeof a // "object"
a.prototype // undefined
a.__proto__ // {constructor: ƒ}

// Function
typeof Function // "function"
Function.__proto__ // ƒ () { [native code] }
Function.prototype // ƒ () { [native code] }
Function.__proto__ === Function.prototype // true

// 
A.__proto__ === Function.__proto__ // true
a.__proto__ === A.prototype // true a 的 原型指向了 A 的构造函数
a.__proto__.__proto__ === Object.prototype // true A 的构造函数的原型指向了 Object 的构造函数
a.__proto__.__proto.__proto__ // null 原型链末尾
```

### `[[Prototype]]`

>  `[[Prototype]]` 只是一个对其他对象的引用。

#### `Object.prototype` ：最顶层的对象

每个 *普通* 的 `[[Prototype]]` 链的最顶端，是内建的 `Object.prototype`。这个对象包含各种在整个 JS 中被使用的共通工具，因为 JavaScript 中所有普通（内建，而非被宿主环境扩展的）的对象都“衍生自”（也就是，使它们的 `[[Prototype]]` 顶端为）`Object.prototype` 对象。



### 哪些对象有 `prototype` 属性

> 函数的一个奇怪的性质：所有的函数默认都会得到一个公有的，不可枚举的属性，称为 `prototype`，它可以指向任意的对象。

> **`new` 运算符**创建一个用户定义的对象类型的实例或具有构造函数的内置对象的实例。

只有构造函数有 `prototype` 属性，因为要调用构造函数。

> `Function` 的 `prototype` 指的是 `prototype` 属性（构造函数用来实现共享和继承的对象）。
>
> 其他对象的 `prototype` 指的是原型对象。
>
> 所以，每个由  `new constructor[([arguments])]` 生成的对象的 `[[Prototype]]` 会指向 `constructor` 的 `prototype` 属性指向的对象。

```javascript
// Function 的 prototype 属性 指向构造函数的 prototype 属性

// 构造函数的 prototype 指向原型
Function.constructor.prototype === Function.__proto__ // true

Function.constructor.prototype === Function.__proto__ // true

Function === Function.constructor // true
Function.__proto__.constructor === Function.constructor // true
Function.prototype === Function.__proto__ // true

Function.constructor === Object.constructor // true
Function === Object.constructor // true
Object.__proto__ === Function.__proto__ // true


Function.__proto__ === Function.prototype // true
Object.__proto__ === Object.prototype //false

Object.__proto__ === Object.constructor.prototype // true
Function.__proto__ === Function.constructor.prototype // true

Object.__proto__.__proto__ === Object.prototype // true

Function.__proto__  === Object.__proto__ //true
```



- `Function.prototype`
- `Object.prototype`
- `Array.prototype`
- `Number.prototype`
- `String.prototype`
- `Boolean.prototype`
- `Symbol.prototype`
- `BingInt.prototype`
- `Date.prototype`
- `Set.prototype`
- `Error.prototype`
- `WeakSet.prototype`
- `Promise.prototype`
- `DataView.prototype`
- `NativeError.prototype`
- `ArrayBuffer.prototype`
- `AsyncFunction.prototype`
- ...其他构造函数

如果使用内建的 `.bind(..)` 工具来制造一个硬绑定的函数，这个被创建的函数将不会拥有 `.prototype` 属性。



### 例子

```javascript
// 函数既拥有 prototype， 也拥有 [[Prototype]]， 所以表现出差异
Function.__proto__ === Object.__proto__ // true
Function.__proto__ === Function.prototype // true
```

### new 运算符

> **`new` 运算符**创建一个用户定义的对象类型的**实例**或具有构造函数的内置对象的**实例**。
>
> 函数自身 **不是** 构造器。但是，当你在普通函数调用前面放一个 `new` 关键字时，这就将函数调用变成了“构造器调用”。事实上，`new` 在某种意义上劫持了普通函数并将它以另一种方式调用：构建一个对象，**外加这个函数要做的其他任何事**。

```javascript
// new命令的作用，就是执行一个构造函数，并且返回一个对象实例。

//语法
new constructor[([arguments])]
```

#### 过程

1. 创建一个空的简单JavaScript对象（即 `{}` ）；
2. 链接该对象（设置该对象的**constructor**）到另一个对象 ；
3. 将步骤1新创建的对象作为`this`的上下文 ；
4. 如果该函数没有返回对象，则返回`this`。

```javascript
// NothingSpecial 只是一个函数
// 被 new 调用的时候，构建并返回一个对象是副作用
// NothingSpecial 并不是 构造器
function NothingSpecial() {
	console.log("Don't mdin me!")
}

// “构造器” 是用 new 关键字调用的任何函数。
var a = new NothingSpecial() // Don't mdin me!
a // {}
```



### 原型链

如果严格按照从上一个对象克隆出来新的对象，那么显然会天然生成一条原型链。但是在 `JavaScript` 中，**所有的对象都是从 `Object.prototype` 克隆出来的**。那么原型链从何而来？

`JavaScript` 可以更改对象构造器的原型，所以可以把原型的指向从 `Object.prototype` 动态指向其他对象。

```javascript
const obj = {
	name: 'tom',
}

const A = function() {}
// 改变 构造函数A 的 prototype
A.prototype = obj

// a 的 原型指向了 obj
// 现在 a 的 __proto__ 指向了 obj
// obj 的 __proto__ 指向 Object.prptotype
const a = new A()
console.log(a) // { __proto__: name: "tom"}
a.__proto__ === obj // true
```

```javascript
const A = function (name = 'default name') {
  this.name = name
}
A.prototype.getName = function() {
  return this.name
}

const B = function (key) {
  this.key = key
}
B.prototype = new A()
B.prototype.getKey = function () {
  return this.key
}

const a = new A('Tom')
const b = new B('B')

console.log(a) // {name: "Tom"}
console.log(a.__proto__) // {getName: ƒ, constructor: ƒ}
console.log(a.getName()) // "Tom"

console.log(b) // {key: "B"}
console.log(b.__proto__) // {name: "default name", getKey: ƒ}
console.log(b.getKey()) // "B"
console.log(b.__proto__.__proto__) // {getName: ƒ, constructor: ƒ}

// b 对象没有 getName
// 委托给 b.__proto__
// b.__proto__ 也没有 getName，委托给 b.__proto__.__proto__
// b.__proto__.__proto__ 发现了 getName，发生调用。
console.log(b.getName()) // “default name"
```

### You-Dont-Know-JS 推荐用法

```
function Foo(name) {
	this.name = name;
}

Foo.prototype.myName = function() {
	return this.name;
};

function Bar(name,label) {
	Foo.call( this, name );
	this.label = label;
}

// 这里，我们创建一个新的 `Bar.prototype` 链接链到 `Foo.prototype`
// ES6 以前
// 扔掉默认既存的 `Bar.prototype`
Bar.prototype = Object.create( Foo.prototype );

// ES6+
// 修改既存的 `Bar.prototype`
Object.setPrototypeOf( Bar.prototype, Foo.prototype );

// 注意！现在 `Bar.prototype.constructor` 不存在了，
// 如果你有依赖这个属性的习惯的话，它可以被手动“修复”。

Bar.prototype.myLabel = function() {
	return this.label;
};

var a = new Bar( "a", "obj a" );

```

#### 为什么不用 `Bar.prototype = new Foo()`

`Bar.prototype = new Foo()` **确实** 创建了一个新的对象，这个新对象也的确链接到了我们希望的 `Foo.prototype`。但是，它是用 `Foo(..)` “构造器调用”来这样做的。这样的问题在于，`Foo()` 是通过构造器调用的，会在 链接（执行 `new Foo()`）的时候执行，然后执行 `Bar` 的构造函数。而不是像可能希望的那样，仅最终在 `new Bar()` 的被调用时发生。(? 区别？)

### 关于新出现的两种函数

```javascript
(function (){}).constructor // ƒ Function() { [native code] }
(() => {}).constructor // ƒ Function() { [native code] }
(function* (){}).constructor // ƒ GeneratorFunction() { [native code] }
(async function() {}).constructor // ƒ AsyncFunction() { [native code] }

// GeneratorFunction 和 AsyncFunction 是新出现的构造函数
Function.__proto__ === Object.__proto__ // true
(function() {}).__proto__ === Object.__proto__ // true
(function*() {}).__proto__.__proto__ === Object.__proto__ // true
(async function() {}).__proto__.__proto__ === Object.__proto__ // true
```



### 修改原型

> ES6+ 推荐使用 `Object.setPrototypeOf`, ES6之前可以使用浏览器的非标准属性: `__proto__`，或者直接在创建对象的时候使用指定对象为原型：**`Object.create()`**。

## 委托 VS 类

> 委托和类都是一种设计模式

### 类设计模式

>  类设计模式鼓励将继承发挥最大的功效

子类需要覆盖父类的泛化方法时，会使用方法覆盖（和多态），也许会利用 `super` 来调用这个方法的泛化版本，为它添加额外行为。也就是说，存在这种地方：**可以“抽象”到父类中，并在子类中特化（覆盖）的一般化行为。**

```java
class Task {
	id;

	// `Task()` 构造器
	Task(ID) { id = ID; }
	outputTask() { output( id ); }
}

class XYZ inherits Task {
	label;

	// `XYZ()` 构造器
	XYZ(ID,Label) { super( ID ); label = Label; }
	outputTask() { super(); output( label ); }
}

class ABC inherits Task {
	// ...
}
```

现在，你可以初始化一个或多个 `XYZ` 子类的 **拷贝**，并且使用这些实例来执行“XYZ”任务。这些实例已经 **同时拷贝** 了泛化的 `Task` 定义的行为和具体的 `XYZ` 定义的行为。类似地，`ABC` 类的实例将拷贝 `Task` 的行为和具体的 `ABC` 的行为。在构建完成之后，**你通常仅会与这些实例交互（而不是类），因为每个实例都拷贝了完成计划任务的所有行为。**

### 行为委托



## 参考链接

- [从探究Function.__proto__===Function.prototype过程中的一些收获](https://github.com/jawil/blog/issues/13)
- [维基百科: 基于对象语言](https://zh.wikipedia.org/wiki/基于对象语言)
- [印记中文翻译：ECMAScript® 2018 Language Specification](https://ecma262.docschina.org)
- [ECMA-262（ECMAScript® 2020 language specification 11th edition）](https://262.ecma-international.org/11.0/)
- [You-Dont-Know-JS](https://github.com/getify/You-Dont-Know-JS)


```

```