const painters = [
  {
    firstName: "Herb",
    lastName: "Aach",
    born: 1923,
    passed: 1985,
    paintings: 12
  },
  {
    firstName: "Pacita",
    lastName: "Abad",
    born: 1946,
    passed: 2004,
    paintings: 52
  },
  {
    firstName: "Daniel",
    lastName: "Maclise",
    born: 1806,
    passed: 1870,
    paintings: 2
  },
  {
    firstName: "Aileen",
    lastName: "Eagleton",
    born: 1902,
    passed: 1984,
    paintings: 35
  },
  {
    firstName: "Thomas",
    lastName: "Eakins",
    born: 1844,
    passed: 1916,
    paintings: 1
  },
  {
    firstName: "Edgar",
    lastName: "Degas ",
    born: 1834,
    passed: 1917,
    paintings: 34
  },
  {
    firstName: "Martin",
    lastName: "Desjardins",
    born: 1637,
    passed: 1694,
    paintings: 7
  }
];

const clients = [
  "Fiona, Bownd",
  "Bren, Strutt",
  "Cletis, Cobelli",
  "Booth, Kedge",
  "Demetris, Parman",
  "Cull, Itzhaki",
  "Ertha, Bikker",
  "Maggi, Stockport",
  "Horace, Hearthfield",
  "Vassili, Pomfret",
  "Cirilo, Zottoli",
  "Trueman, MacDermot",
  "Karla, Spencer",
  "Allys, McManamon",
  "Saloma, Boolsen",
  "Giacomo, Vedntyev",
  "Essa, Blacket",
  "Dari, Muncer",
  "Jobi, Joscelyn",
  "Eimile, Joberne"
];

const cars = [
  "Honda",
  "Saab",
  "Ford",
  "Mitsubishi",
  "Buick",
  "Toyota",
  "Mitsubishi",
  "Mercedes-Ben",
  "Buick",
  "Volvo",
  "Oldsmobile",
  "Mercedes-Ben",
  "Honda",
  "Chevrolet",
  "Volkswagen",
  "GMC",
  "Chevrolet",
  "Jeep",
  "Acura",
  "Honda",
  "Acura",
  "Suzuki"
];
console.table(painters);
// 1. Array Length
console.log("painters length", painters.length);
console.log("clients length", clients.length);
console.log("cars length", cars.length);

// 2. Array Iteration with FOR & foreach

// for (let i = 0; i < painters.length; i++) {
//   console.log(painters[i]);
// }
// painters.forEach(painter => {
//   console.log(painter);
// });

// 3. String to array .split & .join
// const myFavFood = "Pizza|Pasta|Burger";
// console.log(myFavFood.split("|"));
// const myFavSports = ["Football", "Hockey", "Yoga"];
// console.log(myFavSports.join(", "));

// 4. Array .filter()
const filteredPainters = painters.filter(
  painter => painter.born >= 1800 && painter.born < 1900
);
console.table(filteredPainters);

// 5. Array .map()
const paintersWithYears = painters.map(painter => {
  return {
    name: `${painter.firstName} ${painter.lastName}`,
    years: `${painter.born} - ${painter.passed}`
  };
});
console.table(paintersWithYears);

// 6. Array .sort()
// Sort painters by years lived
const sortedPainters = painters
  .map(painter => {
    return {
      name: `${painter.firstName} ${painter.lastName}`,
      years: `${painter.born} - ${painter.passed}`,
      age: painter.passed - painter.born
    };
  })
  .sort((currentPainter, nextPainter) =>
    currentPainter.age > nextPainter.age ? -1 : 1
  );

console.table(sortedPainters);

// Sort client by lastName
const sortedClients = clients.sort((lastClient, nextClient) => {
  const [lastClientFirstName, lastClientLastName] = lastClient.split(", ");
  const [nextClientFirstName, nextClientLastName] = nextClient.split(", ");
  return lastClientLastName > nextClientLastName ? 1 : -1;
});
console.table(sortedClients);

// 7. Array .reduce()

// Total amound of paintings
const totalPaintings = painters.reduce((amount, painter) => {
  return amount + painter.paintings;
}, 0);
console.log("Total paintings: ", totalPaintings);

// Sum app cars

const carsReduced = cars.reduce((obj, car) => {
  if (!obj[car]) {
    obj[car] = 0;
  }
  obj[car]++;
  return obj;
}, {});

console.log(carsReduced);
