const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');
const scoreElement = document.getElementById('score');

// Set canvas size
canvas.width = 800;
canvas.height = 600;

// Game state
let score = 0;
let gameOver = false;
let currentLevel = 1;
let levelCompleted = false;
let canPressSpace = false;

// Player properties
const player = {
    x: 100,
    y: 300,
    width: 15,
    height: 15,
    velocityX: 0,
    velocityY: 0,
    speed: 1.5,
    jumpForce: -12,
    gravity: 0.3,
    isJumping: false,
    color: '#ffffff',
    // Animation properties
    walkFrame: 0,
    walkSpeed: 0.2,
    jumpFrame: 0,
    jumpSpeed: 0.3,
    facingRight: true
};

// Level definitions
const levels = [
    {
        platforms: [
            { x: 0, y: 550, width: 800, height: 50 }, // Ground
            { x: 50, y: 450, width: 100, height: 15 }, // Starting platform
            { x: 200, y: 450, width: 80, height: 15 },
            { x: 350, y: 350, width: 80, height: 15 },
            { x: 500, y: 250, width: 80, height: 15 },
            { x: 650, y: 150, width: 80, height: 15, isFinal: true } // Final platform with flag
        ],
        obstacles: [
            { x: 300, y: 400, width: 20, height: 20, type: 'spike' },
            { x: 450, y: 300, width: 20, height: 20, type: 'spike' }
        ],
        platformSpeed: 0,
        obstacleSpeed: 0
    },
    {
        platforms: [
            { x: 0, y: 550, width: 1200, height: 50 }, // Ground
            { x: 50, y: 400, width: 100, height: 15 }, // Starting platform
            { x: 200, y: 450, width: 50, height: 15 }, // Smaller platforms
            { x: 300, y: 350, width: 50, height: 15 },
            { x: 400, y: 250, width: 50, height: 15 },
            { x: 500, y: 350, width: 50, height: 15 },
            { x: 600, y: 200, width: 50, height: 15 },
            { x: 700, y: 300, width: 50, height: 15 },
            { x: 800, y: 250, width: 50, height: 15 },
            { x: 900, y: 350, width: 50, height: 15 },
            { x: 1000, y: 200, width: 50, height: 15 },
            { x: 1100, y: 300, width: 50, height: 15, isFinal: true } // Final platform with flag
        ],
        obstacles: [
            { x: 200, y: 430, width: 20, height: 20, type: 'spike' },
            { x: 300, y: 330, width: 20, height: 20, type: 'spike' },
            { x: 400, y: 230, width: 20, height: 20, type: 'spike' },
            { x: 500, y: 330, width: 20, height: 20, type: 'spike' },
            { x: 600, y: 180, width: 20, height: 20, type: 'spike' },
            { x: 700, y: 280, width: 20, height: 20, type: 'spike' },
            { x: 800, y: 230, width: 20, height: 20, type: 'spike' },
            { x: 900, y: 330, width: 20, height: 20, type: 'spike' },
            { x: 1000, y: 180, width: 20, height: 20, type: 'spike' }
        ],
        platformSpeed: 0.8,
        obstacleSpeed: 0.8
    },
    {
        platforms: [
            { x: 0, y: 550, width: 2500, height: 50 }, // Extended ground
            { x: 50, y: 350, width: 100, height: 15 }, // Starting platform
            { x: 200, y: 450, width: 60, height: 15 },
            { x: 350, y: 300, width: 60, height: 15 },
            { x: 500, y: 400, width: 60, height: 15 },
            { x: 650, y: 250, width: 60, height: 15 },
            { x: 800, y: 450, width: 60, height: 15 },
            { x: 950, y: 200, width: 60, height: 15 },
            { x: 1100, y: 350, width: 60, height: 15 },
            { x: 1250, y: 250, width: 60, height: 15 },
            { x: 1400, y: 400, width: 60, height: 15 },
            { x: 1550, y: 200, width: 60, height: 15 },
            { x: 1700, y: 350, width: 60, height: 15 },
            { x: 1850, y: 250, width: 60, height: 15 },
            { x: 2000, y: 400, width: 60, height: 15 },
            { x: 2150, y: 200, width: 60, height: 15 },
            { x: 2300, y: 300, width: 60, height: 15, isFinal: true } // Final platform with flag
        ],
        obstacles: [
            { x: 350, y: 280, width: 20, height: 20, type: 'spike' },
            { x: 500, y: 380, width: 20, height: 20, type: 'spike' },
            { x: 650, y: 230, width: 20, height: 20, type: 'spike' },
            { x: 800, y: 430, width: 20, height: 20, type: 'spike' },
            { x: 950, y: 180, width: 20, height: 20, type: 'spike' },
            { x: 1100, y: 330, width: 20, height: 20, type: 'spike' },
            { x: 1250, y: 230, width: 20, height: 20, type: 'spike' },
            { x: 1400, y: 380, width: 20, height: 20, type: 'spike' },
            { x: 1550, y: 180, width: 20, height: 20, type: 'spike' },
            { x: 1700, y: 330, width: 20, height: 20, type: 'spike' },
            { x: 1850, y: 230, width: 20, height: 20, type: 'spike' },
            { x: 2000, y: 380, width: 20, height: 20, type: 'spike' },
            { x: 2150, y: 180, width: 20, height: 20, type: 'spike' }
        ],
        platformSpeed: 1.2,
        obstacleSpeed: 1.2
    }
];

