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

  return "";
}
