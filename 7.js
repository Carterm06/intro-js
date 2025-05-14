const prompt = require('prompt-sync')();

let hasKey = prompt("Do you have a key? (yes/no) ") === "yes";
let strength = parseInt(prompt("Enter your strength: "));
let lockIsBroken = false; // The lock is NOT broken

if (hasKey && strength >= 8 && !lockIsBroken) {
   console.log("You opened the door!");
} else {
   console.log("The door won't budge.");
}