let currentLevelData = levels[0];

// Input handling
const keys = {
    left: false,
    right: false,
    up: false
};

document.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowLeft') keys.left = true;
    if (e.key === 'ArrowRight') keys.right = true;
    if (e.key === 'ArrowUp' && !player.isJumping) {
        keys.up = true;
        player.velocityY = player.jumpForce;
        player.isJumping = true;
    }
    if (e.key === 'r' && gameOver) {
        console.log('R key pressed during game over');
        resetGame();
    }
    if (e.key === 'e' && levelCompleted && canPressSpace) {
        console.log('E key pressed');
        console.log('Level completed:', levelCompleted);
        console.log('Can press E:', canPressSpace);
        console.log('Current level:', currentLevel);
        
        if (canPressSpace) {
            console.log('Advancing to next level');
            canPressSpace = false;
            currentLevel++;
            
            if (currentLevel <= levels.length) {
                console.log('Loading level:', currentLevel);
                currentLevelData = levels[currentLevel - 1];
                player.x = 80;
                player.y = currentLevel === 2 ? 370 : 320;
                player.velocityX = 0;
                player.velocityY = 0;
                player.speed = 1.5;
                levelCompleted = false;
                console.log('New level loaded:', currentLevel);
                console.log('Level data:', currentLevelData);
                
                // Force a new frame to be drawn
                requestAnimationFrame(gameLoop);
            } else {
                console.log('Game completed');
                gameOver = true;
            }
        }
    }
});

document.addEventListener('keyup', (e) => {
    if (e.key === 'ArrowLeft') keys.left = false;
    if (e.key === 'ArrowRight') keys.right = false;
    if (e.key === 'ArrowUp') keys.up = false;
});

// Reset game function
function resetGame() {
    console.log('Resetting game');
    score = 0;
    gameOver = false;
    currentLevel = 1;
    levelCompleted = false;
    canPressSpace = false;
    currentLevelData = levels[0];
    
    // Reset player position and state
    player.x = 80;
    player.y = 420;
    player.velocityX = 0;
    player.velocityY = 0;
    player.isJumping = false;
    player.walkFrame = 0;
    player.jumpFrame = 0;
    player.speed = 1.5;
    
    // Reset all platforms and obstacles to their initial positions
    for (let level of levels) {
        for (let platform of level.platforms) {
            platform.x = platform.initialX || platform.x;
        }
        for (let obstacle of level.obstacles) {
            obstacle.x = obstacle.initialX || obstacle.x;
        }
    }
    
    // Reset platform speeds to initial values
    levels[0].platformSpeed = 0;
    levels[0].obstacleSpeed = 0;
    levels[1].platformSpeed = 0.8;
    levels[1].obstacleSpeed = 0.8;
    levels[2].platformSpeed = 1.2;
    levels[2].obstacleSpeed = 1.2;
    
    // Force a new frame to be drawn
    requestAnimationFrame(gameLoop);
}

// Collision detection
function checkCollision(rect1, rect2) {
    return rect1.x < rect2.x + rect2.width &&
           rect1.x + rect1.width > rect2.x &&
           rect1.y < rect2.y + rect2.height &&
           rect1.y + rect1.height > rect2.y;
}

