import { getDistance } from './utils.js';
import { Player } from './entities/Player.js';
import { Bullet } from './entities/Bullet.js';
import { Enemy } from './entities/Enemy.js';
import { Particle } from './entities/Particle.js';
import { LevelSystem } from './systems/Levelsystem.js';
import { UIManager } from './systems/UIManager.js';
import { AudioManager } from './systems/AudioManager.js';
import { InputHandler } from './input.js';

const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

let gameState = 'MENU'; 
let frames = 0;
let score = 0;
let highscore = localStorage.getItem('neonShooterHighscore') || 0;
let activeUpgrades = []; 

const audioManager = new AudioManager();
const uiManager = new UIManager(canvas, ctx);
let player;
let bullets = [];
let enemies = [];
let particles = [];
let levelSystem;

const input = new InputHandler(canvas, {
    onClick: (mouse) => {
        if (gameState === 'MENU') {
            audioManager.play('click');
            resetGame();
            gameState = 'PLAYING';
        } 
        else if (gameState === 'GAME_OVER') {
            audioManager.play('click');
            gameState = 'MENU';
        } 
        else if (gameState === 'LEVEL_UP') {
            activeUpgrades.forEach((upg, i) => {
                const boxY = canvas.height / 2 - 30 + (i * 70);
                if (mouse.x > canvas.width/2 - 120 && mouse.x < canvas.width/2 + 120 &&
                    mouse.y > boxY - 25 && mouse.y < boxY + 25) {
                    audioManager.play('click');
                    upg.apply(player);
                    gameState = 'PLAYING'; 
                }
            });
        }
        else if (gameState === 'PAUSED') {
            const cy = canvas.height / 2;
            if (mouse.y > cy - 30 && mouse.y < cy + 5) {
                audioManager.play('click');
                gameState = 'PLAYING';
            }
            else if (mouse.y > cy + 10 && mouse.y < cy + 45) { 
                audioManager.play('click');
                resetGame(); 
                gameState = 'PLAYING'; 
            }
            else if (mouse.y > cy + 50 && mouse.y < cy + 85) {
                audioManager.play('click');
                gameState = 'MENU';
            }
        }
    },
    onPauseToggle: () => {
        if (gameState === 'PLAYING') gameState = 'PAUSED';
        else if (gameState === 'PAUSED') gameState = 'PLAYING';
    }
});

function resetGame() {
    player = new Player(canvas.width, canvas.height);
    levelSystem = new LevelSystem();
    bullets = [];
    enemies = [];
    particles = [];
    score = 0;
    frames = 0;
}

function createExplosion(x, y, color) {
    for (let i = 0; i < 15; i++) {
        particles.push(new Particle(x, y, color));
    }
}

function animate() {
    requestAnimationFrame(animate);
    
    ctx.fillStyle = 'rgba(10, 10, 26, 0.3)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    if (gameState === 'MENU') {
        uiManager.drawMenu();
    } 
    
    else if (gameState === 'PLAYING') {
        frames++;

        player.update(input.mouse.x);
        player.draw(ctx);

        if (frames % player.fireRate === 0) {
            bullets.push(new Bullet(player.x, player.y - player.radius, player.bulletSpeed, player.damage));
            audioManager.play('shoot');
        }

        if (frames % 60 === 0) enemies.push(new Enemy(canvas.width, levelSystem.level));

        bullets.forEach((bullet, index) => {
            bullet.update();
            bullet.draw(ctx);
            if (bullet.y < 0) bullets.splice(index, 1);
        });

        for (let eIndex = enemies.length - 1; eIndex >= 0; eIndex--) {
            const enemy = enemies[eIndex];
            enemy.update();
            enemy.draw(ctx, frames);

            let enemyDead = false;

            for (let bIndex = bullets.length - 1; bIndex >= 0; bIndex--) {
                const bullet = bullets[bIndex];
                if (getDistance(bullet.x, bullet.y, enemy.x, enemy.y) - enemy.radius - bullet.radius < 0) {
                    enemy.hp -= bullet.damage;
                    bullets.splice(bIndex, 1); 
                    
                    if (enemy.hp <= 0) {
                        createExplosion(enemy.x, enemy.y, enemy.color);
                        audioManager.play('explosion');
                        score += 10;
                        if (score > highscore) {
                            highscore = score;
                            localStorage.setItem('neonShooterHighscore', highscore);
                        }
                        
                        if (levelSystem.addExp(20)) { 
                            activeUpgrades = levelSystem.getUpgrades();
                            audioManager.play('levelUp');
                            gameState = 'LEVEL_UP';
                        }
                        
                        enemies.splice(eIndex, 1);
                        enemyDead = true;
                        break; 
                    }
                }
            }

            if (!enemyDead && getDistance(player.x, player.y, enemy.x, enemy.y) - enemy.radius - player.radius < 0) {
                createExplosion(player.x, player.y, player.color);
                audioManager.play('explosion');
                gameState = 'GAME_OVER';
            }

            if (!enemyDead && enemy.y > canvas.height + enemy.radius) {
                enemies.splice(eIndex, 1);
            }
        }

        particles.forEach((particle, index) => {
            if (particle.alpha <= 0) particles.splice(index, 1);
            else { particle.update(); particle.draw(ctx); }
        });

        uiManager.drawHUD(levelSystem, score, highscore);
    } 
    
    else if (gameState === 'LEVEL_UP') {
        uiManager.drawLevelUp(activeUpgrades, input.mouse);
    }

    else if (gameState === 'PAUSED') {
        if (player) player.draw(ctx);
        bullets.forEach(b => b.draw(ctx));
        enemies.forEach(e => e.draw(ctx, frames));
        uiManager.drawPause(input.mouse);
    } 
    
    else if (gameState === 'GAME_OVER') {
        particles.forEach((particle, index) => {
            if (particle.alpha > 0) { particle.update(); particle.draw(ctx); }
        });
        uiManager.drawGameOver(score, highscore);
    }
}

resetGame();
animate();