const prompt = require('prompt-sync')();
let hero = "Link";  // Hero's name changed to "Link"
let number = "99";  // Number changed to "99"
let enteredCode = prompt("Enter the secret code: ");  // Prompt the user to enter the code

// Check if the entered code matches the concatenation of hero and number
if (enteredCode === hero + number) {
   console.log("Door unlocked!");  // If correct, unlock the door
} else {
   console.log("Access denied!");  // If incorrect, deny access
}