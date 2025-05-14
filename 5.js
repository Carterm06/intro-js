const prompt = require('prompt-sync')();

function spawnEnemy(name, level) {
   let enemy = { name: name, level: level };
   console.log("A wild " + enemy.name + " appeared! Level: " + enemy.level);
}

// Spawn 3 Goblins with different levels
spawnEnemy("Goblin", 1);
spawnEnemy("Goblin", 2);
spawnEnemy("Goblin", 3);

// Spawn a Dragon at level 10
spawnEnemy("Dragon", 10);