// Draw stick figure with animations
function drawStickFigure(x, y) {
    ctx.strokeStyle = player.color;
    ctx.lineWidth = 1.5;
    
    // Update animation frames
    if (player.velocityX !== 0 && !player.isJumping) {
        player.walkFrame += player.walkSpeed;
        if (player.walkFrame >= 2) player.walkFrame = 0;
    }
    if (player.isJumping) {
        player.jumpFrame += player.jumpSpeed;
        if (player.jumpFrame >= 2) player.jumpFrame = 0;
    }
    
    // Head
    ctx.beginPath();
    ctx.arc(x + 7.5, y + 5, 4, 0, Math.PI * 2);
    ctx.stroke();
    
    // Body
    ctx.beginPath();
    ctx.moveTo(x + 7.5, y + 9);
    ctx.lineTo(x + 7.5, y + 17.5);
    ctx.stroke();
    
    // Arms with walking animation
    ctx.beginPath();
    if (player.velocityX !== 0 && !player.isJumping) {
        const armOffset = Math.sin(player.walkFrame * Math.PI) * 3;
        ctx.moveTo(x + 2.5, y + 12.5 + armOffset);
        ctx.lineTo(x + 12.5, y + 12.5 - armOffset);
    } else {
        ctx.moveTo(x + 2.5, y + 12.5);
        ctx.lineTo(x + 12.5, y + 12.5);
    }
    ctx.stroke();
    
    // Legs with walking/jumping animation
    ctx.beginPath();
    if (player.isJumping) {
        // Jumping pose
        const legOffset = Math.sin(player.jumpFrame * Math.PI) * 5;
        ctx.moveTo(x + 7.5, y + 17.5);
        ctx.lineTo(x + 2.5, y + 22.5 + legOffset);
        ctx.moveTo(x + 7.5, y + 17.5);
        ctx.lineTo(x + 12.5, y + 22.5 + legOffset);
    } else if (player.velocityX !== 0) {
        // Walking pose
        const legOffset = Math.sin(player.walkFrame * Math.PI) * 4;
        ctx.moveTo(x + 7.5, y + 17.5);
        ctx.lineTo(x + 2.5, y + 22.5 + legOffset);
        ctx.moveTo(x + 7.5, y + 17.5);
        ctx.lineTo(x + 12.5, y + 22.5 - legOffset);
    } else {
        // Standing pose
        ctx.moveTo(x + 7.5, y + 17.5);
        ctx.lineTo(x + 2.5, y + 22.5);
        ctx.moveTo(x + 7.5, y + 17.5);
        ctx.lineTo(x + 12.5, y + 22.5);
    }
    ctx.stroke();
}

// Draw spike
function drawSpike(x, y) {
    ctx.fillStyle = '#ff0000';
    ctx.beginPath();
    ctx.moveTo(x, y + 20);
    ctx.lineTo(x + 10, y);
    ctx.lineTo(x + 20, y + 20);
    ctx.closePath();
    ctx.fill();
}

// Draw finish line flag
function drawFinishLine(x, y) {
    // Find the final platform
    const finalPlatform = currentLevelData.platforms.find(p => p.isFinal);
    if (finalPlatform) {
        // Draw flag on the final platform
        const flagX = finalPlatform.x + finalPlatform.width - 5;
        const flagY = finalPlatform.y - 50;
        
        // Flag pole
        ctx.fillStyle = '#888';
        ctx.fillRect(flagX, flagY, 5, 50);
        
        // Checkered flag
        const squareSize = 10;
        for (let i = 0; i < 3; i++) {
            for (let j = 0; j < 3; j++) {
                ctx.fillStyle = (i + j) % 2 === 0 ? '#000' : '#fff';
                ctx.fillRect(flagX + 5, flagY + (i * squareSize), squareSize, squareSize);
            }
        }
    }
}

