const prompt = require("prompt-sync")(); // Ask for user inputs


let gameCharacter = prompt("Enter a game character: ");
let weapon = prompt("Enter a weapon: ");
let whereareyou = prompt("where are you at: ");
let going = prompt("where are you going: ");
let doing = prompt("what are you doing there: ");
let why = prompt(" why ");
let go = prompt(" how did it go ");
let end = prompt(" how does your story end ");
let story = "Once upon a time " + gameCharacter + " was on a mission to ..."
console.log(story);