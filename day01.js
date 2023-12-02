var lineReader = require('line-reader');
const numerals = {
    one: 1,
    two: 2,
    three: 3,
    four: 4,
    five: 5,
    six: 6,
    seven: 7,
    eight: 8,
    nine: 9
}

function run() {
    const coords = []
    lineReader.eachLine('./inputs/day01.txt', function(line, last) {
        let data = line
        for (const word of Object.keys(numerals)) {
            data = data.replace(word, numerals[word])
        }
        data = data.split('')
        console.log(data);
        let coord = ''
        if (data.length === 1) {
            coord = `${data[0]}${data[0]}`
        } else {
            coord = `${data.shift()}${data.pop()}`
        }
        coords.push(Number(coord))
        if (last) {
            console.log(coords.reduce((accumulator, currentValue) => {
                return accumulator + currentValue
              },0));
        }
    })
    return coords
}

run()