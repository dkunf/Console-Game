class Giver {
  constructor(name) {
    this.name = name;
  }
  //here we will register any receivers which would want to receive something
  interestedReceivers = [];

  //our mood function :)
  get wantsToGive() {
    if (Math.random() > 0.5) return true; //80% chance that giver wants to give
    return false;
  }

  sendRegistrationFn() {
    return this.pleaseRegisterByRunningThisFunction.bind(this);
  }
  pleaseRegisterByRunningThisFunction(rcv) {
    this.interestedReceivers.push(rcv);
  }
}

class Receiver {
  constructor(name) {
    this.name = name;
  }
  //checking mood of a giver, maybe he wants to give something? who knows...only him, so we ask him
  checkUpdates(giver) {
    if (giver.wantsToGive) {
      let register = giver.sendRegistrationFn();
      register(this);
    }
  }
}

const giver = new Giver("John");
const giver2 = new Giver("Bob");

const str =
  "Lorem ipsum dolor sit amet consectetur adipisicing elit. Aperiam corrupti optio quo rem est praesentium ex maxime soluta adipisci earum?";
const receivers = Array(20)
  .fill(1)
  .map((_) => {
    let start = Math.round(Math.random() * (str.length - 5));
    let name = str.slice(start, start + 6).replace(" ", "");
    return new Receiver(name[0].toUpperCase() + name.slice(1));
  });

console.log(receivers);

receivers.forEach((rcv) => {
  rcv.checkUpdates(giver);
  rcv.checkUpdates(giver2);
});

console.log(`${giver.name} has registered receivers: `);
giver.interestedReceivers.forEach((receiver) => console.log(receiver.name));
console.log(giver.interestedReceivers.length);
console.log(`${giver2.name} has registered receivers: `);
giver2.interestedReceivers.forEach((receiver) => console.log(receiver.name));
console.log(giver2.interestedReceivers.length);
