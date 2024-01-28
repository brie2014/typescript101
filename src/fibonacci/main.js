// Recursive function that calculates the given number in the Fibonacci sequence
function fibonacci(n) {
    // the base case: when n is 0 or 1, return n
    if (n === 0 || n === 1) {
        return n;
    }
    // In the recursive case, calculate the nth number by adding the previous 2 numbers in the sequence
    return fibonacci(n - 1) + fibonacci(n - 2);
}
function getFibonacci(amount) {
    if (amount === void 0) { amount = 10; }
    // Loop to output the specified amount of Fibonacci numbers
    for (var i = 0; i < amount; i++) {
        console.log("Fibonacci of term #".concat(i + 1, ": "), fibonacci(i));
    }
}
getFibonacci();
