export default function QueryProcessor(query: string): string {
  if (query.toLowerCase().includes("shakespeare")) {
    return (
      "William Shakespeare (26 April 1564 - 23 April 1616) was an " +
      "English poet, playwright, and actor, widely regarded as the greatest " +
      "writer in the English language and the world's pre-eminent dramatist."
    );
  }
  else if (query.toLowerCase().includes("andrew id")) {
    return (
      "eltong"
    );
  }
  else if (query.toLowerCase().includes("name")) {
    return (
      "Emma"
    );
  }
  // "Which of the following numbers is the largest: 1, 2, 3?"
  // Check if matches "Which of the following numbers is the largest: 1, 2, 3?" format but with different numbers using regex
  if (query.match(/Which of the following numbers is the largest: (\d+), (\d+), (\d+)\?/)) {
    const numbersMatch = query.match(/Which of the following numbers is the largest: (\d+), (\d+), (\d+)\?/);
    if (numbersMatch) {
      const numbers = numbersMatch.slice(1).map(Number);
      const largest = Math.max(...numbers);
      return largest.toString();
    }
  }

  // What is 33 plus 80?
  else if (query.toLowerCase().includes("plus")) {
    let numbers = query.split("plus");
    const num1 = parseInt(numbers[0].split("is")[1].trim());
    const num2 = parseInt(numbers[1].trim());
    return (num1 + num2).toString();
  }

  // Which of the following numbers is both a square and a cube: 786, 1444, 4096, 4796, 1000, 4474, 472?
  if (query.match(/Which of the following numbers is both a square and a cube: ((\d+, )*\d+)\?/)) {
    const numbersMatch = query.match(/Which of the following numbers is both a square and a cube: ((\d+, )*\d+)\?/);
    if (numbersMatch) {
      const numbers = numbersMatch[1].split(", ").map(Number);
      const isSquareAndCube = (num: number) => {
        const sqrt = Math.sqrt(num);
        const cbrt = Math.cbrt(num);
        return Number.isInteger(sqrt) && Number.isInteger(cbrt);
      };
      const result = numbers.filter(isSquareAndCube);
      return result.length > 0 ? result.join(", ") : "None";
    }
  }

  return "";
}
