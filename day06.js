const fs = require("fs");
const readline = require("readline");

let data = [];

const readFile = () => {
  return new Promise((resolve, reject) => {
    const lineArray = [];
    const readInterface = readline.createInterface({
      input: fs.createReadStream("inputs/day06.txt"),
      output: process.stdout,
      terminal: false,
    });

    readInterface
      .on("line", (line) => {
        lineArray.push(
          line
            .slice(line.indexOf(":") + 1)
            .trim()
            .match(/\d+/g)
            .map(Number)
        );
      })
      .on("close", () => {
        resolve(lineArray);
      });
  });
};

readFile().then((res) => {
  const times = res[0];
  const distance = res[1];
  const waysToWin = [];
  for (let race = 0; race < times.length; race++) {
    let speed = 0;
    let remainingTime = times[race];
    let holdingTime = 0;
    let traveledDistance = 0;
    let options = 0;
    while (remainingTime > 0) {
      holdingTime += 1;
      speed += 1;
      remainingTime -= 1;
      traveledDistance = speed * remainingTime;
      if (traveledDistance > distance[race]) {
        options += 1;
      }
    }
    waysToWin.push(options);
  }
  console.log(waysToWin.reduce((sum, acc) => (sum *= acc), 1));
});
