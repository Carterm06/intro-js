// import prompt function
const prompt = require('prompt-sync')();

// Game state variables
let playerName = "";
let treasuresFound = 0;
let inventory = [];
let location = "hallway"; // Start directly in the hallway
let gameOver = false;

function startGame() {
    playerName = prompt("Welcome to the Mansion Escape Adventure! What's your name?");
    console.log(`Hello, ${playerName}! You're trapped in an eerie mansion. There are rumors of hidden treasures scattered throughout. Find them all to escape before its to late! `);
    gameLoop();
}

function gameLoop() {
    while (!gameOver) {
        console.log("\n--- Game Status ---");
        console.log(`Location: ${location}`);
        console.log(`Inventory: ${inventory.join(", ")}`);
        console.log(`Treasures Found: ${treasuresFound}`);

        if (location === "hallway") {
            hallwayPath();
        } else if (location === "library") {
            libraryPath();
        } else if (location === "kitchen") {
            kitchenPath();
        } else if (location === "attic") {
            atticPath();
        } else if (location === "bathroom") {
            bathroomPath();
        } else if (location === "garden") {
            gardenPath();
        } else {
            console.log("You seem lost... Please make a decision.");
            gameOver = true; // End game if no valid location is found
        }

        if (treasuresFound >= 4) {
            console.log(`You've found enough treasures to escape! Congratulations, ${playerName}!`);
            gameOver = true;
        }
    }
    console.log("\nGame Over! Thanks for playing.");
}

// Location functions
function hallwayPath() {
    console.log("\nYou are now in the hallway. The mansion is large and filled with shadows. There are doors to the left and right.");
    let action = prompt("Do you want to enter the library, the kitchen, go upstairs to the attic, or head to the bathroom?");

    if (action.toLowerCase() === "library") {
        console.log("You step into the library. Books line the walls, and a large fireplace crackles in the corner.");
        location = "library"; // Move to library
    } else if (action.toLowerCase() === "kitchen") {
        console.log("You enter the kitchen, and the smell of old food fills the air. It's a bit unsettling.");
        location = "kitchen"; // Move to kitchen
    } else if (action.toLowerCase() === "attic") {
        console.log("You decide to go upstairs to the attic.");
        location = "attic"; // Move to attic
    } else if (action.toLowerCase() === "bathroom") {
        console.log("You enter a small, dusty bathroom. The sink is cracked, and the mirror is foggy.");
        location = "bathroom"; // Move to bathroom
    } else if (action.toLowerCase() === "garden") {
        console.log("You step into the overgrown garden. It's eerily quiet.");
        location = "garden"; // Move to garden
    } else {
        console.log("Invalid action! Please choose 'library', 'kitchen', 'attic', 'bathroom', or 'garden'.");
    }
}

function libraryPath() {
    console.log("\nYou enter the library. Books are stacked high on shelves, and there's a cozy reading chair by the window.");
    let action = prompt("Do you want to search the bookshelf, sit and read, or head back to the hallway?");

    if (action.toLowerCase() === "search") {
        if (inventory.includes("Library Key")) {
            treasuresFound++;
            console.log("You use the Library Key to unlock a hidden drawer in the bookshelf. Inside, you find a sparkling gem!");
        } else {
            console.log("You search the bookshelf but don’t find anything useful. Maybe a key is needed here?");
        }
        console.log("Total treasures found: " + treasuresFound);
    } else if (action.toLowerCase() === "read") {
        console.log("You sit down with a book. It's peaceful here, but you don't find anything useful.");
    } else if (action.toLowerCase() === "hallway") {
        console.log("You head back to the hallway.");
        location = "hallway"; // Move back to hallway
    } else {
        console.log("Invalid action! Please choose 'search', 'read', or 'hallway'.");
    }
}

