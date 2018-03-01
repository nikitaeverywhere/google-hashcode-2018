const fs = require("fs");
const inFile = process.argv[2] || "in/a_example.in";
const outFileName = inFile.replace(/.*[/\\]/g, "").replace(/\.[^.]+$/g, "");

if (!fs.existsSync("out"))
	fs.mkdirSync("out");

const input = readInput();
const state = {};
const output = [];

// function sortByDistance (location, order1, order2) {
// 	const d1 = distance(location, order1);
// 	const d2 = distance(location, order2);
// 	return d1 > d2 ? 1 : d1 === d2 ? 0 : -1;
// }
//
// function writeResult (folder) {
// 	if (!fs.existsSync(`out/${ folder }`))
// 		fs.mkdirSync(`out/${ folder }`);
//
// 	fs.writeFileSync(
// 		`out/${ folder }/${ outFileName }.html`,
// 		fs.readFileSync("vis.html").toString().replace("replace:title", outFileName)
// 			.replace("/*replace:data*/", JSON.stringify(input))
// 	);
// }

function readInput () {
	const file = fs.readFileSync(inFile).toString().split(/\n/g);
	const firstLine = file[0].split(/\s/g);
	let line = 1;
	return {
		rows: firstLine[0],
		cols: firstLine[1],
		numOfVehicles: firstLine[2], // 30
		numOfRides: firstLine[3], // 500
		rideBonus: firstLine[4], // 100
		numOfSteps: firstLine[5],
		rides: Array.from({ length: firstLine[3] }, () => {
			const [a, b, x, y, s, f] = file[line++];
			return {
				from: [a, b],
				to: [x, y],
				start: s,
				finish: f
			};
		})
	};
}
