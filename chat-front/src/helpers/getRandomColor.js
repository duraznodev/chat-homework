const coloresTailwind = [
  "red",
  "orange",
  "yellow",
  "green",
  "teal",
  "blue",
  "indigo",
  "purple",
  "pink",
];

export function getRandomColor() {
  return coloresTailwind[Math.floor(Math.random() * coloresTailwind.length)];
}
