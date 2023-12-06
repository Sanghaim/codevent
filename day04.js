const fs = require("fs");
const readline = require("readline");

let data = [];

const readFile = () => {
  return new Promise((resolve, reject) => {
    const lineArray = [];
    const readInterface = readline.createInterface({
      input: fs.createReadStream("inputs/day04.txt"),
      output: process.stdout,
      terminal: false,
    });

    readInterface
      .on("line", (line) => {
        lineArray.push(line.slice(line.indexOf(":") + 1).trim());
      })
      .on("close", () => {
        resolve(lineArray);
      });
  });
};

const getNumbers = (numbers) => {
  return numbers.split(" ").map((number) => Number(number.trim()));
};

const getCardValue = (cardData) => {
  let winningNumbers = -1;
  cardData[0]
    .filter((x) => x !== 0)
    .forEach((winningNumber) => {
      cardData[1].forEach((number) => {
        if (winningNumber === number) {
          winningNumbers += 1;
        }
      });
    });
  return winningNumbers === -1 ? 0 : 2 ** winningNumbers;
};

const prepareCard = (card) => {
  const cardData = card.split("|").map((cardPart) => getNumbers(cardPart));
  return getCardValue(cardData);
};

readFile().then((res) => {
  data = res;
  console.log(data.reduce((sum, acc) => sum + prepareCard(acc), 0));
});
