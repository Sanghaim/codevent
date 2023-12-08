const fs = require("fs");
const readline = require("readline");
const util = require("util");

let turns = ''
let map = [];

const readFile = () => {
  return new Promise((resolve, reject) => {
    const lineArray = [];
    const readInterface = readline.createInterface({
      input: fs.createReadStream("inputs/day08.txt"),
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

const getStartingNodes = (map) => {
    const nodes = []
    for (const node in map) {
        if (node.slice(-1) === 'A') nodes.push(node)
    }
    return nodes
}

const prepareMap = (data) => {
    data.forEach(node => {
        const splited = node.split('=').map(x => x.replaceAll(/\(|\s|\)/g, ''))
        const options = splited[1].split(',')
        map[splited[0]] = options
    });
}

readFile().then((res) => {
    turns = res.shift()
    prepareMap(res)
    let startingNodes = getStartingNodes(map)
    let solutions = []
    let steps = 0
    for (const staringNode of startingNodes) {
        let turn = 0
        let currentNode = staringNode
        console.log(currentNode);
        while (currentNode.slice(-1) !== 'Z') {
            currentNode = map[currentNode][turns[turn] === 'L' ? 0 : 1]
            steps += 1
            turn = (turn + 1) % turns.length
        }
        solutions.push(steps)
        steps = 0
    }
    console.log(solutions);
})

const gcd = (a, b) => { 
    if (b == 0) 
        return a; 
    return gcd(b, a % b); 
} 
 
// Returns LCM of array elements 
const findlcm = (arr, n) => { 
    // Initialize result 
    let ans = arr[0]; 
 
    // ans contains LCM of arr[0], ..arr[i] 
    // after i'th iteration, 
    for (let i = 1; i < n; i++) 
        ans = (((arr[i] * ans)) / 
                (gcd(arr[i], ans))); 
 
    return ans; 
} 

let arr = [ 13201, 22411, 18727, 18113, 16271, 20569 ]; 
console.log(findlcm(arr, arr.length)); 
 