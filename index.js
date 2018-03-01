const fs = require("fs");
const inFile = process.argv[2] || "in/a_example.in";
const outFileName = "out/" + inFile.replace(/.*[/\\]/g, "").replace(/\.[^.]+$/g, "") + ".out";

if (!fs.existsSync("out"))
	fs.mkdirSync("out");

const input = readInput();
const state = {};
const output = [];

function readInput () {
	const file = fs.readFileSync(inFile).toString().split(/\n/g).map(s => s.split(" ").map(s => +s));
	const firstLine = file[0];
	let line = 1;
	return {
		rows: firstLine[0],
		cols: firstLine[1],
		numOfCars: firstLine[2], // 30
		numOfRides: firstLine[3], // 500
		rideBonus: firstLine[4], // 100
		numOfSteps: firstLine[5],
		rides: Array.from({ length: firstLine[3] }, (_, i) => {
			const [a, b, x, y, s, f] = file[line++];
			return {
				id: i,
				from: [a, b],
				to: [x, y],
				dist: distance(a, b, x, y),
				start: s,
				end: f
			};
		}).sort((r1, r2) => {
			return r1.start - r2.start;
		})
	};
}

function distance (a, b, x, y) {
	return Math.abs(a - x) + Math.abs(b - y);
}

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

let car = -1,
	rides = 0,
	usedCars = 0;

console.log(`Working on cars: ${ input.numOfCars }`);
outerLoop: while (++car < input.numOfCars) {
	let location = [0, 0],
		time = 0,
		used = false;
	const out = [];
	for (let i = 0; i < input.rides.length; ++i) {
		const ride = input.rides[i];
		const distToHuman = distance(ride.from[0], ride.from[1], location[0], location[1]);
		if (time + distToHuman <= ride.end - ride.dist) {
			//console.log(`Car ${ car } takes ride ${ ride.id } (${ time + distToHuman } -> ${ time + distToHuman + ride.dist }) while (${ ride.start } -> ${ ride.end }) ${ time + distToHuman + ride.dist <= ride.end }`);
			used = true;
			out.push(ride.id);
			time += distToHuman + ride.dist;
			location = ride.to.slice();
			input.rides.splice(i, 1);
			--i;
		}
	}
	if (used)
        usedCars++;
	if (out.length) {
        output.push(out);
        rides += out.length;
    }
}
console.log(`Rides: ${ rides }/${ input.numOfRides }, cars: ${ usedCars }/${ input.numOfCars }`);

for (let i = 0; i < input.numOfCars - usedCars; ++i) {
    output.push([]);
}

fs.writeFileSync(outFileName, output.map(rides => rides.length + " " + rides.join(" ")).join("\n"));
