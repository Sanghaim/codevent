const fs = require("fs");
const readline = require("readline");
const util = require("util");

const REDLIMIT = 12;
const GREENLIMIT = 13;
const BLUELIMIT = 14;

const data = [];

const readFile = () => {
  return new Promise((resolve, reject) => {
    const lineArray = [];
    const readInterface = readline.createInterface({
      input: fs.createReadStream("inputs/day02.txt"),
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

const prepareData = (game, line) => {
  const entry = {
    game: game + 1,
    sets: [],
    valid: undefined,
  };
  const sets = line.slice(line.indexOf(":") + 1);
  const hands = sets.split(";");
  for (const hand of hands) {
    const dices = hand.trim().split(", ");
    const set = {
      red: 0,
      green: 0,
      blue: 0,
    };
    for (const dice of dices) {
      parsedDice = dice.split(" ");
      set[parsedDice[1]] = Number(parsedDice[0]);
    }
    entry.sets.push(set);
  }
  data.push(entry);
};

const validateGame = (game) => {
  for (const set of game.sets) {
    if (set.red > REDLIMIT || set.green > GREENLIMIT || set.blue > BLUELIMIT) {
      game.valid = false;
      return;
    } else {
      game.valid = true;
    }
  }
};

const getMinimumDicesPower = (game) => {
  const reds = [];
  const greens = [];
  const blues = [];
  for (const set of game.sets) {
    reds.push(set.red);
    greens.push(set.green);
    blues.push(set.blue);
  }
  return Math.max(...reds) * Math.max(...greens) * Math.max(...blues);
};

readFile().then((res) => {
  for (const [index, line] of res.entries()) {
    prepareData(index, line);
  }

  for (const game of data) {
    validateGame(game);
  }

  console.log(
    data
      .filter((game) => {
        return game.valid == true;
      })
      .reduce((sum, game) => sum + game.game, 0)
  );

  console.log(data.reduce((sum, game) => sum + getMinimumDicesPower(game), 0));
});
