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
  let winningNumbers = 0;
  cardData.winningNumbers
    .filter((x) => x !== 0)
    .forEach((winningNumber) => {
      cardData.numbers.forEach((number) => {
        if (winningNumber === number) {
          winningNumbers += 1;
        }
      });
    });
  return winningNumbers;
};

const generateCards = (cardNumber, cardData) => {
  const cardsToGenerate = getCardValue(cardData);
  for (let index = 0; index < cardsToGenerate; index++) {
    console.log(cardNumber, cardsToGenerate);
    data[cardNumber + 1 + index].count += 1 * cardData.count;
  }
};

const prepareCard = (card) => {
  const preparedCard = card.split("|").map((cardPart) => getNumbers(cardPart));
  return {
    winningNumbers: preparedCard[0],
    numbers: preparedCard[1],
    count: 1,
  };
};

readFile().then((res) => {
  data = res.map(prepareCard);
  data.forEach((cardData, cardNumber) => {
    generateCards(cardNumber, cardData);
  });
  console.log(data.reduce((sum, acc) => sum + acc.count, 0));
});