// Game loop
function gameLoop() {
    if (gameOver) {
        ctx.fillStyle = 'rgba(0, 0, 0, 0.7)';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        ctx.fillStyle = 'white';
        ctx.font = '48px Arial';
        ctx.textAlign = 'center';
        ctx.fillText('Game Over!', canvas.width / 2, canvas.height / 2);
        ctx.font = '24px Arial';
        ctx.fillText(`Final Score: ${score}`, canvas.width / 2, canvas.height / 2 + 40);
        ctx.fillText('Press R to restart', canvas.width / 2, canvas.height / 2 + 80);
        return;
    }

    if (levelCompleted) {
        ctx.fillStyle = 'rgba(0, 0, 0, 0.7)';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        ctx.fillStyle = 'white';
        ctx.font = '48px Arial';
        ctx.textAlign = 'center';
        if (currentLevel === 3) {
            ctx.fillText('Final Level Completed!', canvas.width / 2, canvas.height / 2);
        } else {
            ctx.fillText(`Level ${currentLevel} Complete!`, canvas.width / 2, canvas.height / 2);
        }
        ctx.font = '24px Arial';
        ctx.fillText('Press E to continue', canvas.width / 2, canvas.height / 2 + 40);
        
        // Draw finish line in background
        drawFinishLine(canvas.width - 100, 100);
        
        // Enable E key after a short delay
        if (!canPressSpace) {
            setTimeout(() => {
                canPressSpace = true;
            }, 500);
        }
        return;
    }

    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Update player position
    if (keys.left) player.velocityX = -player.speed;
    else if (keys.right) player.velocityX = player.speed;
    else player.velocityX = 0;

    player.velocityY += player.gravity;
    
    // Move player independently of platform speed
    player.x += player.velocityX;
    player.y += player.velocityY;

    // Move platforms and obstacles
    for (let platform of currentLevelData.platforms) {
        platform.x -= currentLevelData.platformSpeed;
        if (platform.x + platform.width < 0) {
            platform.x = canvas.width;
        }
    }

    for (let obstacle of currentLevelData.obstacles) {
        obstacle.x -= currentLevelData.obstacleSpeed;
        if (obstacle.x + obstacle.width < 0) {
            obstacle.x = canvas.width;
        }
    }

    // Platform collision
    let onPlatform = false;
    let onGround = false;
    let onFinalPlatform = false;
    for (const platform of currentLevelData.platforms) {
        if (checkCollision(player, platform)) {
            // Bottom collision
            if (player.velocityY > 0) {
                player.y = platform.y - player.height;
                player.velocityY = 0;
                player.isJumping = false;
                player.jumpFrame = 0; // Reset jump animation
                onPlatform = true;
                // Check if on ground
                if (platform.y === 550) {
                    onGround = true;
                }
                // Check if on final platform
                if (platform.isFinal) {
                    onFinalPlatform = true;
                }
            }
            // Top collision
            else if (player.velocityY < 0) {
                player.y = platform.y + platform.height;
                player.velocityY = 0;
            }
            // Side collision - only apply if moving into the platform
            if (player.velocityX > 0 && player.x + player.width - player.velocityX <= platform.x) {
                player.x = platform.x - player.width;
            } else if (player.velocityX < 0 && player.x - player.velocityX >= platform.x + platform.width) {
                player.x = platform.x + platform.width;
            }
        }
    }

    // Update facing direction
    if (player.velocityX > 0) player.facingRight = true;
    else if (player.velocityX < 0) player.facingRight = false;

    // Death on falling (but not on ground)
    if (player.y > canvas.height - 100 && !onPlatform && !onGround) {
        gameOver = true;
    }

    // Obstacle collision
    for (const obstacle of currentLevelData.obstacles) {
        if (checkCollision(player, obstacle)) {
            gameOver = true;
        }
    }

    // Level completion check - must be on final platform
    if (onFinalPlatform) {
        console.log('Player on final platform');
        levelCompleted = true;
        console.log('Level completed set to true');
    }

    // Score update
    score = Math.floor(player.x / 10) + (currentLevel - 1) * 1000;
    scoreElement.textContent = `Score: ${score} | Level: ${currentLevel}`;

    // Draw platforms
    ctx.fillStyle = '#444';
    for (const platform of currentLevelData.platforms) {
        ctx.fillRect(platform.x, platform.y, platform.width, platform.height);
    }

    // Draw obstacles
    for (const obstacle of currentLevelData.obstacles) {
        drawSpike(obstacle.x, obstacle.y);
    }

    // Draw finish line
    drawFinishLine(canvas.width - 100, 100);

    // Draw player
    drawStickFigure(player.x, player.y);

    // Screen boundaries
    if (player.x < 0) player.x = 0;
    if (player.x + player.width > canvas.width) player.x = canvas.width - player.width;
    if (player.y + player.height > canvas.height) {
        player.y = canvas.height - player.height;
        player.velocityY = 0;
        player.isJumping = false;
    }

    // At the end of the game loop, request the next frame
    requestAnimationFrame(gameLoop);
}

// Start the game
gameLoop(); 