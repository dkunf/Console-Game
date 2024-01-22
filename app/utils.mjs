//i want to create function that would translate object visualization
//  from backtick notation into array notation, that would make easier

// there is problem: need to escape some symbols like this spaceShip:

// const spaceShipPattern = `
//   |
//  /_\\
// ( o )
//  | |
// / | \\
// `;

// console.log(backTickToArray(spaceShipPattern));

//maybe it should be coupled with patterns.mjs as a method of patterns object?
export function backTickToArray2(pattern) {
  let flatArray = pattern.split("\n");
  let trimmedArray = flatArray.slice(1, -1);

  let result = [];
  for (let str of trimmedArray) {
    result.push(Array.from(str));
  }
  return result;
}
