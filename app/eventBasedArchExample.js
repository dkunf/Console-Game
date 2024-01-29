const EventEmitter = require("events");

class Giver extends EventEmitter {
  constructor() {
    super();
    this.amount = 17;
  }

  give(n) {
    const numReceivers = Giver.receivers.length;
    if (numReceivers === 0) {
      console.log("There are no receivers to give to.");
      return;
    }

    const amountPerReceiver = Math.floor(
      (n < this.amount ? n : this.amount) / numReceivers
    );
    this.emit("give", amountPerReceiver);
    console.log("emitting give event for ", amountPerReceiver);

    const remainder = this.amount % numReceivers;
    this.amount = remainder; // Update remaining amount for the giver
  }

  static receivers = [];
}

class Receiver {
  amount = 5;

  constructor() {
    Giver.receivers.push(this);
    this.onReceive = this.onReceive.bind(this);
    console.log('created "give" event listener');
    giver.on("give", this.onReceive);
  }

  onReceive(amount) {
    console.log("give event");
    this.receive(amount);
  }

  receive(n) {
    if (!n) n = 0;
    this.amount += n;
    console.log(`Receiver received ${n}`);
  }
}

const giver = new Giver();
const receiver1 = new Receiver();
const receiver2 = new Receiver();

// Giver.receivers.push(receiver1, receiver2);

// Give to receivers equally
giver.give(50);

console.log("receiver1.amount: ", receiver1.amount); // Output: 10 (5 + 5)
console.log("receiver2.amount: ", receiver2.amount); // Output: 10 (5 + 5)
console.log("giver.amount: ", giver.amount); // Output: 7 (17 % 2 = 1, remaining amount)

// it works but we need to keep track of how many receivers are and
// maybe receiver sometimes does not want to receive
//So instead i want to do like this:
// giver emits give event.
//all receivers catch it and then they emit desire-to-receive event (kind of submit registration to receive)
//and subscribe to give-action event (so those who did not register wouldn't catch this event)
//then giver counts how many receivers want to receive and calculates how much to give each one
//then giver emits give,action event with amount and receivers take that amount.
//HOW ABOUT THAT???huh

// so instead of commenting out previous code, i'll continue with new classes advancedGiver and advancedReceiver,
//lets see what happens

//-first problem with this approach: giver needs to know all instances of receivers to subscribe to their event of desire-to-receive
//so maybe instead of emitting event they should register in some list
//-ok, decided along with emitting desiretogive to send amount and RegistrationFunction which interested receivers can run and this way
//register

//----//wrks

class AdvancedGiver extends EventEmitter {
  constructor(amount = 100) {
    super();
    this.amount = amount;
  }
  interestedReceivers = [];
  //that's the way: pass object which includes function and data
  expressDesireToGive(n) {
    // this.emit("wishToGive", n, {
    //   arr: this.interestedReceivers,
    //   fn: this.execRegistration,
    // });
    //ha, this also works passing just args not as object....
    //yes that worked but i wanted not to expose data and encapsulated array within function
    //now it works only if i bind this to this instance when i pass function with emitter
    //otherwise  this.interestedReceivers from inside of execRegistration function
    //will be substituted with advancedReceiver.interestedReceivers , which does not exist there
    //but with bind we created new function where this value is taken from here
    //why couldn't we just write advancedGiver.interestedReceivers.push(obj)?
    //because what if it will be called advGiver23 ? we don't know, we don't need to be tight to name of instance.
    this.emit("wishToGive", n, this.execRegistration.bind(this));
  }

  execRegistration(obj) {
    //what if advancedGiver doesn't exist?
    this.interestedReceivers.push(obj);
  }
  registerInterst(receiver) {
    console.log("reg process");
    this.interestedReceivers.push(receiver);
  }
  give(n) {
    if (this.interestedReceivers.length > 0) {
      const numOfReceivers = this.interestedReceivers.length;
      const eachGets = Math.floor(n / numOfReceivers);
      this.interestedReceivers.forEach((receiver) => {
        receiver.amount += eachGets;
        this.amount -= eachGets;
      });
    }
  }
}

class AdvancedReceiver extends EventEmitter {
  constructor(amount = 5) {
    super();
    this.amount = amount;
    //this is asynchronous code, if you try to just use n,
    // arr as normal agruments like ("wishToGive",n,arr) it will not work
    // because it did not receive it yet
    //destructure passed obj
    advancedGiver.on("wishToGive", (n, fn) => {
      console.log("Caught wish to give", n);
      //what if i don't want receivers to see the list arr?
      //can I pass list not separately from function, but within function to be not visible?
      // console.log("let's see how many are registered by now: ", arr.length);
      //we register based on this condition
      if (this.amount < 10) {
        let obj = this;
        fn(obj);
      }
    });
  }
}
let advancedGiver = new AdvancedGiver(33);
console.log("advancedGiver.amount: ", advancedGiver.amount);

let advancedReceivers = Array(5)
  .fill(1)
  .map((rec) => {
    return new AdvancedReceiver(Math.round(Math.random() * 30));
  });

console.log("advancedReceivers: ", advancedReceivers);

//giver expresses desire to give 16
advancedGiver.expressDesireToGive(19);

console.log("advancedGiver.interestedReceivers.amount: ");
advancedGiver.interestedReceivers.forEach((el) =>
  console.log("el.amount: ", el.amount)
);

//now giver has array of interested receivers, those who have registered there
//now giver knows how many they are and can divide equally to each
advancedGiver.give(9);

console.log("advancedGiver.amount: ", advancedGiver.amount);
console.log("advancedGiver.interestedReceivers.amount: ");
advancedGiver.interestedReceivers.forEach((el) =>
  console.log("el.amount: ", el.amount)
);
