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

  // if query contains plus, minus, or multiplied by, then do the math. The query can contain any amount of numbers
  if (query.toLowerCase().includes("plus") || query.toLowerCase().includes("minus") || query.toLowerCase().includes("multiplied by")) {
    const mathMatch = query.match(/What is (\d+ (plus|minus|multiplied by) \d+)+\?/);
    if (mathMatch) {
      const numbersMatch = query.match(/\d+/g);
      const numbers = numbersMatch ? numbersMatch.map(Number) : [];
      const operations = query.match(/(plus|minus|multiplied by)/g);
      let result = numbers[0];
      if (operations) {
        for (let i = 1; i < numbers.length; i++) {
          if (operations[i - 1] === "plus") {
            result += numbers[i];
          } else if (operations[i - 1] === "minus") {
            result -= numbers[i];
          } else if (operations[i - 1] === "multiplied by") {
            result *= numbers[i];
          }
        }
      }
      return result.toString();
    }
  }

  // What is 33 plus 80?
  // Modify to also match on "What is 84 plus 6 plus 63?" and any number of pluses
  else if (query.toLowerCase().includes("plus")) {
    const plusMatch = query.match(/What is ((\d+)( plus (\d+))+)\?/);
    if (plusMatch) {
      const numbers = plusMatch[1].split(" plus ").map(Number);
      const sum = numbers.reduce((acc, num) => acc + num, 0);
      return sum.toString();
    }
  }

  // 
  else if (query.toLowerCase().includes("minus")) {
    let numbers = query.split("minus");
    const num1 = parseInt(numbers[0].split("is")[1].trim());
    const num2 = parseInt(numbers[1].trim());
    return (num1 - num2).toString();
  }

  // What is 52 multiplied by 1?	
  if(query.toLowerCase().includes("multiplied by")) {
    const multMatch = query.match(/What is (\d+) multiplied by (\d+)\?/);
    if (multMatch) {
      const num1 = parseInt(multMatch[1]);
      const num2 = parseInt(multMatch[2]);
      return (num1 * num2).toString();
    }
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
  // Which of the following numbers are primes: 37, 4, 58, 73, 21?	
  if (query.match(/Which of the following numbers are primes: ((\d+, )*\d+)\?/)) {
    const numbersMatch = query.match(/Which of the following numbers are primes: ((\d+, )*\d+)\?/);
    if (numbersMatch) {
      const numbers = numbersMatch[1].split(", ").map(Number);
      const isPrime = (num: number) => {
        if (num < 2) return false;
        for (let i = 2; i <= Math.sqrt(num); i++) {
          if (num % i === 0) return false;
        }
        return true;
      };
      const result = numbers.filter(isPrime);
      return result.length > 0 ? result.join(", ") : "None";
    }
  }
  // What is 46 to the power of 9?	
  if (query.match(/What is (\d+) to the power of (\d+)\?/)) {
    const powerMatch = query.match(/What is (\d+) to the power of (\d+)\?/);
    if (powerMatch) {
      const num1 = parseInt(powerMatch[1]);
      const num2 = parseInt(powerMatch[2]);
      return Math.pow(num1, num2).toString();
    }
  }

  return "";
}
