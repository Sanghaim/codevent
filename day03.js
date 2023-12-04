const fs = require("fs");
const readline = require("readline");
const util = require("util");

let data = [];

const readFile = () => {
  return new Promise((resolve, reject) => {
    const lineArray = [];
    const readInterface = readline.createInterface({
      input: fs.createReadStream("inputs/day03.txt"),
      output: process.stdout,
      terminal: false,
    });

    readInterface
      .on("line", (line) => {
        lineArray.push(line);
      })
      .on("close", () => {
        resolve(lineArray);
      });
  });
};

const indexesOf = (line) => {
  const indexes = [];
  const regex = /[^\d|\.]/;
  let previousPosition = 0;
  let position = line.search(regex);
  while (position !== -1) {
    indexes.push(position + previousPosition);
    previousPosition = position + 1;
    line = line.slice(position + 1);
    position = line.search(regex);
  }
  return indexes;
};

const lookForNumber = (line, position, direction) => {
  let foundDigits = "";
  let offset = 0;

  while (
    !isNaN(line[position + offset]) &&
    position + offset >= 0 &&
    position + offset < line.length
  ) {
    foundDigits =
      direction === "right"
        ? foundDigits + line[position + offset]
        : line[position + offset] + foundDigits;
    offset += direction === "right" ? 1 : -1;
  }
  return foundDigits;
};

const checkPosition = (line, position, direction) => {
  const foundNumbers = [];
  if (line === undefined) {
    return foundNumbers;
  }
  if (direction === undefined) {
    if (line[position] === ".") {
      const left = lookForNumber(line, position - 1, "left");
      if (left !== "") foundNumbers.push(Number(left));
      const right = lookForNumber(line, position + 1, "right");
      if (right !== "") foundNumbers.push(Number(right));
    } else if (!isNaN(line[position])) {
      const foundNumber =
        lookForNumber(line, position, "left") +
        lookForNumber(line, position + 1, "right");
      if (foundNumber !== "") foundNumbers.push(Number(foundNumber));
    }
  } else if (direction === "left") {
    if (!isNaN(line[position])) {
      const foundNumber = lookForNumber(line, position, "left");
      if (foundNumber !== "") foundNumbers.push(Number(foundNumber));
    }
  } else if (direction === "right") {
    if (!isNaN(line[position])) {
      const foundNumber = lookForNumber(line, position, "right");
      if (foundNumber !== "") foundNumbers.push(Number(foundNumber));
    }
  }
  return foundNumbers;
};

readFile().then((res) => {
  data = res;
  symbolCoords = [];
  codes = [];
  data.forEach((line, row) => {
    const indexes = indexesOf(line);
    if (indexes.length > 0) symbolCoords.push({ row, indexes });
  });
  symbolCoords.forEach((coords) => {
    coords.indexes.forEach((index) => {
      codes.push(checkPosition(data[coords.row - 1], index));
      codes.push(checkPosition(data[coords.row], index - 1, "left"));
      codes.push(checkPosition(data[coords.row], index + 1, "right"));
      codes.push(checkPosition(data[coords.row + 1], index));
    });
  });

  var sum = (r, a) => r.map((b, i) => a[i] + b);
  console.log(codes.filter((item) => item.length != 0).reduce(sum));
});
