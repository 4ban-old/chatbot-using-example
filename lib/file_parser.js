const fs = require("fs");
/**
 * @description Read and parse .dat file
 * @param {*} path
 * @returns { data, sports, leagues, names, cities, years }
 */
function file_parse(path) {
  const data = [];
  const sports = new Set();
  const leagues = new Set();
  const names = new Set();
  const cities = new Set();
  const years = new Set();
  let lines;

  const content = fs.readFileSync(path, "utf-8");
  if (content != undefined) {
    lines = content.split("\n");
    lines.shift();
  }
  lines.forEach(line => {
    let toParse = line.split(", ");
    data.push({
      name: toParse[0],
      city: toParse[1],
      league: toParse[2],
      year: toParse[3],
      sport: toParse[4]
    });
    names.add(toParse[0]);
    cities.add(toParse[1]);
    leagues.add(toParse[2]);
    years.add(toParse[3]);
    sports.add(toParse[4]);
  });
  return { data, names, cities, leagues, years, sports };
}

module.exports = {
  file_parse
};
