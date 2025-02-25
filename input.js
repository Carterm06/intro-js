const prompt = require('prompt-sync')();

// Get user input for character name and game
let cardsuit = prompt(" give me a card suit ? ");
let cardrank = prompt(" give me a card rank ");

// Combine the inputs into a greeting
let greeting =  cardsuit + ", " + cardrank + "! is the card you picked";

console.log(greeting);