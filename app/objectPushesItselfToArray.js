// // Define an array
// let myArray = [];

// // Define an object
// let myObject = {
//   name: "Example",
//   pushSelfToArray: function(array) {
//     array.push(this); // 'this' refers to the current object
//   }
// };

// // Push the object into the array
// myObject.pushSelfToArray(myArray);

// console.log(myArray); // Output: [{ name: 'Example', pushSelfToArray: [Function: pushSelfToArray] }]

// ==========================================================================
// ==========================================================================

//provide array from another object
// Define an object that provides the array
// let arrayProvider = {
//   myArray: [],
//   provideArray: function () {
//     return this.myArray;
//   },
// };

// // Define an object
// let myObject = {
//   name: "Example",
//   pushSelfToArray: function (array) {
//     array.push(this); // 'this' refers to the current object
//   },
// };

// // Obtain the array from the arrayProvider and push the object into it
// let arrayToPushInto = arrayProvider.provideArray();
// myObject.pushSelfToArray(arrayToPushInto);

// console.log(arrayProvider.myArray); // Output: [{ name: 'Example', pushSelfToArray: [Function: pushSelfToArray] }]

// ==========================================================================
// ==========================================================================

//Now provide array from another object and also push it self to that array
// Define an object that provides the array
// let arrayProvider = {
//   myArray: [],
//   provideArray: function () {
//     return this.myArray;
//   },
// };

// // Define an object
// let myObject = {
//   name: "Example",
//   pushSelfToArray: function (providerObj) {
//     let arrayToPushInto = providerObj.provideArray();
//     arrayToPushInto.push(this); // 'this' refers to the current object
//   },
// };

// // Call the method with the array provider object as an argument
// myObject.pushSelfToArray(arrayProvider);

// console.log(arrayProvider.myArray); // Output: [{ name: 'Example', pushSelfToArray: [Function: pushSelfToArray] }]

// ==========================================================================
// ==========================================================================

//Now provode both array and function from another object, so when it is run, the myObject pushes itself into provided array
// Define an object that provides the array and a function
// let arrayProvider = {
//   myArray: [],
//   provideArrayAndPushFunction: function () {
//     let array = this.myArray;
//     let pushFunction = function () {
//       array.push(myObject);
//     };
//     return {
//       array: array,
//       pushFunction: pushFunction,
//     };
//   },
// };

// // Define an object
// let myObject = {
//   name: "Example",
//   pushSelfToArray: function (providerObj) {
//     let { array, pushFunction } = providerObj.provideArrayAndPushFunction();
//     pushFunction(); // Invoke the function provided by arrayProvider
//   },
// };

// // Call the method with the array provider object as an argument
// myObject.pushSelfToArray(arrayProvider);

// console.log(arrayProvider.myArray); // Output: [{ name: 'Example', pushSelfToArray: [Function: pushSelfToArray] }]

// ==========================================================================
// ==========================================================================

//now myObject listens to registrationRequest event and it triggers registration once
// const EventEmitter = require("events");

// // Define an object that provides the array and emits events
// let arrayProvider = new EventEmitter();
// arrayProvider.myArray = [];
// arrayProvider.provideArrayAndPushFunction = function () {
//   let array = this.myArray;
//   let pushFunction = function () {
//     array.push(myObject);
//   };
//   return {
//     array: array,
//     pushFunction: pushFunction,
//   };
// };

// // Define an object
// let myObject = {
//   name: "Example",
//   pushSelfToArray: function (providerObj) {
//     arrayProvider.once("registrationRequest", () => {
//       let { array, pushFunction } = providerObj.provideArrayAndPushFunction();
//       pushFunction(); // Invoke the function provided by arrayProvider
//     });
//   },
// };

// // Emit 'registrationRequest' event
// setTimeout(() => {
//   arrayProvider.emit("registrationRequest");
// }, 1000);

// // Call the method with the array provider object as an argument
// myObject.pushSelfToArray(arrayProvider);

// // Display the result after the event is emitted
// setTimeout(() => {
//   console.log(arrayProvider.myArray); // Output: [{ name: 'Example', pushSelfToArray: [Function: pushSelfToArray] }]
// }, 2000);

//now we split pushSelfToArray into 2 functions: event listener and the rest of logic

// const EventEmitter = require("events");

// // Define an object that provides the array and emits events
// let arrayProvider = new EventEmitter();
// arrayProvider.myArray = [];
// arrayProvider.provideArrayAndPushFunction = function () {
//   let array = this.myArray;
//   let pushFunction = function () {
//     array.push(myObject);
//   };
//   return {
//     array: array,
//     pushFunction: pushFunction,
//   };
// };

// // Define an object
// let myObject = {
//   name: "Example",
//   setupEventListener: function (providerObj) {
//     arrayProvider.once(
//       "registrationRequest",
//       this.pushToMyArray.bind(this, providerObj)
//     );
//   },
//   pushToMyArray: function (providerObj) {
//     let { array, pushFunction } = providerObj.provideArrayAndPushFunction();
//     pushFunction(); // Invoke the function provided by arrayProvider
//   },
// };

// // Emit 'registrationRequest' event after a delay
// setTimeout(() => {
//   arrayProvider.emit("registrationRequest");
// }, 3000);

// // Call the method with the array provider object as an argument
// myObject.setupEventListener(arrayProvider);

// // Display the result after the event is emitted
// setTimeout(() => {
//   console.log(arrayProvider.myArray); // Output: [{ name: 'Example', setupEventListener: [Function: setupEventListener], pushToMyArray: [Function: pushToMyArray] }]
// }, 4000);

// ==========================================================================
// ==========================================================================

// const EventEmitter = require("events");

// // Define an object that provides the array and emits events
// let arrayProvider = new EventEmitter();
// arrayProvider.myArray = [];
// arrayProvider.provideArrayAndPushFunction = function () {
//   let array = this.myArray;
//   let pushFunction = function () {
//     array.push(myObject);
//   };
//   return pushFunction;
// };

// // Define an object
// let myObject = {
//   name: "Example",
//   setupEventListener: function (providerObj) {
//     let pushFunction = providerObj.provideArrayAndPushFunction();
//     arrayProvider.once("registrationRequest", pushFunction);
//   },
// };
// // Call the method with the array provider object as an argument
// myObject.setupEventListener(arrayProvider);

// // Emit 'registrationRequest' event along with provideArrayAndPushFunction
// arrayProvider.emit("registrationRequest");

// // Display the result after the event is emitted
// setTimeout(() => {
//   console.log(arrayProvider.myArray); // Output: [{ name: 'Example', setupEventListener: [Function: setupEventListener] }]
// }, 1000);
