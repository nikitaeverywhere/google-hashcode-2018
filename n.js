const fs = require('fs');

const inputFilename = "in/b_should_be_easy.in";
const filenameToCopyInputData = "data.in.js";

let isNotEmpty = (s) => s !== '';
let inputFileLines = fs.readFileSync(inputFilename, 'utf8')
    .split('\n')
    .filter(isNotEmpty);

let inputInfoData = parseInfoFromLine(inputFileLines[0]);
console.log("Input file info:", inputInfoData);

let matrixLines = inputFileLines.splice(1); // All lines from second

let matrixData = matrixLines.map(line => parseMatrixLine(line));
saveToFileWithReplace(filenameToCopyInputData, inputInfoData, matrixData);


function saveToFileWithReplace(filename, inputInfoData, matrixData) {
    fs.readFile(filename, 'utf8', function (err, fileText) {
        let matrixDataStr = JSON.stringify(matrixData);
        let inputInfoDataStr = JSON.stringify(inputInfoData);
        let replacedText1 = fileText.replace(/{datahere: *.}/, matrixDataStr);
        let replacedText2 = replacedText1.replace(/{infohere: *.}/, inputInfoDataStr);
        fs.writeFile(filename, replacedText2, 'utf8'); // rewrite file text
    });
}

function parseInfoFromLine(line) {
    const lineItems = line.split(/\s/);

    return {
        rowCount: parseInt(lineItems[0]),
        colCount: parseInt(lineItems[1]),
        vehiclesCount: parseInt(lineItems[2]),
        ridesCount: parseInt(lineItems[3]),
        bonusCount: parseInt(lineItems[4]),
        stepsCount: parseInt(lineItems[5])
    }
}

function parseMatrixLine(line) {
    const lineItems = line.split(/\s/);

    return {
        a: parseInt(lineItems[0]),
        b: parseInt(lineItems[1]),
        x: parseInt(lineItems[2]),
        y: parseInt(lineItems[3]),
        s: parseInt(lineItems[4]),
        f: parseInt(lineItems[5])
    }
}