function kitchenPath() {
    console.log("\nYou enter the kitchen. The air is thick with dust, and there are cobwebs in the corners.");
    let action = prompt("Do you want to check the cupboards, examine the refrigerator, or go back to the hallway?");

    if (action.toLowerCase() === "cupboards") {
        treasuresFound++;
        console.log("You find a strange old jar inside the cupboard. It’s filled with gold coins!");
        console.log("Total treasures found: " + treasuresFound);
    } else if (action.toLowerCase() === "refrigerator") {
        if (inventory.includes("Rusty Key")) {
            treasuresFound++;
            console.log("You use the Rusty Key to open a hidden compartment in the refrigerator. Inside, you find a golden medallion!");
        } else {
            console.log("The refrigerator seems to have something hidden inside, but you need a key to open it.");
        }
        console.log("Total treasures found: " + treasuresFound);
    } else if (action.toLowerCase() === "hallway") {
        console.log("You head back to the hallway.");
        location = "hallway"; // Move back to hallway
    } else {
        console.log("Invalid action! Please choose 'cupboards', 'refrigerator', or 'hallway'.");
    }
}

function atticPath() {
    console.log("\nYou ascend a creaky staircase to the mansion's attic. It's dusty, with old furniture and boxes scattered around.");
    let action = prompt("Do you want to search the boxes, open the chest, or head back downstairs?");

    if (action.toLowerCase() === "search") {
        treasuresFound++;
        console.log("You rummage through the boxes and find an old, mysterious key!");
        inventory.push("Attic Key");
        console.log("You've added an Attic Key to your inventory.");
    } else if (action.toLowerCase() === "chest") {
        if (inventory.includes("Attic Key")) {
            treasuresFound++;
            console.log("You use the Attic Key to unlock the chest. Inside, you find a sparkling emerald!");
        } else {
            console.log("The chest is locked. You need the Attic Key to open it.");
        }
        console.log("Total treasures found: " + treasuresFound);
    } else if (action.toLowerCase() === "downstairs") {
        console.log("You decide to head back downstairs to explore other areas of the mansion.");
        location = "hallway"; // Move back to hallway
    } else {
        console.log("Invalid action! Please choose 'search', 'chest', or 'downstairs'.");
    }
}

function bathroomPath() {
    console.log("\nYou enter the dusty bathroom. There’s an old mirror and a small cabinet under the sink.");
    let action = prompt("Do you want to search the cabinet, look in the mirror, or go back to the hallway?");

    if (action.toLowerCase() === "search") {
        treasuresFound++;
        console.log("You find an old key in the cabinet. It’s a strange key with a symbol on it.");
        inventory.push("Bathroom Key");
        console.log("You’ve added a Bathroom Key to your inventory.");
    } else if (action.toLowerCase() === "mirror") {
        console.log("You look into the mirror. It's cracked and old, but nothing unusual happens.");
    } else if (action.toLowerCase() === "hallway") {
        console.log("You head back to the hallway.");
        location = "hallway"; // Move back to hallway
    } else {
        console.log("Invalid action! Please choose 'search', 'mirror', or 'hallway'.");
    }
}

function gardenPath() {
    console.log("\nYou step into the garden. The plants are overgrown, and there's an eerie quietness.");
    let action = prompt("Do you want to explore the flowerbeds, look around the old fountain, or go back to the hallway?");

    if (action.toLowerCase() === "flowerbeds") {
        if (inventory.includes("Garden Key")) {
            treasuresFound++;
            console.log("You use the Garden Key to unlock a secret compartment in the flowerbeds. Inside, you find a buried treasure chest!");
        } else {
            console.log("You search the flowerbeds but don't find anything useful. Perhaps you need a key.");
        }
        console.log("Total treasures found: " + treasuresFound);
    } else if (action.toLowerCase() === "fountain") {
        console.log("You approach the old fountain, but it’s dry. No treasure here.");
    } else if (action.toLowerCase() === "hallway") {
        console.log("You head back to the hallway.");
        location = "hallway"; // Move back to hallway
    } else {
        console.log("Invalid action! Please choose 'flowerbeds', 'fountain', or 'hallway'.");
    }
}

// Start the game
startGame();