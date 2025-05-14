const prompt = require('prompt-sync')();
let health = parseInt(prompt("Enter player's health: "));

if (health >= 50) {
    console.log("You're healthy, no need for a potion!");
} else if (health <= 30) {
    console.log("You're injured, drink a potion!");
} else {
    console.log("You're a bit hurt, be careful!");
}